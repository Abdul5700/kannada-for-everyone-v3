import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { aiLimiter } from '../middleware/rateLimiter';

const router = Router();

const ConvSchema = z.object({
  scenario: z.string().min(1),
  classLevel: z.union([z.string(), z.number()]).transform(String).default('beginner'),
});

router.post('/generate', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = ConvSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const provider = getAIProvider();
  const result = await provider.generateConversation(parsed.data as any);
  res.json({ success: true, data: result, source: provider.name });
}));

export default router;
