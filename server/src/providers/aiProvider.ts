// AI Provider Interface — swap Gemini for any other provider without changing controllers

export interface AIProvider {
  name: string;
  isAvailable(): boolean;
  translate(params: {
    text: string;
    direction: 'en-kn' | 'kn-en';
    context: string;
    includeTransliteration?: boolean;
    includeAlternatives?: boolean;
  }): Promise<AITranslationResult>;

  generateQuiz(params: {
    classLevel: string;
    topic: string;
    difficulty: string;
    count: number;
    questionTypes?: string[];
    direction?: string;
    batchNumber?: number;
    excludeQuestions?: string[];
  }): Promise<AIQuizResult>;

  generateVocabulary(params: {
    classLevel: string;
    topic: string;
    count: number;
    excludeWords?: string[];
    batchNumber?: number;
  }): Promise<AIVocabularyResult>;

  explainWord(params: {
    word: string;
    language: 'english' | 'kannada';
    context?: string;
  }): Promise<AIWordExplanation>;

  generateConversation(params: {
    scenario: string;
    classLevel: string;
  }): Promise<AIConversationResult>;

  evaluateHomework(params: {
    question: string;
    answer: string;
    topic: string;
  }): Promise<AIEvaluationResult>;

  lookupDictionary(params: {
    query: string;
    direction?: 'en-kn' | 'kn-en' | 'both';
  }): Promise<AIDictionaryLookupResult>;

  generateReadingPassage(params: {
    topic: string;
    classLevel: string;
    difficulty?: string;
  }): Promise<AIReadingPassageResult>;

  generateGrammarLesson(params: {
    topic: string;
    classLevel: string;
  }): Promise<AIGrammarLessonResult>;

  generateCurriculumUnits(params: {
    classLevel: string;
    customFocus?: string;
  }): Promise<any[]>;

  teachLesson(params: {
    lesson: any;
    mode: 'complete' | 'continue';
    sectionIndex?: number;
    explanationLanguage?: string;
    learnerHistory?: any;
  }): Promise<any>;
}

export interface AIGrammarLessonResult {
  topicTitle: string;
  topicTitleKn: string;
  conceptSummary: string;
  sections: {
    heading: string;
    description: string;
    rules?: string[];
    examples: {
      kannada: string;
      transliteration: string;
      english: string;
      breakdown?: string;
    }[];
  }[];
  exercises: {
    prompt: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
}

export interface AIReadingPassageResult {
  title: string;
  titleKn: string;
  classLevel: string;
  passageKn: string;
  transliteration: string;
  englishTranslation: string;
  vocabulary: {
    kannada: string;
    transliteration: string;
    english: string;
  }[];
  questions: {
    prompt: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
}

export interface AIDictionaryLookupResult {
  entry: {
    id: string;
    english: string;
    kannada: string;
    transliteration: string;
    partOfSpeech: string;
    meaning: string;
    meaningKn: string;
    topic: string;
    classLevel: string;
    difficulty: 'easy' | 'medium' | 'hard';
    formal: boolean;
    examples: {
      kannada: string;
      transliteration: string;
      english: string;
    }[];
    related?: string[];
    source: 'ai-generated';
  };
}

export interface AITranslationResult {
  translated: string;
  transliteration?: string;
  alternatives?: string[];
  wordByWord?: { word: string; meaning: string }[];
  warning?: string;
}

export interface AIQuizQuestion {
  id: string;
  type: string;
  classLevel: string;
  topic: string;
  difficulty: string;
  prompt: string;
  options?: string[];
  answer: string;
  explanation: string;
  source: 'ai-generated';
}

export interface AIQuizResult {
  questions: AIQuizQuestion[];
}

export interface AIVocabularyItem {
  id: string;
  english: string;
  kannada: string;
  transliteration: string;
  partOfSpeech?: string;
  meaning: string;
  example?: {
    kannada: string;
    transliteration: string;
    english: string;
  };
  topic: string;
  classLevel: string;
  difficulty: string;
}

export interface AIVocabularyResult {
  items: AIVocabularyItem[];
}

export interface AIWordExplanation {
  original: string;
  equivalent: string;
  meaning: string;
  transliteration?: string;
  simpleExplanation: string;
  example: {
    kannada: string;
    transliteration: string;
    english: string;
  };
  usageContext: string;
  relatedWords?: string[];
  difficulty: string;
  memoryTip: string;
  practiceQuestions?: string[];
}

export interface AIConversationResult {
  vocabulary: AIVocabularyItem[];
  dialogue: {
    speaker: 'A' | 'B';
    speakerLabel: string;
    kannada: string;
    transliteration: string;
    english: string;
  }[];
}

export interface AIEvaluationResult {
  isCorrect: boolean;
  score: number;
  feedback: string;
  correctAnswer?: string;
}
