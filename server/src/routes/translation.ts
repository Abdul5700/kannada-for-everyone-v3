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
  try {
    result = await provider.translate(parsed.data as any);
  } catch (aiErr: any) {
    console.error('[translate] AI provider error, falling back to mock:', aiErr?.message);
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
      warning: usedFallback ? '⚠️ AI temporarily unavailable. Showing mock response. Check GEMINI_API_KEY on server.' : result.warning,
    },
  });
}));

export default router;
