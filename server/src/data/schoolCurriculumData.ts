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
  classLevel: string | number;
  title: string;
  titleKn: string;
  category: string;
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
  classLevel: string | number;
  unitNumber: number;
  title: string;
  titleKn: string;
  description: string;
  category: string;
  estimatedMinutes: number;
  lessons: LessonItem[];
}

export const CURRICULUM_DATA: CurriculumUnit[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // LEVEL: BEGINNER (Foundations for Non-Kannada Speakers & Adults)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-beg-1',
    classLevel: 'beginner',
    unitNumber: 1,
    title: 'Essential Greetings & Courtesy Words',
    titleKn: 'ಮೂಲ ಶುಭಾಶಯಗಳು ಮತ್ತು ವಿನಮ್ರ ನುಡಿಗಳು',
    description: 'Polite greetings and introductions for daily conversations in Bengaluru and Karnataka.',
    category: 'conversation',
    estimatedMinutes: 20,
    lessons: [
      {
        id: 'lesson-beg-1',
        unitId: 'unit-beg-1',
        classLevel: 'beginner',
        title: 'Meeting People & Polite Greetings',
        titleKn: 'ಸ್ವಾಗತ ಮತ್ತು ಶುಭಾಶಯಗಳು',
        category: 'conversation',
        objectives: ['Master Namaskara and everyday greetings', 'Ask someone how they are doing'],
        content: {
          explanation: 'In Kannada, greeting with respect creates an instant connection. Learn the basic phrases used from morning till night.',
          sections: [
            {
              heading: 'Core Greetings',
              body: 'Use these in shops, offices, and neighborhood interactions.',
              examples: [
                { kannada: 'ನಮಸ್ಕಾರ!', transliteration: 'Namaskara!', english: 'Hello / Greetings! (Universal)' },
                { kannada: 'ಶುಭೋದಯ!', transliteration: 'Shubhodaya!', english: 'Good morning!' },
                { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', transliteration: 'Neevu hegiddiri?', english: 'How are you? (Respectful)' },
                { kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ.', transliteration: 'Naanu chennaagiddene.', english: 'I am doing well.' }
              ]
            },
            {
              heading: 'Courtesy & Gratitude',
              body: 'Polite words used to express thanks, apologies, or requests.',
              examples: [
                { kannada: 'ಧನ್ಯವಾದಗಳು.', transliteration: 'Dhanyavaadagalu.', english: 'Thank you very much.' },
                { kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.', transliteration: 'Dayavittu sahaaya maadi.', english: 'Please help me.' },
                { kannada: 'ಕ್ಷಮಿಸಿ / ತೊಂದರೆಗೆ ಕ್ಷಮೆಯಿರಲಿ.', transliteration: 'Kshamisi.', english: 'Excuse me / Sorry.' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-beg-1',
            type: 'multiple-choice',
            prompt: 'How do you say "How are you?" politely in Kannada?',
            options: ['ನೀವು ಹೇಗಿದ್ದೀರಿ? (Neevu hegiddiri?)', 'ಎಲ್ಲಿಗೆ ಹೋಗ್ತಿದ್ದೀರಿ? (Ellige hoogtiddiri?)', 'ಧನ್ಯವಾದ (Dhanyavaada)', 'ಊಟ ಆಯ್ತಾ? (Oota aayta?)'],
            answer: 'ನೀವು ಹೇಗಿದ್ದೀರಿ? (Neevu hegiddiri?)',
            explanation: '"Neevu hegiddiri?" is the polite, standard way to ask someone how they are.'
          }
        ],
        estimatedMinutes: 10,
        order: 1
      },
      {
        id: 'lesson-beg-2',
        unitId: 'unit-beg-1',
        classLevel: 'beginner',
        title: 'Self-Introduction & Origin',
        titleKn: 'ಪರಿಚಯ ಮತ್ತು ವಾಸಸ್ಥಳ',
        category: 'conversation',
        objectives: ['Tell your name and where you live or work'],
        content: {
          explanation: 'Easily introduce your name, hometown, and current residence in simple Kannada sentences.',
          sections: [
            {
              heading: 'Simple Introduction Patterns',
              body: 'Combine your details with standard Kannada patterns.',
              examples: [
                { kannada: 'ನನ್ನ ಹೆಸರು ರೋಹನ್.', transliteration: 'Nanna hesaru Rohan.', english: 'My name is Rohan.' },
                { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', transliteration: 'Nimma hesarenu?', english: 'What is your name?' },
                { kannada: 'ನಾನು ಬೆಂಗಳೂರಿನಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೇನೆ.', transliteration: 'Naanu Bengalurinalli vaasisuttiddene.', english: 'I live in Bengaluru.' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-beg-2',
            type: 'multiple-choice',
            prompt: '"ನನ್ನ ಹೆಸರು..." translates to:',
            options: ['My name is...', 'Where is...', 'How are you...', 'Thank you...'],
            answer: 'My name is...',
            explanation: 'Nanna hesaru means "My name".'
          }
        ],
        estimatedMinutes: 10,
        order: 2
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 1: Numbers 1 to 50 & Kannada Swaras (Vowels)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c1-1',
    classLevel: 1,
    unitNumber: 1,
    title: 'Complete Kannada Numbers: 1 to 50',
    titleKn: 'ಅಂಕಿಗಳು: ೧ ರಿಂದ ೫೦ (ಸಂಪೂರ್ಣ ಪಟ್ಟಿ)',
    description: 'Learn counting from 1 to 50 with numerals, Kannada names, and English pronunciation.',
    category: 'vocabulary',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c1-num-1',
        unitId: 'unit-c1-1',
        classLevel: 1,
        title: 'Numbers 1 to 20 (ಅಂಕಿಗಳು ೧-೨೦)',
        titleKn: 'ಒಂದರಿಂದ ಇಪ್ಪತ್ತು',
        category: 'vocabulary',
        objectives: ['Count smoothly from 1 to 20 with script and pronunciation'],
        content: {
          explanation: 'Numbers form the backbone of shopping, telling time, and counting. Master 1 to 20 with rhythmic clarity.',
          sections: [
            {
              heading: 'Numbers 1 to 10 (೧ ರಿಂದ ೧೦)',
              body: '೧ (ಒಂದು - Ondu), ೨ (ಎರಡು - Eradu), ೩ (ಮೂರು - Mooru), ೪ (ನಾಲ್ಕು - Naalku), ೫ (ಐದು - Aidu), ೬ (ಆರು - Aaru), ೭ (ಏಳು - Eelu), ೮ (ಎಂಟು - Entu), ೯ (ಒಂಬತ್ತು - Ombattu), ೧೦ (ಹತ್ತು - Hattu).',
              examples: [
                { kannada: '೧ - ಒಂದು', transliteration: '1 - Ondu', english: 'One' },
                { kannada: '೨ - ಎರಡು', transliteration: '2 - Eradu', english: 'Two' },
                { kannada: '೩ - ಮೂರು', transliteration: '3 - Mooru', english: 'Three' },
                { kannada: '೪ - ನಾಲ್ಕು', transliteration: '4 - Naalku', english: 'Four' },
                { kannada: '೫ - ಐದು', transliteration: '5 - Aidu', english: 'Five' },
                { kannada: '೧೦ - ಹತ್ತು', transliteration: '10 - Hattu', english: 'Ten' }
              ]
            },
            {
              heading: 'Numbers 11 to 20 (೧೧ ರಿಂದ ೨೦)',
              body: '೧೧ (ಹನ್ನೊಂದು - Hannondu), ೧೨ (ಹನ್ನೆರಡು - Hanneradu), ೧೩ (ಹದಿಮೂರು - Hadimooru), ೧೪ (ಹದಿನಾಲ್ಕು - Hadinaalku), ೧೫ (ಹದಿನೈದು - Hadinaidu), ೧೬ (ಹದಿನಾರು - Hadinaaru), ೧೭ (ಹದಿನೇಳು - Hadineelu), ೧೮ (ಹದಿನೆಂಟು - Hadinentu), ೧೯ (ಹತ್ತೊಂಬತ್ತು - Hattonbattu), ೨೦ (ಇಪ್ಪತ್ತು - Ippattu).',
              examples: [
                { kannada: '೧೧ - ಹನ್ನೊಂದು', transliteration: '11 - Hannondu', english: 'Eleven' },
                { kannada: '೧೨ - ಹನ್ನೆರಡು', transliteration: '12 - Hanneradu', english: 'Twelve' },
                { kannada: '೧೫ - ಹದಿನೈದು', transliteration: '15 - Hadinaidu', english: 'Fifteen' },
                { kannada: '೨೦ - ಇಪ್ಪತ್ತು', transliteration: '20 - Ippattu', english: 'Twenty' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c1-n1',
            type: 'multiple-choice',
            prompt: 'What is the Kannada word for number 15?',
            options: ['ಹದಿನೈದು (Hadinaidu)', 'ಹನ್ನೆರಡು (Hanneradu)', 'ಇಪ್ಪತ್ತು (Ippattu)', 'ಹತ್ತು (Hattu)'],
            answer: 'ಹದಿನೈದು (Hadinaidu)',
            explanation: '15 is pronounced "Hadinaidu" in Kannada.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      },
      {
        id: 'lesson-c1-num-2',
        unitId: 'unit-c1-1',
        classLevel: 1,
        title: 'Numbers 21 to 50 & Tens Breakdown',
        titleKn: '೨೧ ರಿಂದ ೫೦ ಮತ್ತು ಹತ್ತರ ಗುಣಕಗಳು',
        category: 'vocabulary',
        objectives: ['Learn counting by tens: 20, 30, 40, 50 and intermediate numbers'],
        content: {
          explanation: 'Learn the multiples of 10 up to 50: Ippattu (20), Moovattu (30), Nalavattu (40), and Aivattu (50).',
          sections: [
            {
              heading: 'The Tens from 20 to 50',
              body: 'Notice how the base tens create compound numbers easily.',
              examples: [
                { kannada: '೨೦ - ಇಪ್ಪತ್ತು', transliteration: '20 - Ippattu', english: 'Twenty' },
                { kannada: '೨೫ - ಇಪ್ಪತ್ತೈದು', transliteration: '25 - Ippattaidu', english: 'Twenty-five' },
                { kannada: '೩೦ - ಮೂವತ್ತು', transliteration: '30 - Moovattu', english: 'Thirty' },
                { kannada: '೪೦ - ನಲವತ್ತು', transliteration: '40 - Nalavattu', english: 'Forty' },
                { kannada: '೫೦ - ಐವತ್ತು', transliteration: '50 - Aivattu', english: 'Fifty' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c1-n2',
            type: 'multiple-choice',
            prompt: 'What number is "ಮೂವತ್ತು" (Moovattu)?',
            options: ['30', '20', '40', '50'],
            answer: '30',
            explanation: 'Moovattu means thirty.'
          }
        ],
        estimatedMinutes: 15,
        order: 2
      }
    ]
  },
  {
    id: 'unit-c1-2',
    classLevel: 1,
    unitNumber: 2,
    title: 'Kannada Swaras (Vowels: 14 Letters)',
    titleKn: 'ಸ್ವರಗಳು: ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಅಂ ಅಃ',
    description: 'Learn the complete Kannada vowel phonetics with clear examples and words.',
    category: 'alphabet',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'lesson-c1-swaras',
        unitId: 'unit-c1-2',
        classLevel: 1,
        title: 'Mastering the 14 Swaras (ಸ್ವರಮಾಲೆ)',
        titleKn: 'ಹದಿನಾಲ್ಕು ಸ್ವರಗಳ ಪರಿಚಯ',
        category: 'alphabet',
        objectives: ['Pronounce every vowel with correct short and long cadence'],
        content: {
          explanation: 'Kannada vowels (Swaragalu) are independent sounds that give music to the language.',
          sections: [
            {
              heading: 'Complete Swaras Grid',
              body: 'Short vowels (Hrasva) take 1 beat; Long vowels (Deergha) take 2 beats.',
              examples: [
                { kannada: 'ಅ (a) - ಅರಸ (Arasa)', transliteration: 'Arasa', english: 'King' },
                { kannada: 'ಆ (aa) - ಆನೆ (Aane)', transliteration: 'Aane', english: 'Elephant' },
                { kannada: 'ಇ (i) - ಇಲಿ (Ili)', transliteration: 'Ili', english: 'Mouse' },
                { kannada: 'ಈ (ee) - ಈಜು (Eeju)', transliteration: 'Eeju', english: 'Swim' },
                { kannada: 'ಉ (u) - ಉಡುಗೊರೆ (Udugore)', transliteration: 'Udugore', english: 'Gift' },
                { kannada: 'ಊ (oo) - ಊಟ (Oota)', transliteration: 'Oota', english: 'Meal' },
                { kannada: 'ಋ (ru) - ಋಷಿ (Rushi)', transliteration: 'Rushi', english: 'Sage' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c1-sw',
            type: 'multiple-choice',
            prompt: 'Which word starts with "ಉ" (U)?',
            options: ['ಉಡುಗೊರೆ (Udugore)', 'ಆನೆ (Aane)', 'ಈಜು (Eeju)', 'ಅರಸ (Arasa)'],
            answer: 'ಉಡುಗೊರೆ (Udugore)',
            explanation: 'Udugore (gift) begins with vowel ಉ.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 2: Numbers 51 to 100 & Consonants (Vyanjanagalu)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c2-1',
    classLevel: 2,
    unitNumber: 1,
    title: 'Complete Numbers: 51 to 100',
    titleKn: 'ಅಂಕಿಗಳು: ೫೧ ರಿಂದ ೧೦೦ (ಶತಕ ಪೂರ್ಣ)',
    description: 'Master numbers from 51 to 100 including 60, 70, 80, 90, and 100 (Nooru).',
    category: 'vocabulary',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c2-num-100',
        unitId: 'unit-c2-1',
        classLevel: 2,
        title: 'Multiples of Ten to 100 (೬೦ ರಿಂದ ೧೦೦)',
        titleKn: 'ಅರವತ್ತರಿಂದ ನೂರು',
        category: 'vocabulary',
        objectives: ['Learn 60, 70, 80, 90, and 100 (Aravattu to Nooru)'],
        content: {
          explanation: 'Count up to one hundred effortlessly in Kannada.',
          sections: [
            {
              heading: 'Tens from 60 to 100',
              body: '೬೦ (ಅರವತ್ತು - Aravattu), ೭೦ (ಎಪ್ಪತ್ತು - Eppattu), ೮೦ (ಎಂಬತ್ತು - Embattu), ೯೦ (ತೊಂಬತ್ತು - Tombattu), ೧೦೦ (ನೂರು - Nooru).',
              examples: [
                { kannada: '೬೦ - ಅರವತ್ತು', transliteration: '60 - Aravattu', english: 'Sixty' },
                { kannada: '೭೦ - ಎಪ್ಪತ್ತು', transliteration: '70 - Eppattu', english: 'Seventy' },
                { kannada: '೮೦ - ಎಂಬತ್ತು', transliteration: '80 - Embattu', english: 'Eighty' },
                { kannada: '೯೦ - ತೊಂಬತ್ತು', transliteration: '90 - Tombattu', english: 'Ninety' },
                { kannada: '೧೦೦ - ನೂರು', transliteration: '100 - Nooru', english: 'One Hundred' }
              ]
            },
            {
              heading: 'Key Landmark Numbers',
              body: 'Combining tens with units for shopping prices.',
              examples: [
                { kannada: '೭೫ - ಎಪ್ಪತ್ತೈದು', transliteration: '75 - Eppattaidu', english: 'Seventy-five' },
                { kannada: '೯೯ - ತೊಂಬತ್ತೊಂಬತ್ತು', transliteration: '99 - Tombattonbattu', english: 'Ninety-nine' },
                { kannada: '೧೦೦ ರೂಪಾಯಿ', transliteration: 'Nooru ruupaayi', english: 'One hundred rupees' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c2-n1',
            type: 'multiple-choice',
            prompt: 'What is the Kannada word for 100?',
            options: ['ನೂರು (Nooru)', 'ಎಂಬತ್ತು (Embattu)', 'ಐವತ್ತು (Aivattu)', 'ಹತ್ತು (Hattu)'],
            answer: 'ನೂರು (Nooru)',
            explanation: 'Nooru means one hundred in Kannada.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },
  {
    id: 'unit-c2-2',
    classLevel: 2,
    unitNumber: 2,
    title: 'The Structured Vyanjanas (Consonant Grid)',
    titleKn: 'ವ್ಯಂಜನಗಳು: ಕ ಖ ಗ ಘ ಙ... (ವರ್ಗೀಯ ಮತ್ತು ಅವರ್ಗೀಯ)',
    description: 'Learn the scientific grouping of Kannada consonants according to vocal organ positions.',
    category: 'alphabet',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c2-vyanjana',
        unitId: 'unit-c2-2',
        classLevel: 2,
        title: 'Vargeeya Vyanjanas (Grouped Consonants: 25)',
        titleKn: 'ವರ್ಗೀಯ ವ್ಯಂಜನಗಳು',
        category: 'alphabet',
        objectives: ['Master the 5 consonant groups (Ka, Cha, Ta, Tha, Pa vargas)'],
        content: {
          explanation: 'Kannada consonants are grouped systematically by point of contact in the mouth.',
          sections: [
            {
              heading: 'Ka, Cha, Ta Vargas',
              body: 'Velar, palatal, and retroflex consonant lines.',
              examples: [
                { kannada: 'ಕ ಖ ಗ ಘ ಙ (Ka-varga)', transliteration: 'ka, kha, ga, gha, nga', english: 'Velar sounds (from throat)' },
                { kannada: 'ಚ ಛ ಜ ಝ ಞ (Cha-varga)', transliteration: 'cha, chha, ja, jha, nya', english: 'Palatal sounds' },
                { kannada: 'ಟ ಠ ಡ ಢ ಣ (Ta-varga)', transliteration: 'ta, tha, da, dha, na', english: 'Retroflex sounds (curled tongue)' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c2-v1',
            type: 'multiple-choice',
            prompt: 'Which group contains the letters "ಕ, ಖ, ಗ, ಘ, ಙ"?',
            options: ['ಕ-ವರ್ಗ (Ka-varga)', 'ಚ-ವರ್ಗ (Cha-varga)', 'ಪ-ವರ್ಗ (Pa-varga)', 'ಟ-ವರ್ಗ (Ta-varga)'],
            answer: 'ಕ-ವರ್ಗ (Ka-varga)',
            explanation: 'The first line of consonants is called Ka-varga.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 3: Daily Action Verbs & Pronouns
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c3-1',
    classLevel: 3,
    unitNumber: 1,
    title: 'Essential Action Verbs (ಕ್ರಿಯಾಪದಗಳು)',
    titleKn: 'ದೈನಂದಿನ ಕ್ರಿಯಾಪದಗಳು ಮತ್ತು ಆಜ್ಞೆಗಳು',
    description: 'Learn root verbs, commands, and simple action sentences.',
    category: 'grammar',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'lesson-c3-verbs',
        unitId: 'unit-c3-1',
        classLevel: 3,
        title: 'Core Verbs: Baa, Hoogu, Tinnu, Kudi',
        titleKn: 'ಮೂಲ ಕ್ರಿಯಾಪದಗಳು: ಬಾ, ಹೋಗು, ತಿನ್ನು, ಕುಡಿ',
        category: 'grammar',
        objectives: ['Distinguish informal commands from respectful requests'],
        content: {
          explanation: 'In Kannada, adding "-i" or "-iri" to verb roots turns them into respectful, polite requests.',
          sections: [
            {
              heading: 'Imperative & Polite Pairs',
              body: 'Baa becomes Banni; Hoogu becomes Hoogi; Tinnu becomes Tinniri.',
              examples: [
                { kannada: 'ಇಲ್ಲಿ ಬಾ (Inf.) / ಬನ್ನಿ (Polite)', transliteration: 'Illi baa / banni', english: 'Come here / Please come' },
                { kannada: 'ಶಾಲೆಗೆ ಹೋಗು / ಹೋಗಿ', transliteration: 'Shaalege hoogu / hoogi', english: 'Go to school / Please go' },
                { kannada: 'ಹಾಲು ಕುಡಿ / ಕುಡಿಯಿರಿ', transliteration: 'Haalu kudi / kudiyiri', english: 'Drink milk / Please drink' },
                { kannada: 'ಪುಸ್ತಕ ಓದು / ಓದಿ', transliteration: 'Pustaka odu / odi', english: 'Read the book / Please read' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c3-v',
            type: 'multiple-choice',
            prompt: 'How do you politely say "Please come in"?',
            options: ['ಒಳಗೆ ಬನ್ನಿ (Olage banni)', 'ಇಲ್ಲಿ ಬಾ (Illi baa)', 'ಹೋಗಿ (Hoogi)', 'ಕುಳಿತುಕೋ (Kulituko)'],
            answer: 'ಒಳಗೆ ಬನ್ನಿ (Olage banni)',
            explanation: '"Banni" is the respectful polite form of "Baa" (come).'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 4: Three Tenses + Adjectives + Everyday Sentences (NOT basic numbers)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c4-1',
    classLevel: 4,
    unitNumber: 1,
    title: 'The Three Kannada Tenses (ಮೂರು ಕಾಲಗಳು)',
    titleKn: 'ಭೂತಕಾಲ, ವರ್ತಮಾನಕಾಲ ಮತ್ತು ಭವಿಷ್ಯತ್ಕಾಲ',
    description: 'Master how Kannada verbs change form to express actions in the past, present, and future. This is the cornerstone of Class 4 Kannada grammar.',
    category: 'grammar',
    estimatedMinutes: 35,
    lessons: [
      {
        id: 'lesson-c4-tenses',
        unitId: 'unit-c4-1',
        classLevel: 4,
        title: 'Past, Present & Future Tense Conjugation',
        titleKn: 'ಭೂತ, ವರ್ತಮಾನ, ಭವಿಷ್ಯತ್ ಕಾಲಗಳ ಕ್ರಿಯಾ ರೂಪಗಳು',
        category: 'grammar',
        objectives: [
          'Identify verb suffixes for Past, Present, and Future tense',
          'Express actions in all three tenses using root verbs like ಓದು, ಹೋಗು, ಬರು',
          'Use time words: ನಿನ್ನೆ (yesterday), ಇಂದು (today), ನಾಳೆ (tomorrow)'
        ],
        content: {
          explanation: 'In Kannada, the same root verb changes its suffix to express when the action happens. Class 4 focuses on mastering all three tenses with common verbs used in everyday situations.',
          sections: [
            {
              heading: 'ಭೂತಕಾಲ — Past Tense (Completed Actions)',
              body: 'Add "-ಇದೆ / -ಇದನು / -ಇದಳು" to the root to show past actions. Key time word: ನಿನ್ನೆ (Ninne = Yesterday).',
              examples: [
                { kannada: 'ನಾನು ನಿನ್ನೆ ಓದಿದೆ.', transliteration: 'Naanu ninne odide.', english: 'I read (studied) yesterday.' },
                { kannada: 'ಅವಳು ನಿನ್ನೆ ಶಾಲೆಗೆ ಹೋದಳು.', transliteration: 'Avalu ninne shaalege hoodalu.', english: 'She went to school yesterday.' },
                { kannada: 'ಅವನು ನೀರು ಕುಡಿದನು.', transliteration: 'Avanu neeru kudidanu.', english: 'He drank water.' },
                { kannada: 'ನಾವು ಆಟ ಆಡಿದೆವು.', transliteration: 'Naavu aata aadidevu.', english: 'We played (a game).' }
              ]
            },
            {
              heading: 'ವರ್ತಮಾನಕಾಲ — Present Tense (Ongoing Actions)',
              body: 'Add "-ುತ್ತಿದ್ದೇನೆ / -ುತ್ತಿದ್ದಾನೆ" to show current ongoing actions. Key time word: ಇಂದು (Indu = Today).',
              examples: [
                { kannada: 'ನಾನು ಇಂದು ಓದುತ್ತಿದ್ದೇನೆ.', transliteration: 'Naanu indu oduttiddene.', english: 'I am reading today.' },
                { kannada: 'ಅವಳು ಅಡುಗೆ ಮಾಡುತ್ತಿದ್ದಾಳೆ.', transliteration: 'Avalu aduge maaduttiddaaLe.', english: 'She is cooking.' },
                { kannada: 'ಮಕ್ಕಳು ಆಟ ಆಡುತ್ತಿದ್ದಾರೆ.', transliteration: 'Makkalu aata aaduttiddaare.', english: 'The children are playing.' }
              ]
            },
            {
              heading: 'ಭವಿಷ್ಯತ್ಕಾಲ — Future Tense (Upcoming Actions)',
              body: 'Add "-ುವೆನು / -ುವಳು / -ುವನು" to express future intentions. Key time word: ನಾಳೆ (Naale = Tomorrow).',
              examples: [
                { kannada: 'ನಾನು ನಾಳೆ ಓದುವೆನು.', transliteration: 'Naanu naale oduvenu.', english: 'I will read tomorrow.' },
                { kannada: 'ಅವಳು ಶಾಲೆಗೆ ಹೋಗುವಳು.', transliteration: 'Avalu shaalege hooguvalu.', english: 'She will go to school.' },
                { kannada: 'ನಾವು ಬೆಳಿಗ್ಗೆ ಹೋಗುವೆವು.', transliteration: 'Naavu beligge hooguvevu.', english: 'We will go in the morning.' }
              ]
            }
          ],
          vocabulary: [
            { id: 'v-c4-1', english: 'Yesterday', kannada: 'ನಿನ್ನೆ', transliteration: 'Ninne', meaning: 'The day before today', topic: 'Time words', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4-2', english: 'Today', kannada: 'ಇಂದು', transliteration: 'Indu', meaning: 'The current day', topic: 'Time words', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4-3', english: 'Tomorrow', kannada: 'ನಾಳೆ', transliteration: 'Naale', meaning: 'The day after today', topic: 'Time words', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4-4', english: 'To read / study', kannada: 'ಓದು', transliteration: 'Odu', meaning: 'Root verb for reading or studying', topic: 'Verbs', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4-5', english: 'To go', kannada: 'ಹೋಗು', transliteration: 'Hoogu', meaning: 'Root verb for going', topic: 'Verbs', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4-6', english: 'To come', kannada: 'ಬರು', transliteration: 'Baru', meaning: 'Root verb for coming', topic: 'Verbs', classLevel: 4, difficulty: 'easy' }
          ],
          grammarNotes: [
            'Kannada verb conjugation follows Subject + Object + Verb (SOV) word order — opposite to English.',
            'The tense suffix changes according to the subject\'s gender and number (he/she/they/we/I).',
            'Common mistake: Using English word order (Subject-Verb-Object) in Kannada sentences. Always put the verb last!'
          ]
        },
        exercises: [
          {
            id: 'ex-c4-1',
            type: 'multiple-choice',
            prompt: '"ನಾನು ನಿನ್ನೆ ಶಾಲೆಗೆ ಹೋದೆ" — Which tense is this?',
            options: ['ಭೂತಕಾಲ (Past Tense)', 'ವರ್ತಮಾನಕಾಲ (Present Tense)', 'ಭವಿಷ್ಯತ್ಕಾಲ (Future Tense)', 'ಆಜ್ಞಾರ್ಥಕ (Command Form)'],
            answer: 'ಭೂತಕಾಲ (Past Tense)',
            explanation: '"ನಿನ್ನೆ" (Ninne = Yesterday) and "ಹೋದೆ" (Hoode = went) both indicate a completed action in the past.'
          },
          {
            id: 'ex-c4-2',
            type: 'multiple-choice',
            prompt: 'Which suffix correctly forms the future tense for "I" (ನಾನು)?',
            options: ['-ಇದೆ (-ide)', '-ುತ್ತಿದ್ದೇನೆ (-uttiddene)', '-ುವೆನು (-uvenu)', '-ಿದನು (-idanu)'],
            answer: '-ುವೆನು (-uvenu)',
            explanation: '"-uvenu" is the future tense suffix for first person singular (I). Example: ಹೋಗುವೆನು (Hoogu + venu = I will go).'
          },
          {
            id: 'ex-c4-3',
            type: 'multiple-choice',
            prompt: 'Choose the correct Present Tense form of "ಅವಳು + ಓದು":',
            options: ['ಅವಳು ಓದಿದಳು', 'ಅವಳು ಓದುತ್ತಿದ್ದಾಳೆ', 'ಅವಳು ಓದುವಳು', 'ಅವಳು ಓದಿದ'],
            answer: 'ಅವಳು ಓದುತ್ತಿದ್ದಾಳೆ',
            explanation: '"ಓದುತ್ತಿದ್ದಾಳೆ" = Odu (root) + uttiddaaLe (present continuous for she). She is currently reading.'
          }
        ],
        estimatedMinutes: 20,
        order: 1
      }
    ]
  },
  {
    id: 'unit-c4-2',
    classLevel: 4,
    unitNumber: 2,
    title: 'Adjectives & Descriptive Language (ಗುಣವಿಶೇಷಣ)',
    titleKn: 'ದೊಡ್ಡ, ಚಿಕ್ಕ, ಸಿಹಿ — ವಸ್ತು ಮತ್ತು ವ್ಯಕ್ತಿಗಳ ವರ್ಣನೆ',
    description: 'Learn how to describe people, places, and objects using quality and size adjectives — a key Class 4 writing and oral communication skill.',
    category: 'grammar',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c4-adj',
        unitId: 'unit-c4-2',
        classLevel: 4,
        title: 'Using Adjectives in Kannada Sentences',
        titleKn: 'ಗುಣವಿಶೇಷಣಗಳನ್ನು ವಾಕ್ಯಗಳಲ್ಲಿ ಬಳಸುವುದು',
        category: 'grammar',
        objectives: [
          'Use size adjectives (ದೊಡ್ಡ, ಚಿಕ್ಕ) correctly before nouns',
          'Apply quality adjectives (ಸಿಹಿ, ಒಳ್ಳೆಯ, ಸುಂದರ) in sentences',
          'Describe classroom and home objects in complete Kannada sentences'
        ],
        content: {
          explanation: 'An adjective (ಗುಣವಿಶೇಷಣ) always comes before the noun it describes in Kannada — just like in English! Connecting them with "-ಆದ" (aada = that is) makes descriptions more formal.',
          sections: [
            {
              heading: 'Size Adjectives — ದೊಡ್ಡ (Big) / ಚಿಕ್ಕ (Small)',
              body: 'These are the most common size descriptors and are used without "-aada" suffix.',
              examples: [
                { kannada: 'ದೊಡ್ಡ ಆನೆ', transliteration: 'Dodda aane', english: 'Big elephant' },
                { kannada: 'ಚಿಕ್ಕ ಇಲಿ', transliteration: 'Chikka ili', english: 'Small mouse' },
                { kannada: 'ದೊಡ್ಡ ಮನೆಯಲ್ಲಿ ಚಿಕ್ಕ ಮಕ್ಕಳು ಇದ್ದಾರೆ.', transliteration: 'Dodda maneyalli chikka makkalu iddaare.', english: 'Small children are in the big house.' }
              ]
            },
            {
              heading: 'Quality Adjectives — ಸಿಹಿ (Sweet), ಒಳ್ಳೆಯ (Good), ಸುಂದರ (Beautiful)',
              body: 'Add "-ಆದ" after quality adjectives when they appear before a noun in formal sentences.',
              examples: [
                { kannada: 'ಸಿಹಿಯಾದ ಮಾವಿನ ಹಣ್ಣು', transliteration: 'Sihiyaada maavina hannu', english: 'Sweet mango' },
                { kannada: 'ಒಳ್ಳೆಯ ಹುಡುಗ', transliteration: 'Olleya huduga', english: 'Good boy' },
                { kannada: 'ಸುಂದರವಾದ ಕರ್ನಾಟಕ', transliteration: 'Sundaravaada Karnataka', english: 'Beautiful Karnataka' }
              ]
            }
          ],
          vocabulary: [
            { id: 'v-c4a-1', english: 'Big / Large', kannada: 'ದೊಡ್ಡ', transliteration: 'Dodda', meaning: 'Large in size', topic: 'Adjectives', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4a-2', english: 'Small', kannada: 'ಚಿಕ್ಕ', transliteration: 'Chikka', meaning: 'Small in size', topic: 'Adjectives', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4a-3', english: 'Sweet', kannada: 'ಸಿಹಿ', transliteration: 'Sihi', meaning: 'Having a sweet taste', topic: 'Adjectives', classLevel: 4, difficulty: 'easy' },
            { id: 'v-c4a-4', english: 'Beautiful', kannada: 'ಸುಂದರ', transliteration: 'Sundara', meaning: 'Aesthetically pleasing', topic: 'Adjectives', classLevel: 4, difficulty: 'easy' }
          ],
          grammarNotes: [
            'Adjectives precede the noun they describe in Kannada (same as English).',
            'Quality adjectives use the suffix "-ಆದ" before nouns: ಸಿಹಿ → ಸಿಹಿಯಾದ.',
            'Size adjectives (ದೊಡ್ಡ, ಚಿಕ್ಕ) do NOT need "-ಆದ"; they are used directly.'
          ]
        },
        exercises: [
          {
            id: 'ex-c4a-1',
            type: 'multiple-choice',
            prompt: 'Choose the correct adjective form to complete: "_____ ಮಾವಿನ ಹಣ್ಣು" (sweet mango)',
            options: ['ಸಿಹಿ', 'ಸಿಹಿಯಾದ', 'ದೊಡ್ಡ', 'ಒಳ್ಳೆಯ'],
            answer: 'ಸಿಹಿಯಾದ',
            explanation: 'Quality adjectives before a noun use "-ಆದ" suffix: ಸಿಹಿ → ಸಿಹಿಯಾದ (sweet → that is sweet).'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 5: Adjectives & Descriptions (ಗುಣವಿಶೇಷಣಗಳು)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c5-1',
    classLevel: 5,
    unitNumber: 1,
    title: 'Adjectives of Quality, Size & Color',
    titleKn: 'ಗುಣವಿಶೇಷಣಗಳು ಮತ್ತು ವರ್ಣನೆ',
    description: 'Enriching conversations with descriptive words like sweet, large, bright, and kind.',
    category: 'grammar',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c5-adj',
        unitId: 'unit-c5-1',
        classLevel: 5,
        title: 'Describing Objects & People',
        titleKn: 'ವಸ್ತು ಮತ್ತು ವ್ಯಕ್ತಿಗಳ ವರ್ಣನೆ',
        category: 'grammar',
        objectives: ['Use adjectives in everyday sentences correctly'],
        content: {
          explanation: 'Guna-visheshana (adjectives) qualify nouns to give sensory details.',
          sections: [
            {
              heading: 'Descriptive Examples',
              body: 'Common adjectives used in stories and descriptions.',
              examples: [
                { kannada: 'ದೊಡ್ಡ ಆನೆ / ಚಿಕ್ಕ ಇಲಿ', transliteration: 'Dodda aane / chikka ili', english: 'Big elephant / Small mouse' },
                { kannada: 'ಸಿಹಿಯಾದ ಮಾವಿನ ಹಣ್ಣು', transliteration: 'Sihiyaada maavina hannu', english: 'Sweet mango' },
                { kannada: 'ಸುಂದರವಾದ ಕರ್ನಾಟಕ', transliteration: 'Sundaravaada Karnataka', english: 'Beautiful Karnataka' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c5-a',
            type: 'multiple-choice',
            prompt: 'Which word means "Big"?',
            options: ['ದೊಡ್ಡ (Dodda)', 'ಚಿಕ್ಕ (Chikka)', 'ಸಿಹಿ (Sihi)', 'ಹೊಸ (Hosa)'],
            answer: 'ದೊಡ್ಡ (Dodda)',
            explanation: 'Dodda means big or large.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 6: The 7 Vibhaktis (Noun Case Suffixes)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c6-1',
    classLevel: 6,
    unitNumber: 1,
    title: 'The Seven Noun Cases (ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು)',
    titleKn: 'ಪ್ರಥಮೆಯಿಂದ ಸಪ್ತಮಿ ವಿಭಕ್ತಿ',
    description: 'Learn how case markers attach to nouns to denote: to, in, from, by, and of.',
    category: 'grammar',
    estimatedMinutes: 35,
    lessons: [
      {
        id: 'lesson-c6-vibhaktis',
        unitId: 'unit-c6-1',
        classLevel: 6,
        title: 'Core Case Suffixes: -ge, -alli, -inda, -annu',
        titleKn: 'ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳ ಬಳಕೆ',
        category: 'grammar',
        objectives: ['Correctly attach case suffixes to denote location, direction, and origin'],
        content: {
          explanation: 'Kannada suffixes replace English prepositions like "in", "to", "from".',
          sections: [
            {
              heading: 'Vibhakti Markers Table',
              body: 'Observe how the base noun changes meaning.',
              examples: [
                { kannada: 'ಶಾಲೆ + ಗೆ = ಶಾಲೆಗೆ', transliteration: 'Shaale + ge = Shaalege', english: 'To school' },
                { kannada: 'ಮನೆ + ಅಲ್ಲಿ = ಮನೆಯಲ್ಲಿ', transliteration: 'Mane + alli = Maneyalli', english: 'In the house' },
                { kannada: 'ಊರು + ಇಂದ = ಊರಿನಿಂದ', transliteration: 'Ooru + inda = Oorininda', english: 'From the village/town' },
                { kannada: 'ಪುಸ್ತಕ + ಅನ್ನು = ಪುಸ್ತಕವನ್ನು', transliteration: 'Pustaka + annu = Pustakavannu', english: 'The book (Object marker)' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c6-v',
            type: 'multiple-choice',
            prompt: 'How do you say "In the house"?',
            options: ['ಮನೆಯಲ್ಲಿ (Maneyalli)', 'ಮನೆಗೆ (Manege)', 'ಮನೆಯಿಂದ (Maneyinda)', 'ಮನೆಯ (Maneya)'],
            answer: 'ಮನೆಯಲ್ಲಿ (Maneyalli)',
            explanation: 'The locative suffix "-alli" means "in" or "at".'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 7: Karnataka Heritage & Cultural Comprehension
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c7-1',
    classLevel: 7,
    unitNumber: 1,
    title: 'Heritage of Karnataka (ಕರ್ನಾಟಕದ ಪರಂಪರೆ)',
    titleKn: 'ಹಂಪಿ, ಕಾವೇರಿ ಮತ್ತು ಬೇಲೂರು',
    description: 'Historical passages and cultural reading about world heritage sites in Karnataka.',
    category: 'reading',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c7-hampi',
        unitId: 'unit-c7-1',
        classLevel: 7,
        title: 'The Glory of Hampi (ಹಂಪಿಯ ವೈಭವ)',
        titleKn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಹೆಮ್ಮೆ',
        category: 'reading',
        objectives: ['Comprehend historical narratives and extract key facts'],
        content: {
          explanation: 'Hampi was the majestic capital of the Vijayanagara empire, celebrated globally for its stone architecture.',
          sections: [
            {
              heading: 'Historical Overview',
              body: 'ಹಂಪಿಯು ತುಂಗಭದ್ರಾ ನದಿಯ ದಡದಲ್ಲಿದೆ. ಇಲ್ಲಿನ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಜಗತ್ಪ್ರಸಿದ್ಧವಾಗಿವೆ.',
              examples: [
                { kannada: 'ಹಂಪಿಯು ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿದೆ.', transliteration: 'Hampiyu Tungabhadra nadiya teeradallide.', english: 'Hampi is situated on the banks of river Tungabhadra.' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c7-h',
            type: 'multiple-choice',
            prompt: 'Which river flows by Hampi?',
            options: ['ತುಂಗಭದ್ರಾ (Tungabhadra)', 'ಕಾವೇರಿ (Kaveri)', 'ಕೃಷ್ಣಾ (Krishna)', 'ಶರಾವತಿ (Sharavati)'],
            answer: 'ತುಂಗಭದ್ರಾ (Tungabhadra)',
            explanation: 'Hampi is situated along the banks of the Tungabhadra.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 8: Formal Letter Writing (ಪತ್ರ ಲೇಖನ ಕಲೆ)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c8-1',
    classLevel: 8,
    unitNumber: 1,
    title: 'Formal Letter Writing (ಪತ್ರ ಲೇಖನ)',
    titleKn: 'ಅಧಿಕೃತ ಪತ್ರಗಳು ಮತ್ತು ರಜಾ ಅರ್ಜಿ',
    description: 'Learn to write formal leave applications and civic letters with official salutations.',
    category: 'writing',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c8-letter',
        unitId: 'unit-c8-1',
        classLevel: 8,
        title: 'Writing an Official Leave Application',
        titleKn: 'ರಜಾ ಅರ್ಜಿ ಬರೆಯುವ ವಿಧಾನ',
        category: 'writing',
        objectives: ['Structure formal salutations, body content, and closing signatures'],
        content: {
          explanation: 'Official communication in Karnataka offices and schools follows standard respectful Kannada conventions.',
          sections: [
            {
              heading: 'Key Phrases for Letters',
              body: 'Salutations like "Gowravanvitha", "Maanyare", and "Ivarige".',
              examples: [
                { kannada: 'ಇವರಿಗೆ: ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು', transliteration: 'Ivarige: Mukhyopaadhyaayaru', english: 'To: The Headmaster' },
                { kannada: 'ಮಾನ್ಯರೇ, ವಿಷಯ: ಎರಡು ದಿನಗಳ ರಜೆ ಕೋರಿ.', transliteration: 'Maanyare, Vishaya: Eradu dinagala raje kori.', english: 'Respected Sir, Subject: Requesting two days leave.' },
                { kannada: 'ಇಂತಿ ತಮ್ಮ ನಂಬಿಕಸ್ಥ ವಿದ್ಯಾರ್ಥಿ.', transliteration: 'Inti tamma nambikasta vidyaarthi.', english: 'Yours obedient student.' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c8-l',
            type: 'multiple-choice',
            prompt: '"ಮಾನ್ಯರೇ" (Maanyare) is used as:',
            options: ['Respected Sir / Madam', 'Dear friend', 'Goodbye', 'Thank you'],
            answer: 'Respected Sir / Madam',
            explanation: 'Maanyare is the standard respectful salutation in formal letters.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 9: Compound Words & Sandhis (ಸಮಾಸಗಳು & ಸಂಧಿಗಳು)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c9-1',
    classLevel: 9,
    unitNumber: 1,
    title: 'Compound Words (ಸಮಾಸಗಳು)',
    titleKn: 'ತತ್ಪುರುಷ, ಕರ್ಮಧಾರಯ ಮತ್ತು ದ್ವಂದ್ವ ಸಮಾಸ',
    description: 'Understand how two independent words merge dropping case endings into a compound word.',
    category: 'grammar',
    estimatedMinutes: 35,
    lessons: [
      {
        id: 'lesson-c9-samasa',
        unitId: 'unit-c9-1',
        classLevel: 9,
        title: 'Tatpurusha and Karmadharaya Samasas',
        titleKn: 'ತತ್ಪುರುಷ ಮತ್ತು ಕರ್ಮಧಾರಯ ಸಮಾಸಗಳ ಪರಿಚಯ',
        category: 'grammar',
        objectives: ['Deconstruct compound nouns and identify their grammatical class'],
        content: {
          explanation: 'When two words join without losing meaning, dropping inner case suffixes, they form a Samasa.',
          sections: [
            {
              heading: 'Classic Examples',
              body: 'Aramane (Palace) and Hemmara (Huge Tree).',
              examples: [
                { kannada: 'ಅರಸನ + ಮನೆ = ಅರಮನೆ (ತತ್ಪುರುಷ)', transliteration: 'Arasana + mane = Aramane', english: 'King\'s house = Palace' },
                { kannada: 'ಹಿರಿದಾದ + ಮರ = ಹೆಮ್ಮರ (ಕರ್ಮಧಾರಯ)', transliteration: 'Hiridaada + mara = Hemmara', english: 'Huge tree' },
                { kannada: 'ತಾಯಿ + ತಂದೆ = ತಾಯಿತಂದೆ (ದ್ವಂದ್ವ)', transliteration: 'Taayi + Tande = Taayitande', english: 'Parents (Mother and Father)' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c9-s',
            type: 'multiple-choice',
            prompt: '"ಅರಸನ + ಮನೆ = ಅರಮನೆ" is an example of which Samasa?',
            options: ['ತತ್ಪುರುಷ ಸಮಾಸ (Tatpurusha)', 'ದ್ವಂದ್ವ ಸಮಾಸ (Dvandva)', 'ಬಹುಬ್ರೀಹಿ ಸಮಾಸ (Bahuvrihi)', 'ಕ್ರಿಯಾ ಸಮಾಸ (Kriya)'],
            answer: 'ತತ್ಪುರುಷ ಸಮಾಸ (Tatpurusha)',
            explanation: 'When the preceding word has a vibhakti relationship, it is Tatpurusha.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 10: Vachanas & Classical Literature (ಸಾಹಿತ್ಯ & ವಚನ ಸಾಹಿತ್ಯ)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c10-1',
    classLevel: 10,
    unitNumber: 1,
    title: 'Vachana Literature & Social Philosophy (ವಚನಗಳು)',
    titleKn: 'ಬಸವಣ್ಣ, ಅಕ್ಕಮಹಾದೇವಿ ಮತ್ತು ಅಲ್ಲಮಪ್ರಭು',
    description: 'Explore the 12th-century socio-spiritual revolution through profound Kannada rhythmic prose.',
    category: 'comprehension',
    estimatedMinutes: 40,
    lessons: [
      {
        id: 'lesson-c10-vachana',
        unitId: 'unit-c10-1',
        classLevel: 10,
        title: 'Basavanna: "Kaayakave Kailaasa"',
        titleKn: 'ಕಾಯಕವೇ ಕೈಲಾಸ - ವಚನದ ಗಹನ ಅರ್ಥ',
        category: 'comprehension',
        objectives: ['Analyze the moral philosophy and linguistic meter of Vachanas'],
        content: {
          explanation: 'Basavanna taught that dedicated honest labor is heavenly bliss (Kayakave Kailasa), demystifying spirituality for ordinary folk.',
          sections: [
            {
              heading: 'The Sacred Verse',
              body: 'ಉಳ್ಳವರು ಶಿವಾಲಯ ಮಾಡುವರು, ನಾನೇನ ಮಾಡುವೆ ಬಡವನಯ್ಯಾ... ಎನ್ನ ಕಾಲೇ ಕಂಬ, ದೇಹವೇ ದೇಗುಲ, ಶಿರವೇ ಹೊನ್ನ ಕಳಶವಯ್ಯಾ.',
              examples: [
                { kannada: 'ಎನ್ನ ಕಾಲೇ ಕಂಬ, ದೇಹವೇ ದೇಗುಲ.', transliteration: 'Enna kaale kamba, dehave degula.', english: 'My legs are the pillars, my body is the temple shrine.' }
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c10-v',
            type: 'multiple-choice',
            prompt: 'In Basavanna\'s vachana, what is likened to stone pillars (ಕಂಬ)?',
            options: ['ಕಾಲೇ ಕಂಬ (Legs)', 'ಕೈಯೇ ಕಂಬ (Hands)', 'ಮನಸ್ಸು (Mind)', 'ಶಿರ (Head)'],
            answer: 'ಕಾಲೇ ಕಂಬ (Legs)',
            explanation: 'Basavanna metaphorically envisions his legs as temple pillars supporting the divine living body.'
          }
        ],
        estimatedMinutes: 20,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 3 — UNIT 2: Daily Routine & Pronouns
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c3-2',
    classLevel: 3,
    unitNumber: 2,
    title: 'Personal Pronouns & Daily Routine',
    titleKn: 'ಸರ್ವನಾಮಗಳು ಮತ್ತು ದಿನಚರಿ',
    description: 'Learn personal pronouns, possessives and describe a day-in-the-life using simple Kannada sentences.',
    category: 'grammar',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'lesson-c3-pronouns',
        unitId: 'unit-c3-2',
        classLevel: 3,
        title: 'Personal Pronouns in Kannada',
        titleKn: 'ಕನ್ನಡ ಸರ್ವನಾಮಗಳ ಪಟ್ಟಿ',
        category: 'grammar',
        objectives: ['Identify first/second/third person pronouns', 'Use pronouns correctly in sentences'],
        content: {
          explanation: 'Kannada has formal and informal versions of "you". Always use the respectful form ನೀವು (neevu) with elders.',
          sections: [
            {
              heading: 'Subject Pronouns Table',
              body: 'Memorise these before building sentences.',
              examples: [
                { kannada: 'ನಾನು', transliteration: 'Naanu', english: 'I (first person singular)' },
                { kannada: 'ನೀನು', transliteration: 'Neenu', english: 'You (informal / singular)' },
                { kannada: 'ನೀವು', transliteration: 'Neevu', english: 'You (formal / plural)' },
                { kannada: 'ಅವನು', transliteration: 'Avanu', english: 'He' },
                { kannada: 'ಅವಳು', transliteration: 'Avalu', english: 'She' },
                { kannada: 'ಅದು', transliteration: 'Adu', english: 'It' },
                { kannada: 'ನಾವು', transliteration: 'Naavu', english: 'We' },
                { kannada: 'ಅವರು', transliteration: 'Avaru', english: 'They / He or She (respectful)' },
              ]
            },
            {
              heading: 'Daily Routine Sentences',
              body: 'Use pronouns to describe your day.',
              examples: [
                { kannada: 'ನಾನು ಬೆಳಿಗ್ಗೆ ಎದ್ದೇಳುತ್ತೇನೆ.', transliteration: 'Naanu beligge eddeluttene.', english: 'I wake up in the morning.' },
                { kannada: 'ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ.', transliteration: 'Naanu shaalege hooguttene.', english: 'I go to school.' },
                { kannada: 'ನಾವು ಊಟ ಮಾಡುತ್ತೇವೆ.', transliteration: 'Naavu oota maadutte ve.', english: 'We eat lunch.' },
                { kannada: 'ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಾರೆ.', transliteration: 'Avaru kelasa maadutt aare.', english: 'They/He/She works.' },
              ]
            }
          ],
          vocabulary: [
            { kannada: 'ಬೆಳಿಗ್ಗೆ', english: 'Morning', transliteration: 'beligge' },
            { kannada: 'ಸಂಜೆ', english: 'Evening', transliteration: 'sanje' },
            { kannada: 'ರಾತ್ರಿ', english: 'Night', transliteration: 'raatri' },
            { kannada: 'ಶಾಲೆ', english: 'School', transliteration: 'shaale' },
            { kannada: 'ಊಟ', english: 'Meal/Lunch', transliteration: 'oota' },
          ]
        },
        exercises: [
          {
            id: 'ex-c3-p1',
            type: 'multiple-choice',
            prompt: 'What is the respectful/plural "You" in Kannada?',
            options: ['ನೀನು (Neenu)', 'ನೀವು (Neevu)', 'ಅವರು (Avaru)', 'ನಾವು (Naavu)'],
            answer: 'ನೀವು (Neevu)',
            explanation: 'ನೀವು is used for elders, strangers, and formal situations.'
          }
        ],
        estimatedMinutes: 12,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 5 — UNIT 2: Occupations & Civics Vocabulary
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c5-2',
    classLevel: 5,
    unitNumber: 2,
    title: 'Occupations & Community Life',
    titleKn: 'ವೃತ್ತಿಗಳು ಮತ್ತು ಸಮಾಜ ಜೀವನ',
    description: 'Expand vocabulary around jobs, public services, and civic responsibilities in Kannada.',
    category: 'vocabulary',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'lesson-c5-jobs',
        unitId: 'unit-c5-2',
        classLevel: 5,
        title: 'Jobs and Professions in Kannada',
        titleKn: 'ಕನ್ನಡದಲ್ಲಿ ವೃತ್ತಿ ಪದಗಳು',
        category: 'vocabulary',
        objectives: ['Name at least 15 professions in Kannada', 'Describe a person\'s job using simple sentences'],
        content: {
          explanation: 'In Kannada, job titles often end in -ರು (-ru) to show the person doing that work.',
          sections: [
            {
              heading: 'Common Professions',
              body: 'Learn these words for daily use.',
              examples: [
                { kannada: 'ವೈದ್ಯರು', transliteration: 'Vaidyaru', english: 'Doctor' },
                { kannada: 'ಶಿಕ್ಷಕರು', transliteration: 'Shikshakaru', english: 'Teacher' },
                { kannada: 'ರೈತ', transliteration: 'Raita', english: 'Farmer' },
                { kannada: 'ಪೊಲೀಸ್', transliteration: 'Polees', english: 'Police Officer' },
                { kannada: 'ಇಂಜಿನಿಯರ್', transliteration: 'Injiniyar', english: 'Engineer' },
                { kannada: 'ನರ್ಸ್', transliteration: 'Nars', english: 'Nurse' },
                { kannada: 'ಅಡುಗೆಯವರು', transliteration: 'Adugeyavaru', english: 'Cook / Chef' },
                { kannada: 'ವ್ಯಾಪಾರಿ', transliteration: 'Vyaapaari', english: 'Merchant / Shopkeeper' },
              ]
            },
            {
              heading: 'Sentences About Jobs',
              body: 'Practice using occupation words in context.',
              examples: [
                { kannada: 'ಅವರು ವೈದ್ಯರು.', transliteration: 'Avaru vaidyaru.', english: 'He/She is a doctor.' },
                { kannada: 'ನನ್ನ ತಂದೆ ರೈತ.', transliteration: 'Nanna tande raita.', english: 'My father is a farmer.' },
                { kannada: 'ಆ ಮಹಿಳೆ ಶಿಕ್ಷಕಿ.', transliteration: 'Aa mahile shikshaki.', english: 'That woman is a teacher.' },
              ]
            }
          ],
          vocabulary: [
            { kannada: 'ವೃತ್ತಿ', english: 'Occupation / Profession', transliteration: 'vritti' },
            { kannada: 'ಕೆಲಸ', english: 'Work / Job', transliteration: 'kelasa' },
            { kannada: 'ಸಂಬಳ', english: 'Salary', transliteration: 'sambala' },
          ]
        },
        exercises: [
          {
            id: 'ex-c5-jobs1',
            type: 'multiple-choice',
            prompt: 'What does ಶಿಕ್ಷಕರು (Shikshakaru) mean?',
            options: ['Doctor', 'Teacher', 'Farmer', 'Engineer'],
            answer: 'Teacher',
            explanation: 'ಶಿಕ್ಷಕ means teacher; the suffix -ರು marks the person respectfully.'
          }
        ],
        estimatedMinutes: 13,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 6 — UNIT 2: Pronouns and Possession
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c6-2',
    classLevel: 6,
    unitNumber: 2,
    title: 'Possessives & Noun Agreement',
    titleKn: 'ಸ್ವಾಮ್ಯ ಸರ್ವನಾಮ ಮತ್ತು ನಾಮ ಒಪ್ಪಂದ',
    description: 'Learn how Kannada expresses ownership and how adjectives agree with nouns in gender and number.',
    category: 'grammar',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'lesson-c6-possessives',
        unitId: 'unit-c6-2',
        classLevel: 6,
        title: 'Possessive Pronouns and Ownership',
        titleKn: 'ನನ್ನ, ನಿನ್ನ, ಅವನ, ಅವಳ — ಸ್ವಾಮ್ಯ ಸರ್ವನಾಮ',
        category: 'grammar',
        objectives: ['Use possessive pronouns correctly', 'Understand gender agreement in Kannada'],
        content: {
          explanation: 'Kannada possessives are formed by adding -ನ (-na) to the pronoun root. They must agree with the gender of the possessed noun.',
          sections: [
            {
              heading: 'Possessive Pronoun Table',
              body: 'Each possessive combines the pronoun root + -ನ or -ರ.',
              examples: [
                { kannada: 'ನನ್ನ ಮನೆ', transliteration: 'Nanna mane', english: 'My house' },
                { kannada: 'ನಿನ್ನ ಹೆಸರು', transliteration: 'Ninna hesaru', english: 'Your name (informal)' },
                { kannada: 'ಅವನ ಪುಸ್ತಕ', transliteration: 'Avana pustaka', english: 'His book' },
                { kannada: 'ಅವಳ ಶಾಲೆ', transliteration: 'Avala shaale', english: 'Her school' },
                { kannada: 'ನಮ್ಮ ದೇಶ', transliteration: 'Namma desha', english: 'Our country' },
                { kannada: 'ಅವರ ಕುಟುಂಬ', transliteration: 'Avara kutumba', english: 'Their/His/Her family (respectful)' },
              ]
            }
          ],
          vocabulary: [
            { kannada: 'ಮನೆ', english: 'House', transliteration: 'mane' },
            { kannada: 'ಹೆಸರು', english: 'Name', transliteration: 'hesaru' },
            { kannada: 'ಪುಸ್ತಕ', english: 'Book', transliteration: 'pustaka' },
            { kannada: 'ದೇಶ', english: 'Country', transliteration: 'desha' },
          ]
        },
        exercises: [
          {
            id: 'ex-c6-pos1',
            type: 'multiple-choice',
            prompt: 'How do you say "My house" in Kannada?',
            options: ['ನಿನ್ನ ಮನೆ (Ninna mane)', 'ನಮ್ಮ ಮನೆ (Namma mane)', 'ನನ್ನ ಮನೆ (Nanna mane)', 'ಅವನ ಮನೆ (Avana mane)'],
            answer: 'ನನ್ನ ಮನೆ (Nanna mane)',
            explanation: 'ನನ್ನ is the first person singular possessive, meaning "my".'
          }
        ],
        estimatedMinutes: 12,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 7 — UNIT 2: Poetry & Proverbs (ಜಾನಪದ ಮತ್ತು ಗಾದೆಗಳು)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c7-2',
    classLevel: 7,
    unitNumber: 2,
    title: 'Folk Proverbs & Idioms',
    titleKn: 'ಗಾದೆಗಳು ಮತ್ತು ನುಡಿಗಟ್ಟುಗಳು',
    description: 'Explore popular Kannada proverbs and their cultural wisdom, learning figurative language.',
    category: 'reading',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'lesson-c7-proverbs',
        unitId: 'unit-c7-2',
        classLevel: 7,
        title: '10 Famous Kannada Proverbs Explained',
        titleKn: 'ಕನ್ನಡ ಗಾದೆಗಳ ಅರ್ಥ ಮತ್ತು ಬಳಕೆ',
        category: 'reading',
        objectives: ['Recognise figurative meaning vs. literal meaning', 'Recall at least 5 Kannada proverbs'],
        content: {
          explanation: 'Kannada proverbs (ಗಾದೆ — gaade) carry deep folk wisdom passed through generations.',
          sections: [
            {
              heading: 'Selected Proverbs with Meanings',
              body: 'Each proverb teaches a life lesson.',
              examples: [
                { kannada: 'ಕೆಟ್ಟ ಮೇಲೆ ಬುದ್ಧಿ ಬಂತು.', transliteration: 'Ketta meele buddhi bantu.', english: 'Wisdom comes after making a mistake. (Learn from your errors.)' },
                { kannada: 'ಆನೆ ಬಂತು ಆನೆ ಬಂತು ಅಂದ್ರೆ ಬಾಲ ನೋಡಿದ.', transliteration: 'Aane bantu aane bantu andre baala nodida.', english: 'Even when told an elephant came, he saw only its tail. (Wilful blindness to reality.)' },
                { kannada: 'ಹೊಟ್ಟೆ ತಾಳಿದರೆ ರೊಟ್ಟಿ ತಾಳಬಹುದು.', transliteration: 'Hotte taalidare rotti taalabahuda.', english: 'If the stomach endures, even bread can be found. (Patience is rewarded.)' },
                { kannada: 'ಕಲಿ ಮರ ಎಂದಿಗೂ ಬೆಳೆಯದು.', transliteration: 'Kali mara endigu beleyadu.', english: 'A charcoal tree never grows. (Bad nature doesn\'t change.)' },
                { kannada: 'ಸಮಯ ಸಾಧ್ಯವಾದಾಗ ಕೆಲಸ ಮಾಡು.', transliteration: 'Samaya saadhyavaadaaga kelasa maadu.', english: 'Do the work when opportunity comes. (Strike while the iron is hot.)' },
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c7-prv1',
            type: 'multiple-choice',
            prompt: '"ಕೆಟ್ಟ ಮೇಲೆ ಬುದ್ಧಿ ಬಂತು" means:',
            options: [
              'Wisdom came before the mistake',
              'Wisdom comes after making a mistake',
              'Making mistakes is forbidden',
              'Wisdom is found in books'
            ],
            answer: 'Wisdom comes after making a mistake',
            explanation: 'This proverb teaches that we often learn best from our own errors.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 8 — UNIT 2: Comprehension & Essay Writing
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c8-2',
    classLevel: 8,
    unitNumber: 2,
    title: 'Comprehension Passages & Essay Skills',
    titleKn: 'ಗದ್ಯ ಓದು ಮತ್ತು ಪ್ರಬಂಧ ಬರಹ',
    description: 'Read and analyse Kannada passages, then structure short essays with introduction and conclusion.',
    category: 'comprehension',
    estimatedMinutes: 35,
    lessons: [
      {
        id: 'lesson-c8-essay',
        unitId: 'unit-c8-2',
        classLevel: 8,
        title: 'Writing a Short Essay in Kannada',
        titleKn: 'ಕನ್ನಡದಲ್ಲಿ ಪ್ರಬಂಧ ರಚನೆ',
        category: 'writing',
        objectives: ['Structure a 3-paragraph essay in Kannada', 'Write an introduction, body, and conclusion'],
        content: {
          explanation: 'A Kannada essay (ಪ್ರಬಂಧ) has three parts: introduction (ಪೀಠಿಕೆ), development (ವಿಷಯ ವಿವರಣೆ), and conclusion (ಉಪಸಂಹಾರ).',
          sections: [
            {
              heading: 'Essay on "My Favourite Festival — Deepavali"',
              body: 'Sample essay showing the 3-part structure.',
              examples: [
                { kannada: 'ಪೀಠಿಕೆ: ಭಾರತದಲ್ಲಿ ಅನೇಕ ಹಬ್ಬಗಳು ಆಚರಿಸಲ್ಪಡುತ್ತವೆ.', transliteration: 'Peethike: Bhaaratadalli aneka habbagalu aacharisalpadutt ave.', english: 'Introduction: Many festivals are celebrated in India.' },
                { kannada: 'ಆದರೆ ದೀಪಾವಳಿ ನನ್ನ ಅತ್ಯಂತ ಪ್ರಿಯವಾದ ಹಬ್ಬ.', transliteration: 'Aadare Deepavali nanna atyanta priyavaada habba.', english: 'But Deepavali is my most favourite festival.' },
                { kannada: 'ಉಪಸಂಹಾರ: ದೀಪಾವಳಿ ಆನಂದ ಮತ್ತು ಬೆಳಕಿನ ಹಬ್ಬ.', transliteration: 'Upasanhaara: Deepavali aananda mattu belakina habba.', english: 'Conclusion: Deepavali is a festival of joy and light.' },
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c8-e1',
            type: 'multiple-choice',
            prompt: 'What is the Kannada word for "Introduction" in an essay?',
            options: ['ವಿಷಯ (Vishaya)', 'ಪೀಠಿಕೆ (Peethike)', 'ಉಪಸಂಹಾರ (Upasanhaara)', 'ಪ್ರಬಂಧ (Prabandha)'],
            answer: 'ಪೀಠಿಕೆ (Peethike)',
            explanation: 'ಪೀಠಿಕೆ means the opening/introduction section of an essay or speech.'
          }
        ],
        estimatedMinutes: 20,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 9 — UNIT 2: Idioms, Figures of Speech
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c9-2',
    classLevel: 9,
    unitNumber: 2,
    title: 'Figures of Speech & Literary Devices',
    titleKn: 'ಅಲಂಕಾರಗಳು ಮತ್ತು ಭಾವಾಲಂಕಾರ',
    description: 'Identify and use simile, metaphor, alliteration and other alankaaras in Kannada poetry and prose.',
    category: 'grammar',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'lesson-c9-alankaara',
        unitId: 'unit-c9-2',
        classLevel: 9,
        title: 'Alankaara — Figures of Speech in Kannada',
        titleKn: 'ಉಪಮೆ, ರೂಪಕ ಮತ್ತು ಅನುಪ್ರಾಸ ಅಲಂಕಾರ',
        category: 'grammar',
        objectives: ['Identify Upama (simile) and Rupaka (metaphor) in passages', 'Write one original sentence using each figure of speech'],
        content: {
          explanation: 'ಅಲಂಕಾರ (Alankaara) means "ornament". These literary devices embellish writing and poetry.',
          sections: [
            {
              heading: 'Upama — Simile (ಉಪಮೆ)',
              body: 'Comparison using "like" or "as" — uses ಹಾಗೆ / ಇದ್ದಂತೆ / ಎಂಬಂತೆ.',
              examples: [
                { kannada: 'ಅವಳ ಮುಖ ಚಂದ್ರನ ಹಾಗಿದೆ.', transliteration: 'Avala mukha chandrana haaagide.', english: 'Her face is like the moon. (Simile)' },
                { kannada: 'ಅವನ ಧ್ವನಿ ಗುಡುಗಿನ ಹಾಗಿದೆ.', transliteration: 'Avana dhvani gudugina haaagide.', english: 'His voice is like thunder. (Simile)' },
              ]
            },
            {
              heading: 'Rupaka — Metaphor (ರೂಪಕ)',
              body: 'Direct identification; the comparison word is dropped.',
              examples: [
                { kannada: 'ಕಣ್ಣು ಸರೋವರ.', transliteration: 'Kannu sarovara.', english: 'Eyes are a lake. (Metaphor)' },
                { kannada: 'ಬದುಕು ಒಂದು ಪ್ರಯಾಣ.', transliteration: 'Baduku ondu prayaana.', english: 'Life is a journey. (Metaphor)' },
              ]
            }
          ]
        },
        exercises: [
          {
            id: 'ex-c9-al1',
            type: 'multiple-choice',
            prompt: '"ಅವಳ ಮುಖ ಚಂದ್ರನ ಹಾಗಿದೆ" is an example of:',
            options: ['ರೂಪಕ (Metaphor)', 'ಉಪಮೆ (Simile)', 'ಅನುಪ್ರಾಸ (Alliteration)', 'ಯಮಕ (Rhyme)'],
            answer: 'ಉಪಮೆ (Simile)',
            explanation: 'The word ಹಾಗಿದೆ (haaagide — "is like") signals a simile comparison.'
          }
        ],
        estimatedMinutes: 15,
        order: 1
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLASS 10 — UNIT 2: Advanced Composition & Public Speaking
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'unit-c10-2',
    classLevel: 10,
    unitNumber: 2,
    title: 'Advanced Composition & Public Speaking',
    titleKn: 'ಉನ್ನತ ಬರಹ ಕೌಶಲ ಮತ್ತು ಭಾಷಣ',
    description: 'Prepare for Class 10 Kannada board exams with advanced writing, comprehension and oral speaking skills.',
    category: 'speaking',
    estimatedMinutes: 40,
    lessons: [
      {
        id: 'lesson-c10-speech',
        unitId: 'unit-c10-2',
        classLevel: 10,
        title: 'Delivering a Speech in Kannada',
        titleKn: 'ಕನ್ನಡದಲ್ಲಿ ಭಾಷಣ ನೀಡುವ ಕಲೆ',
        category: 'speaking',
        objectives: ['Open a speech with a respectful greeting', 'Present a clear argument and close formally'],
        content: {
          explanation: 'A Kannada speech starts with formal greetings to the gathering and ends with a polite close.',
          sections: [
            {
              heading: 'Speech Opening Phrases',
              body: 'Use these to begin your speech confidently.',
              examples: [
                { kannada: 'ಗೌರವಾನ್ವಿತ ಅಧ್ಯಕ್ಷರೇ, ಶಿಕ್ಷಕರೇ ಮತ್ತು ಪ್ರಿಯ ವಿದ್ಯಾರ್ಥಿ ಮಿತ್ರರೇ.', transliteration: 'Gowravaanvita adhyakshare, shikshakare mattu priya vidyaarthi mitare.', english: 'Respected Chairperson, teachers and dear student friends.' },
                { kannada: 'ಇಂದು ನಾನು ಮಾತನಾಡಲಿರುವ ವಿಷಯ...', transliteration: 'Indu naanu maatanaadaliru va vishaya...', english: 'Today the topic on which I am going to speak is...' },
                { kannada: 'ಧನ್ಯವಾದಗಳು!', transliteration: 'Dhanyavaadagalu!', english: 'Thank you!' },
              ]
            },
            {
              heading: 'Exam-Ready Vocabulary',
              body: 'Key words that appear frequently in Class 10 papers.',
              examples: [
                { kannada: 'ಸ್ವಾತಂತ್ರ್ಯ', transliteration: 'Svaatantrya', english: 'Independence / Freedom' },
                { kannada: 'ಸಮಾನತೆ', transliteration: 'Samaanate', english: 'Equality' },
                { kannada: 'ಪ್ರಜಾಪ್ರಭುತ್ವ', transliteration: 'Prajaaprabhuutva', english: 'Democracy' },
                { kannada: 'ಕನ್ನಡ ನಾಡು', transliteration: 'Kannada Naadu', english: 'The land of Kannada / Karnataka' },
              ]
            }
          ],
          vocabulary: [
            { kannada: 'ಭಾಷಣ', english: 'Speech', transliteration: 'bhaashana' },
            { kannada: 'ವಿಷಯ', english: 'Topic / Subject', transliteration: 'vishaya' },
            { kannada: 'ಗೌರವ', english: 'Respect / Honour', transliteration: 'gowrava' },
          ]
        },
        exercises: [
          {
            id: 'ex-c10-sp1',
            type: 'multiple-choice',
            prompt: 'How do you say "Thank you" in Kannada?',
            options: ['ನಮಸ್ಕಾರ (Namaskara)', 'ಧನ್ಯವಾದಗಳು (Dhanyavaadagalu)', 'ಕ್ಷಮಿಸಿ (Kshamisi)', 'ಸ್ವಾಗತ (Svaagata)'],
            answer: 'ಧನ್ಯವಾದಗಳು (Dhanyavaadagalu)',
            explanation: 'ಧನ್ಯವಾದಗಳು is the formal way to say "Thank you" in Kannada.'
          }
        ],
        estimatedMinutes: 20,
        order: 1
      }
    ]
  },
];
