import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { CURRICULUM_DATA, LEGACY_LESSON_ID_MAP } from '../data/curriculumData';
import { CURRICULUM_DATA as SCHOOL_CLASSES_DATA } from '../data/schoolCurriculumData';
import { BOOK_31_LESSONS, SECTION_DEFINITIONS } from '../data/spokenCurriculumData';
import { getAIProvider } from '../providers';
import { aiLimiter } from '../middleware/rateLimiter';

const router = Router();

// Dynamic in-memory curriculum store
let dynamicCurriculum: any[] = [...CURRICULUM_DATA];
let schoolCurriculum: any[] = [...SCHOOL_CLASSES_DATA];

// Helper to resolve lessonId (supports both modern 'lesson-spoken-X' and legacy 'lesson-beg-1', etc.)
function findLessonById(id: string) {
  // Direct check in dynamicCurriculum
  for (const unit of dynamicCurriculum) {
    const lesson = unit.lessons.find((l: any) => l.id === id);
    if (lesson) return { lesson, unit };
  }

  // Check in schoolCurriculum
  for (const unit of schoolCurriculum) {
    const lesson = unit.lessons.find((l: any) => l.id === id);
    if (lesson) return { lesson, unit };
  }

  // Check alias map
  const mappedId = LEGACY_LESSON_ID_MAP[id];
  if (mappedId) {
    for (const unit of dynamicCurriculum) {
      const lesson = unit.lessons.find((l: any) => l.id === mappedId);
      if (lesson) return { lesson, unit };
    }
  }

  // Fallback for number shorthand like "1" -> "lesson-spoken-1"
  const spokenId = `lesson-spoken-${id.replace('lesson-', '').replace('spoken-', '')}`;
  for (const unit of dynamicCurriculum) {
    const lesson = unit.lessons.find((l: any) => l.id === spokenId);
    if (lesson) return { lesson, unit };
  }

  return null;
}

// GET /api/curriculum - Returns all sections and course metadata
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const sections = dynamicCurriculum.map(unit => ({
    id: unit.id,
    sectionNumber: unit.sectionNumber || unit.unitNumber,
    title: unit.title,
    titleKn: unit.titleKn,
    description: unit.description,
    category: unit.category,
    lessonCount: unit.lessons.length,
    estimatedMinutes: unit.estimatedMinutes,
    lessons: unit.lessons.map((l: any) => ({
      id: l.id,
      lessonNumber: l.lessonNumber || l.order,
      sectionNumber: l.sectionNumber || unit.sectionNumber,
      title: l.title,
      titleKn: l.titleKn,
      category: l.category,
      grammaticalFocus: l.grammaticalFocus || '',
      estimatedMinutes: l.estimatedMinutes || 20,
    })),
  }));

  const allLessons = dynamicCurriculum.flatMap(u => u.lessons);

  res.json({
    success: true,
    data: {
      courseTitle: 'Spoken Kannada Course',
      subtitle: 'Learn Kannada step by step through real-life conversations, vocabulary, grammar and guided practice.',
      source: 'Kannada Sahitya Parishat (31 Graded Cycles)',
      totalLessons: allLessons.length,
      sections,
    },
  });
}));

// GET /api/curriculum/school-classes - All Class 1 to 10 structured units
router.get('/school-classes', asyncHandler(async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      title: 'Class 1 to 10 Karnataka State Curriculum',
      titleKn: 'ತರಗತಿ ೧ ರಿಂದ ೧೦ ರ ಪಠ್ಯಕ್ರಮ',
      units: schoolCurriculum,
    },
  });
}));

// GET /api/curriculum/sections - Section summary for dashboard
router.get('/sections', asyncHandler(async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: SECTION_DEFINITIONS,
  });
}));

// GET /api/curriculum/lessons - Get all 31 lessons flattened
router.get('/lessons', asyncHandler(async (_req: Request, res: Response) => {
  const allLessons = dynamicCurriculum.flatMap(u =>
    u.lessons.map((l: any) => ({ ...l, unitTitle: u.title, unitTitleKn: u.titleKn }))
  );
  res.json({ success: true, data: allLessons });
}));

// GET /api/curriculum/:sectionOrClass - Backwards-compatible route for /:classLevel
router.get('/:classLevel', asyncHandler(async (req: Request, res: Response) => {
  const param = req.params.classLevel.toLowerCase();

  // If requesting a specific section (e.g., '1', '2', '3', '4' or 'section-1')
  const secNum = parseInt(param.replace('section-', '').replace('class-', ''), 10);

  if (!isNaN(secNum) && secNum >= 1 && secNum <= 4) {
    const matchingUnit = dynamicCurriculum.filter(u => u.sectionNumber === secNum || u.unitNumber === secNum);
    if (matchingUnit.length) {
      res.json({ success: true, data: matchingUnit });
      return;
    }
  }

  // If requesting all or legacy class level, return the full course units gracefully
  res.json({ success: true, data: dynamicCurriculum });
}));

// GET /api/curriculum/lesson/:lessonId
router.get('/lesson/:lessonId', asyncHandler(async (req: Request, res: Response) => {
  const result = findLessonById(req.params.lessonId);
  if (result) {
    res.json({
      success: true,
      data: {
        ...result.lesson,
        unitTitle: result.unit.title,
        unitTitleKn: result.unit.titleKn,
      },
    });
    return;
  }
  res.status(404).json({ success: false, error: 'Lesson not found in Spoken Kannada course.' });
}));

// POST /api/curriculum/lesson/:lessonId/teach
// Deep, comprehensive lesson teacher powered by Gemini with 'complete' and 'continue' modes
router.post('/lesson/:lessonId/teach', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const { mode = 'complete', sectionIndex = 0, explanationLanguage = 'english', learnerId = 'default' } = req.body;

  const result = findLessonById(req.params.lessonId);
  if (!result) {
    res.status(404).json({ success: false, error: 'Lesson not found for teaching.' });
    return;
  }

  const targetLesson = {
    ...result.lesson,
    unitTitle: result.unit.title,
    unitTitleKn: result.unit.titleKn,
  };

  const provider = getAIProvider();
  const taughtLesson = await provider.teachLesson({
    lesson: targetLesson,
    mode: mode === 'continue' ? 'continue' : 'complete',
    sectionIndex: Number(sectionIndex) || 0,
    explanationLanguage: String(explanationLanguage),
    learnerHistory: { learnerId },
  });

  res.json({
    success: true,
    data: taughtLesson,
    source: provider.name,
    mode,
  });
}));

export default router;
