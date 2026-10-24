import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { aiLimiter } from '../middleware/rateLimiter';

const router = Router();

const GenerateGrammarSchema = z.object({
  topic: z.string().min(1).max(120),
  classLevel: z.union([z.string(), z.number()]).transform(String).default('beginner'),
});

// POST /api/grammar/generate
router.post('/generate', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = GenerateGrammarSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const provider = getAIProvider();
  const lesson = await provider.generateGrammarLesson(parsed.data as any);
  res.json({ success: true, data: lesson, source: provider.name });
}));

export default router;
