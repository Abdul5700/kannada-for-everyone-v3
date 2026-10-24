import axios from 'axios';
import { LearnerProfile, DictionaryEntry, VocabularyItem, QuizQuestion, TranslationResult } from '../types';

// Use environment variable for backend API URL when deployed (e.g. VERCEL_URL or VITE_API_BASE_URL)
// Defaults to '/api' for local Vite proxy
const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const checkHealth = async () => {
  const res = await api.get('/health');
  return res.data;
};

// Learner & Profile
export const getProfile = async (learnerId: string) => {
  const res = await api.get(`/learner/${learnerId}`);
  return res.data.data;
};

export const saveProfile = async (profile: Partial<LearnerProfile>) => {
  const res = await api.post('/learner', profile);
  return res.data.data;
};

// Dictionary
export const searchDictionary = async (q: string, opts: { topic?: string; direction?: string } = {}) => {
  const res = await api.get('/dictionary/search', { params: { q, ...opts } });
  return res.data.data as DictionaryEntry[];
};

export const getDictionaryEntry = async (id: string) => {
  const res = await api.get(`/dictionary/${id}`);
  return res.data.data as DictionaryEntry;
};

export const explainWord = async (word: string, language: 'english' | 'kannada', context?: string) => {
  const res = await api.post('/dictionary/explain', { word, language, context });
  return res.data.data;
};

// Translation
export const translate = async (
  text: string,
  direction: 'en-kn' | 'kn-en',
  context = 'general',
  opts: { includeTransliteration?: boolean; includeAlternatives?: boolean } = {}
) => {
  const res = await api.post('/translate', {
    text,
    direction,
    context,
    ...opts,
  });
  return res.data.data as TranslationResult;
};

// Vocabulary
export const getVocabulary = async (params: { classLevel?: string | number; topic?: string; difficulty?: string } = {}) => {
  const res = await api.get('/vocabulary', { params });
  return res.data.data as VocabularyItem[];
};

export const generateVocabulary = async (
  classLevel: string | number,
  topic: string,
  count = 10,
  opts?: { excludeWords?: string[]; batchNumber?: number }
) => {
  const res = await api.post('/vocabulary/generate', {
    classLevel,
    topic,
    count,
    excludeWords: opts?.excludeWords,
    batchNumber: opts?.batchNumber,
  });
  return res.data.data;
};

export const getSavedVocab = async (learnerId = 'default') => {
  const res = await api.get('/vocabulary/saved', { params: { learnerId } });
  return res.data.data;
};

export const saveWord = async (item: {
  learnerId?: string;
  wordId: string;
  english: string;
  kannada: string;
  transliteration?: string;
  meaning?: string;
  topic?: string;
}) => {
  const res = await api.post('/vocabulary/saved', item);
  return res.data.data;
};

export const unsaveWord = async (id: string) => {
  const res = await api.delete(`/vocabulary/saved/${id}`);
  return res.data;
};

// Curriculum
export const getCurriculum = async () => {
  const res = await api.get('/curriculum');
  return res.data.data;
};

export const getCurriculumByClass = async (classLevel: string | number) => {
  const res = await api.get(`/curriculum/${classLevel}`);
  return res.data.data;
};

export const generateCurriculum = async (classLevel: string | number, customFocus?: string) => {
  const res = await api.post('/curriculum/generate', { classLevel, customFocus });
  return res.data.data;
};

export const getLesson = async (lessonId: string) => {
  const res = await api.get(`/curriculum/lesson/${lessonId}`);
  return res.data.data;
};

export const teachLesson = async (
  lessonId: string,
  opts: {
    mode?: 'complete' | 'continue';
    sectionIndex?: number;
    explanationLanguage?: string;
    learnerId?: string;
  } = {}
) => {
  const res = await api.post(`/curriculum/lesson/${lessonId}/teach`, opts);
  return res.data.data;
};

// Quizzes
export const generateQuiz = async (config: {
  classLevel: string | number;
  topic: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  count?: number;
  direction?: 'en-kn' | 'kn-en';
  mode?: 'practice' | 'exam';
  learnerId?: string;
  batchNumber?: number;
  excludeQuestions?: string[];
}) => {
  const res = await api.post('/quiz/generate', config);
  return res.data.data;
};

export const submitQuiz = async (payload: {
  sessionId: string;
  learnerId?: string;
  answers: Record<string, string>;
  questions: { id: string; prompt: string; answer: string; topic?: string }[];
}) => {
  const res = await api.post('/quiz/submit', payload);
  return res.data.data;
};

export const getQuizHistory = async (learnerId = 'default') => {
  const res = await api.get('/quiz/attempts', { params: { learnerId } });
  return res.data.data;
};

// Progress
export const getProgress = async (learnerId = 'default') => {
  const res = await api.get('/progress', { params: { learnerId } });
  return res.data.data;
};

export const recordActivity = async (payload: {
  learnerId?: string;
  type: string;
  referenceId?: string;
  metadata?: any;
}) => {
  const res = await api.post('/progress/activity', payload);
  return res.data.data;
};

export const completeLesson = async (lessonId: string, learnerId = 'default', timeSpentMinutes = 5) => {
  const res = await api.post('/progress/lesson-complete', {
    lessonId,
    learnerId,
    timeSpentMinutes,
  });
  return res.data.data;
};

// Conversations
export const generateConversation = async (scenario: string, classLevel: string | number = 'beginner') => {
  const res = await api.post('/conversations/generate', { scenario, classLevel });
  return res.data.data;
};

// Homework
export const generateHomework = async (classLevel: string | number, topic: string, count = 5, learnerId = 'default') => {
  const res = await api.post('/homework/generate', { classLevel, topic, count, learnerId });
  return res.data.data;
};

export const evaluateHomework = async (assignmentId: string, answers: Record<string, string>, learnerId = 'default') => {
  const res = await api.post('/homework/evaluate', { assignmentId, answers, learnerId });
  return res.data.data;
};

export const getHomeworkList = async (learnerId = 'default') => {
  const res = await api.get('/homework', { params: { learnerId } });
  return res.data.data;
};

// Reading
export const generateReadingPassage = async (topic: string, classLevel: string | number = 'beginner') => {
  const res = await api.post('/reading/generate', { topic, classLevel });
  return res.data.data;
};

// Grammar AI Generator
export const generateGrammarLesson = async (topic: string, classLevel: string | number = 'beginner') => {
  const res = await api.post('/grammar/generate', { topic, classLevel });
  return res.data.data;
};

// Kannada Foundations (18 Sections)
export const getFoundations = async () => {
  const res = await api.get('/foundations');
  return res.data.data;
};

export const getFoundationSection = async (idOrNumber: string | number) => {
  const res = await api.get(`/foundations/section/${idOrNumber}`);
  return res.data.data;
};

export const getKagunitaChart = async (consonant?: string) => {
  const res = await api.get('/foundations/kagunita', { params: consonant ? { consonant } : undefined });
  return res.data.data;
};

export const getVarnamale = async () => {
  const res = await api.get('/foundations/varnamale');
  return res.data.data;
};

export const getKannadaNumbers = async (range?: string) => {
  const res = await api.get('/foundations/numbers', { params: range ? { range } : undefined });
  return res.data.data;
};

export const getSchoolClasses = async () => {
  const res = await api.get('/curriculum/school-classes');
  return res.data.data;
};
