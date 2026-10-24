export type ClassLevel = 'beginner' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ProficiencyLevel = 'none' | 'basic' | 'intermediate' | 'advanced';
export type ExplanationLanguage = 'english' | 'kannada';

export interface LearnerProfile {
  id: string;
  name?: string;
  classLevel: ClassLevel;
  proficiency: ProficiencyLevel;
  explanationLanguage: ExplanationLanguage;
  dailyGoalMinutes: number;
  preferredCategories: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DictionaryEntry {
  id: string;
  english: string;
  kannada: string;
  transliteration: string;
  partOfSpeech: string;
  meaning: string;
  meaningKn: string;
  topic: string;
  classLevel: string | number;
  difficulty: 'easy' | 'medium' | 'hard';
  formal: boolean;
  examples: {
    kannada: string;
    transliteration: string;
    english: string;
  }[];
  source: 'curated' | 'ai-generated';
  related?: string[];
}

export interface VocabularyItem {
  id: string;
  english: string;
  kannada: string;
  transliteration: string;
  partOfSpeech?: string;
  meaning: string;
  topic: string;
  classLevel: string | number;
  difficulty: 'easy' | 'medium' | 'hard';
  example?: {
    kannada: string;
    transliteration: string;
    english: string;
  };
}

export interface QuizQuestion {
  id: string;
  type: string;
  classLevel: string | number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  options?: string[];
  answer: string;
  explanation: string;
  source: 'local' | 'ai-generated';
}

export interface QuizSession {
  id: string;
  learnerId: string;
  config: any;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  score?: number;
  totalQuestions: number;
  startedAt: string;
  completedAt?: string;
  status: 'active' | 'completed';
}

export interface TranslationResult {
  original: string;
  translated: string;
  transliteration?: string;
  direction: 'en-kn' | 'kn-en';
  context: string;
  source: 'mock' | 'gemini';
  alternatives?: string[];
  wordByWord?: { word: string; meaning: string }[];
  warning?: string;
}

export interface ActivityRecord {
  id: string;
  learnerId: string;
  type: 'lesson' | 'quiz' | 'vocabulary' | 'translation' | 'conversation' | 'revision';
  referenceId: string;
  metadata?: any;
  timestamp: string;
}

export interface LearnerStats {
  learnerId: string;
  lessonsCompleted: number;
  vocabularyLearned: number;
  quizAttempts: number;
  quizCorrect: number;
  totalPoints: number;
  streakDays: number;
  lastActiveDate: string | null;
  weakTopics: string[];
  strongTopics: string[];
}

export interface ConversationLine {
  speaker: 'A' | 'B';
  speakerLabel: string;
  kannada: string;
  transliteration: string;
  english: string;
}
