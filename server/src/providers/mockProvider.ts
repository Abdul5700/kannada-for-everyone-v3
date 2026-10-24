// Mock AI Provider — returns deterministic, clearly labeled demo responses
// Used when AI_PROVIDER=mock (default) or when Gemini is not configured
// NEVER pretends to be live Gemini

import crypto from 'crypto';
import type {
  AIProvider,
  AITranslationResult,
  AIQuizResult,
  AIVocabularyResult,
  AIWordExplanation,
  AIConversationResult,
  AIEvaluationResult,
} from './aiProvider';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const SAMPLE_WORDS = [
  { en: 'water', kn: 'ನೀರು', tr: 'neeru', pos: 'noun', meaning: 'liquid for drinking' },
  { en: 'school', kn: 'ಶಾಲೆ', tr: 'shaale', pos: 'noun', meaning: 'place of learning' },
  { en: 'mother', kn: 'ತಾಯಿ', tr: 'taayi', pos: 'noun', meaning: 'female parent' },
  { en: 'good', kn: 'ಒಳ್ಳೆಯ', tr: 'olleya', pos: 'adjective', meaning: 'of high quality' },
  { en: 'come', kn: 'ಬಾ', tr: 'baa', pos: 'verb', meaning: 'move toward speaker' },
];

export class MockAIProvider implements AIProvider {
  name = 'mock';

  isAvailable(): boolean {
    return true;
  }

  async translate(params: {
    text: string;
    direction: 'en-kn' | 'kn-en';
    context: string;
    includeTransliteration?: boolean;
  }): Promise<AITranslationResult> {
    const isEnToKn = params.direction === 'en-kn';
    return {
      translated: isEnToKn
        ? `[MOCK] ಇದು "${params.text}" ಯ ಕನ್ನಡ ಅನುವಾದ.`
        : `[MOCK] This is a Kannada-to-English translation of: "${params.text}"`,
      transliteration: params.includeTransliteration
        ? `[MOCK transliteration of: ${params.text}]`
        : undefined,
      alternatives: [`[MOCK alt 1]`, `[MOCK alt 2]`],
      warning:
        '⚠️ This is a mock response. Configure GEMINI_API_KEY and set AI_PROVIDER=gemini for real translations.',
    };
  }

  async generateQuiz(params: {
    classLevel: string;
    topic: string;
    difficulty: string;
    count: number;
    batchNumber?: number;
    excludeQuestions?: string[];
  }): Promise<AIQuizResult> {
    const offset = ((params.batchNumber || 1) - 1) * params.count;
    const questions = Array.from({ length: Math.min(params.count, 5) }, (_, i) => {
      const idx = (offset + i) % SAMPLE_WORDS.length;
      return {
        id: uid(),
        type: 'multiple-choice' as const,
        classLevel: params.classLevel,
        topic: params.topic,
        difficulty: params.difficulty,
        prompt: `[MOCK Q${offset + i + 1}] What is the Kannada word for "${SAMPLE_WORDS[idx].en}"?`,
        options: [
          SAMPLE_WORDS[idx].kn,
          SAMPLE_WORDS[(idx + 1) % SAMPLE_WORDS.length].kn,
          SAMPLE_WORDS[(idx + 2) % SAMPLE_WORDS.length].kn,
          SAMPLE_WORDS[(idx + 3) % SAMPLE_WORDS.length].kn,
        ],
        answer: SAMPLE_WORDS[idx].kn,
        explanation: `[MOCK] "${SAMPLE_WORDS[idx].en}" means ${SAMPLE_WORDS[idx].kn} (${SAMPLE_WORDS[idx].tr}).`,
        source: 'ai-generated' as const,
      };
    });
    return { questions };
  }

  async generateVocabulary(params: {
    classLevel: string;
    topic: string;
    count: number;
    excludeWords?: string[];
    batchNumber?: number;
  }): Promise<AIVocabularyResult> {
    const items = Array.from({ length: Math.min(params.count, 5) }, (_, i) => {
      const w = SAMPLE_WORDS[i % SAMPLE_WORDS.length];
      return {
        id: uid(),
        english: w.en,
        kannada: w.kn,
        transliteration: w.tr,
        partOfSpeech: w.pos,
        meaning: w.meaning,
        example: {
          kannada: `${w.kn} ಬೇಕು.`,
          transliteration: `${w.tr} beeku.`,
          english: `I need ${w.en}.`,
        },
        topic: params.topic,
        classLevel: params.classLevel,
        difficulty: 'easy',
      };
    });
    return { items };
  }

  async explainWord(params: { word: string; language: 'english' | 'kannada' }): Promise<AIWordExplanation> {
    const isKannada = params.language === 'kannada';
    return {
      original: params.word,
      equivalent: isKannada ? `[MOCK English for ${params.word}]` : `[MOCK ಕನ್ನಡ for ${params.word}]`,
      meaning: `[MOCK] Definition of "${params.word}".`,
      transliteration: isKannada ? `[mock-tr]` : undefined,
      simpleExplanation: `[MOCK] Simple explanation for "${params.word}". Configure Gemini for real explanations.`,
      example: {
        kannada: `[MOCK] ${params.word} ಅನ್ನು ಇಲ್ಲಿ ಬಳಸಲಾಗಿದೆ.`,
        transliteration: `[MOCK example transliteration]`,
        english: `[MOCK] "${params.word}" is used here.`,
      },
      usageContext: `Everyday conversation`,
      relatedWords: ['[MOCK word 1]', '[MOCK word 2]'],
      difficulty: 'easy',
      memoryTip: `[MOCK] Remember "${params.word}" by associating it with a vivid image.`,
      practiceQuestions: [
        `Use "${params.word}" in a sentence.`,
        `What is the opposite of "${params.word}"?`,
      ],
    };
  }

  async generateConversation(params: {
    scenario: string;
    classLevel: string;
  }): Promise<AIConversationResult> {
    return {
      vocabulary: SAMPLE_WORDS.slice(0, 3).map((w, i) => ({
        id: uid(),
        english: w.en,
        kannada: w.kn,
        transliteration: w.tr,
        meaning: w.meaning,
        topic: params.scenario,
        classLevel: params.classLevel,
        difficulty: 'easy',
      })),
      dialogue: [
        {
          speaker: 'A',
          speakerLabel: 'Person A',
          kannada: '[MOCK] ನಮಸ್ಕಾರ!',
          transliteration: 'Namaskara!',
          english: '[MOCK] Hello!',
        },
        {
          speaker: 'B',
          speakerLabel: 'Person B',
          kannada: '[MOCK] ನಮಸ್ಕಾರ! ಹೇಗಿದ್ದೀರಿ?',
          transliteration: 'Namaskara! Hegiddiri?',
          english: '[MOCK] Hello! How are you?',
        },
      ],
    };
  }

  async evaluateHomework(params: {
    question: string;
    answer: string;
  }): Promise<AIEvaluationResult> {
    return {
      isCorrect: false,
      score: 0,
      feedback: `[MOCK] Your answer has been noted. Configure Gemini AI to get real feedback on open-ended answers.`,
      correctAnswer: '[MOCK] See the provided answer key.',
    };
  }

  async lookupDictionary(params: {
    query: string;
    direction?: 'en-kn' | 'kn-en' | 'both';
  }): Promise<any> {
    const q = params.query;
    return {
      entry: {
        id: `mock_${Date.now()}`,
        english: q,
        kannada: `[ಕನ್ನಡ: ${q}]`,
        transliteration: `[${q}]`,
        partOfSpeech: 'noun',
        meaning: `Definition for "${q}". Connect Gemini for full contextual definitions.`,
        meaningKn: `"${q}" ಪದದ ವಿವರಣೆ.`,
        topic: 'general',
        classLevel: 'beginner',
        difficulty: 'easy',
        formal: false,
        examples: [
          {
            kannada: `ಇದು ${q} ವಾಕ್ಯ.`,
            transliteration: `Idu ${q} vaakya.`,
            english: `This is a sentence with ${q}.`,
          },
        ],
        source: 'ai-generated',
      },
    };
  }

  async generateReadingPassage(params: {
    topic: string;
    classLevel: string;
    difficulty?: string;
  }): Promise<any> {
    return {
      title: `Story about ${params.topic}`,
      titleKn: `${params.topic} ಕುರಿತ ಕಥೆ`,
      classLevel: params.classLevel,
      passageKn: `ಇದು ${params.topic} ಕುರಿತಾದ ಒಂದು ಸರಳ ಪಠ್ಯ. ಮಕ್ಕಳು ಇದನ್ನು ಓದಿ ಕನ್ನಡ ಕಲಿಯಬಹುದು. ನಮ್ಮ ನಾಡು ನುಡಿ ಶ್ರೇಷ್ಠವಾದುದು.`,
      transliteration: `Idu ${params.topic} kurithaada ondu sarala paatya. Makkalu idannu odi Kannada kaliyabahudu. Namma naadu nudi shreshthavaadudu.`,
      englishTranslation: `This is a simple text about ${params.topic}. Children can read this and learn Kannada. Our land and language are great.`,
      vocabulary: [
        { kannada: 'ನಾಡು (Naadu)', transliteration: 'Naadu', english: 'Land / Country' },
        { kannada: 'ನುಡಿ (Nudi)', transliteration: 'Nudi', english: 'Speech / Language' },
      ],
      questions: [
        {
          prompt: `What is the passage about?`,
          options: [params.topic, 'Math', 'Science', 'Travel'],
          answer: params.topic,
          explanation: `The passage is about ${params.topic}.`,
        },
      ],
    };
  }

  async generateGrammarLesson(params: {
    topic: string;
    classLevel: string;
  }): Promise<any> {
    return {
      topicTitle: `Grammar Lesson on ${params.topic}`,
      topicTitleKn: `${params.topic} ವ್ಯಾಕರಣ ಪಾಠ`,
      conceptSummary: `Understanding ${params.topic} in Kannada language structure.`,
      sections: [
        {
          heading: `Basic Rules of ${params.topic}`,
          description: `Learn how ${params.topic} functions in everyday speech.`,
          rules: ['Rule 1: Word endings alter meaning.', 'Rule 2: Match subject gender/plurality.'],
          examples: [
            {
              kannada: 'ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ.',
              transliteration: 'Naanu shaalege hooguttene.',
              english: 'I go to school.',
              breakdown: 'Naanu (I) + Shaale-ge (to school) + hooguttene (go)',
            },
          ],
        },
      ],
      exercises: [
        {
          prompt: 'Which suffix marks "to the house"?',
          options: ['ಮನೆಗೆ (Manege)', 'ಮನೆಯಲ್ಲಿ (Maneyalli)', 'ಮನೆಯಿಂದ (Maneyinda)', 'ಮನೆಯ (Maneya)'],
          answer: 'ಮನೆಗೆ (Manege)',
          explanation: 'The suffix -ge represents "to".',
        },
      ],
    };
  }

  async generateCurriculumUnits(params: {
    classLevel: string;
    customFocus?: string;
  }): Promise<any[]> {
    return [
      {
        id: `unit-mock-${Date.now()}`,
        classLevel: params.classLevel,
        unitNumber: 1,
        title: `Dynamic Curriculum: Class ${params.classLevel}`,
        titleKn: `ತರಗತಿ ${params.classLevel} ಪಠ್ಯಕ್ರಮ`,
        description: `AI-structured units for Class ${params.classLevel}`,
        category: 'vocabulary',
        estimatedMinutes: 30,
        lessons: [
          {
            id: `lesson-mock-${Date.now()}`,
            unitId: `unit-mock-${Date.now()}`,
            classLevel: params.classLevel,
            title: `Introduction to Level ${params.classLevel}`,
            titleKn: `ಹಂತ ${params.classLevel} ರ ಪರಿಚಯ`,
            category: 'vocabulary',
            objectives: ['Master basic concepts for this grade'],
            content: {
              explanation: 'Fundamental concepts for Class ' + params.classLevel,
              sections: [
                {
                  heading: 'Overview',
                  body: 'Essential Kannada structures and vocabulary for this grade.',
                  examples: [
                    { kannada: 'ನಮಸ್ಕಾರ', transliteration: 'Namaskara', english: 'Hello' }
                  ]
                }
              ],
              vocabulary: [],
              grammarNotes: ['Key practice notes']
            },
            exercises: [
              {
                id: 'ex-1',
                type: 'multiple-choice',
                prompt: 'What does "ನಮಸ್ಕಾರ" mean?',
                options: ['Hello', 'Water', 'Tree', 'Book'],
                answer: 'Hello',
                explanation: 'Namaskara means Hello in Kannada.'
              }
            ],
            estimatedMinutes: 15,
            order: 1
          }
        ]
      }
    ];
  }

  async teachLesson(params: {
    lesson: any;
    mode: 'complete' | 'continue';
    sectionIndex?: number;
    explanationLanguage?: string;
    learnerHistory?: any;
  }): Promise<any> {
    const { lesson, mode } = params;
    return {
      title: lesson.title,
      titleKn: lesson.titleKn,
      classLevel: lesson.classLevel,
      category: lesson.category,
      unitTitle: lesson.unitTitle,
      prerequisites: 'Basic familiarity with Kannada script and greetings.',
      explanation: `[Detailed Teacher Guide] In this lesson on ${lesson.title}, students delve deep into structure, pronunciation, and meaning.`,
      objectives: lesson.objectives || ['Master core concepts', 'Apply words in conversation'],
      sections: (lesson.content?.sections || [
        {
          heading: 'Core Conceptual Foundations',
          body: 'Detailed breakdown of the fundamental grammar and linguistic mechanisms in this lesson.',
          rules: ['Rule 1: Maintain subject-predicate harmony', 'Rule 2: Observe vowel elongation in spoken Kannada'],
          examples: [
            {
              kannada: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.',
              transliteration: 'Naanu Kannada kaliyuttiddene.',
              english: 'I am learning Kannada.',
              breakdown: 'Naanu (I) + Kannada + kali (learn) + uttiddene (am currently doing)',
            },
          ],
          commonMistakes: [
            {
              incorrect: 'ನಾನು ಹೋಗುತ್ತಾರೆ',
              correct: 'ನಾನು ಹೋಗುತ್ತೇನೆ',
              explanation: 'First-person singular takes -eene suffix.',
            },
          ],
        },
      ]),
      vocabulary: lesson.content?.vocabulary || [],
      sentenceBreakdowns: [
        {
          kannada: 'ಕನ್ನಡ ನಾಡು ಸುಂದರವಾಗಿದೆ.',
          transliteration: 'Kannada naadu sundaravaagide.',
          english: 'The land of Karnataka is beautiful.',
          analysis: 'Kannada + naadu (land) + sundara (beautiful) + aagide (is).',
        },
      ],
      grammarNotes: lesson.content?.grammarNotes || ['Pay attention to root suffixes.'],
      recap: `In summary, this lesson covered the essential mechanisms of ${lesson.title} with practical examples.`,
      exercises: lesson.exercises || [],
    };
  }
}
