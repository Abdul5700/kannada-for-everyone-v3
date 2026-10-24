import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { MockAIProvider } from '../providers/mockProvider';
import { aiLimiter } from '../middleware/rateLimiter';

const router = Router();

const TranslateSchema = z.object({
  text: z.string().min(1).max(2000),
  direction: z.enum(['en-kn', 'kn-en']),
  context: z.string().default('general'),
  includeTransliteration: z.boolean().optional().default(true),
  includeAlternatives: z.boolean().optional().default(true),
});

router.post('/', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = TranslateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  let provider = getAIProvider();
  let result;
  let usedFallback = false;
  let aiErrorMsg = '';
  try {
    result = await provider.translate(parsed.data as any);
  } catch (aiErr: any) {
    aiErrorMsg = aiErr?.message || String(aiErr);
    console.error('[translate] AI provider error, falling back to mock:', aiErrorMsg);
    provider = new MockAIProvider();
    result = await provider.translate(parsed.data as any);
    usedFallback = true;
  }
  res.json({
    success: true,
    data: {
      ...result,
      original: parsed.data.text,
      direction: parsed.data.direction,
      context: parsed.data.context,
      source: usedFallback ? 'mock-fallback' : provider.name,
      warning: usedFallback ? `⚠️ AI Fallback: ${aiErrorMsg}` : result.warning,
    },
  });
}));

export default router;
