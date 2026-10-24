import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import type {
  AIProvider,
  AITranslationResult,
  AIQuizResult,
  AIVocabularyResult,
  AIWordExplanation,
  AIConversationResult,
  AIEvaluationResult,
  AIQuizQuestion,
  AIVocabularyItem,
} from './aiProvider';

function safeJson<T>(text: string): T | null {
  try {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}

export class GeminiProvider implements AIProvider {
  name = 'gemini';
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    this.modelName = config.geminiModel;
  }

  isAvailable(): boolean {
    return config.geminiApiKey.length > 10;
  }

  private async ask(prompt: string, maxOutputTokens?: number): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: maxOutputTokens ? { maxOutputTokens } : undefined,
      });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes('404') || msg.includes('not found') || msg.includes('no longer available')) {
        throw new Error(`Configured Gemini model "${this.modelName}" is not available or deprecated. Update GEMINI_MODEL (e.g. gemini-3.1-flash-lite).`);
      }
      if (msg.includes('401') || msg.includes('API key') || msg.includes('unauthenticated')) {
        throw new Error('Gemini API key is invalid or unauthorized.');
      }
      if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
        throw new Error('Gemini API quota exceeded or rate limit hit. Please retry shortly.');
      }
      if (msg.includes('503') || msg.includes('high demand') || msg.includes('unavailable')) {
        throw new Error('Gemini service is temporarily experiencing high demand. Please try again shortly.');
      }
      throw new Error(`Gemini request failed: ${msg.slice(0, 150)}`);
    }
  }

  async translate(params: {
    text: string;
    direction: 'en-kn' | 'kn-en';
    context: string;
    includeTransliteration?: boolean;
    includeAlternatives?: boolean;
  }): Promise<AITranslationResult> {
    const [srcLang, tgtLang] = params.direction === 'en-kn'
      ? ['English', 'Kannada'] : ['Kannada', 'English'];
    const prompt = `Translate the following ${srcLang} text to ${tgtLang}.
Context: ${params.context}.
Return ONLY valid JSON in this exact shape:
{
  "translated": "<translated text>",
  "transliteration": "<romanized pronunciation, if target is Kannada, else omit>",
  "alternatives": ["<alt1>","<alt2>"],
  "wordByWord": [{"word":"<src word>","meaning":"<tgt meaning>"}]
}
Text to translate: """${params.text.slice(0, 2000)}"""`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<AITranslationResult>(raw);
    if (!parsed?.translated) throw new Error('Gemini returned an unparseable translation.');
    return {
      translated: parsed.translated,
      transliteration: params.includeTransliteration ? parsed.transliteration : undefined,
      alternatives: params.includeAlternatives ? parsed.alternatives : undefined,
      wordByWord: parsed.wordByWord,
    };
  }

  async generateQuiz(params: {
    classLevel: string;
    topic: string;
    difficulty: string;
    count: number;
    questionTypes?: string[];
    direction?: string;
    batchNumber?: number;
    excludeQuestions?: string[];
  }): Promise<AIQuizResult> {
    const excludeClause = params.excludeQuestions?.length
      ? `\nCRITICAL: DO NOT repeat or duplicate any of these previously asked questions:\n${params.excludeQuestions.slice(-15).map(q => `- "${q}"`).join('\n')}\n`
      : '';
    const batchSeed = params.batchNumber ? `Batch: #${params.batchNumber}. Ensure completely FRESH, DISTINCT questions.` : `Timestamp seed: ${Date.now()}`;

    const prompt = `Act as an expert Kannada examiner. Generate ${params.count} unique, high-quality Kannada language quiz questions.
Class level: ${params.classLevel}
Topic: ${params.topic}
Difficulty: ${params.difficulty}
Question types: ${(params.questionTypes || ['multiple-choice']).join(', ')}
Direction: ${params.direction || 'en-kn'}
${batchSeed}
${excludeClause}
Return ONLY valid JSON: { "questions": [ { "id":"<uuid>", "type":"multiple-choice", "classLevel":"${params.classLevel}", "topic":"${params.topic}", "difficulty":"${params.difficulty}", "prompt":"<clear unique question in Kannada or English>", "options":["<a>","<b>","<c>","<d>"], "answer":"<exact matching correct option>", "explanation":"<clear explanation why this is correct>", "source":"ai-generated" } ] }
Make every question completely unique and different from earlier batches. The correct answer MUST be present verbatim in the options array.`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<{ questions: AIQuizQuestion[] }>(raw);
    if (!parsed?.questions?.length) throw new Error('Gemini returned invalid quiz data.');
    return { questions: parsed.questions.slice(0, params.count) };
  }

  async generateVocabulary(params: {
    classLevel: string;
    topic: string;
    count: number;
    excludeWords?: string[];
    batchNumber?: number;
  }): Promise<AIVocabularyResult> {
    const excludeClause = params.excludeWords?.length
      ? `\nCRITICAL: DO NOT repeat or duplicate any of these previously generated words:\n${params.excludeWords.slice(-30).map(w => `- "${w}"`).join('\n')}\nGenerate completely fresh and different words on this topic.\n`
      : '';
    const batchSeed = params.batchNumber ? `Batch #${params.batchNumber} (Seed: ${Date.now()})` : `Seed: ${Date.now()}`;

    const prompt = `Act as an expert Kannada lexicographer and vocabulary educator.
Generate ${params.count} completely unique, brand new Kannada vocabulary words for topic: "${params.topic}", class level: ${params.classLevel}.
${batchSeed}
${excludeClause}
Explore diverse, realistic words (e.g. including common, intermediate, practical colloquial and formal terms related to the theme).
Return ONLY valid JSON:
{
  "items": [
    {
      "id": "vocab_${Date.now()}_<random_suffix>",
      "english": "<English word>",
      "kannada": "<Accurate Kannada script word, e.g. ಈರುಳ್ಳಿ, ಶುಂಠಿ, ಏಲಕ್ಕಿ>",
      "transliteration": "<Accurate Latin phonetic romanization, e.g. eerulli, shunti, elakki>",
      "partOfSpeech": "<noun|verb|adjective|adverb>",
      "meaning": "<Clear English definition/meaning>",
      "example": {
        "kannada": "<Natural short example sentence in Kannada script>",
        "transliteration": "<Phonetic romanization of the sentence>",
        "english": "<Accurate English translation>"
      },
      "topic": "${params.topic}",
      "classLevel": "${params.classLevel}",
      "difficulty": "easy|medium|hard"
    }
  ]
}
Ensure every item is distinct and accurate in Kannada script and grammar.`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<{ items: AIVocabularyItem[] }>(raw);
    if (!parsed?.items?.length) throw new Error('Gemini returned invalid vocabulary data.');
    return { items: parsed.items.slice(0, params.count) };
  }

  async explainWord(params: {
    word: string;
    language: 'english' | 'kannada';
    context?: string;
  }): Promise<AIWordExplanation> {
    const otherLang = params.language === 'english' ? 'Kannada' : 'English';
    const prompt = `Explain the ${params.language} word/phrase: "${params.word}"
Return ONLY valid JSON:
{
  "original": "${params.word}",
  "equivalent": "<${otherLang} equivalent>",
  "meaning": "<clear meaning>",
  "transliteration": "<if Kannada word, add romanization>",
  "simpleExplanation": "<2-3 sentence plain explanation>",
  "example": {"kannada":"<example sentence>","transliteration":"<romanized>","english":"<translation>"},
  "usageContext": "<when to use it>",
  "relatedWords": ["<word1>","<word2>","<word3>"],
  "difficulty": "easy|medium|hard",
  "memoryTip": "<short memorable tip>",
  "practiceQuestions": ["<q1>","<q2>"]
}`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<AIWordExplanation>(raw);
    if (!parsed?.original) throw new Error('Gemini returned invalid word explanation.');
    return parsed;
  }

  async generateConversation(params: {
    scenario: string;
    classLevel: string;
  }): Promise<AIConversationResult> {
    const prompt = `Create a Kannada conversation for scenario: "${params.scenario}", class level ${params.classLevel}.
Return ONLY valid JSON:
{
  "vocabulary": [{"id":"<id>","english":"<w>","kannada":"<ಕ>","transliteration":"<r>","meaning":"<m>","topic":"${params.scenario}","classLevel":"${params.classLevel}","difficulty":"easy"}],
  "dialogue": [{"speaker":"A","speakerLabel":"Person A","kannada":"<line>","transliteration":"<r>","english":"<tr>"}]
}
Include 4-8 vocabulary words and 6-10 dialogue lines.`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<AIConversationResult>(raw);
    if (!parsed?.dialogue?.length) throw new Error('Gemini returned invalid conversation data.');
    return parsed;
  }

  async evaluateHomework(params: {
    question: string;
    answer: string;
    topic: string;
  }): Promise<AIEvaluationResult> {
    const prompt = `Evaluate this Kannada homework answer.
Question: ${params.question}
Student answer: ${params.answer}
Topic: ${params.topic}
Return ONLY valid JSON: {"isCorrect":true|false,"score":0-100,"feedback":"<detailed feedback>","correctAnswer":"<correct if wrong>"}`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<AIEvaluationResult>(raw);
    if (parsed === null) throw new Error('Gemini returned invalid evaluation.');
    return parsed;
  }

  async lookupDictionary(params: {
    query: string;
    direction?: 'en-kn' | 'kn-en' | 'both';
  }): Promise<{ entry: any }> {
    const prompt = `Act as an authoritative bilingual English-Kannada dictionary lexicographer.
Provide a complete dictionary entry for the search term: "${params.query}".
Return ONLY valid JSON matching this exact structure:
{
  "entry": {
    "id": "ai_${Date.now()}",
    "english": "<English word or expression>",
    "kannada": "<Accurate Kannada script word, e.g. ಶಾಲೆ, ನೀರು, ನಮಸ್ಕಾರ>",
    "transliteration": "<Latin phonetic transliteration, e.g. shaale, neeru>",
    "partOfSpeech": "<noun|verb|adjective|adverb|pronoun|interjection|phrase>",
    "meaning": "<Clear, concise English definition>",
    "meaningKn": "<Clear, natural Kannada explanation in Kannada script>",
    "topic": "general",
    "classLevel": "beginner",
    "difficulty": "easy",
    "formal": false,
    "examples": [
      {
        "kannada": "<Natural example sentence in Kannada script>",
        "transliteration": "<Transliteration of sentence>",
        "english": "<Accurate English translation>"
      }
    ],
    "related": ["<related word 1 in English or Kannada>", "<related word 2>"],
    "source": "ai-generated"
  }
}`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<{ entry: any }>(raw);
    if (!parsed?.entry?.english || !parsed?.entry?.kannada) {
      throw new Error('Gemini returned incomplete dictionary entry');
    }
    return parsed;
  }

  async generateReadingPassage(params: {
    topic: string;
    classLevel: string;
    difficulty?: string;
  }): Promise<any> {
    const prompt = `Act as an expert Kannada textbook author.
Create a rich, culturally authentic Kannada reading comprehension passage suitable for Class/Level: "${params.classLevel}".
Topic: "${params.topic}".
Length: 4-6 sentences for beginner, or 2 rich paragraphs for classes 3-10.

Return ONLY valid JSON matching this exact structure:
{
  "title": "<English Title, e.g. An Evening in Lalbagh>",
  "titleKn": "<Kannada Title in script, e.g. ಲಾಲ್‌ಬಾಗ್‌ನಲ್ಲಿ ಒಂದು ಸಂಜೆ>",
  "classLevel": "${params.classLevel}",
  "passageKn": "<The complete story or passage written in natural, grammatically correct Kannada script>",
  "transliteration": "<Complete Latin transliteration of the Kannada passage>",
  "englishTranslation": "<Fluent, natural English translation of the passage>",
  "vocabulary": [
    {
      "kannada": "<Kannada word from passage>",
      "transliteration": "<transliteration>",
      "english": "<English meaning>"
    }
  ],
  "questions": [
    {
      "prompt": "<Comprehension question in English>",
      "options": ["<Option A with Kannada>", "<Option B>", "<Option C>", "<Option D>"],
      "answer": "<The exact matching correct option>",
      "explanation": "<Brief explanation of why this answer is right based on the passage>"
    }
  ]
}
Include 3-5 vocabulary words and 2 multiple-choice comprehension questions.`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<any>(raw);
    if (!parsed?.passageKn || !parsed?.titleKn) {
      throw new Error('Gemini returned malformed reading passage');
    }
    return parsed;
  }

  async generateGrammarLesson(params: {
    topic: string;
    classLevel: string;
  }): Promise<any> {
    const prompt = `Act as an expert Kannada linguist and Kannada grammar professor (ವ್ಯಾಕರಣ ತಜ್ಞ).
Explain the Kannada grammar topic: "${params.topic}" for Class/Level: "${params.classLevel}".
Return ONLY valid JSON matching this exact structure:
{
  "topicTitle": "<Clear English title, e.g. Understanding Kannada Noun Cases (Vibhaktis)>",
  "topicTitleKn": "<Kannada title in script, e.g. ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳ ಪರಿಚಯ>",
  "conceptSummary": "<Clear, intuitive 2-3 sentence overview explaining how this grammatical concept works in Kannada compared to English>",
  "sections": [
    {
      "heading": "<Subheading or rule title>",
      "description": "<Detailed linguistic explanation with clear rules>",
      "rules": ["<Rule point 1>", "<Rule point 2>"],
      "examples": [
        {
          "kannada": "<Example in clean Kannada script>",
          "transliteration": "<Latin phonetic transliteration>",
          "english": "<Accurate English translation>",
          "breakdown": "<Morphological breakdown, e.g. Mane (house) + alli (in) = Maneyalli>"
        }
      ]
    }
  ],
  "exercises": [
    {
      "prompt": "<Practice question testing understanding of this grammar rule>",
      "options": ["<Option A in Kannada>", "<Option B>", "<Option C>", "<Option D>"],
      "answer": "<The exact matching correct option>",
      "explanation": "<Linguistic explanation of the correct grammatical form>"
    }
  ]
}
Include at least 2 detailed sections with rich examples and 2 interactive grammar practice questions.`;

    const raw = await this.ask(prompt);
    const parsed = safeJson<any>(raw);
    if (!parsed?.topicTitleKn || !parsed?.sections?.length) {
      throw new Error('Gemini returned malformed grammar lesson');
    }
    return parsed;
  }

  async generateCurriculumUnits(params: {
    classLevel: string;
    customFocus?: string;
  }): Promise<any[]> {
    const focusPrompt = params.customFocus ? `Special syllabus focus: "${params.customFocus}".` : '';
    const prompt = `Act as a senior Karnataka State Board Kannada syllabus curriculum author, textbook developer, and linguist.
Create a comprehensive, deeply detailed, pedagogically sound set of 2 curriculum Units for Class/Grade Level: "${params.classLevel}".
${focusPrompt}

CRITICAL QUALITY INSTRUCTIONS:
1. Provide EXHAUSTIVE, DETAILED content — NEVER provide just 1 or 2 small items.
   - For example: if the topic is "Counting from 1 to 10" or "Basic Digits 1-5", you MUST include ALL 5 or 10 items completely (1: ಒಂದು, 2: ಎರಡು, 3: ಮೂರು, 4: ನಾಲ್ಕು, 5: ಐದು, etc.). Do NOT omit or truncate items!
   - If teaching letters, provide all letters in that group with clear vocabulary words.
   - If teaching grammar/verbs/tenses, provide comprehensive explanation rules, table-like breakdowns, and at least 6-8 full example sentences with breakdown.
2. In each lesson's sections:
   - Provide a clear, educational body text explaining the concepts, rules, and patterns.
   - Provide AT LEAST 5 to 10 rich examples in the "examples" array with:
     * "kannada": Clear Kannada script
     * "transliteration": Accurate Latin transliteration with pronunciation
     * "english": English translation and meaning
3. Provide a list of 4-6 target vocabulary items in "vocabulary".
4. Provide 3-4 interactive multiple-choice practice questions in "exercises" with clear explanations.

Return ONLY valid JSON matching this exact structure:
[
  {
    "id": "unit-gen-${Date.now()}-1",
    "classLevel": "${params.classLevel}",
    "unitNumber": 1,
    "title": "<Clear, descriptive English unit title>",
    "titleKn": "<Formal Kannada unit title>",
    "description": "<Detailed 2-3 sentence unit overview>",
    "category": "<vocabulary | grammar | alphabet | conversation | literature>",
    "estimatedMinutes": 35,
    "lessons": [
      {
        "id": "lesson-gen-${Date.now()}-1",
        "unitId": "unit-gen-${Date.now()}-1",
        "classLevel": "${params.classLevel}",
        "title": "<Detailed Lesson Title in English>",
        "titleKn": "<Lesson Title in Kannada>",
        "category": "<vocabulary | grammar | alphabet | conversation | literature>",
        "objectives": [
          "<Specific learning objective 1>",
          "<Specific learning objective 2>",
          "<Specific learning objective 3>"
        ],
        "content": {
          "explanation": "<Comprehensive pedagogical breakdown for this grade level with clear guidelines and context>",
          "sections": [
            {
              "heading": "<Detailed Section 1 Heading>",
              "body": "<Thorough explanatory teaching content explaining the rules or pattern>",
              "examples": [
                {
                  "kannada": "<Kannada text>",
                  "transliteration": "<Phonetic transliteration>",
                  "english": "<Accurate English translation>"
                }
              ]
            },
            {
              "heading": "<Detailed Section 2 Heading>",
              "body": "<Further examples, practical usage, or common sentence patterns>",
              "examples": [
                {
                  "kannada": "<Kannada text>",
                  "transliteration": "<Phonetic transliteration>",
                  "english": "<Accurate English translation>"
                }
              ]
            }
          ],
          "vocabulary": [
            {
              "id": "voc-${Date.now()}-1",
              "english": "<English word>",
              "kannada": "<Kannada word>",
              "transliteration": "<Transliteration>",
              "meaning": "<Definition and usage>",
              "topic": "<Topic>",
              "classLevel": "${params.classLevel}",
              "difficulty": "medium"
            }
          ],
          "grammarNotes": [
            "<Key grammar rule or linguistic observation 1>",
            "<Key grammar rule or linguistic observation 2>"
          ]
        },
        "exercises": [
          {
            "id": "ex-${Date.now()}-1",
            "type": "multiple-choice",
            "prompt": "<Practice question testing understanding>",
            "options": ["<Option A>", "<Option B>", "<Option C>", "<Option D>"],
            "answer": "<The exact matching correct option>",
            "explanation": "<Clear grammatical/vocabulary explanation>"
          }
        ],
        "estimatedMinutes": 20,
        "order": 1
      }
    ]
  }
]
Do not return markdown fences or explanation. Return only valid JSON.`;

    const raw = await this.ask(prompt, 8192);
    const parsed = safeJson<any[]>(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error('Gemini returned malformed curriculum units');
    }
    return parsed;
  }

  async teachLesson(params: {
    lesson: any;
    mode: 'complete' | 'continue';
    sectionIndex?: number;
    explanationLanguage?: string;
    learnerHistory?: any;
  }): Promise<any> {
    const { lesson, mode, sectionIndex = 0, explanationLanguage = 'english', learnerHistory } = params;
    const cl = String(lesson.classLevel || '1');
    const isHigherClass = !['beginner', '1', '2', '3'].includes(cl);

    let pedagogicalGuideline = '';
    if (cl === '1' || cl === 'beginner') {
      pedagogicalGuideline = `
- Audience: Class 1 / Beginner.
- Language: Warm, encouraging, clear, simple language.
- Concept Depth: Explain every foundational concept thoroughly with complete lists (e.g. if numbers 1-10 or 1-20, list every single one with script, transliteration, and meaning).
- Repetition & Pronunciation: Break down syllables clearly and explain how mouth shapes/vowels work.`;
    } else if (['2', '3', '4'].includes(cl)) {
      pedagogicalGuideline = `
- Audience: Classes 2 to 4.
- Language: Simple yet structured explanations.
- Concept Depth: Provide rich contextual examples, sentence structures, root verbs, and guided comprehension drills.
- Connect concepts to daily life situations in Karnataka.`;
    } else if (['5', '6', '7'].includes(cl)) {
      pedagogicalGuideline = `
- Audience: Classes 5 to 7.
- Language: Academic, grammatically precise, and bilingual.
- Concept Depth: Deep dive into Vibhakti (cases), sandhi, sentence construction, idioms, and reading passage analysis.
- Explain linguistic rules clearly with morphological breakdowns.`;
    } else {
      pedagogicalGuideline = `
- Audience: Classes 8 to 10 (High School / Board level).
- Language: Scholarly, intellectually rigorous, and structured for examination readiness.
- Concept Depth: Deep analysis of Kannada literature (Vachanas, Kavya), Samasas, Chandas (meter), formal writing, and nuanced textual interpretations.
- Avoid superficial summaries; provide line-by-line or concept-by-concept analysis.`;
    }

    const modePrompt = mode === 'continue'
      ? `MODE: "CONTINUE LEARNING". Focus primarily on Section index ${sectionIndex + 1} and subsequent mastery without truncating detail. Build upon previous learning.`
      : `MODE: "COMPLETE LESSON". Provide an exhaustive, deeply taught lesson covering all learning objectives, concepts, vocabulary, sentence-by-sentence explanations, step-by-step examples, exercises, recap, and an assessment.`;

    const storedContentStr = JSON.stringify({
      title: lesson.title,
      titleKn: lesson.titleKn,
      unitTitle: lesson.unitTitle,
      category: lesson.category,
      explanation: lesson.content?.explanation,
      sections: lesson.content?.sections,
      objectives: lesson.objectives,
    }, null, 2);

    const prompt = `Act as an expert, award-winning Kannada teacher and Kannada language scholar (ಕನ್ನಡ ಅಧ್ಯಾಪಕರು).
You are teaching a student the following lesson:

LESSON METADATA & SOURCE MATERIAL:
- Class Level: ${cl}
- Lesson Title: "${lesson.title}" (${lesson.titleKn || ''})
- Unit: "${lesson.unitTitle || ''}"
- Category: "${lesson.category || 'General'}"
- Preferred Explanation Language: ${explanationLanguage}
${learnerHistory ? `- Learner Notes: ${JSON.stringify(learnerHistory)}` : ''}

STORED LESSON BASE CONTENT:
${storedContentStr}

TEACHING & PEDAGOGY GUIDELINES:
${pedagogicalGuideline}
${modePrompt}

CRITICAL TEACHING REQUIREMENTS:
1. DO NOT give a superficial summary or short bullet points. Teach each concept thoroughly and progressively.
2. For every important concept:
   - Explain what it means in clear, accessible language.
   - Explain how it works grammatically or phonetically.
   - Provide concrete, accurate Kannada examples with transliteration and English translations.
   - Provide morphological breakdown where applicable.
3. If teaching numbers or letters or a list, DO NOT omit items — provide the full set clearly.
4. Ground your teaching in the supplied lesson content; clearly distinguish core lesson teachings from teacher-added practice drills.
5. Provide a complete lesson recap and an interactive assessment checking understanding.

Return ONLY valid JSON matching this exact structure:
{
  "title": "${lesson.title}",
  "titleKn": "${lesson.titleKn || ''}",
  "classLevel": "${cl}",
  "category": "${lesson.category || 'General'}",
  "unitTitle": "${lesson.unitTitle || ''}",
  "prerequisites": "<Brief background or prerequisite concepts needed for this lesson>",
  "explanation": "<Thorough, encouraging pedagogical overview setting up the lesson>",
  "objectives": [
    "<Learning objective 1>",
    "<Learning objective 2>",
    "<Learning objective 3>"
  ],
  "sections": [
    {
      "heading": "<Detailed Section Heading>",
      "body": "<Thorough explanatory teaching text explaining the rules, background, or patterns>",
      "rules": ["<Rule or usage guideline 1>", "<Rule or usage guideline 2>"],
      "examples": [
        {
          "kannada": "<Kannada text in script>",
          "transliteration": "<Phonetic Latin transliteration>",
          "english": "<Accurate English translation>",
          "breakdown": "<Morphological or grammatical breakdown, e.g. root + suffix>"
        }
      ],
      "commonMistakes": [
        {
          "incorrect": "<Common mistake learners make>",
          "correct": "<Correct usage>",
          "explanation": "<Why the correction is right>"
        }
      ]
    }
  ],
  "vocabulary": [
    {
      "id": "voc-1",
      "english": "<English word>",
      "kannada": "<Kannada word>",
      "transliteration": "<Transliteration>",
      "meaning": "<Definition and usage context>",
      "exampleUsage": "<Example Kannada sentence using this word>"
    }
  ],
  "sentenceBreakdowns": [
    {
      "kannada": "<Important Kannada sentence or passage line>",
      "transliteration": "<Transliteration>",
      "english": "<English translation>",
      "analysis": "<Word-by-word explanation of what each part means>"
    }
  ],
  "grammarNotes": [
    "<Important grammar or linguistic rule 1>",
    "<Important grammar or linguistic rule 2>"
  ],
  "recap": "<Comprehensive lesson summary wrapping up the key learnings>",
  "exercises": [
    {
      "id": "ex-1",
      "type": "multiple-choice",
      "prompt": "<Concept checking question>",
      "options": ["<Option A>", "<Option B>", "<Option C>", "<Option D>"],
      "answer": "<The exact matching correct option>",
      "explanation": "<Educational explanation of the answer>"
    }
  ]
}
Return ONLY valid JSON. No markdown code blocks, no preamble.`;

    const raw = await this.ask(prompt, 8192);
    const parsed = safeJson<any>(raw);
    if (!parsed || !parsed.sections || parsed.sections.length === 0) {
      throw new Error('Gemini returned an unparseable or incomplete lesson response.');
    }
    return parsed;
  }
}
