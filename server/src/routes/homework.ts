import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { aiLimiter } from '../middleware/rateLimiter';
import { db } from '../database/init';

const router = Router();

const GenerateSchema = z.object({
  learnerId: z.string().default('default'),
  classLevel: z.union([z.string(), z.number()]).transform(String),
  topic: z.string().min(1).max(100),
  count: z.number().int().min(1).max(10).default(5),
});

router.post('/generate', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = GenerateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const provider = getAIProvider();
  const quizResult = await provider.generateQuiz({
    classLevel: parsed.data.classLevel,
    topic: parsed.data.topic,
    difficulty: 'medium',
    count: parsed.data.count,
  });
  const assignment = {
    id: `hw_${Date.now()}`,
    learnerId: parsed.data.learnerId,
    classLevel: parsed.data.classLevel,
    topic: parsed.data.topic,
    title: `${parsed.data.topic} — Class ${parsed.data.classLevel} Homework`,
    questions: quizResult.questions,
    generatedAt: new Date().toISOString(),
    source: provider.name,
  };
  db.insert('homework_assignments', assignment);
  res.json({ success: true, data: assignment });
}));

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const learnerId = String(req.query.learnerId || 'default');
  const assignments = (db.findMany('homework_assignments', (a: any) => a.learnerId === learnerId) as any[])
    .sort((a, b) => (b.generatedAt || '').localeCompare(a.generatedAt || ''));
  res.json({ success: true, data: assignments });
}));

const EvalSchema = z.object({
  assignmentId: z.string(),
  learnerId: z.string().default('default'),
  answers: z.record(z.string(), z.string()),
});

router.post('/evaluate', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = EvalSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const { assignmentId, learnerId, answers } = parsed.data;
  const assignment = db.findOne('homework_assignments', (a: any) => a.id === assignmentId) as any;
  if (!assignment) { res.status(404).json({ success: false, error: 'Assignment not found.' }); return; }

  let correct = 0;
  const feedback: Record<string, string> = {};
  (assignment.questions || []).forEach((q: any) => {
    const ua = (answers[q.id] || '').trim().toLowerCase();
    const ca = q.answer.trim().toLowerCase();
    if (ua === ca) { correct++; feedback[q.id] = '✓ Correct!'; }
    else { feedback[q.id] = `✗ Correct answer: ${q.answer}`; }
  });
  const score = Math.round((correct / assignment.questions.length) * 100);
  const submission = {
    id: `hs_${Date.now()}`,
    assignmentId, learnerId,
    answers, score, feedback,
    submittedAt: new Date().toISOString(),
  };
  db.insert('homework_submissions', submission);
  res.json({ success: true, data: submission });
}));

export default router;
