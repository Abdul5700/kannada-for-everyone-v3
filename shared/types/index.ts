// Shared TypeScript types for Kannada for Everyone v3.0
// Used by both client and server

// ─── Learner / Profile ───────────────────────────────────────────────────────

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
  createdAt: string;
  updatedAt: string;
}

export interface LearnerStats {
  learnerId: string;
  lessonsCompleted: number;
  vocabularyLearned: number;
  quizAttempts: number;
  quizAccuracy: number;
  totalPoints: number;
  streakDays: number;
  lastActiveDate: string;
  weakTopics: string[];
  strongTopics: string[];
}

// ─── Curriculum ───────────────────────────────────────────────────────────────

export interface CurriculumUnit {
  id: string;
  classLevel: ClassLevel;
  unitNumber: number;
  title: string;
  titleKn: string;
  description: string;
  category: LessonCategory;
  estimatedMinutes: number;
  lessons: Lesson[];
}

export type LessonCategory =
  | 'alphabet'
  | 'vocabulary'
  | 'grammar'
  | 'reading'
  | 'writing'
  | 'listening'
  | 'speaking'
  | 'conversation'
  | 'comprehension'
  | 'assessment';

export interface Lesson {
  id: string;
  unitId: string;
  classLevel: ClassLevel;
  title: string;
  titleKn: string;
  category: LessonCategory;
  objectives: string[];
  content: LessonContent;
  exercises: Exercise[];
  estimatedMinutes: number;
  order: number;
}

export interface LessonContent {
  explanation: string;
  explanationKn?: string;
  sections: ContentSection[];
  vocabulary: VocabularyItem[];
  grammarNotes?: string[];
}

export interface ContentSection {
  heading: string;
  body: string;
  examples: KannadaExample[];
}

export interface KannadaExample {
  kannada: string;
  transliteration: string;
  english: string;
  audio?: boolean;
}

export interface Exercise {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  answer: string;
  explanation: string;
}

// ─── Dictionary ───────────────────────────────────────────────────────────────

export interface DictionaryEntry {
  id: string;
  english: string;
  kannada: string;
  transliteration: string;
  partOfSpeech: string;
  meaning: string;
  meaningKn: string;
  examples: KannadaExample[];
  topic: string;
  classLevel: ClassLevel;
  difficulty: 'easy' | 'medium' | 'hard';
  formal: boolean;
  related?: string[];
  source: 'curated' | 'ai-generated';
}

export interface WordStatus {
  wordId: string;
  status: 'learning' | 'learned' | 'revision';
  savedAt: string;
  nextReview?: string;
  reviewCount: number;
}

// ─── Translation ──────────────────────────────────────────────────────────────

export type TranslationDirection = 'en-kn' | 'kn-en';
export type TranslationContext =
  | 'general'
  | 'conversation'
  | 'education'
  | 'travel'
  | 'shopping'
  | 'healthcare'
  | 'transport'
  | 'workplace'
  | 'government'
  | 'formal';

export interface TranslationRequest {
  text: string;
  direction: TranslationDirection;
  context: TranslationContext;
  includeTransliteration?: boolean;
  includeAlternatives?: boolean;
}

export interface TranslationResult {
  original: string;
  translated: string;
  transliteration?: string;
  direction: TranslationDirection;
  context: TranslationContext;
  source: 'dictionary' | 'gemini' | 'mock';
  alternatives?: string[];
  wordByWord?: { word: string; meaning: string }[];
  warning?: string;
}

// ─── Vocabulary ───────────────────────────────────────────────────────────────

export interface VocabularyItem {
  id: string;
  english: string;
  kannada: string;
  transliteration: string;
  partOfSpeech?: string;
  meaning: string;
  example?: KannadaExample;
  topic: string;
  classLevel: ClassLevel;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface VocabularyBatch {
  topic: string;
  classLevel: ClassLevel;
  items: VocabularyItem[];
  source: 'local' | 'ai-generated';
  generatedAt: string;
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export type QuestionType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'translation'
  | 'match-meaning'
  | 'sentence-order'
  | 'grammar-correction'
  | 'comprehension'
  | 'vocabulary-recall';

export interface QuizConfig {
  classLevel: ClassLevel;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
  direction?: TranslationDirection;
  includeSaved?: boolean;
  questionTypes?: QuestionType[];
  mode: 'practice' | 'exam';
  timed?: boolean;
  timeLimitSeconds?: number;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  classLevel: ClassLevel;
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
  config: QuizConfig;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  score?: number;
  totalQuestions: number;
  startedAt: string;
  completedAt?: string;
  status: 'active' | 'completed' | 'abandoned';
}

export interface QuizAttempt {
  id: string;
  sessionId: string;
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  topic: string;
  answeredAt: string;
}

// ─── Conversations ────────────────────────────────────────────────────────────

export type ConversationScenario =
  | 'self-introduction'
  | 'at-school'
  | 'with-classmates'
  | 'shopping'
  | 'directions'
  | 'transport'
  | 'hospital'
  | 'restaurant'
  | 'government-office'
  | 'workplace'
  | 'emergency';

export interface ConversationLine {
  speaker: 'A' | 'B';
  speakerLabel: string;
  kannada: string;
  transliteration: string;
  english: string;
  audio?: boolean;
}

export interface ConversationScenarioData {
  id: string;
  scenario: ConversationScenario;
  title: string;
  titleKn: string;
  description: string;
  classLevel: ClassLevel;
  vocabulary: VocabularyItem[];
  dialogue: ConversationLine[];
  exercises: Exercise[];
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface ActivityRecord {
  id: string;
  learnerId: string;
  type: 'lesson' | 'quiz' | 'vocabulary' | 'translation' | 'conversation' | 'revision';
  referenceId: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface ProgressSummary {
  learnerId: string;
  period: 'today' | 'week' | 'month' | 'all';
  lessonsCompleted: number;
  vocabularyPracticed: number;
  quizzesTaken: number;
  quizAccuracy: number;
  minutesStudied: number;
  streakDays: number;
  weakTopics: string[];
  topicsStudied: string[];
  weeklyData: { day: string; minutes: number; score: number }[];
}

// ─── Homework / Exam ──────────────────────────────────────────────────────────

export interface HomeworkAssignment {
  id: string;
  classLevel: ClassLevel;
  topic: string;
  title: string;
  questions: QuizQuestion[];
  dueDate?: string;
  generatedAt: string;
  source: 'local' | 'ai-generated';
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  answers: Record<string, string>;
  score: number;
  feedback: Record<string, string>;
  submittedAt: string;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
