import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { db } from '../database/init';

const router = Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const learnerId = String(req.query.learnerId || 'default');
  const stats = db.findOne('learner_stats', (s: any) => s.learnerId === learnerId)
    || { learnerId, lessonsCompleted: 0, vocabularyLearned: 0, quizAttempts: 0, quizCorrect: 0, totalPoints: 0, streakDays: 0, lastActiveDate: null, weakTopics: [], strongTopics: [] };
  const recentActivity = (db.findMany('activity_records', (a: any) => a.learnerId === learnerId) as any[])
    .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || '')).slice(0, 10);
  const recentQuizzes = (db.findMany('quiz_sessions', (s: any) => s.learnerId === learnerId && s.status === 'completed') as any[])
    .sort((a, b) => (b.startedAt || '').localeCompare(a.startedAt || '')).slice(0, 5);
  res.json({ success: true, data: { stats, recentActivity, recentQuizzes } });
}));

router.post('/activity', asyncHandler(async (req: Request, res: Response) => {
  const { learnerId = 'default', type, referenceId, metadata = {} } = req.body;
  const record = {
    id: `act_${Date.now()}`,
    learnerId, type, referenceId: referenceId || '',
    metadata, timestamp: new Date().toISOString(),
  };
  db.insert('activity_records', record);
  res.json({ success: true, data: record });
}));

router.post('/lesson-complete', asyncHandler(async (req: Request, res: Response) => {
  const { learnerId = 'default', lessonId, timeSpentMinutes = 0 } = req.body;
  const completion = {
    id: `lc_${learnerId}_${lessonId}`,
    learnerId, lessonId, timeSpentMinutes,
    completedAt: new Date().toISOString(),
  };
  db.upsert('lesson_completions', completion);
  const existingStats = db.findOne('learner_stats', (s: { learnerId: string }) => s.learnerId === learnerId) as Record<string, unknown> | undefined;
  const stats: Record<string, unknown> = existingStats || { id: `ls_${learnerId}`, learnerId, lessonsCompleted: 0, vocabularyLearned: 0, quizAttempts: 0, quizCorrect: 0, totalPoints: 0, streakDays: 0 };
  stats.lessonsCompleted = db.count('lesson_completions', (lc: { learnerId: string }) => lc.learnerId === learnerId);
  stats.lastActiveDate = new Date().toISOString();
  db.upsert('learner_stats', stats as { id: string });
  res.json({ success: true, data: completion });
}));

export default router;
