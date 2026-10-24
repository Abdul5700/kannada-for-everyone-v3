import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { db } from '../database/init';

const router = Router();

const ProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  classLevel: z.union([z.string(), z.number()]).transform(String).default('beginner'),
  proficiency: z.enum(['none', 'basic', 'intermediate', 'advanced']).default('none'),
  explanationLanguage: z.enum(['english', 'kannada']).default('english'),
  dailyGoalMinutes: z.number().int().min(5).max(120).default(15),
  preferredCategories: z.array(z.string()).default([]),
});

router.get('/:learnerId', asyncHandler(async (req: Request, res: Response) => {
  const learner = db.findOne('learners', (l: { id: string }) => l.id === req.params.learnerId);
  if (!learner) { res.status(404).json({ success: false, error: 'Learner not found.' }); return; }
  res.json({ success: true, data: learner });
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const parsed = ProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const now = new Date().toISOString();
  const learner = {
    id: parsed.data.id || `learner_${Date.now()}`,
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  };
  db.upsert('learners', learner);
  res.json({ success: true, data: learner });
}));

router.patch('/:learnerId', asyncHandler(async (req: Request, res: Response) => {
  const existing = db.findOne('learners', (l: { id: string }) => l.id === req.params.learnerId) as Record<string, unknown> | undefined;
  if (!existing) { res.status(404).json({ success: false, error: 'Learner not found.' }); return; }
  const updated = { ...existing, ...req.body, updatedAt: new Date().toISOString() };
  db.upsert('learners', updated as { id: string });
  res.json({ success: true, data: updated });
}));

export default router;
