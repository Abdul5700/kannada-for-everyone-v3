import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { MockAIProvider } from '../providers/mockProvider';
import { aiLimiter } from '../middleware/rateLimiter';
import { db } from '../database/init';

const router = Router();

// GET /api/vocabulary?classLevel=&topic=&difficulty=
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { classLevel, topic, difficulty } = req.query;
  const { LOCAL_VOCAB } = await import('../data/vocabularyData');
  let results = LOCAL_VOCAB;
  if (classLevel) results = results.filter(v => String(v.classLevel) === String(classLevel));
  if (topic) results = results.filter(v => v.topic.toLowerCase().includes(String(topic).toLowerCase()));
  if (difficulty) results = results.filter(v => v.difficulty === difficulty);
  res.json({ success: true, data: results });
}));

// POST /api/vocabulary/generate — AI generation
const GenerateSchema = z.object({
  classLevel: z.union([z.string(), z.number()]).transform(String),
  topic: z.string().min(1).max(100),
  count: z.number().int().min(1).max(20).default(10),
  excludeWords: z.array(z.string()).optional(),
  batchNumber: z.number().int().optional(),
});

router.post('/generate', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = GenerateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  let provider = getAIProvider();
  let result;
  try {
    result = await provider.generateVocabulary(parsed.data as any);
  } catch (aiErr: any) {
    console.error('[vocabulary/generate] AI error, falling back to mock:', aiErr?.message);
    provider = new MockAIProvider();
    result = await provider.generateVocabulary(parsed.data as any);
  }
  res.json({ success: true, data: result, source: provider.name });
}));

// GET /api/vocabulary/saved?learnerId=
router.get('/saved', asyncHandler(async (req: Request, res: Response) => {
  const learnerId = String(req.query.learnerId || 'default');
  const saved = db.findMany('saved_vocabulary', (v: { learnerId: string }) => v.learnerId === learnerId);
  res.json({ success: true, data: saved });
}));

// POST /api/vocabulary/saved
const SaveSchema = z.object({
  learnerId: z.string().default('default'),
  wordId: z.string(),
  english: z.string(),
  kannada: z.string(),
  transliteration: z.string().optional(),
  meaning: z.string().optional(),
  topic: z.string().optional(),
  status: z.enum(['learning', 'learned', 'revision']).default('learning'),
});

router.post('/saved', asyncHandler(async (req: Request, res: Response) => {
  const parsed = SaveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const doc = {
    id: `${parsed.data.learnerId}_${parsed.data.wordId}`,
    ...parsed.data,
    savedAt: new Date().toISOString(),
    nextReview: null,
    reviewCount: 0,
  };
  db.upsert('saved_vocabulary', doc);
  res.json({ success: true, data: doc });
}));

// DELETE /api/vocabulary/saved/:id
router.delete('/saved/:id', asyncHandler(async (req: Request, res: Response) => {
  db.deleteMany('saved_vocabulary', (v: { id: string }) => v.id === req.params.id);
  res.json({ success: true });
}));

export default router;
