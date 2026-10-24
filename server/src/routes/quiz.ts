import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { aiLimiter } from '../middleware/rateLimiter';
import { db } from '../database/init';

const router = Router();

const GenerateSchema = z.object({
  classLevel: z.union([z.string(), z.number()]).transform(String),
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
  count: z.number().int().min(1).max(20).default(5),
  direction: z.enum(['en-kn', 'kn-en']).optional(),
  questionTypes: z.array(z.string()).optional(),
  mode: z.enum(['practice', 'exam']).default('practice'),
  learnerId: z.string().default('default'),
  batchNumber: z.number().int().optional(),
  excludeQuestions: z.array(z.string()).optional(),
});

router.post('/generate', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = GenerateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const provider = getAIProvider();
  const result = await provider.generateQuiz({
    classLevel: parsed.data.classLevel,
    topic: parsed.data.topic,
    difficulty: parsed.data.difficulty,
    count: parsed.data.count,
    direction: parsed.data.direction,
    questionTypes: parsed.data.questionTypes,
    batchNumber: parsed.data.batchNumber,
    excludeQuestions: parsed.data.excludeQuestions,
  });

  const sessionId = `qs_${Date.now()}`;
  const session = {
    id: sessionId,
    learnerId: parsed.data.learnerId,
    config: parsed.data,
    questions: result.questions,
    answers: {},
    totalQuestions: result.questions.length,
    startedAt: new Date().toISOString(),
    status: 'active',
  };
  db.insert('quiz_sessions', session);
  res.json({ success: true, data: { sessionId, questions: result.questions, source: provider.name } });
}));

const SubmitSchema = z.object({
  sessionId: z.string(),
  learnerId: z.string().default('default'),
  answers: z.record(z.string(), z.string()),
  questions: z.array(z.object({
    id: z.string(),
    prompt: z.string(),
    answer: z.string(),
    topic: z.string().optional(),
  })),
});

router.post('/submit', asyncHandler(async (req: Request, res: Response) => {
  const parsed = SubmitSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const { sessionId, learnerId, answers, questions } = parsed.data;
  const now = new Date().toISOString();
  let correct = 0;
  const attempts = questions.map(q => {
    const userAns = answers[q.id] || '';
    const isCorrect = userAns.trim().toLowerCase() === q.answer.trim().toLowerCase();
    if (isCorrect) correct++;
    const attempt = {
      id: `qa_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      learnerId, sessionId,
      questionId: q.id, questionText: q.prompt,
      userAnswer: userAns, correctAnswer: q.answer,
      isCorrect, topic: q.topic || 'general', answeredAt: now,
    };
    db.insert('quiz_attempts', attempt);
    return {
      questionId: q.id,
      prompt: q.prompt,
      userAnswer: userAns,
      correctAnswer: q.answer,
      isCorrect,
    };
  });

  const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
  db.updateMany('quiz_sessions', (s: any) => s.id === sessionId,
    (s: any) => ({ ...s, answers, score, completedAt: now, status: 'completed' }));

  const existingStats = db.findOne('learner_stats', (s: any) => s.learnerId === learnerId) as Record<string, unknown> | undefined;
  const stats: Record<string, unknown> = existingStats || { id: `ls_${learnerId}`, learnerId, lessonsCompleted: 0, vocabularyLearned: 0, quizAttempts: 0, quizCorrect: 0, totalPoints: 0, streakDays: 0, lastActiveDate: now, weakTopics: [], strongTopics: [] };
  stats.quizAttempts = Number(stats.quizAttempts || 0) + 1;
  stats.quizCorrect = Number(stats.quizCorrect || 0) + correct;
  stats.totalPoints = Number(stats.totalPoints || 0) + score;
  stats.lastActiveDate = now;
  db.upsert('learner_stats', stats as { id: string });

  res.json({ success: true, data: { score, correct, total: questions.length, attempts } });
}));

router.get('/attempts', asyncHandler(async (req: Request, res: Response) => {
  const learnerId = String(req.query.learnerId || 'default');
  const sessions = (db.findMany('quiz_sessions', (s: any) => s.learnerId === learnerId) as any[])
    .sort((a, b) => (b.startedAt || '').localeCompare(a.startedAt || '')).slice(0, 20);
  res.json({ success: true, data: sessions });
}));

export default router;
