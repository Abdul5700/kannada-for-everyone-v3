import { BOOK_31_LESSONS, SECTION_DEFINITIONS } from './spokenCurriculumData';

export interface LessonExample {
  kannada: string;
  transliteration: string;
  english: string;
}

export interface ExerciseItem {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface LessonItem {
  id: string;
  unitId: string;
  lessonNumber: number;
  sectionNumber: number;
  classLevel: string | number; // Backward compatibility
  title: string;
  titleKn: string;
  category: string;
  grammaticalFocus?: string;
  objectives: string[];
  content: {
    explanation: string;
    sections: {
      heading: string;
      body: string;
      examples: LessonExample[];
    }[];
    vocabulary?: any[];
    grammarNotes?: string[];
  };
  exercises: ExerciseItem[];
  estimatedMinutes: number;
  order: number;
}

export interface CurriculumUnit {
  id: string;
  sectionNumber: number;
  classLevel: string | number; // Backward compatibility
  unitNumber: number;
  title: string;
  titleKn: string;
  description: string;
  category: string;
  estimatedMinutes: number;
  lessons: LessonItem[];
}

// Transform the 31 graded lessons into the 4 structured Units corresponding to the book's sections
export const CURRICULUM_DATA: CurriculumUnit[] = SECTION_DEFINITIONS.map((sec) => {
  const sectionLessons = BOOK_31_LESSONS.filter((l) => l.section === sec.sectionNumber);

  return {
    id: `section-${sec.sectionNumber}`,
    sectionNumber: sec.sectionNumber,
    classLevel: sec.sectionNumber, // Backward compatibility
    unitNumber: sec.sectionNumber,
    title: sec.title,
    titleKn: sec.titleKn,
    description: sec.description,
    category: sec.category,
    estimatedMinutes: sectionLessons.length * 20,
    lessons: sectionLessons.map((l) => ({
      id: `lesson-spoken-${l.num}`,
      unitId: `section-${sec.sectionNumber}`,
      lessonNumber: l.num,
      sectionNumber: l.section,
      classLevel: l.section, // Backward compatibility
      title: `Lesson ${l.num}: ${l.title}`,
      titleKn: `ಪಾಠ ${l.num}: ${l.titleKn}`,
      category: l.category,
      grammaticalFocus: l.focus,
      objectives: l.objectives,
      content: {
        explanation: l.explanation,
        sections: [
          {
            heading: l.dialogueHeading,
            body: l.dialogueBody,
            examples: l.examples,
          },
        ],
        vocabulary: l.vocabulary,
        grammarNotes: l.grammarNotes,
      },
      exercises: [
        {
          id: `ex-spk-${l.num}`,
          type: 'multiple-choice',
          prompt: l.exercise.prompt,
          options: l.exercise.options,
          answer: l.exercise.answer,
          explanation: l.exercise.explanation,
        },
      ],
      estimatedMinutes: 20,
      order: l.num,
    })),
  };
});

// Map legacy class lesson IDs to modern Spoken Kannada lesson IDs so existing user progress never breaks
export const LEGACY_LESSON_ID_MAP: Record<string, string> = {
  'lesson-beg-1': 'lesson-spoken-1',
  'lesson-beg-2': 'lesson-spoken-1',
  'lesson-beg-3': 'lesson-spoken-2',
  'lesson-c1-num-1': 'lesson-spoken-3',
  'lesson-c1-num-2': 'lesson-spoken-4',
  'lesson-c1-swaras': 'lesson-spoken-1',
  'lesson-c2-num-100': 'lesson-spoken-4',
  'lesson-c2-vyanjana': 'lesson-spoken-2',
  'lesson-c3-verbs': 'lesson-spoken-11',
  'lesson-c4-tenses': 'lesson-spoken-13',
  'lesson-c4-adj': 'lesson-spoken-2',
  'lesson-c5-adj': 'lesson-spoken-6',
  'lesson-c6-vibhaktis': 'lesson-spoken-4',
  'lesson-c7-hampi': 'lesson-spoken-7',
  'lesson-c8-letter': 'lesson-spoken-26',
  'lesson-c9-samasa': 'lesson-spoken-19',
  'lesson-c10-vachana': 'lesson-spoken-31',
};
