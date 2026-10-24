import fs from 'fs';
import path from 'path';

// Definition of all 31 verified lessons from the Kannada Sahitya Parishat reference book
export interface LessonMeta {
  num: number;
  section: number; // 1, 2, 3, 4
  sectionTitle: string;
  title: string;
  titleKn: string;
  focus: string;
  desc: string;
  category: 'conversation' | 'grammar' | 'vocabulary' | 'writing' | 'comprehension';
  objectives: string[];
  explanation: string;
  dialogueHeading: string;
  dialogueBody: string;
  examples: { kannada: string; transliteration: string; english: string }[];
  vocabulary: { id: string; english: string; kannada: string; transliteration: string; meaning: string }[];
  grammarNotes: string[];
  exercise: {
    prompt: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

export const BOOK_31_LESSONS: LessonMeta[] = [
  // SECTION 1: Start Speaking (Lessons 1 to 5)
  {
    num: 1,
    section: 1,
    sectionTitle: 'Start Speaking',
    title: 'Personal Pronouns, Names & Greetings',
    titleKn: 'ಪರಿಚಯ, ಹೆಸರುಗಳು ಮತ್ತು ಸರ್ವನಾಮಗಳು',
    focus: 'Human Pronouns (naanu, avaru), Possessives (nanna, avara), Question words (yaaru, eenu), Interrogative -aa/-naa',
    desc: 'Learn basic social rituals (Namaskaara), introducing yourself, asking names, and understanding family relations.',
    category: 'conversation',
    objectives: ['Master Namaskaara and social greetings', 'Use naanu (I), nanna (my), niivu (you), nimma (your)', 'Ask names with eenu (what) and yaaru (who)'],
    explanation: 'In spoken Kannada, sentences often pair pronouns with names without needing the verb "to be". Adding the suffix "-aa" or "-naa" turns any statement into a question.',
    dialogueHeading: 'Self-Introduction & Polite Inquiries',
    dialogueBody: 'Key interactions from Lesson 1 of Kannada Sahitya Parishat.',
    examples: [
      { kannada: 'ನಮಸ್ಕಾರ, ನಾನು ರಾಜು.', transliteration: 'Namaskaara, naanu raaju.', english: 'Hello, I am Raju.' },
      { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು? ನನ್ನ ಹೆಸರು ಶೇಖರ್.', transliteration: 'Nimma hesareenu? Nanna hesaru seekhar.', english: 'What is your name? My name is Shekhar.' },
      { kannada: 'ಇವರು ನನ್ನ ಸ್ನೇಹಿತರು; ಇವರ ಹೆಸರು ಮೋಹನ್.', transliteration: 'Ivaru nanna sneehitru; ivara hesaru moohan.', english: 'He is my friend; his name is Mohan.' },
      { kannada: 'ಅವರು ನಿಮ್ಮ ತಂದೆನಾ? ಹೌದು, ಅವರು ನಮ್ಮ ತಂದೆ.', transliteration: 'Avaru nimma tandenaa? Haudu, avaru namma tande.', english: 'Is he your father? Yes, he is our father.' }
    ],
    vocabulary: [
      { id: 'v1-1', english: 'I', kannada: 'ನಾನು', transliteration: 'naanu', meaning: 'First-person singular pronoun' },
      { id: 'v1-2', english: 'My', kannada: 'ನನ್ನ', transliteration: 'nanna', meaning: 'First-person possessive' },
      { id: 'v1-3', english: 'You (polite)', kannada: 'ನೀವು', transliteration: 'niivu', meaning: 'Second-person respectful pronoun' },
      { id: 'v1-4', english: 'Your', kannada: 'ನಿಮ್ಮ', transliteration: 'nimma', meaning: 'Second-person possessive' },
      { id: 'v1-5', english: 'Who', kannada: 'ಯಾರು', transliteration: 'yaaru', meaning: 'Interrogative pronoun for persons' },
      { id: 'v1-6', english: 'Friend', kannada: 'ಸ್ನೇಹಿತರು', transliteration: 'sneehitru', meaning: 'Friend (respectful/plural)' }
    ],
    grammarNotes: [
      'Kannada pronouns distinguish between respectful/formal (ನೀವು/ಅವರು) and intimate/informal (ನೀನು/ಅವನು/ಅವಳು).',
      'The suffix -aa / -naa turns an assertion into a yes/no question: ತಂದೆ (father) → ತಂದೆನಾ? (is he father?).'
    ],
    exercise: {
      prompt: 'How do you politely ask "What is your name?" in Kannada?',
      options: ['ನಿಮ್ಮ ಹೆಸರೇನು? (Nimma hesareenu?)', 'ಅವರು ಯಾರು? (Avaru yaaru?)', 'ಇದು ಏನು? (Idu eenu?)', 'ನೀವು ಯಾರು? (Niivu yaaru?)'],
      answer: 'ನಿಮ್ಮ ಹೆಸರೇನು? (Nimma hesareenu?)',
      explanation: '"Nimma hesareenu?" combines nimma (your polite) + hesaru (name) + eenu (what).'
    }
  },
  {
    num: 2,
    section: 1,
    sectionTitle: 'Start Speaking',
    title: 'Demonstratives & Quality Adjectives',
    titleKn: 'ಇದು, ಅದು ಮತ್ತು ಗುಣವಾಚಕಗಳು',
    focus: 'Non-human pronouns (idu/adu/avu), possessive (idara/adara), descriptive adjectives (ollee, ketta, dodda, cikka)',
    desc: 'Distinguish proximal (this/idu) from distal (that/adu) and describe objects with simple adjectives.',
    category: 'conversation',
    objectives: ['Point out things near (idu) and far (adu)', 'Use basic adjectives: olle (good), ketta (bad), dodda (big), cikka (small)', 'Ask "which book/house" using yaavadu'],
    explanation: 'Demonstrative pronouns idu (this) and adu (that) form the core of everyday Kannada references. Adjectives directly precede the noun they describe.',
    dialogueHeading: 'Identifying Books and Houses',
    dialogueBody: 'Everyday conversations contrasting new, old, big, and small possessions.',
    examples: [
      { kannada: 'ಇದು ಏನು? ಇದು ಕಥೆ ಪುಸ್ತಕ.', transliteration: 'Idu eenu? Idu kate pustaka.', english: 'What is this? This is a story book.' },
      { kannada: 'ಇದು ನಿಮ್ಮ ಹೊಸ ಪುಸ್ತಕನಾ? ಹೌದು, ಇದು ಒಳ್ಳೆಯ ಪುಸ್ತಕ.', transliteration: 'Idu nimma hosa pustakanaa? Haudu, idu ollee pustaka.', english: 'Is this your new book? Yes, this is a good book.' },
      { kannada: 'ನಿಮ್ಮ ಮನೆ ಯಾವುದು? ಅದು ನಮ್ಮ ಮನೆ, ಚಿಕ್ಕ ಮನೆ.', transliteration: 'Nimma mane yaavadu? Adu namma mane, cikka mane.', english: 'Which is your house? That is our house, the small house.' },
      { kannada: 'ಅದು ತುಂಬಾ ದೊಡ್ಡ ಮನೆ.', transliteration: 'Adu tumba dodda mane.', english: 'That is a very big house.' }
    ],
    vocabulary: [
      { id: 'v2-1', english: 'This', kannada: 'ಇದು', transliteration: 'idu', meaning: 'Proximal demonstrative' },
      { id: 'v2-2', english: 'That', kannada: 'ಅದು', transliteration: 'adu', meaning: 'Distal demonstrative' },
      { id: 'v2-3', english: 'Good', kannada: 'ಒಳ್ಳೆ', transliteration: 'olle', meaning: 'Adjective of positive quality' },
      { id: 'v2-4', english: 'Big', kannada: 'ದೊಡ್ಡ', transliteration: 'dodda', meaning: 'Adjective of size' },
      { id: 'v2-5', english: 'Small', kannada: 'ಚಿಕ್ಕ', transliteration: 'cikka', meaning: 'Adjective of size' },
      { id: 'v2-6', english: 'Which one', kannada: 'ಯಾವುದು', transliteration: 'yaavadu', meaning: 'Question word for choice' }
    ],
    grammarNotes: [
      'In Kannada, adjectives like ದೊಡ್ಡ (big) and ಹೊಸ (new) precede the noun without change: ದೊಡ್ಡ ಮನೆ (big house).',
      'The word "tumba" acts as an intensifier meaning "very" or "much".'
    ],
    exercise: {
      prompt: 'Which phrase means "That is a very big house"?',
      options: ['ಅದು ತುಂಬಾ ದೊಡ್ಡ ಮನೆ (Adu tumba dodda mane)', 'ಇದು ಚಿಕ್ಕ ಪುಸ್ತಕ (Idu cikka pustaka)', 'ನಮ್ಮ ಮನೆ ಯಾವುದು? (Namma mane yaavadu?)', 'ಅದು ಒಳ್ಳೆಯ ಕಥೆ (Adu ollee kate)'],
      answer: 'ಅದು ತುಂಬಾ ದೊಡ್ಡ ಮನೆ (Adu tumba dodda mane)',
      explanation: 'Adu (that) + tumba (very) + dodda (big) + mane (house).'
    }
  },
  {
    num: 3,
    section: 1,
    sectionTitle: 'Start Speaking',
    title: 'Pronominal Predicates & Ownership',
    titleKn: 'ಸ್ವಾಮ್ಯಸೂಚಕ ಪದಗಳು (ನಂದು, ನಿಮ್ಮದು)',
    focus: 'Pronominal predicates (nandu, nindu, nimdu, avardu, nandalla), demonstrative particles (ii, aa), cardinal numerals & plurals (-gaLu)',
    desc: 'Master asserting ownership (mine, yours, his) and using demonstrative adjectives ii (this) and aa (that).',
    category: 'conversation',
    objectives: ['Express "mine" (nandu), "yours" (nimdu), "theirs" (avardu)', 'Form negative ownership: nandalla (not mine)', 'Attach -gaLu to form non-human plurals'],
    explanation: 'By adding "-du" to possessives, Kannada creates standalone pronominal nouns: nanna (my) → nandu (mine). Negating is simple with "-alla": nandalla (not mine).',
    dialogueHeading: 'Claiming Possessions in Class',
    dialogueBody: 'Dialogue about pens, notebooks, and classrooms.',
    examples: [
      { kannada: 'ಈ ಚಿಕ್ಕ ಪುಸ್ತಕ ನಂದು.', transliteration: 'Ii cikka pustaka nandu.', english: 'This small book is mine.' },
      { kannada: 'ಆ ಪೆನ್ನು ಯಾರ್ದು? ಆ ಪೆನ್ನು ನಿಮ್ದು.', transliteration: 'Aa pennu yaardu? Aa pennu nimdu.', english: 'Whose is that pen? That pen is yours.' },
      { kannada: 'ಅಲ್ಲ, ಆ ಪೆನ್ನು ನಂದಲ್ಲ, ಅದು ಅವರ ಪೆನ್ನು.', transliteration: 'Alla, aa pennu nandalla, adu avara pennu.', english: 'No, that pen is not mine; that is his pen.' },
      { kannada: 'ಆ ಎಲ್ಲಾ ಪುಸ್ತಕಗಳು ಅವರ್ದು.', transliteration: 'Aa ellaa pustakagaLu avardu.', english: 'All those books are theirs.' }
    ],
    vocabulary: [
      { id: 'v3-1', english: 'Mine', kannada: 'ನಂದು', transliteration: 'nandu', meaning: 'That which belongs to me' },
      { id: 'v3-2', english: 'Yours', kannada: 'ನಿಮ್ದು', transliteration: 'nimdu', meaning: 'That which belongs to you' },
      { id: 'v3-3', english: 'Not mine', kannada: 'ನಂದಲ್ಲ', transliteration: 'nandalla', meaning: 'Negative possession' },
      { id: 'v3-4', english: 'Whose (one)', kannada: 'ಯಾರ್ದು', transliteration: 'yaardu', meaning: 'Question of ownership' },
      { id: 'v3-5', english: 'This (adj)', kannada: 'ಈ', transliteration: 'ii', meaning: 'Demonstrative adjective' },
      { id: 'v3-6', english: 'That (adj)', kannada: 'ಆ', transliteration: 'aa', meaning: 'Demonstrative adjective' }
    ],
    grammarNotes: [
      'Difference between "idu" and "ii": idu stands alone as a noun ("idu pustaka" = this is a book), while ii modifies a noun ("ii pustaka" = this book).',
      'Plural suffix for non-human nouns is -gaLu: ಪುಸ್ತಕ (book) → ಪುಸ್ತಕಗಳು (books).'
    ],
    exercise: {
      prompt: 'How do you say "That pen is not mine"?',
      options: ['ಆ ಪೆನ್ನು ನಂದಲ್ಲ (Aa pennu nandalla)', 'ಈ ಪೆನ್ನು ನಂದು (Ii pennu nandu)', 'ಆ ಪೆನ್ನು ಯಾರ್ದು? (Aa pennu yaardu?)', 'ಇದು ಅವರ ಪೆನ್ನು (Idu avara pennu)'],
      answer: 'ಆ ಪೆನ್ನು ನಂದಲ್ಲ (Aa pennu nandalla)',
      explanation: '"Aa pennu nandalla" = That pen is not mine.'
    }
  },
  {
    num: 4,
    section: 1,
    sectionTitle: 'Start Speaking',
    title: 'Dative Case, Family & Numbers',
    titleKn: 'ಚತುರ್ಥಿ ವಿಭಕ್ತಿ (ನನಗೆ, ಮನೆಗೆ) ಮತ್ತು ಕುಟುಂಬ',
    focus: 'Dative case suffix (-kke, -(i)ge), human plurals (-andiru, -makLu), human numerals (obba, ibbru, muuru jana)',
    desc: 'Express "to/for" (rent for house, books for children) and talk about family size and prices.',
    category: 'grammar',
    objectives: ['Form dative cases: manege (to the house), pustakakke (for the book)', 'Count family members: obba (1 male), obLu (1 female), ibbru (2 persons)', 'Ask prices and quantities with eSTu'],
    explanation: 'The dative case marker -(i)ge / -kke corresponds to English "to" or "for". It is essential for costs, relations, and giving directions.',
    dialogueHeading: 'House Rent & Family Inquiries',
    dialogueBody: 'Inquiring about house rent, number of children, and tree fruits.',
    examples: [
      { kannada: 'ನಿಮ್ಮ ಮನೆಗೆ ಬಾಡಿಗೆ ಎಷ್ಟು? ತಿಂಗಳಿಗೆ ನೂರ ಐವತ್ತು ರೂಪಾಯಿ.', transliteration: 'Nimma manege baaDige eSTu? TingLige nuura aivattu ruupaayi.', english: 'What is the rent for your house? Rs. 150 per month.' },
      { kannada: 'ನಿಮಗೆ ಎಷ್ಟು ಜನ ಮಕ್ಕಳು? ಮೂರು ಜನ: ಇಬ್ಬರು ಗಂಡುಮಕ್ಕಳು, ಒಬ್ಬಳು ಮಗಳು.', transliteration: 'Nimage eSTu jana makLu? Muuru jana: ibbru gaNDumakLu, obLu magaLu.', english: 'How many children do you have? Three: two sons, one daughter.' },
      { kannada: 'ಒಂದು ಪುಸ್ತಕಕ್ಕೆ ಬೆಲೆ ಎಷ್ಟು? ಎಪ್ಪತ್ತೈದು ಪೈಸೆ.', transliteration: 'Ondu pustakakke bele eSTu? Eppattaidu paise.', english: 'What is the price for one book? 75 paise.' }
    ],
    vocabulary: [
      { id: 'v4-1', english: 'Rent', kannada: 'ಬಾಡಿಗೆ', transliteration: 'baaDige', meaning: 'Hire or lease amount' },
      { id: 'v4-2', english: 'Month', kannada: 'ತಿಂಗಳು', transliteration: 'tingaLu', meaning: 'Calendar month' },
      { id: 'v4-3', english: 'Price', kannada: 'ಬೆಲೆ', transliteration: 'bele', meaning: 'Cost of an item' },
      { id: 'v4-4', english: 'Two persons', kannada: 'ಇಬ್ಬರು', transliteration: 'ibbru', meaning: 'Numeral for two humans' },
      { id: 'v4-5', english: 'How much / many', kannada: 'ಎಷ್ಟು', transliteration: 'eSTu', meaning: 'Interrogative quantifier' }
    ],
    grammarNotes: [
      'Nouns ending in vowels typically take -ge (mane → manege), while neuter nouns often take -kke (pustaka → pustakakke).',
      'Counting people uses specialized forms: obba (1 male), obLu (1 female), ibbru (2 people), muuvru (3 people).'
    ],
    exercise: {
      prompt: 'What is the dative form of "mane" (house) meaning "to/for the house"?',
      options: ['ಮನೆಗೆ (Manege)', 'ಮನೆಯಲ್ಲಿ (Maneyalli)', 'ಮನೆಯಿಂದ (Maneyinda)', 'ಮನೆಯ (Maneya)'],
      answer: 'ಮನೆಗೆ (Manege)',
      explanation: 'Mane + ge = Manege (to the house).'
    }
  },
  {
    num: 5,
    section: 1,
    sectionTitle: 'Start Speaking',
    title: 'Locative Case, Ordinals & Weekdays',
    titleKn: 'ಸಪ್ತಮೀ ವಿಭಕ್ತಿ (ಅಲ್ಲಿ), ವಾರಗಳು ಮತ್ತು ಕ್ರಮವಾಚಕ',
    focus: 'Locative case suffix (-alli / -eeli), ordinal numerals (modalneedu, eraDaneyavanu), weekdays (bhaanuvaara... sanivaara), relative time (ninne, ivattu, naaLe)',
    desc: 'Describe where things are located, name days of the week, and use ordinal positions (first, second, third).',
    category: 'conversation',
    objectives: ['Express location with -alli: uuralli (in town), biidiili (in street)', 'Name days of the week and relative days (monne, ninne, ivattu, naaLe)', 'Use ordinals: modalnee (first), eradaneyavanu (second son)'],
    explanation: 'The locative case suffix -alli corresponds to "in", "at", or "on". Combined with postpositions (hinde = behind, pakka = beside), it locates anything in space.',
    dialogueHeading: 'Town Hotels, House Rows & Office Holidays',
    dialogueBody: 'Finding hotels in town, asking for shop holidays, and newspaper dates.',
    examples: [
      { kannada: 'ಈ ಊರಲ್ಲಿ ಒಳ್ಳೆ ಹೋಟೆಲ್ ಯಾವುದು? ಇಲ್ಲಿ ಸುಜಾತಾ ಒಳ್ಳೆ ಹೋಟೆಲ್.', transliteration: 'Ii uuralli olle hooTel yaavdu? Illi sujaata olle hooTel.', english: 'Which is a good hotel in this town? Sujatha is a good hotel here.' },
      { kannada: 'ಇವತ್ತು ಆಫೀಸಿಗೆ ರಜಾನಾ? ಹೌದು, ಇವತ್ತು ಭಾನುವಾರ ಅಲ್ವಾ.', transliteration: 'Ivattu aafiisige rajaanaa? Haudu, ivattu bhaanuvaara alvaa.', english: 'Is today an office holiday? Yes, isn\'t today Sunday.' },
      { kannada: 'ನಮ್ಮ ಅಂಗಡಿಗೆ ಮಂಗಳವಾರ ರಜಾ.', transliteration: 'Namma angaDige mangaLavaara raja.', english: 'Tuesday is a holiday for our shop.' },
      { kannada: 'ಮಣಿ ಮನೆ ಅದರ ಹಿಂದಿನದು; ಪಕ್ಕದ ಮನೆ ಶಂಕರ್ ಮನೆ.', transliteration: 'Mani mane adara hindinadu; pakkada mane sankar mane.', english: 'Mani\'s house is behind that; the next house is Shankar\'s.' }
    ],
    vocabulary: [
      { id: 'v5-1', english: 'In the town', kannada: 'ಊರಲ್ಲಿ', transliteration: 'uuralli', meaning: 'Locative of uuru' },
      { id: 'v5-2', english: 'Today', kannada: 'ಇವತ್ತು', transliteration: 'ivattu', meaning: 'Current day' },
      { id: 'v5-3', english: 'Sunday', kannada: 'ಭಾನುವಾರ', transliteration: 'bhaanuvaara', meaning: 'First day of the week' },
      { id: 'v5-4', english: 'Beside / Next to', kannada: 'ಪಕ್ಕ', transliteration: 'pakka', meaning: 'Spatial postposition' },
      { id: 'v5-5', english: 'Behind', kannada: 'ಹಿಂದೆ', transliteration: 'hinde', meaning: 'Spatial postposition' }
    ],
    grammarNotes: [
      'Locative marker -alli often contracts in spoken Kannada: biidi + alli → biidiili (in the street).',
      'Days of relative time: monne (day before yesterday) → ninne (yesterday) → ivattu (today) → naaLe (tomorrow) → naaDiddu (day after tomorrow).'
    ],
    exercise: {
      prompt: 'How do you say "Tuesday" in Kannada?',
      options: ['ಮಂಗಳವಾರ (MangaLavaara)', 'ಸೋಮವಾರ (Soomavaara)', 'ಬುಧವಾರ (Budhavaara)', 'ಶುಕ್ರವಾರ (Shukravaara)'],
      answer: 'ಮಂಗಳವಾರ (MangaLavaara)',
      explanation: 'MangaLavaara is Tuesday (named after Mars / Mangala).'
    }
  },

  // SECTION 2: Everyday Kannada (Lessons 6 to 12)
  {
    num: 6,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Degrees of Comparison & Comparative Suffixes',
    titleKn: 'ಹೋಲಿಕೆಗಳು (ಅಷ್ಟೇ, ಗಿಂತ, ಎಲ್ಲಕ್ಕಿಂತ)',
    focus: 'Comparative suffix (-ginta), equative (aSTu), superlative (ellakkinta / ellariginta), human nouns from adjectives (doddavanu, cikkavaLu)',
    desc: 'Compare people, prices, heights, and age (elder, younger, taller, better).',
    category: 'grammar',
    objectives: ['Use -ginta to express "than" (A is bigger than B)', 'Use ellariginta for superlative ("smartest of all")', 'Form derived human nouns like doddavanu (elder brother/man)'],
    explanation: 'Kannada expresses comparison using noun cases rather than special adjective endings: "nanaginta doddavanu" literally means "older than me".',
    dialogueHeading: 'Comparing Age, Theatres & House Rents',
    dialogueBody: 'Conversations about brothers, smarter students, and the best cinema hall in town.',
    examples: [
      { kannada: 'ಗೋಪಿ ನನಗಿಂತ ದೊಡ್ಡವನು; ಇವನು ನನಗಿಂತ ಚಿಕ್ಕವನು.', transliteration: 'Goopi nanaginta doddavanu; ivanu nanaginta cikkavanu.', english: 'Gopi is older than me; he is younger than me.' },
      { kannada: 'ಕ್ಲಾಸಲ್ಲಿ ಅವಳು ಎಲ್ಲರಿಗಿಂತ ಜಾಣೆ.', transliteration: 'Klaasalli avaLu ellariginta jaane.', english: 'In class she is the smartest of all.' },
      { kannada: 'ಬಾಡಿಗೆ ಮಾತ್ರ ನಿಮ್ಮ ಮನೆಗಿಂತ ಹೆಚ್ಚು.', transliteration: 'BaaDige maatra nimma maneginta heccu.', english: 'Only the rent is more than that of your house.' },
      { kannada: 'ಎಲ್ಲಕ್ಕಿಂತ ಅಂಜಲಿ ಥಿಯೇಟರ್ ಚೆನ್ನಾಗಿದೆ.', transliteration: 'Ellakkinta Anjali thiyeetar cennaagide.', english: 'Of all of them, Anjali theatre is the best.' }
    ],
    vocabulary: [
      { id: 'v6-1', english: 'Than', kannada: 'ಗಿಂತ', transliteration: '-ginta', meaning: 'Comparative marker' },
      { id: 'v6-2', english: 'More', kannada: 'ಹೆಚ್ಚು', transliteration: 'heccu', meaning: 'Greater quantity or degree' },
      { id: 'v6-3', english: 'Less', kannada: 'ಕಡಿಮೆ', transliteration: 'kadime', meaning: 'Lesser quantity' },
      { id: 'v6-4', english: 'Smart (female)', kannada: 'ಜಾಣೆ', transliteration: 'jaane', meaning: 'Clever girl/woman' }
    ],
    grammarNotes: [
      'Comparative formula: [Noun + dative/stem] + ginta + [adjective/adverb].',
      'Superlative formula: ellariginta (for persons) or ellakkinta (for things) + adjective.'
    ],
    exercise: {
      prompt: 'Which word means "smarter than all" (superlative for people)?',
      options: ['ಎಲ್ಲರಿಗಿಂತ ಜಾಣೆ (Ellariginta jaane)', 'ನನಗಿಂತ ದೊಡ್ಡವನು (Nanaginta doddavanu)', 'ಅಷ್ಟೇ ಒಳ್ಳೆಯದು (ASTee olleyadu)', 'ತುಂಬಾ ಚಿಕ್ಕದು (Tumba cikkadu)'],
      answer: 'ಎಲ್ಲರಿಗಿಂತ ಜಾಣೆ (Ellariginta jaane)',
      explanation: 'Ellariginta = than all + jaane = smart female.'
    }
  },
  {
    num: 7,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Existence & Presence: ide & ive (Inanimate)',
    titleKn: 'ಅಸ್ತಿತ್ವ ಬೋಧಕ: ಇದೆ, ಇವೆ ಮತ್ತು ಇಲ್ಲ',
    focus: 'Present tense of root "iru" for non-humans (ide = it is, ive = they are), negative (illa = is/are not), origin suffixes (-avaru)',
    desc: 'Ask about the existence of places, bus timings, railway stations, and items in town.',
    category: 'conversation',
    objectives: ['Use ide (it is / there is) and ive (there are)', 'Negate with illa (there is none)', 'Ask bus schedules and platform numbers'],
    explanation: 'The verb root "iru" (to be) takes the form "ide" for singular non-human things and "ive" for plurals. "Illa" negates both.',
    dialogueHeading: 'At the Bus Stand & Travel Inquiries',
    dialogueBody: 'Asking for bus stand, platform numbers, and coconut trees in the garden.',
    examples: [
      { kannada: 'ಈ ಊರಲ್ಲಿ ಬಸ್ ಸ್ಟ್ಯಾಂಡ್ ಎಲ್ಲಿದೆ? ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ಹಿಂದೆ ಬಸ್ ಸ್ಟ್ಯಾಂಡ್ ಇದೆ.', transliteration: 'Ii uuralli bas styaaND ellide? Poolis sTeeshan hinde bas styaaND ide.', english: 'Where is the bus stand in this town? Behind the police station there is the bus stand.' },
      { kannada: 'ಈಗ ಹಂಪಿಗೆ ಬಸ್ಸು ಇದೆಯಾ? ಬೇಕಾದಷ್ಟಿವೆ.', transliteration: 'Iiga hampige bassu ideyaa? BeekaadaSTive.', english: 'Is there a bus to Hampi now? There are plenty.' },
      { kannada: 'ನಿಮ್ಮ ಮನೇಲಿ ನಾಯಿ ಇದೆಯಾ? ಇಲ್ಲ, ನಮ್ಮ ಮನೇಲಿ ನಾಯಿ ಇಲ್ಲ.', transliteration: 'Nimma maneeli naayi ideyaa? Illa, namma maneeli naayi illa.', english: 'Is there a dog in your house? No, there is no dog in our house.' },
      { kannada: 'ತೋಟದಲ್ಲಿ ಒಂದೇ ಒಂದು ಮಾವಿನ ಮರ ಇದೆ.', transliteration: 'TooTadalli ondee ondu maavina mara ide.', english: 'In the garden there is only one mango tree.' }
    ],
    vocabulary: [
      { id: 'v7-1', english: 'There is / it is', kannada: 'ಇದೆ', transliteration: 'ide', meaning: 'Inanimate singular existence' },
      { id: 'v7-2', english: 'There are', kannada: 'ಇವೆ', transliteration: 'ive', meaning: 'Inanimate plural existence' },
      { id: 'v7-3', english: 'There is not', kannada: 'ಇಲ್ಲ', transliteration: 'illa', meaning: 'Absence / negation' },
      { id: 'v7-4', english: 'Plenty / As many as needed', kannada: 'ಬೇಕಾದಷ್ಟು', transliteration: 'beekaadaSTu', meaning: 'Abundance' }
    ],
    grammarNotes: [
      'Inanimate items never take human verb forms: always use ide (singular) and ive (plural).',
      'Questions add -aa: ideyaa? (is there?), iveyaa? (are there?).'
    ],
    exercise: {
      prompt: 'Complete the sentence: "ನಮ್ಮ ಮನೇಲಿ ಐದು ರೂಮುಗಳು _____."',
      options: ['ಇವೆ (ive)', 'ಇದೆ (ide)', 'ಇದ್ದಾರೆ (iddaare)', 'ಇದ್ದೀವಿ (iddiivi)'],
      answer: 'ಇವೆ (ive)',
      explanation: 'Rooms (ruumugaLu) are non-human plural, so "ive" is the grammatically correct agreement.'
    }
  },
  {
    num: 8,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Human Existence & Future Habitual: iddiini / irtaare',
    titleKn: 'ಮಾನವ ಅಸ್ತಿತ್ವ: ಇದ್ದೇನೆ, ಇರುತ್ತಾರೆ',
    focus: 'Present human forms of iru (iddiini, iddaane, iddaare), habitual/future (irtiini, irtaare), negative (iralla), ablative (-inda)',
    desc: 'Talk about where you or others currently live and where you usually will be at a given time.',
    category: 'conversation',
    objectives: ['Express personal presence: naanu iddiini (I am here), avaru iddaare (he/they are)', 'Use habitual presence: aafiisalli irtiini (I usually am in office)', 'Use time ablative: ond tingaLinda (since one month)'],
    explanation: 'Unlike inanimate "ide", human presence conjugates by person, gender, and respect: iddiini (I am), iddaane (he is), iddaare (respectful he/she/they are).',
    dialogueHeading: 'Calling at Home & Office Work Timings',
    dialogueBody: 'Finding if someone is at home and checking office availability.',
    examples: [
      { kannada: 'ಕೃಷ್ಣಪ್ಪನವರು ಮನೆಯಲ್ಲಿ ಇದ್ದಾರಾ? ಇದ್ದಾರೆ ಸಾರ್, ಒಳಗೆ ಬನ್ನಿ.', transliteration: 'Krishnappanavaru maneyalli iddaaraa? Iddaare saar, oLage banni.', english: 'Is Mr. Krishnappa at home? He is at home sir, please come inside.' },
      { kannada: 'ನಾವು ಎಲ್ಲರೂ ನಮ್ಮ ಮಾವನ ಮನೇಲಿ ಇದ್ದೀವಿ.', transliteration: 'Naavu ellaruu namma maavana maneeli iddiivi.', english: 'All of us are staying in our uncle\'s house.' },
      { kannada: 'ನಾಳೆ ಹತ್ತು ಗಂಟೆಗೆ ನೀವು ಮನೇಲಿ ಇರ್ತೀರಾ? ಇಲ್ಲ, ಆಫೀಸಲ್ಲಿ ಇರ್ತೀನಿ.', transliteration: 'NaaLe hattu gantege niivu maneeli irtiiraa? Illa, aafiisalli irtiini.', english: 'Will you be at home at 10 tomorrow? No, I will be in the office.' },
      { kannada: 'ಅಷ್ಟು ಹೊತ್ತಿನಲ್ಲಿ ನಾನು ಮನೇಲಿ ಇರಲ್ಲ.', transliteration: 'ASTu hottinalli naanu maneeli iralla.', english: 'At that time I will not be at home.' }
    ],
    vocabulary: [
      { id: 'v8-1', english: 'I am (present)', kannada: 'ಇದ್ದೀನಿ', transliteration: 'iddiini', meaning: '1st person singular presence' },
      { id: 'v8-2', english: 'They / He (respectful) are', kannada: 'ಇದ್ದಾರೆ', transliteration: 'iddaare', meaning: '3rd person polite presence' },
      { id: 'v8-3', english: 'I usually am / will be', kannada: 'ಇರ್ತೀನಿ', transliteration: 'irtiini', meaning: 'Habitual presence' },
      { id: 'v8-4', english: 'Will not be', kannada: 'ಇರಲ್ಲ', transliteration: 'iralla', meaning: 'Habitual negative' }
    ],
    grammarNotes: [
      'Present continuous presence: iddiini (I am present right now).',
      'Habitual / future presence: irtiini (I will be / I am usually present).'
    ],
    exercise: {
      prompt: 'How do you say "I am at home right now"?',
      options: ['ನಾನು ಮನೇಲಿ ಇದ್ದೀನಿ (Naanu maneeli iddiini)', 'ನಾನು ಮನೇಲಿ ಇರಲ್ಲ (Naanu maneeli iralla)', 'ನಾನು ಮನೇಲಿ ಇರ್ತೀನಿ (Naanu maneeli irtiini)', 'ಅವರು ಮನೇಲಿ ಇದ್ದಾರೆ (Avaru maneeli iddaare)'],
      answer: 'ನಾನು ಮನೇಲಿ ಇದ್ದೀನಿ (Naanu maneeli iddiini)',
      explanation: 'Naanu (I) takes the 1st person present marker "iddiini".'
    }
  },
  {
    num: 9,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Past Tense of "iru" (To Be): idde, iddru, ittu',
    titleKn: 'ಭೂತಕಾಲ: ಇದ್ದೆ, ಇದ್ದರು, ಇತ್ತು',
    focus: 'Past forms of root iru (idde = I was, iddru = they were, ittu = it was, iddvu = they non-human were), negative past (irlilla)',
    desc: 'Talk about where you, family members, or tools were located yesterday or last year.',
    category: 'grammar',
    objectives: ['Express past location: naanu allidde (I was there)', 'Inanimate past: guddli tootadallittu (the spade was in the garden)', 'Past negation: irlilla (was not present)'],
    explanation: 'The past tense of "iru" uses the stem "idd-": idde (I was), iddri (you were), iddru (they were), ittu (inanimate was), and iddvu (inanimate plural were).',
    dialogueHeading: 'Where Were You Yesterday?',
    dialogueBody: 'Recounting garden visits, school hostels, and village stays.',
    examples: [
      { kannada: 'ನಿನ್ನೆ ನೀವು ಮನೆಯಲ್ಲಿದ್ರಾ? ಇಲ್ಲ, ನಾನು ಮನೆಯಲ್ಲಿರ್ಲಿಲ್ಲ.', transliteration: 'Ninne niivu maneyalliddraa? Illa, naanu maneyallirlilla.', english: 'Were you at home yesterday? No, I was not at home.' },
      { kannada: 'ಮತ್ತೆ ಎಲ್ಲಿದ್ರಿ? ನಾನು ನನ್ ತೋಟದಲ್ಲಿದ್ದೆ.', transliteration: 'Matte elliddri? Naanu nan tooTadallidde.', english: 'Then where were you? I was in my garden.' },
      { kannada: 'ನಮ್ಮ ಗುದ್ದಲಿ ನಿನ್ನೆ ಎಲ್ಲಿತ್ತು? ಅದು ತೋಟದಲ್ಲಿತ್ತು.', transliteration: 'Namma guddli ninne ellittu? Adu tooTadallittu.', english: 'Where was our spade yesterday? It was in the garden.' },
      { kannada: 'ಹೋದ ವರ್ಷ ನೀವು ಎಲ್ಲಿದ್ರಿ? ಹೋದ ವರ್ಷ ನಾನು ಹಳ್ಳಿಯಲ್ಲಿದ್ದೆ.', transliteration: 'Hooda varSa niivu elliddri? Hooda varSa naanu haLLiyallidde.', english: 'Where were you last year? Last year I was in the village.' }
    ],
    vocabulary: [
      { id: 'v9-1', english: 'I was', kannada: 'ಇದ್ದೆ', transliteration: 'idde', meaning: '1st person past of iru' },
      { id: 'v9-2', english: 'You were (polite)', kannada: 'ಇದ್ದಿರಿ (ಇದ್ರಿ)', transliteration: 'iddri', meaning: '2nd person polite past' },
      { id: 'v9-3', english: 'It was', kannada: 'ಇತ್ತು', transliteration: 'ittu', meaning: '3rd person neuter past' },
      { id: 'v9-4', english: 'Was/were not', kannada: 'ಇರ್ಲಿಲ್ಲ', transliteration: 'irlilla', meaning: 'Past negative of iru' },
      { id: 'v9-5', english: 'Last year', kannada: 'ಹೋದ ವರ್ಷ', transliteration: 'hooda varSa', meaning: 'Previous year' }
    ],
    grammarNotes: [
      'To negate past existence, append -lilla to the infinitive: iru + lilla = irlilla (was not).',
      'Neuter singular past is always "ittu": ಪುಸ್ತಕ ಮೇಜಿನ ಮೇಲಿತ್ತು (the book was on the table).'
    ],
    exercise: {
      prompt: 'Complete: "ನಿನ್ನೆ ನಾನು ತೋಟದಲ್ಲಿ _____."',
      options: ['ಇದ್ದೆ (idde)', 'ಇದ್ದೀನಿ (iddiini)', 'ಇರ್ತೀನಿ (irtiini)', 'ಇತ್ತು (ittu)'],
      answer: 'ಇದ್ದೆ (idde)',
      explanation: 'Ninne (yesterday) + naanu (I) takes past 1st-person "idde".'
    }
  },
  {
    num: 10,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Adverbs with "iru" & Bengaluru Weather',
    titleKn: 'ಕ್ರಿಯಾವಿಶೇಷಣಗಳು ಮತ್ತು ಹವಾಮಾನ',
    focus: 'Adverbs modifying iru (bisiyaagide, sumaaraagide, heccu-kammi), interrogative "heege", alternative questions with -aa... -aa',
    desc: 'Describe conditions, food warmth, Bengaluru climate, and similarities.',
    category: 'conversation',
    objectives: ['Ask and answer about weather: havaa heegide? (how is the weather?)', 'Describe qualities with -aagi: bisiyaagide (it is hot)', 'Form alternative questions: kaafiyaa tiiyaa? (coffee or tea?)'],
    explanation: 'Adding -aagi turns nouns and adjectives into adverbs: bisi (heat) → bisiyaagi (hotly/in hot state). Combined with "ide", it expresses current states.',
    dialogueHeading: 'Ordering Snacks & Talking Climate',
    dialogueBody: 'Coffee temperature, Bangalore cold, and matching cars.',
    examples: [
      { kannada: 'ಇದು ಕಾಫಿಯಾ, ಟೀಯಾ? ಇದು ಕಾಫಿ.', transliteration: 'Idu kaafiyaa, tiiyaa? Idu kaafi.', english: 'Is this coffee or tea? This is coffee.' },
      { kannada: 'ಕಾಫಿ ಬಿಸಿಯಾಗಿದೆಯಾ? ಹೌದು, ತುಂಬಾ ಬಿಸಿಯಾಗಿದೆ.', transliteration: 'Kaafi bisiyaagideyaa? Haudu, tumba bisiyaagide.', english: 'Is the coffee hot? Yes, it is very hot.' },
      { kannada: 'ಬೆಂಗಳೂರು ಹವಾ ಈಗ ಹೇಗಿದೆ? ಈಗ ಚಳಿ ತುಂಬಾ ಜಾಸ್ತಿ.', transliteration: 'BengaLuuru havaa iiga heegide? Iiga caLi tumba jaasti.', english: 'How is the Bangalore weather now? It is very cold now.' },
      { kannada: 'ಇದು ನಿಮ್ಮ ಕಾರಿನ ಹಾಗೆ ಇದೆ ಅಲ್ವಾ? ಹೌದು, ಹಾಗೇ ಇದೆ.', transliteration: 'Idu nimma kaarina haage ide alvaa? Haudu, haagee ide.', english: 'This is just like your car, isn\'t it? Yes, it is exactly so.' }
    ],
    vocabulary: [
      { id: 'v10-1', english: 'Cold', kannada: 'ಚಳಿ', transliteration: 'caLi', meaning: 'Winter chill / cold sensation' },
      { id: 'v10-2', english: 'Rain', kannada: 'ಮಳೆ', transliteration: 'maLe', meaning: 'Rainfall' },
      { id: 'v10-3', english: 'Summer heat', kannada: 'ಸೆಖೆ', transliteration: 'sekhe', meaning: 'Muggy heat' },
      { id: 'v10-4', english: 'More / Excess', kannada: 'ಜಾಸ್ತಿ', transliteration: 'jaasti', meaning: 'More / high amount' },
      { id: 'v10-5', english: 'Like that', kannada: 'ಹಾಗೆ', transliteration: 'haage', meaning: 'Manner adverb' }
    ],
    grammarNotes: [
      'Alternative interrogative pattern: [Word 1 + aa] + [Word 2 + aa]? (e.g., ಕಾಫಿಯಾ ಟೀಯಾ?).',
      'The suffix -aagi creates condition adverbs: cennaagi (well), bisiyaagi (hot).'
    ],
    exercise: {
      prompt: 'How do you ask "How is the weather now?" in Kannada?',
      options: ['ಈಗ ಹವಾ ಹೇಗಿದೆ? (Iiga havaa heegide?)', 'ಮಳೆ ಇಲ್ವಾ? (MaLe ilvaa?)', 'ಕಾಫಿ ಬಿಸಿಯಾಗಿದೆಯಾ? (Kaafi bisiyaagideyaa?)', 'ಇದು ಕಾರಿನ ಹಾಗೆ ಇದೆಯಾ? (Idu kaarina haage ideyaa?)'],
      answer: 'ಈಗ ಹವಾ ಹೇಗಿದೆ? (Iiga havaa heegide?)',
      explanation: 'Iiga (now) + havaa (weather) + heegide (how is it?).'
    }
  },
  {
    num: 11,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Present Tense of Action Verbs: hoogtiini / bartiira',
    titleKn: 'ವರ್ತಮಾನ ಕಾಲದ ಕ್ರಿಯಾಪದಗಳು (ಹೋಗ್ತೀನಿ, ಬರ್ತೀರಾ)',
    focus: 'Present tense of active verbs with human subjects (hoogtiini = I go, bartiira = do you come), time & destination expressions (-varege, -inda)',
    desc: 'Describe daily routines, office commute timings, and walking habits in Bengaluru.',
    category: 'grammar',
    objectives: ['Conjugate present active verbs: bartiini (I come), hoogtiiri (you go)', 'Express destination: ellige hoogtiiri? (where are you going?)', 'Express ranges: 10 ganteyinda 5 gante varege (from 10 to 5)'],
    explanation: 'Spoken Kannada forms the present/future habitual by adding tense markers (-t-) between root and personal endings: hoog + t + iini = hoogtiini.',
    dialogueHeading: 'Daily Office Commute & Morning Walks',
    dialogueBody: 'Discussions on office return hours and morning walks in Lalbagh.',
    examples: [
      { kannada: 'ನಾನು ಹೋಗ್ತೀನಿ, ಬರ್ತೀರಾ? ಎಲ್ಲಿಗೆ ಹೋಗ್ತೀರಿ?', transliteration: 'Naanu hoogtiini, bartiiraa? Ellige hoogtiiri?', english: 'I am leaving, will you come? Where are you going?' },
      { kannada: 'ಆಫೀಸು ಬೆಳಗ್ಗೆ ಹತ್ತು ಗಂಟೆಯಿಂದ ಸಂಜೆ ಐದು ಗಂಟೆವರೆಗೆ ಇದೆ.', transliteration: 'Aafiisu beLagge hattu ganteyinda sanje aidu gantevarege ide.', english: 'Office works from 10 am to 5 pm.' },
      { kannada: 'ನೀವು ದಿನಾ ಬೆಳಗ್ಗೆ ನಡೀತೀರಾ? ಹೌದು, ಲಾಲ್‌ಬಾಗ್ ವರೆಗೆ ಹೋಗ್ತೀನಿ.', transliteration: 'Niivu dinaa beLagge naDiitiiraa? Haudu, laalbaag varege hoogtiini.', english: 'Do you walk every morning? Yes, I go up to Lalbagh.' },
      { kannada: 'ಎಂಟು ಗಂಟೆಗೆ ವಾಪಸ್ ಬರ್ತೀನಿ.', transliteration: 'ENTu gantege vaapas bartiini.', english: 'I return at eight o\'clock.' }
    ],
    vocabulary: [
      { id: 'v11-1', english: 'To go', kannada: 'ಹೋಗು', transliteration: 'hoogu', meaning: 'Action verb of movement away' },
      { id: 'v11-2', english: 'To come', kannada: 'ಬರು', transliteration: 'baru', meaning: 'Action verb of movement toward' },
      { id: 'v11-3', english: 'To walk', kannada: 'ನಡಿ', transliteration: 'naDi', meaning: 'Locomotive verb' },
      { id: 'v11-4', english: 'Up to / Until', kannada: 'ವರೆಗೆ', transliteration: 'varege', meaning: 'Limit postposition' }
    ],
    grammarNotes: [
      'In spoken Kannada, the present tense often doubles as the immediate future: "naanu hoogtiini" = I go / I will go now.',
      '-inda means "from" and -varege means "until / up to".'
    ],
    exercise: {
      prompt: 'What does "ನಾವು ಲಾಲ್‌ಬಾಗ್ ವರೆಗೆ ಹೋಗ್ತೀವಿ" mean?',
      options: ['We will go up to Lalbagh', 'We are coming from Lalbagh', 'Where is Lalbagh?', 'We walk in Lalbagh everyday'],
      answer: 'We will go up to Lalbagh',
      explanation: 'Naavu (we) + Lalbagh varege (up to Lalbagh) + hoogtiivi (we will go).'
    }
  },
  {
    num: 12,
    section: 2,
    sectionTitle: 'Everyday Kannada',
    title: 'Food Habits, Neuter Verbs & Accusative Case',
    titleKn: 'ಆಹಾರ ಪದ್ಧತಿ, ನಪುಂಸಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ದ್ವಿತೀಯಾ ವಿಭಕ್ತಿ',
    focus: 'Simple present of common verbs (tinnu = eat, kuDi = drink, nooDu = see), neuter present (bogalatte, naDiyatte), accusative case (-annu), negative (-alla)',
    desc: 'Discuss food choices (vegetarian / coffee / snacks), dog habits, and child actions.',
    category: 'conversation',
    objectives: ['Talk about dietary habits: naanu maamsa tinnalla (I don\'t eat meat)', 'Use neuter verb forms ending in -atte: naayi bogalatte (the dog barks)', 'Apply accusative case (-annu): aafiisar maganannu nooDtiini'],
    explanation: 'Neuter subjects (animals, children, things) use the suffix "-atte" in present tense. Negating habits uses "-alla" directly with verb roots (tinnalla, kuDiyalla).',
    dialogueHeading: 'Morning Breakfast & Pet Habits',
    dialogueBody: 'Talking about idli/dosa breakfast, milk, and pets barking.',
    examples: [
      { kannada: 'ನೀವು ಬೆಳಗ್ಗೆ ಏನ್ ತಿಂತೀರಿ? ಒಂದು ದೋಸೆ ಮತ್ತು ನಾಲ್ಕು ಇಡ್ಲಿ ತಿಂತೀನಿ.', transliteration: 'Niivu beLagge een tintiiri? Ondu doose mattu naalku iDli tintiini.', english: 'What do you eat in the morning? I eat one dosa and four idlis.' },
      { kannada: 'ನೀವು ಕಾಫಿ ಕುಡೀತೀರಾ? ಇಲ್ಲ, ನಾನು ಏನೂ ಕುಡಿಯಲ್ಲ.', transliteration: 'Niivu kaafi kuDiitiiraa? Illa, naanu eenuu kuDiyalla.', english: 'Do you drink coffee? No, I don\'t drink anything.' },
      { kannada: 'ನಿಮ್ಮ ನಾಯಿ ಏನ್ ತಿನ್ನತ್ತೆ? ಅದು ಬಿಸ್ಕತ್, ಚಪಾತಿ ತಿನ್ನತ್ತೆ.', transliteration: 'Nimma naayi een tinnatte? Adu biskat, capaati tinnatte.', english: 'What does your dog eat? It eats biscuits and chapati.' },
      { kannada: 'ಅವರನ್ನು ಯಾಕೆ ನೋಡ್ತೀರಿ? ನಾನು ಅವರಿಗೆ ಪಾಠ ಹೇಳ್ತೀನಿ.', transliteration: 'Avarannu yaake nooDtiiri? Naanu avarige paaTha heeLtiini.', english: 'Why do you see him? Because I teach him lessons.' }
    ],
    vocabulary: [
      { id: 'v12-1', english: 'To eat', kannada: 'ತಿನ್ನು', transliteration: 'tinnu', meaning: 'Ingest food' },
      { id: 'v12-2', english: 'To drink', kannada: 'ಕುಡಿ', transliteration: 'kuDi', meaning: 'Ingest liquid' },
      { id: 'v12-3', english: 'Why', kannada: 'ಯಾಕೆ', transliteration: 'yaake', meaning: 'Interrogative reason' },
      { id: 'v12-4', english: 'Because of that', kannada: 'ಅದಕ್ಕೆ', transliteration: 'adakke', meaning: 'Causal connector' }
    ],
    grammarNotes: [
      'Neuter verbs take -atte: ಮಗು ಆಟ ಆಡತ್ತೆ (the child plays); ನಾಯಿ ಬೊಗಳತ್ತೆ (the dog barks).',
      'The accusative object suffix is -annu: ಅವನನ್ನು (him), ಪುಸ್ತಕವನ್ನು (the book).'
    ],
    exercise: {
      prompt: 'How do you say "I do not drink coffee" in Kannada?',
      options: ['ನಾನು ಕಾಫಿ ಕುಡಿಯಲ್ಲ (Naanu kaafi kuDiyalla)', 'ನಾನು ಕಾಫಿ ಕುಡೀತೀನಿ (Naanu kaafi kuDiitiini)', 'ನೀವು ಕಾಫಿ ಕುಡೀತೀರಾ? (Niivu kaafi kuDiitiiraa?)', 'ಅವರು ಕಾಫಿ ಕುಡಿದರು (Avaru kaafi kuDidaru)'],
      answer: 'ನಾನು ಕಾಫಿ ಕುಡಿಯಲ್ಲ (Naanu kaafi kuDiyalla)',
      explanation: 'Root kuDi + negative -alla = kuDiyalla (do not drink).'
    }
  },

  // SECTION 3: Build Sentences (Lessons 13 to 20)
  {
    num: 13,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Past Tense of Action Verbs (Affirmative)',
    titleKn: 'ಭೂತಕಾಲದ ಕ್ರಿಯಾರೂಪಗಳು (ಬಂದೆ, ಹೋದ್ವಿ, ತಿಂದ್ರು)',
    focus: 'Past tense suffixes for human subjects (bande = I came, hoodvi = we went, tindri = you ate, bandru = they came)',
    desc: 'Narrate past journeys, outings to Nandi Hills, and cooking meals.',
    category: 'grammar',
    objectives: ['Form past tense with root + d/t/nd + personal ending', 'Conjugate: bande (I came), bandvi (we came), bandri (you came), bandru (they came)', 'Narrate a day trip in completed past sentences'],
    explanation: 'The past tense in Kannada is formed by adding past markers (-d-, -t-, -nd-) to the verbal base, followed by personal endings.',
    dialogueHeading: 'Trip to Nandi Hills & Delhi Arrival',
    dialogueBody: 'Recounting arrival from Delhi, starting early at 5 AM, and home cooking.',
    examples: [
      { kannada: 'ನೀವು ದೆಹಲಿಯಿಂದ ಯಾವಾಗ ಬಂದ್ರಿ? ನಾನು ಹೋದ ತಿಂಗಳು ಬಂದೆ.', transliteration: 'Niivu dehliyinda yaavaag bandri? Naanu hooda tingLu bande.', english: 'When did you come from Delhi? I came last month.' },
      { kannada: 'ನಿನ್ನೆ ನೀವು ಎಲ್ಲಿಗೆ ಹೋಿದ್ರಿ? ನಿನ್ನೆ ನಾವು ನಂದಿ ಬೆಟ್ಟಕ್ಕೆ ಹೋದ್ವಿ.', transliteration: 'Ninne niivu ellige hoodri? Ninne naavu nandi bettakke hoodvi.', english: 'Where did you go yesterday? Yesterday we went to Nandi hills.' },
      { kannada: 'ಎಷ್ಟು ಗಂಟೆಗೆ ಹೊರಟ್ರಿ? ಬೆಳಗ್ಗೆ ಐದು ಗಂಟೆಗೆ ಹೊರಟ್ವಿ.', transliteration: 'ESTu gantege horaTri? BeLagge aidu gantege horaTvi.', english: 'At what time did you leave? We set out at five in the morning.' },
      { kannada: 'ಮಾರ್ಕೆಟ್‌ನಿಂದ ತರಕಾರಿ ತಂದ್ರಿ? ಹೌದು, ತರಕಾರಿ ತಂದೆ.', transliteration: 'MaarkeTninda tarkaari tandri? Haudu, tarkaari tande.', english: 'Did you bring vegetables from the market? Yes, I brought vegetables.' }
    ],
    vocabulary: [
      { id: 'v13-1', english: 'I came', kannada: 'ಬಂದೆ', transliteration: 'bande', meaning: '1st person past of baru' },
      { id: 'v13-2', english: 'We went', kannada: 'ಹೋದ್ವಿ', transliteration: 'hoodvi', meaning: '1st person plural past of hoogu' },
      { id: 'v13-3', english: 'To set out / start', kannada: 'ಹೊರಡು', transliteration: 'horaDu', meaning: 'Depart on a journey' },
      { id: 'v13-4', english: 'Hill / Mountain', kannada: 'ಬೆಟ್ಟ', transliteration: 'betta', meaning: 'Geographical elevation' }
    ],
    grammarNotes: [
      'Conjugation paradigm for "baru" (to come): bande (I), bandvi (we), bande (you-sg), bandri (you-polite), banda (he), bandLu (she), bandru (they/polite).',
      'Irregular past stems: hoogu → hoode; baru → bande; tinnu → tinde.'
    ],
    exercise: {
      prompt: 'Choose the correct form: "ನಿನ್ನೆ ನಾವು ನಂದಿ ಬೆಟ್ಟಕ್ಕೆ _____ (went)."',
      options: ['ಹೋದ್ವಿ (hoodvi)', 'ಹೋದೆ (hoode)', 'ಹೋಗ್ತೀವಿ (hoogtiivi)', 'ಹೋದ್ರು (hoodru)'],
      answer: 'ಹೋದ್ವಿ (hoodvi)',
      explanation: 'Subject is "naavu" (we), which takes the 1st person plural past suffix "-vi": hoodvi.'
    }
  },
  {
    num: 14,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Negative Past Tense & Health Inquiries',
    titleKn: 'ಭೂತಕಾಲದ ನಿಷೇಧ ರೂಪಗಳು ಮತ್ತು ಆರೋಗ್ಯ ವಿಚಾರಣೆ',
    focus: 'Negative past tense (-lilla), neuter past tense (aaytu, hariitu, muriitu), health expressions (talenoovu, jvara)',
    desc: 'Express that an action did not occur in the past (did not go, did not eat) and describe health issues.',
    category: 'conversation',
    objectives: ['Form negative past by adding -lilla to the root: hooglilla, tarlilla, maaDlilla', 'Explain sickness: talenoovu (headache), jvara (fever)', 'Describe accidental events with neuter verbs'],
    explanation: 'Unlike the affirmative past which has distinct personal endings, the negative past is remarkably simple: append "-lilla" to any verb root for all persons and genders!',
    dialogueHeading: 'Why Didn\'t You Come to Class?',
    dialogueBody: 'Explaining cold, headache, taking anacin pills, and road incidents.',
    examples: [
      { kannada: 'ಇವತ್ತು ಬೆಳಗ್ಗೆ ನೀವು ಕ್ಲಾಸ್‌ಗೆ ಯಾಕೆ ಬರ್ಲಿಲ್ಲ? ನನಗೆ ತುಂಬಾ ತಲೆನೋವು ಇತ್ತು.', transliteration: 'Ivattu beLagge niivu klaasge yaake barlilla? Nange tumba talenoovu ittu.', english: 'Why did you not come to class this morning? I had a severe headache.' },
      { kannada: 'ಔಷಧಿ ತಗೊಂಡ್ರಾ? ಇಲ್ಲ, ಏನೂ ತಗೋಳ್ಲಿಲ್ಲ.', transliteration: 'AuSadhi tagonDraa? Illa, eenuu tagoLlilla.', english: 'Did you take medicine? No, I did not take anything.' },
      { kannada: 'ಡಾಕ್ಟರ್ ಹತ್ರ ಹೋಗ್ಲಿಲ್ವಾ? ಇಲ್ಲ, ಹೋಗ್ಲಿಲ್ಲ.', transliteration: 'Daaktar hatra hooglilvaa? Illa, hooglilla.', english: 'Didn\'t you go to the doctor? No, I did not go.' },
      { kannada: 'ನಾಯಿಗೆ ಏನಾಯ್ತು? ಒಂದು ಕಾಲು ಮುರೀತು.', transliteration: 'Naayige eenaaytu? Ondu kaalu muriitu.', english: 'What happened to the dog? One leg got fractured.' }
    ],
    vocabulary: [
      { id: 'v14-1', english: 'Headache', kannada: 'ತಲೆನೋವು', transliteration: 'talenoovu', meaning: 'Head pain' },
      { id: 'v14-2', english: 'Fever', kannada: 'ಜ್ವರ', transliteration: 'jvara', meaning: 'High temperature' },
      { id: 'v14-3', english: 'Medicine', kannada: 'ಔಷಧಿ', transliteration: 'auSadhi', meaning: 'Remedy / pills' },
      { id: 'v14-4', english: 'Please', kannada: 'ದಯವಿಟ್ಟು', transliteration: 'dayavittu', meaning: 'Polite request marker' }
    ],
    grammarNotes: [
      'Universal past negative formula: Verb root + lilla (e.g., hoog + lilla = hooglilla). Works identically for naanu, niivu, avaru, etc.',
      'Neuter past of aagu (to happen) is "aaytu": eenaaytu? (what happened?).'
    ],
    exercise: {
      prompt: 'How do you say "I did not go to the office yesterday"?',
      options: ['ನಿನ್ನೆ ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ಲಿಲ್ಲ (Ninne naanu aafiisge hooglilla)', 'ನಿನ್ನೆ ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋದೆ (Ninne naanu aafiisge hoode)', 'ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋಗಲ್ಲ (Naanu aafiisge hoogalla)', 'ಅವರು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ಲಿಲ್ಲ (Avaru aafiisge hooglilla)'],
      answer: 'ನಿನ್ನೆ ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ಲಿಲ್ಲ (Ninne naanu aafiisge hooglilla)',
      explanation: 'Ninne + naanu + hooglilla (root hoogu + lilla).'
    }
  },
  {
    num: 15,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Modal Verbs: beeku, beeDa, saaku, gottu, iSTa',
    titleKn: 'ಇಚ್ಛಾಬೋಧಕಗಳು: ಬೇಕು, ಬೇಡ, ಸಾಕು, ಗೊತ್ತು, ಇಷ್ಟ',
    focus: 'Modal predicates taking dative subject: beeku (want), beeDa (don\'t want), saaku (enough), saaldu (not enough), gottu (know), iSTa (like)',
    desc: 'Negotiate needs, grocery purchases, house requirements, and language proficiencies.',
    category: 'conversation',
    objectives: ['Express desires: nange ondu mane beeku (I want a house)', 'Decline: tumba dodda mane beeDa (I don\'t want a big house)', 'Express sufficiency: erDu ruum saaku (two rooms are enough)', 'Express knowledge & taste: nange kannaDa gottu (I know Kannada)'],
    explanation: 'In Kannada, modal feelings and necessities take a DATIVE subject (nange = to me), not the nominative: "nange beeku" literally translates to "to me it is needed".',
    dialogueHeading: 'House Hunting, Vegetable Buying & College Seats',
    dialogueBody: 'House rental requirements, brinjal shopping, and knowing language skills.',
    examples: [
      { kannada: 'ನಿಮಗೆ ಏನು ಬೇಕು? ನನಗೆ ಒಂದು ಬಾಡಿಗೆ ಮನೆ ಬೇಕು.', transliteration: 'Nimage eenu beeku? Nange ondu baaDige mane beeku.', english: 'What do you want? I want a rented house.' },
      { kannada: 'ಎರಡು ರೂಮ್ ಸಾಕಾ? ಹೌದು, ನನಗೆ ಎರಡು ರೂಮ್ ಸಾಕು, ದೊಡ್ಡ ಮನೆ ಬೇಡ.', transliteration: 'ErDu ruum saakaa? Haudu, nange erDu ruum saaku, dodda mane beeDa.', english: 'Will two rooms do? Yes, two rooms are enough for me, I don\'t want a big house.' },
      { kannada: 'ನಿಮಗೆ ಕನ್ನಡ ಗೊತ್ತಾ? ಸ್ವಲ್ಪ ಗೊತ್ತು.', transliteration: 'Nimage kannaDa gottaa? Svalpa gottu.', english: 'Do you know Kannada? I know a little.' },
      { kannada: 'ಅವರಿಗೆ ಸಂಗೀತ ತುಂಬಾ ಇಷ್ಟ.', transliteration: 'Avarige sangiita tumba iSTa.', english: 'He likes music very much.' }
    ],
    vocabulary: [
      { id: 'v15-1', english: 'Want / Need', kannada: 'ಬೇಕು', transliteration: 'beeku', meaning: 'Modal necessity' },
      { id: 'v15-2', english: 'Don\'t want', kannada: 'ಬೇಡ', transliteration: 'beeDa', meaning: 'Modal refusal' },
      { id: 'v15-3', english: 'Enough', kannada: 'ಸಾಕು', transliteration: 'saaku', meaning: 'Sufficiency' },
      { id: 'v15-4', english: 'Known', kannada: 'ಗೊತ್ತು', transliteration: 'gottu', meaning: 'Knowledge / familiarity' },
      { id: 'v15-5', english: 'Liked', kannada: 'ಇಷ್ಟ', transliteration: 'iSTa', meaning: 'Fondness / preference' }
    ],
    grammarNotes: [
      'The subject MUST be in dative case: ನನಗೆ (nange), ನಿಮಗೆ (nimge), ಅವರಿಗೆ (avarge). Never say "naanu beeku".',
      'Negatives: beeku ↔ beeDa; saaku ↔ saaldu; gottu ↔ gottilla; iSTa ↔ iSTavilla.'
    ],
    exercise: {
      prompt: 'How do you say "I want a cup of coffee" in Kannada?',
      options: ['ನನಗೆ ಒಂದು ಕಪ್ ಕಾಫಿ ಬೇಕು (Nange ondu kap kaafi beeku)', 'ನಾನು ಕಾಫಿ ಬೇಕು (Naanu kaafi beeku)', 'ನನಗೆ ಕಾಫಿ ಬೇಡ (Nange kaafi beeDa)', 'ಕಾಫಿ ಸಾಕು (Kaafi saaku)'],
      answer: 'ನನಗೆ ಒಂದು ಕಪ್ ಕಾಫಿ ಬೇಕು (Nange ondu kap kaafi beeku)',
      explanation: 'Dative subject "nange" + item + "beeku".'
    }
  },
  {
    num: 16,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Obligation & Permission: -beeku, -boodu, -baardu',
    titleKn: 'ವಿಧಾಯಕ ಮತ್ತು ನಿಷೇಧಕ ರೂಪಗಳು (-ಬೇಕು, -ಬಹುದು, -ಬಾರದು)',
    focus: 'Verbal infinitives with modals: -beeku (must/should), -leebeeku (emphatic must), -boodu (may/can), -baardu (should not)',
    desc: 'Instruct routines, mandatory duties at the office, permissions, and prohibitions.',
    category: 'grammar',
    objectives: ['Form obligations: hoogbeeku (must go), oodbeeku (must read)', 'Form prohibitions: hoogbaardu (should not go)', 'Form permissions: hoogboodu (may go)'],
    explanation: 'Attaching modals directly to the verbal infinitive creates rules and permissions: maaaDu (do) → maaDbeeku (must do) → maaDbaardu (must not do) → maaDboodu (may do).',
    dialogueHeading: 'School Routine, Market Chores & Office Duties',
    dialogueBody: 'Instructions for morning rituals, market errands, and work responsibilities.',
    examples: [
      { kannada: 'ನೀನು ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು? ನಾನು ಸ್ಕೂಲಿಗೆ ಹೋಗ್ಬೇಕು.', transliteration: 'Niinu ellige hoogbeeku? Naanu skuulige hoogbeeku.', english: 'Where do you have to go? I have to go to school.' },
      { kannada: 'ನೀವು ಪೂಜೆ ಮಾಡ್ಲೇಬೇಕು; ಆಮೇಲೆ ತಿಂಡಿ ತಿನ್ನಬಹುದು.', transliteration: 'Niivu puuje maaDleebeeku; aameele tinDi tinnaboodu.', english: 'You must worship; afterwards you may have breakfast.' },
      { kannada: 'ಅವನು ಆ ಕೆಲಸ ಮಾಡಬಾರದು.', transliteration: 'Avanu aa kelsa maaDbaardu.', english: 'He must not do that work.' },
      { kannada: 'ನಾನು ಹಣ್ಣು ತರಬಹುದಾ? ಓಹೋ, ತರಬಹುದು.', transliteration: 'Naanu haNNu taraboodaa? Oohoo, taraboodu.', english: 'May I bring fruits? Oh yes, you may bring.' }
    ],
    vocabulary: [
      { id: 'v16-1', english: 'Must do', kannada: 'ಮಾಡಬೇಕು', transliteration: 'maaDbeeku', meaning: 'Infinitive + beeku' },
      { id: 'v16-2', english: 'Must not do', kannada: 'ಮಾಡಬಾರದು', transliteration: 'maaDbaardu', meaning: 'Prohibition' },
      { id: 'v16-3', english: 'Can / May do', kannada: 'ಮಾಡಬಹುದು', transliteration: 'maaDboodu', meaning: 'Permission' },
      { id: 'v16-4', english: 'After that', kannada: 'ಆಮೇಲೆ', transliteration: 'aameele', meaning: 'Sequential temporal adverb' }
    ],
    grammarNotes: [
      'Adding the emphatic particle -lee- creates urgent obligation: ಮಾಡ್ಲೇಬೇಕು (maaDleebeeku = MUST definitely do).',
      'The prohibition -baardu is polite but firm: ಇಲ್ಲಿ ಧೂಮಪಾನ ಮಾಡಬಾರದು (one should not smoke here).'
    ],
    exercise: {
      prompt: 'Which phrase means "You should not do that"?',
      options: ['ಅದನ್ನು ಮಾಡಬಾರದು (Adannu maaDbaardu)', 'ಅದನ್ನು ಮಾಡಬಹುದು (Adannu maaDboodu)', 'ಅದನ್ನು ಮಾಡಬೇಕು (Adannu maaDbeeku)', 'ಅದನ್ನು ಮಾಡಿ (Adannu maadi)'],
      answer: 'ಅದನ್ನು ಮಾಡಬಾರದು (Adannu maaDbaardu)',
      explanation: 'Infinitive maaDa + baardu = maaDbaardu (should not do).'
    }
  },
  {
    num: 17,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Imperatives, Hortative "Let\'s" & Past Subjunctive',
    titleKn: 'ಆಜ್ಞಾರ್ಥಕ, ಪ್ರೇರಣಾರ್ಥಕ (ಹೋಗೋಣ) ಮತ್ತು ಪಶ್ಚಾತ್ತಾಪ',
    focus: 'Imperatives (banni, tinni, kuDiri), 3rd person permissive (hoogli = let him go), 1st person hortative (-oona: hoogona = let\'s go), past subjunctive (-beekaagittu = should have done)',
    desc: 'Give friendly commands, suggest group plans (let\'s go to a movie), and talk about missed obligations.',
    category: 'conversation',
    objectives: ['Give polite commands: banni (come), kuutkoLi (sit down)', 'Propose group action with -oona: sinema nooDoona (let\'s watch a movie)', 'Express missed duties with -beekaagittu: barbeekaagittu (ought to have come)'],
    explanation: 'To propose joint activities, add "-oona" to verb stems: nooDu → nooDoona (let\'s see). To express missed past actions, use "-beekaagittu" (should have).',
    dialogueHeading: 'Movie Plans, Garden Tasks & Missed Visits',
    dialogueBody: 'Planning cinema at Sangam theatre and regretting not bringing the car.',
    examples: [
      { kannada: 'ಇವತ್ತು ಸಿನಿಮಾ ನೋಡೋಣ್ವಾ? ನೋಡೋಣ, ಯಾವ ಥಿಯೇಟರ್‌ಗೆ ಹೋಗೋಣ?', transliteration: 'Ivattu sinema nooDoonaa? NooDoona, yaav thiyeetarge hoogoona?', english: 'Shall we go to a movie today? Let\'s see, to which theatre shall we go?' },
      { kannada: 'ಅವರು ಆಡ್ಲಿ, ನೀವೂ ಆಟ ಆಡಿ.', transliteration: 'Avaru aaDli, niivuu aaTa aaDi.', english: 'Let them play; you also play.' },
      { kannada: 'ಆ ಸಿನಿಮಾ ನೀವು ನೋಡ್ಬೇಕಾಗಿತ್ತು!', transliteration: 'Aa sinema niivu nooDbeekaagittu!', english: 'You ought to have seen that film!' },
      { kannada: 'ಒಂದು ದಿನ ನಮ್ಮ ಮನೆಗೆ ಬರ್ಬೇಕಾಗಿತ್ತು.', transliteration: 'Ondu dina namma manege barbeekaagittu.', english: 'You should have come to our house for a day.' }
    ],
    vocabulary: [
      { id: 'v17-1', english: 'Let\'s go', kannada: 'ಹೋಗೋಣ', transliteration: 'hoogoona', meaning: 'Hortative 1st person plural' },
      { id: 'v17-2', english: 'Let him/them go', kannada: 'ಹೋಗ್ಲಿ', transliteration: 'hoogli', meaning: '3rd person permissive' },
      { id: 'v17-3', english: 'Should have come', kannada: 'ಬರಬೇಕಾಗಿತ್ತು', transliteration: 'barbeekaagittu', meaning: 'Past unfulfilled obligation' },
      { id: 'v17-4', english: 'Slowly', kannada: 'ನಿಧಾನವಾಗಿ', transliteration: 'nidaanavaagi', meaning: 'Adverb of manner' }
    ],
    grammarNotes: [
      'The hortative -oona invites joint participation: ತಿನ್ನೋಣ (let\'s eat), ಕಲಿಯೋಣ (let\'s learn).',
      '-beekaagittu expresses past regret: ನೀವು ಬರಬೇಕಾಗಿತ್ತು (you ought to have come).'
    ],
    exercise: {
      prompt: 'How do you say "Let\'s watch a movie today" in Kannada?',
      options: ['ಇವತ್ತು ಸಿನಿಮಾ ನೋಡೋಣ (Ivattu sinema nooDoona)', 'ಸಿನಿಮಾ ನೋಡಬೇಕು (Sinema nooDbeeku)', 'ಸಿನಿಮಾ ನೋಡಿದ್ರಾ? (Sinema nooDidraa?)', 'ಸಿನಿಮಾ ನೋಡಬೇಡಿ (Sinema nooDbeeDi)'],
      answer: 'ಇವತ್ತು ಸಿನಿಮಾ ನೋಡೋಣ (Ivattu sinema nooDoona)',
      explanation: 'NooDu + oona = nooDoona (let us watch).'
    }
  },
  {
    num: 18,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Past Participles & Sequential Actions: -i / -du',
    titleKn: 'ಧಾತು ಸಂಬಂಧ (ಎದ್ದು, ಮಾಡಿ, ತಿಂದು)',
    focus: 'Past verbal participle forms (eddu = having risen, maadi = having done, tindu = having eaten), negative participle (-de: maad-de)',
    desc: 'Chain consecutive actions into compound sentences (woke up, bathed, and had breakfast).',
    category: 'grammar',
    objectives: ['Combine sentences using past participles: eddu, snaana maadi, hoode', 'Express "without doing" using negative participle: uuta maadde (without eating)', 'Narrate a full day\'s consecutive routine'],
    explanation: 'Instead of saying "I woke up. I bathed. I ate.", Kannada links prior actions using past participles (-i or -du) leaving only the final verb fully conjugated.',
    dialogueHeading: 'Morning Sequence & Visiting Without Food',
    dialogueBody: 'Chaining wake-up routines, market visits, and hospitable invitations.',
    examples: [
      { kannada: 'ಬೇಗ ಎದ್ದು ಸ್ನಾನ ಮಾಡಿ ಹೋಗೋಣ.', transliteration: 'Beega eddu snaana maadi hoogoona.', english: 'Let\'s rise early, take a bath, and go.' },
      { kannada: 'ಪೂಜೆ ಮಾಡಿ ತಿಂಡಿ ತಿಂದು ಹೋಗೋಣ.', transliteration: 'Puuje maadi tinDi tindu hoogoona.', english: 'Let\'s worship, have breakfast, and leave.' },
      { kannada: 'ಕಾಫಿ ಕುಡಿಯದೆ ಹೋಗ್ಬಾರ್ದು.', transliteration: 'Kaafi kuDiyade hoogbaardu.', english: 'You shouldn\'t leave without drinking coffee.' },
      { kannada: 'ನಾಳೆ ಊಟ ಮಾಡ್ದೆ ಬರ್ಬೇಕು; ಇಲ್ಲೇ ಊಟ ಮಾಡ್ತೀವಿ.', transliteration: 'NaaLe uuta maadde barbeeku; illee uuta maaDtiivi.', english: 'Tomorrow come on an empty stomach (without eating); we will dine here.' }
    ],
    vocabulary: [
      { id: 'v18-1', english: 'Having gotten up', kannada: 'ಎದ್ದು', transliteration: 'eddu', meaning: 'Past participle of eLu' },
      { id: 'v18-2', english: 'Having done', kannada: 'ಮಾಡಿ', transliteration: 'maadi', meaning: 'Past participle of maaDu' },
      { id: 'v18-3', english: 'Having eaten', kannada: 'ತಿಂದು', transliteration: 'tindu', meaning: 'Past participle of tinnu' },
      { id: 'v18-4', english: 'Without doing', kannada: 'ಮಾಡ್ದೆ (ಮಾಡದೆ)', transliteration: 'maadde', meaning: 'Negative verbal participle' }
    ],
    grammarNotes: [
      'Verbs ending in -u usually take -i (maadi, oodi), while consonant stems take -du (tindu, bandu, eddu).',
      'Negative participle adds -de to the root: ಊಟ ಮಾಡ್ದೆ (without dining).'
    ],
    exercise: {
      prompt: 'Combine: "ಪೇಪರ್ ಓದ್ತೀನಿ" + "ಊಟ ಮಾಡ್ತೀನಿ" into one sentence.',
      options: ['ಪೇಪರ್ ಓದಿ ಊಟ ಮಾಡ್ತೀನಿ (Peepar oodi uuta maaDtiini)', 'ಪೇಪರ್ ಓದದೆ ಊಟ ಮಾಡ್ತೀನಿ (Peepar oodade uuta maaDtiini)', 'ಪೇಪರ್ ಓದಲು ಊಟ ಮಾಡ್ತೀನಿ (Peepar oodalu uuta maaDtiini)', 'ಪೇಪರ್ ಓದಿದರೆ ಊಟ ಮಾಡ್ತೀನಿ (Peepar oodidare uuta maaDtiini)'],
      answer: 'ಪೇಪರ್ ಓದಿ ಊಟ ಮಾಡ್ತೀನಿ (Peepar oodi uuta maaDtiini)',
      explanation: 'Oodi (having read) is the past participle connecting the two actions.'
    }
  },
  {
    num: 19,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Verbal Nouns & Gerunds: -oodu',
    titleKn: 'ಭಾವನಾಮಗಳು: ಮಾಡುವುದು (ಮಾಡೋದು), ಕುಡಿಯುವುದು',
    focus: 'Verbal nouns ending in -oodu (seedoodu = smoking, kuDiyoodu = drinking, bariyoodu = writing), case suffixes on verbal nouns (-oodrinda, -oodakke)',
    desc: 'Discuss habits, health advisories, benefits, and annoyances using gerunds.',
    category: 'grammar',
    objectives: ['Form gerunds by adding -oodu to verb stems: seedoodu, oodoodu', 'Attach case endings: seedoodrinda aaroogya kedatte (health spoils by smoking)', 'Express likes/dislikes of activities'],
    explanation: 'Adding -oodu turns any action verb into a noun ("doing", "eating", "learning"). You can then attach cases to it just like any regular noun.',
    dialogueHeading: 'Advice on Giving up Bad Habits',
    dialogueBody: 'Discussions on quitting smoking for health, and kids making noise while writing.',
    examples: [
      { kannada: 'ಸಿಗರೇಟ್ ಸೇದೋದ್ರಿಂದ ಏನು ಲಾಭ? ಸೇದೋದ್ರಿಂದ ಆರೋಗ್ಯ ಕೆಡತ್ತೆ.', transliteration: 'SigreeT seedoodrinda eenu laabha? Seedoodrinda aaroogya keDatte.', english: 'What is the benefit of smoking? By smoking health gets spoiled.' },
      { kannada: 'ಆರೋಗ್ಯ ನೋಡ್ಕೋ, ಸೇದೋದನ್ನ ನಿಲ್ಸು.', transliteration: 'Aaroogya nooDkoo, seedoodanna nilsu.', english: 'Take care of your health, stop smoking.' },
      { kannada: 'ಅವನು ನನ್ನ ಬರೆಯೋದಕ್ಕೆ ಬಿಡಲ್ಲ.', transliteration: 'Avanu nanna bariyoodakke biDalla.', english: 'He does not let me write.' },
      { kannada: 'ಕನ್ನಡ ಕಲಿಯೋದು ತುಂಬಾ ಸುಲಭ.', transliteration: 'KannaDa kaliyoodu tumba sulabha.', english: 'Learning Kannada is very easy.' }
    ],
    vocabulary: [
      { id: 'v19-1', english: 'Health', kannada: 'ಆರೋಗ್ಯ', transliteration: 'aaroogya', meaning: 'Physical well-being' },
      { id: 'v19-2', english: 'Benefit / Profit', kannada: 'ಲಾಭ', transliteration: 'laabha', meaning: 'Gain or advantage' },
      { id: 'v19-3', english: 'To spoil / ruin', kannada: 'ಕೆಡು', transliteration: 'keDu', meaning: 'Deteriorate' },
      { id: 'v19-4', english: 'Noise', kannada: 'ಸದ್ದು', transliteration: 'saddu', meaning: 'Unwanted sound' }
    ],
    grammarNotes: [
      'In formal Kannada, verbal nouns end in -uvudu (ಓದುವುದು); in spoken Kannada, this contracts naturally to -oodu (ಓದೋದು).',
      'Ablative on verbal noun: ಮಾಡೋದ್ರಿಂದ (by doing); Dative: ಮಾಡೋದಕ್ಕೆ (for doing).'
    ],
    exercise: {
      prompt: 'What does "ಕನ್ನಡ ಕಲಿಯೋದು ಒಳ್ಳೆಯದು" mean?',
      options: ['Learning Kannada is good', 'I learn Kannada well', 'Teach me Kannada', 'Do you know Kannada?'],
      answer: 'Learning Kannada is good',
      explanation: 'Kaliyoodu is the verbal noun meaning "the act of learning".'
    }
  },
  {
    num: 20,
    section: 3,
    sectionTitle: 'Build Sentences',
    title: 'Conditionals: If / Unless (-re / -idre)',
    titleKn: 'ಷರತ್ತುಬೋಧಕ: ಬಂದರೆ (ಬಂದ್ರೆ), ಇಲ್ಲದಿದ್ದರೆ',
    focus: 'Positive conditional (-re / -idre = if), negative conditional (-diddre = if not / unless)',
    desc: 'Frame conditions for travel, tickets, rain, and reciprocal agreements.',
    category: 'grammar',
    objectives: ['Form conditions: bandre (if you come), kottre (if you give)', 'Form negative conditions: bardiddre (if you don\'t come)', 'Negotiate train travel and ticket contingencies'],
    explanation: 'The conditional is formed by adding "-re" (or "-dare" in formal style) to the past stem: band- + re = bandre (if you come). Negative adds "-diddre".',
    dialogueHeading: 'Planning Train Travel & Ticket Availability',
    dialogueBody: 'Deciding whether to travel to Delhi or Madras based on ticket confirmations.',
    examples: [
      { kannada: 'ನೀವು ಬಂದ್ರೆ ನಾನು ಹೋಗ್ತೀನಿ.', transliteration: 'Niivu bandre naanu hoogtiini.', english: 'If you accompany me, I will go.' },
      { kannada: 'ಟಿಕೆಟ್ ಸಿಕ್ಕಿದ್ರೆ ಜಿ.ಟಿ. ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ನಲ್ಲಿ ಹೋಗೋಣ; ಸಿಗ್ದಿದ್ರೆ ಕೆ.ಕೆ.ಯಲ್ಲಿ ಹೋಗೋಣ.', transliteration: 'TikeT sikkidre G.T.yalli hoogoona; sigdiddre K.K.yalli hoogoona.', english: 'If we get tickets let\'s go by G.T.; if not, let\'s go by K.K.' },
      { kannada: 'ನೀವು ದುಡ್ಡು ಕೊಟ್ರೆ ಟಿಕೆಟ್ ತಗೋತೀನಿ.', transliteration: 'Niivu duDDu koTtre tikeT tagootiini.', english: 'If you give the money, I will buy the tickets.' },
      { kannada: 'ಮಳೆ ಬಂದ್ರೆ ನಾವು ಓಡೋಣ.', transliteration: 'MaLe bandre naavu ooDoona.', english: 'If it rains let us run.' }
    ],
    vocabulary: [
      { id: 'v20-1', english: 'If available', kannada: 'ಸಿಕ್ಕಿದ್ರೆ', transliteration: 'sikkidre', meaning: 'Conditional of sikku' },
      { id: 'v20-2', english: 'If given', kannada: 'ಕೊಟ್ರೆ', transliteration: 'koTtre', meaning: 'Conditional of koDu' },
      { id: 'v20-3', english: 'Money', kannada: 'ದುಡ್ಡು', transliteration: 'duDDu', meaning: 'Cash / currency' },
      { id: 'v20-4', english: 'Train', kannada: 'ಗಾಡಿ / ರೈಲು', transliteration: 'gaaDi / railu', meaning: 'Vehicle / locomotive' }
    ],
    grammarNotes: [
      'Conditional attaches to past root: baru (come) → band- → bandre (if come).',
      'Negative conditional adds -diddre: bar- + diddre = bardiddre (unless / if one doesn\'t come).'
    ],
    exercise: {
      prompt: 'Complete: "ನೀವು ನನಗೆ ಪುಸ್ತಕ _____ ನಾನು ಓದ್ತೀನಿ (If you give)."',
      options: ['ಕೊಟ್ರೆ (koTtre)', 'ಕೊಟ್ಟರೆ (koTtare)', 'ಕೊಟ್ರಾ (koTraa)', 'ಕೊಡಲ್ಲ (koDalla)'],
      answer: 'ಕೊಟ್ರೆ (koTtre)',
      explanation: 'KoTtre is the spoken conditional form of "koDu" (to give).'
    }
  },

  // SECTION 4: Communicate Confidently (Lessons 21 to 31)
  {
    num: 21,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Purposive Infinitive: -okke / -o-kooskara',
    titleKn: 'ಉದ್ದೇಶಬೋಧಕ: ನೋಡೋಕೆ, ಕಲಿಯುವುದಕ್ಕಾಗಿ',
    focus: 'Purposive infinitives (-okke / -likke / -kooskara = in order to, for the sake of)',
    desc: 'Explain reasons for migrating, sightseeing in Bengaluru, and shopping for vegetables.',
    category: 'conversation',
    objectives: ['Form purposive verbs: nooDokke (in order to see), kaliyokke (in order to learn)', 'Use -kooskara for purpose: tarkaari tarokkooskara (to fetch vegetables)', 'Explain reasons for visiting cities and offices'],
    explanation: 'When one action is performed in order to accomplish another, Kannada uses the purposive suffix "-okke" on the verbal infinitive: nooDa + okke = nooDokke (to see).',
    dialogueHeading: 'Why People Flocking to Bengaluru',
    dialogueBody: 'Conversations about education, jobs, houses, and movie visits.',
    examples: [
      { kannada: 'ಬೆಂಗಳೂರಿಗೆ ಇಷ್ಟು ಜನ ಯಾಕೆ ಬರ್ತಾರೆ? ಊರು ನೋಡೋಕೆ, ಕೆಲವರು ಕಲಿಯೋಕೆ.', transliteration: 'BengaLuurige iSTu jana yaake bartaare? Uuru nooDokke, kelavru kaliyokke.', english: 'Why do so many people come to Bangalore? To see the city, some to study.' },
      { kannada: 'ಬಹಳ ಜನ ಕೆಲಸ ಮಾಡೋಕೆ ಬರ್ತಾರೆ.', transliteration: 'BahaLa jana kelsa maaDokke bartaare.', english: 'Many people come in order to work.' },
      { kannada: 'ತರಕಾರಿ ತರೋಕ್ಕೋಸ್ಕರ ನಾನು ಮಾರ್ಕೆಟ್‌ಗೆ ಹೋಗ್ಬೇಕು.', transliteration: 'Tarkaari tarokkooskara naanu maarkeTge hoogbeeku.', english: 'I have to go to market in order to buy vegetables.' },
      { kannada: 'ಕುಡಿಯೋಕೆ ತಣ್ಣೀರು, ತಿನ್ನೋಕೆ ಐಸ್‌ಕ್ರೀಮು ಸಿಗುತ್ತೆ.', transliteration: 'KuDiyookke taNNiiru, tinnokke aiskriimu sigutte.', english: 'You will get cool water to drink, ice cream to eat.' }
    ],
    vocabulary: [
      { id: 'v21-1', english: 'In order to see', kannada: 'ನೋಡೋಕೆ', transliteration: 'nooDokke', meaning: 'Purposive of nooDu' },
      { id: 'v21-2', english: 'For the sake of', kannada: '-ಗೋಸ್ಕರ / -ಕೋಸ್ಕರ', transliteration: '-gooskara', meaning: 'Postposition of purpose' },
      { id: 'v21-3', english: 'Cool water', kannada: 'ತಣ್ಣೀರು', transliteration: 'taNNiiru', meaning: 'Refreshing drinking water' },
      { id: 'v21-4', english: 'Hunger', kannada: 'ಹಸಿವು', transliteration: 'hasivu', meaning: 'Appetite sensation' }
    ],
    grammarNotes: [
      '-okke is the spoken equivalent of formal -al-akke: ನೋಡಲಕ್ಕೆ → ನೋಡೋಕೆ.',
      'Common pairing: ತಿನ್ನೋಕೆ (to eat), ಕುಡಿಯೋಕೆ (to drink), ಇರೋಕೆ (to reside).'
    ],
    exercise: {
      prompt: 'Which word means "in order to learn"?',
      options: ['ಕಲಿಯೋಕೆ (Kaliyokke)', 'ಕಲಿತೆ (Kalite)', 'ಕಲಿಯಿರಿ (Kaliyiri)', 'ಕಲಿತರೆ (Kalitare)'],
      answer: 'ಕಲಿಯೋಕೆ (Kaliyokke)',
      explanation: 'Root kali + purposive -okke = kaliyokke.'
    }
  },
  {
    num: 22,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Present Perfect Tense: -iddini / -iddaare',
    titleKn: 'ಪೂರ್ಣ ವರ್ತಮಾನ ಕಾಲ: ತಂದಿದ್ದೇನೆ, ತಿಂದಿದ್ದಾರೆ',
    focus: 'Present perfect (bandiddaare = has come, tandiddiini = I have brought, nooDiddeevi = we have seen), negative present perfect (bandilla, tindilla)',
    desc: 'Report actions recently completed with continuing present relevance (manager arrival, audits, morning awakenings).',
    category: 'grammar',
    objectives: ['Combine past participle + present of iru to create present perfect', 'Distinguish simple past (banda) from present perfect (bandiddaane)', 'Report office tasks completed: ripoort tandiddiini (I have brought the report)'],
    explanation: 'The present perfect is constructed by taking the past participle and adding the present forms of "iru": bandu + iddaare = bandiddaare (they have arrived).',
    dialogueHeading: 'Morning Awakening & Office Audit Reports',
    dialogueBody: 'Checking if the manager has arrived and if reports are dispatched.',
    examples: [
      { kannada: 'ರಾಮು ಎದ್ದಿದ್ದೀಯೇನೋ? ಎದ್ದಿದ್ದೀನಮ್ಮ, ಎಲ್ಲರೂ ಎದ್ದಿದ್ದಾರೆ.', transliteration: 'Raamu eddiddiyeenoo? Eddiddiinamma, ellaruu eddiddaare.', english: 'Ramu, are you awake? I am up mummy, everyone has gotten up.' },
      { kannada: 'ಮ್ಯಾನೇಜರ್ ಬಂದಿದ್ದಾರಾ? ಅವರು ಇನ್ನೂ ಬಂದಿಲ್ಲ ಸಾರ್.', transliteration: 'Myaaneejar bandiddaaraa? Avaru innuu bandilla saar.', english: 'Has the manager come? He hasn\'t arrived yet, sir.' },
      { kannada: 'ಡೆಲ್ಲಿಯಿಂದ ತಂತಿ ಬಂದಿದೆ; ರಿಪೋರ್ಟ್ ತಂದಿದ್ದೀನಿ, ರುಜು ಮಾಡಿ.', transliteration: 'Delliyinda tanti bandide; ripoort tandiddiini, ruju maadi.', english: 'Telegram has arrived from Delhi; I have brought the report, please sign.' }
    ],
    vocabulary: [
      { id: 'v22-1', english: 'Still / Yet', kannada: 'ಇನ್ನೂ', transliteration: 'innuu', meaning: 'Temporal continuative' },
      { id: 'v22-2', english: 'Telegram / Wire', kannada: 'ತಂತಿ', transliteration: 'tanti', meaning: 'Urgent communication' },
      { id: 'v22-3', english: 'Signature', kannada: 'ರುಜು', transliteration: 'ruju', meaning: 'Sign manual' },
      { id: 'v22-4', english: 'I have brought', kannada: 'ತಂದಿದ್ದೀನಿ', transliteration: 'tandiddiini', meaning: 'Present perfect of taru' }
    ],
    grammarNotes: [
      'Present perfect connects a completed past action with the present moment.',
      'Negating present perfect uses simple "-illa": ಬಂದಿದ್ದಾರೆ ↔ ಬಂದಿಲ್ಲ (has not come yet).'
    ],
    exercise: {
      prompt: 'How do you say "I have written the book" in Kannada?',
      options: ['ನಾನು ಪುಸ್ತಕ ಬರೆದಿದ್ದೀನಿ (Naanu pustaka bardiddiini)', 'ನಾನು ಪುಸ್ತಕ ಬರೆದೆ (Naanu pustaka barde)', 'ನಾನು ಪುಸ್ತಕ ಬರೀತೀನಿ (Naanu pustaka bariitiini)', 'ನಾನು ಪುಸ್ತಕ ಬರೀಬೇಕು (Naanu pustaka bariibeeku)'],
      answer: 'ನಾನು ಪುಸ್ತಕ ಬರೆದಿದ್ದೀನಿ (Naanu pustaka bardiddiini)',
      explanation: 'Bardu (participle) + iddiini (1st person auxiliary) = bardiddiini.'
    }
  },
  {
    num: 23,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Past Perfect Tense: -idde / -iddru',
    titleKn: 'ಪೂರ್ಣ ಭೂತಕಾಲ: ಹೋಗಿದ್ದೆ, ನೋಡಿದ್ದೆವು',
    focus: 'Past perfect (hoogidde = had gone, nooDidde = had seen, kottiddru = had given)',
    desc: 'Narrate experiences completed before another past event (visiting Red Fort, sick pet treatments).',
    category: 'grammar',
    objectives: ['Combine past participle + past of iru: hoogidde (I had gone)', 'Recount historical travels and sightseeing experiences', 'Describe pet treatments: aaspatrege karkonD hoogidde'],
    explanation: 'The past perfect combines the past participle with past forms of "iru": hoog- + idde = hoogidde (I had gone). It expresses actions finished before another point in the past.',
    dialogueHeading: 'Visits to Delhi & Monuments',
    dialogueBody: 'Recounting visits to Red Fort, Qutub Minar, and Taj Mahal.',
    examples: [
      { kannada: 'ನೀವು ದೆಹಲಿಗೆ ಹೋಗಿದ್ರಾ? ಎರಡು ಸಲ ಹೋಗಿದ್ದೆ.', transliteration: 'Niivu dehlige hoogiddraa? Eradu sala hoogidde.', english: 'Had you been to Delhi? Sure, I had been twice.' },
      { kannada: 'ಮೊದಲನೇ ಸಲ ಏನೇನು ನೋಡಿದ್ರಿ? ಕೆಂಪು ಕೋಟೆ, ಕುತುಬ್ ಮಿನಾರ್ ನೋಡಿದ್ದೆ.', transliteration: 'Modalnee sala eeneenu nooDiddri? Kempu kooTe, kutub miinaar nooDidde.', english: 'What all had you seen the first time? I had seen the Red Fort and Qutub Minar.' },
      { kannada: 'ನಿಮ್ಮ ನಾಯಿ ಓಡಿ ಹೋಗಿತ್ತು; ಆಸ್ಪತ್ರೆಗೆ ಕರ್ಕೊಂಡು ಹೋಗಿದ್ದೆ.', transliteration: 'Nimma naayi oodi hoogittu; aaspatrege karkonDu hoogidde.', english: 'Your dog had run away; I had taken it to the hospital.' }
    ],
    vocabulary: [
      { id: 'v23-1', english: 'Red Fort', kannada: 'ಕೆಂಪು ಕೋಟೆ', transliteration: 'kempu kooTe', meaning: 'Historical monument in Delhi' },
      { id: 'v23-2', english: 'Hospital', kannada: 'ಆಸ್ಪತ್ರೆ', transliteration: 'aaspatre', meaning: 'Medical clinic' },
      { id: 'v23-3', english: 'To take someone along', kannada: 'ಕರ್ಕೊಂಡು ಹೋಗು', transliteration: 'karkonDu hoogu', meaning: 'Accompany someone' },
      { id: 'v23-4', english: 'Cured / Well', kannada: 'ವಾಸಿ', transliteration: 'vaasi', meaning: 'Recovery from illness' }
    ],
    grammarNotes: [
      'Distinction: "naanu nooDde" = I saw (simple past); "naanu nooDidde" = I had seen (past perfect).',
      'Pairs with time markers: ಆಗಲೇ (already), ಮುಂಚೆಯೇ (earlier).'
    ],
    exercise: {
      prompt: 'Translate: "I had seen the Taj Mahal last year."',
      options: ['ನಾನು ಹೋದ ವರ್ಷ ತಾಜ್‌ಮಹಲ್ ನೋಡಿದ್ದೆ (Naanu hooda varSa taajmahal nooDidde)', 'ನಾನು ತಾಜ್‌ಮಹಲ್ ನೋಡ್ತೀನಿ (Naanu taajmahal nooDtiini)', 'ನಾನು ತಾಜ್‌ಮಹಲ್ ನೋಡಿದೆ (Naanu taajmahal nooDde)', 'ತಾಜ್‌ಮಹಲ್ ನೋಡೋಣ (Taajmahal nooDoona)'],
      answer: 'ನಾನು ಹೋದ ವರ್ಷ ತಾಜ್‌ಮಹಲ್ ನೋಡಿದ್ದೆ (Naanu hooda varSa taajmahal nooDidde)',
      explanation: 'NooD- + idde = nooDidde (past perfect).'
    }
  },
  {
    num: 24,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Present Continuous & Habitual Continuous',
    titleKn: 'ಅಪೂರ್ಣ ವರ್ತಮಾನ ಕಾಲ: ಮಾಡುತ್ತಿದ್ದೇನೆ, ಆಡುತ್ತಿರುತ್ತೇನೆ',
    focus: 'Present continuous (-taa iddiini = I am doing right now), habitual continuous (-taa irtiini = I am usually doing)',
    desc: 'Describe ongoing actions taking place right now (cooking, ironing, playing) versus habitual time slots.',
    category: 'grammar',
    objectives: ['Form present continuous: stem + -taa + iddiini (maaDtaa iddiini)', 'Form habitual continuous: stem + -taa + irtiini (aaDtaa irtiini)', 'Discuss professions and ongoing vocational tasks'],
    explanation: 'Attach the continuous marker "-taa" to the verb stem, then follow with "iru". Using present "iddiini" means right now; using habitual "irtiini" means usually during that time.',
    dialogueHeading: 'Home Chores, Evening Play & Professional Vocations',
    dialogueBody: 'Ironing clothes, listening to evening radio, and carpentry/tailoring occupations.',
    examples: [
      { kannada: 'ಅವರು ಅಡುಗೆ ಮಾಡ್ತಾ ಇದ್ದಾರೆ; ಪೇಪರ್ ಓದ್ತಾ ಇರಿ.', transliteration: 'Avaru aDge maaDtaa iddaare; peepar oodtaa iri.', english: 'She is cooking food; please keep reading the newspaper.' },
      { kannada: 'ನೀವು ಸಂಜೆ ಹೊತ್ತು ಆಡ್ತಿರ್ತೀರಾ? ಹೌದು, ದಿನಾ ಐದೂವರೆಯಿಂದ ಆಡ್ತಿರ್ತೀನಿ.', transliteration: 'Niivu sanje hottu aaDtirtiiraa? Haudu, dinaa aiduuvareyinda aaDtirtiini.', english: 'Would you usually be playing in the evening? Yes, daily from 5:30 I will be playing.' },
      { kannada: 'ನಮಸ್ಕಾರ, ಬಟ್ಟೆ ಇಸ್ತ್ರಿ ಮಾಡ್ತಿದ್ದೀನಿ.', transliteration: 'Namaskaara, baTTe istri maaDtiddiini.', english: 'Hello, I am ironing clothes.' },
      { kannada: 'ಮನೆಯಲ್ಲಿ ರೇಡಿಯೋ ಕೇಳ್ತಾ ಇರ್ತೀನಿ.', transliteration: 'Maneyalli reeDiyo keeLtaa irtiini.', english: 'I will be at home listening to the radio.' }
    ],
    vocabulary: [
      { id: 'v24-1', english: 'Ironing (clothes)', kannada: 'ಇಸ್ತ್ರಿ ಮಾಡು', transliteration: 'istri maaDu', meaning: 'Pressing garments' },
      { id: 'v24-2', english: 'Carpenter', kannada: 'ಬಡಗಿ', transliteration: 'baDagi', meaning: 'Woodworker' },
      { id: 'v24-3', english: 'Tailor', kannada: 'ದರ್ಜಿ', transliteration: 'darji', meaning: 'Garment stitcher' },
      { id: 'v24-4', english: 'To listen / hear', kannada: 'ಕೇಳು', transliteration: 'keeLu', meaning: 'Auditory perception' }
    ],
    grammarNotes: [
      '-taa expresses ongoing durative action: ಓದ್ತಾ (reading), ಮಾಡ್ತಾ (doing).',
      'Present continuous: ಮಾಡ್ತಾ ಇದ್ದೇನೆ (I am doing right now). Habitual continuous: ಮಾಡ್ತಾ ಇರ್ತೇನೆ (I am usually doing).'
    ],
    exercise: {
      prompt: 'How do you say "She is cooking right now"?',
      options: ['ಅವಳು ಅಡುಗೆ ಮಾಡ್ತಾ ಇದ್ದಾಳೆ (AvaLu aDge maaDtaa iddaaLe)', 'ಅವಳು ಅಡುಗೆ ಮಾಡ್ತಾಳೆ (AvaLu aDge maaDtaaLe)', 'ಅವಳು ಅಡುಗೆ ಮಾಡಿದಳು (AvaLu aDge maaDidaLu)', 'ಅವಳು ಅಡುಗೆ ಮಾಡ್ಬೇಕು (AvaLu aDge maaDbeeku)'],
      answer: 'ಅವಳು ಅಡುಗೆ ಮಾಡ್ತಾ ಇದ್ದಾಳೆ (AvaLu aDge maaDtaa iddaaLe)',
      explanation: 'MaaDtaa (continuous) + iddaaLe (she is).'
    }
  },
  {
    num: 25,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Past Continuous & Past Habitual: -taa idde',
    titleKn: 'ಅಪೂರ್ಣ ಭೂತಕಾಲ: ಮಾಡುತ್ತಿದ್ದೆ, ಬೆಳೆಯುತ್ತಿದ್ದೆವು',
    focus: 'Past continuous (-taa idde = I was doing, -taa iddru = they were doing), past habitual negative (-taa irlilla)',
    desc: 'Describe what you were doing at a specific time in the past (watering plants, farming crops, children crying).',
    category: 'grammar',
    objectives: ['Form past continuous: maaDtaa idde (I was doing)', 'Narrate farming practices: bhatta, jooLa beLiitiddvi (we were growing paddy and maize)', 'Contrast continuous past with completed past'],
    explanation: 'Formed with stem + -taa + past of iru (idde, iddru, ittu). Used for background actions in progress when something else happened.',
    dialogueHeading: 'Watering the Garden & Farming Background',
    dialogueBody: 'Explaining garden watering, child having fever, and cultivating fields.',
    examples: [
      { kannada: 'ನಿನ್ನೆ ಸಾಯಂಕಾಲ ನೀವು ಏನ್ ಮಾಡ್ತಾ ಇದ್ರಿ? ನಾನು ಗಿಡಗಳಿಗೆ ನೀರ್ ಹಾಕ್ತಿದ್ದೆ.', transliteration: 'Ninne saayankaala niivu een maaDtaa iddri? Naanu giDagaLge niir haaktidde.', english: 'What were you doing yesterday evening? I was watering the plants.' },
      { kannada: 'ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ ಏನೇನು ಬೆಳೀತಿದ್ರಿ? ಗೋಧಿ, ಭತ್ತ ಮತ್ತು ಹತ್ತಿ ಬೆಳೀತಿದ್ವಿ.', transliteration: 'Nimma holadalli eeneenu beLiitiddri? Goodhi, bhatta mattu hatti beLiitiddvi.', english: 'What were you growing in your field? We were growing wheat, paddy, and cotton.' },
      { kannada: 'ಮಕ್ಕಳು ರಸ್ತೆಯಲ್ಲಿ ಆಡ್ತಾ ಇದ್ರು.', transliteration: 'MakLu rasteyalli aaDtaa iddru.', english: 'The children were playing in the street.' }
    ],
    vocabulary: [
      { id: 'v25-1', english: 'Paddy / Rice crop', kannada: 'ಭತ್ತ', transliteration: 'bhatta', meaning: 'Unhusked rice crop' },
      { id: 'v25-2', english: 'Wheat', kannada: 'ಗೋಧಿ', transliteration: 'goodhi', meaning: 'Cereal grain' },
      { id: 'v25-3', english: 'Cotton', kannada: 'ಹತ್ತಿ', transliteration: 'hatti', meaning: 'Fiber crop' },
      { id: 'v25-4', english: 'To water / irrigate', kannada: 'ನೀರು ಹಾಕು', transliteration: 'niir haaku', meaning: 'Pour water onto plants' }
    ],
    grammarNotes: [
      'Past continuous frames simultaneous occurrences: "naanu hoogtidde, aaga bassu bantu" (I was going, just then the bus came).',
      'Negative: ಮಾಡ್ತಾ ಇರ್ಲಿಲ್ಲ (was not doing).'
    ],
    exercise: {
      prompt: 'Translate: "I was watering the plants yesterday."',
      options: ['ನಿನ್ನೆ ನಾನು ಗಿಡಗಳಿಗೆ ನೀರ್ ಹಾಕ್ತಿದ್ದೆ (Ninne naanu giDagaLge niir haaktidde)', 'ನಿನ್ನೆ ನಾನು ಗಿಡಗಳಿಗೆ ನೀರ್ ಹಾಕಿದೆ (Ninne naanu giDagaLge niir haakide)', 'ನಾನು ನೀರ್ ಹಾಕ್ತೀನಿ (Naanu niir haaktiini)', 'ಗಿಡಗಳಿಗೆ ನೀರ್ ಹಾಕಿ (GiDagaLge niir haaki)'],
      answer: 'ನಿನ್ನೆ ನಾನು ಗಿಡಗಳಿಗೆ ನೀರ್ ಹಾಕ್ತಿದ್ದೆ (Ninne naanu giDagaLge niir haaktidde)',
      explanation: 'Haak- + taa + idde = haaktidde (was pouring/watering).'
    }
  },
  {
    num: 26,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Adjectival Relative Participles: -id / -oo',
    titleKn: 'ಕೃದಂತ ಗುಣವಾಚಕಗಳು (ಮಾಡಿದ ಕೆಲಸ, ನೋಡೋ ಸಿನಿಮಾ)',
    focus: 'Relative participles in past (-ida / -id: haaDida huDugi = the girl who sang) and present/habitual (-oo: maadoo kelsa = the work one does)',
    desc: 'Specify people and things using relative clauses ("the master who taught me", "the room where I work").',
    category: 'grammar',
    objectives: ['Form past relative participle: kalita paatha (the lesson that was learnt)', 'Form present/habitual relative participle: maadoo aafiisu (the office where one works)', 'Create descriptive relative noun phrases'],
    explanation: 'Instead of relative pronouns like "who" or "which", Kannada transforms the verb into an adjectival participle modifying the subsequent noun directly.',
    dialogueHeading: 'The Office Where I Work & Music Performers',
    dialogueBody: 'Typist talking about his desk, and identifying the girl who sang yesterday.',
    examples: [
      { kannada: 'ನೀವು ಕೆಲಸ ಮಾಡೋ ಆಫೀಸು ಇದೇನಾ? ಹೌದು, ಇಲ್ಲೇ ಕೆಲಸ ಮಾಡ್ತಿದ್ದೀನಿ.', transliteration: 'Niivu kelsa maadoo aafiisu ideenaa? Haudu, illee kelsa maaDtiddiini.', english: 'Is this the office where you work? Yes, I work right here.' },
      { kannada: 'ನಿನ್ನೆ ಸಭೆಯಲ್ಲಿ ಹಾಡಿದ ಹುಡುಗಿ ಯಾರು? ಅವಳು ನನ್ ತಂಗಿ.', transliteration: 'Ninne sabheyalli haaDida huDgi yaaru? AvaLu nan tangi.', english: 'Who is the girl that sang in yesterday\'s meeting? She is my younger sister.' },
      { kannada: 'ಅವರು ನನಗೆ ಕನ್ನಡ ಕಲಿಸಿದ ಮೇಷ್ಟ್ರು.', transliteration: 'Avaru nange kannaDa kalsida meeSTru.', english: 'He is the teacher who taught me Kannada.' },
      { kannada: 'ಅಲ್ಲಿ ನಿಂತಿರೋ ಮನುಷ್ಯ ಯಾರು?', transliteration: 'Alli nintiroo manuSya yaaru?', english: 'Who is the person standing over there?' }
    ],
    vocabulary: [
      { id: 'v26-1', english: 'Meeting / Assembly', kannada: 'ಸಭೆ', transliteration: 'sabhe', meaning: 'Gathering of people' },
      { id: 'v26-2', english: 'To teach', kannada: 'ಕಲಿಸು', transliteration: 'kalisu', meaning: 'Instruct / educate' },
      { id: 'v26-3', english: 'Song', kannada: 'ಹಾಡು', transliteration: 'haaDu', meaning: 'Musical vocal composition' },
      { id: 'v26-4', english: 'Person / Man', kannada: 'ಮನುಷ್ಯ', transliteration: 'manuSya', meaning: 'Human individual' }
    ],
    grammarNotes: [
      'Past relative participle: verb root + ida (ಹಾಡಿದ = who sang, ಓದಿದ = who read).',
      'Present relative participle: verb root + oo (ಮಾಡೋ = who does/working, ಬರೋ = who comes).'
    ],
    exercise: {
      prompt: 'Which phrase means "The teacher who taught me Kannada"?',
      options: ['ಕನ್ನಡ ಕಲಿಸಿದ ಮೇಷ್ಟ್ರು (KannaDa kalsida meeSTru)', 'ಕನ್ನಡ ಕಲಿಯೋ ಮೇಷ್ಟ್ರು (KannaDa kaliyoo meeSTru)', 'ಮೇಷ್ಟ್ರು ಕನ್ನಡ ಕಲಿಸ್ತಾರೆ (MeeSTru kannaDa kalistaare)', 'ಕನ್ನಡ ಮೇಷ್ಟ್ರು ಎಲ್ಲಿ? (KannaDa meeSTru elli?)'],
      answer: 'ಕನ್ನಡ ಕಲಿಸಿದ ಮೇಷ್ಟ್ರು (KannaDa kalsida meeSTru)',
      explanation: 'Kalsida is the past relative participle modifying meeSTru.'
    }
  },
  {
    num: 27,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Relative Participle Nouns: -ooru / -avaru',
    titleKn: 'ಕೃದಂತ ನಾಮಪದಗಳು (ಕಲಿಯುವವರು, ಬಂದವರು)',
    focus: 'Relative participle nouns (kalyooru = those who learn, bandooru = those who came, oodadavaru = those who haven\'t read)',
    desc: 'Describe categories of people by their actions ("the Kannada learners in our class", "the people who weave").',
    category: 'grammar',
    objectives: ['Form participle nouns by appending -ooru / -avaru to participles', 'Distinguish past participle nouns (bandooru) from present (barooru)', 'Describe village professions: raytru, neeyooru, belyooru'],
    explanation: 'By adding human pronouns (-ooru / -avaru) to relative participles, you form agent nouns: "kalyooru" literally means "the learning-ones".',
    dialogueHeading: 'Classmates in Kannada Class & Village Life',
    dialogueBody: 'Counting Kannada learners, latecomers, and reading novel chapters.',
    examples: [
      { kannada: 'ನಿಮ್ ಕ್ಲಾಸ್‌ನಲ್ಲಿ ಕನ್ನಡ ಕಲ್ಯೋರು ಎಷ್ಟು ಜನ? ಎಂಟು ಜನ.', transliteration: 'Nim klaasnalli kannaDa kalyooru eSTu jana? ENTu jana.', english: 'How many Kannada learners are there in your class? Eight people.' },
      { kannada: 'ನಿನ್ನೆ ಕ್ಲಾಸ್‌ಗೆ ತಡವಾಗಿ ಬಂದೋರು ಯಾರು? ಸುರೇಶ್.', transliteration: 'Ninne klaasge taDavaagi bandooru yaaru? Surees.', english: 'Who was the one that came late to class yesterday? Suresh.' },
      { kannada: 'ಇನ್ನೂ ಓದದವರು ಯಾರು? ಅವರಿಬ್ಬರೇ ಇನ್ನೂ ಓದದವರು.', transliteration: 'Innuu oodadavaru yaaru? Avaribbree innuu oodadavaru.', english: 'Who are those who haven\'t read yet? Those two are the only ones.' }
    ],
    vocabulary: [
      { id: 'v27-1', english: 'Learners', kannada: 'ಕಲ್ಯೋರು', transliteration: 'kalyooru', meaning: 'Those who learn' },
      { id: 'v27-2', english: 'Those who came', kannada: 'ಬಂದೋರು', transliteration: 'bandooru', meaning: 'Past participle noun' },
      { id: 'v27-3', english: 'Lazy person', kannada: 'ಸೋಮಾರಿ', transliteration: 'soomaari', meaning: 'Indolent individual' },
      { id: 'v27-4', english: 'Late / Delay', kannada: 'ತಡ', transliteration: 'taDa', meaning: 'Belatedness' }
    ],
    grammarNotes: [
      'Pattern: Verb participle + avaru contracts in speech to -ooru: ಬರುವವರು → ಬರೋರು; ಬಂದವರು → ಬಂದೋರು.',
      'Negative participle noun adds -ada-: ಓದದವರು (those who have not read).'
    ],
    exercise: {
      prompt: 'What does "ಕನ್ನಡ ಕಲ್ಯೋರು" mean?',
      options: ['Those who learn Kannada', 'Kannada teacher', 'Kannada book', 'Kannada language'],
      answer: 'Those who learn Kannada',
      explanation: 'KannaDa + kalyooru (participle noun for learners).'
    }
  },
  {
    num: 28,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Simultaneous Actions & Temporal Clauses: -aaga',
    titleKn: 'ಕಾಲವಾಚಕ ಅವ್ಯಯಗಳು: ಬಂದಾಗ, ಹೋಗುವಾಗ',
    focus: 'Adverbial clauses of time formed with -aaga (bandaaga = when one came, hoogoovaaga = while going, eLuvaaglee = at the very moment of waking)',
    desc: 'Describe timing coincidences ("when I went home it was 10 o\'clock", "while leaving I got delayed").',
    category: 'grammar',
    objectives: ['Form time clauses with past participle + -aaga: manege hoodaaga', 'Form ongoing time clauses with present participle + -vaaga: hoogoovaaga', 'Narrate simultaneous events smoothly'],
    explanation: 'Appending "-aaga" to participles creates English "when" or "while" clauses: band- + aaga = bandaaga (when you come/came).',
    dialogueHeading: 'Late for Class & Visiting When Friends Were Away',
    dialogueBody: 'Excusing bus delays and recounting visiting a friend\'s house.',
    examples: [
      { kannada: 'ನಾಳೆ ನೀವು ಬಂದಾಗ ನಾನು ಖಂಡಿತ ಇರ್ತೀನಿ.', transliteration: 'NaaLe niivu bandaaga naanu khanDita irtiini.', english: 'Tomorrow when you come, I will definitely be at home.' },
      { kannada: 'ನಿನ್ನೆ ನೀವು ಮನೆಗೆ ಹೋದಾಗ ಎಷ್ಟು ಗಂಟೆ? ಹತ್ತು ಗಂಟೆ.', transliteration: 'Ninne niivu manege hoodaaga eSTu gante? Hattu gante.', english: 'What was the time when you went home yesterday? 10 o\'clock.' },
      { kannada: 'ಕನ್ನಡ ಕ್ಲಾಸ್‌ಗೆ ಯಾಕೆ ತಡವಾಗಿ ಬಂದ್ರಿ? ಹಾಳು ಬಸ್ಸೇ ಸಿಗ್ಲಿಲ್ಲ.', transliteration: 'KannaDa klaasge yaake taDavaagi bandri? HaaLu bassee siglilla.', english: 'Why did you come late to the Kannada class? The wretched bus didn\'t turn up!' }
    ],
    vocabulary: [
      { id: 'v28-1', english: 'Definitely', kannada: 'ಖಂಡಿತ', transliteration: 'khanDita', meaning: 'Without fail / certainly' },
      { id: 'v28-2', english: 'Wretched / Spoiled', kannada: 'ಹಾಳು', transliteration: 'haaLu', meaning: 'Colloquial vexation' },
      { id: 'v28-3', english: 'Again', kannada: 'ಪುನಃ', transliteration: 'punaha', meaning: 'Once more' }
    ],
    grammarNotes: [
      'Bandaaga = when one arrives/arrived; baroovaaga = while arriving / on the way.',
      'Adding -lee adds emphasis: ಏಳುವಾಗಲೇ (the very instant I woke up).'
    ],
    exercise: {
      prompt: 'Translate: "When I went home, it was ten o\'clock."',
      options: ['ನಾನು ಮನೆಗೆ ಹೋದಾಗ ಹತ್ತು ಗಂಟೆ (Naanu manege hoodaaga hattu gante)', 'ನಾನು ಮನೆಗೆ ಹೋಗ್ತೀನಿ (Naanu manege hoogtiini)', 'ಮನೆಗೆ ಹೋದ ಮೇಲೆ ಹತ್ತು ಗಂಟೆ (Manege hooda meele hattu gante)', 'ನೀವು ಮನೆಗೆ ಹೋಗಿ (Niivu manege hoogi)'],
      answer: 'ನಾನು ಮನೆಗೆ ಹೋದಾಗ ಹತ್ತು ಗಂಟೆ (Naanu manege hoodaaga hattu gante)',
      explanation: 'Hooda (went) + aaga (when) = hoodaaga.'
    }
  },
  {
    num: 29,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Duration & Succession: -varege / -meele',
    titleKn: 'ಕಾಲಾವಧಿ ಮತ್ತು ಅನುಕ್ರಮ: -ವರೆಗೆ ಮತ್ತು -ಮೇಲೆ',
    focus: 'Period of duration formed with relative participles + varege (until) or meele (after): maataadoo varege, mugid meele, baroo varege',
    desc: 'Specify time boundaries ("until you speak well", "after class is completed", "until master arrived").',
    category: 'conversation',
    objectives: ['Express duration with -varege: cennaagi maataaDoo varege (until you speak well)', 'Express sequence with -meele: klaas mugid meele (after class finishes)', 'Plan study schedules and after-class activities'],
    explanation: 'Attach "varege" to present relative participles for "until/till", and attach "meele" to past relative participles for "after".',
    dialogueHeading: 'How Long Must I Learn Kannada?',
    dialogueBody: 'Discussing study months, going to the hostel after class, and reading late.',
    examples: [
      { kannada: 'ನೀವು ಚೆನ್ನಾಗಿ ಮಾತಾಡೋ ವರೆಗೆ ಕನ್ನಡ ಕಲೀಬೇಕು.', transliteration: 'Niivu cennaagi maataaDoo varege kannaDa kaliibeeku.', english: 'You have to learn Kannada until you speak well.' },
      { kannada: 'ಹಾಗಾದ್ರೆ ಎಷ್ಟು ತಿಂಗಳು ಕಲೀಬೇಕು? ನಾಲ್ಕು ತಿಂಗಳು ಕಲೀಬೇಕು.', transliteration: 'Haagaadre eSTu tingLu kaliibeeku? Naalku tingLu kaliibeeku.', english: 'If so, how many months should I learn? You have to learn for 4 months.' },
      { kannada: 'ನಿನ್ನೆ ಕ್ಲಾಸ್ ಮುಗಿದ ಮೇಲೆ ಎಲ್ಲಿಗೆ ಹೋಿದ್ರಿ? ಹಾಸ್ಟೆಲ್‌ಗೆ ಹೋದೆ.', transliteration: 'Ninne klaas mugida meele ellige hoodri? Haastelge hoode.', english: 'Where did you go yesterday after class was over? I went to the hostel.' },
      { kannada: 'ನಮ್ಮ ಮೇಷ್ಟ್ರು ಬರೋ ವರೆಗೆ ಓದ್ತಿದ್ದೆ.', transliteration: 'Namma meeSTru baroo varege oodtidde.', english: 'I was reading until our master arrived.' }
    ],
    vocabulary: [
      { id: 'v29-1', english: 'Until / Up to', kannada: 'ವರೆಗೆ', transliteration: 'varege', meaning: 'Temporal or spatial limit' },
      { id: 'v29-2', english: 'After / Afterwards', kannada: 'ಮೇಲೆ', transliteration: 'meele', meaning: 'Subsequent in time' },
      { id: 'v29-3', english: 'To end / complete', kannada: 'ಮುಗಿ', transliteration: 'mugi', meaning: 'Reach conclusion' }
    ],
    grammarNotes: [
      'Rule: Present participle + varege = until (ಬರೋ ವರೆಗೆ = until coming).',
      'Rule: Past participle + meele = after (ಬಂದ ಮೇಲೆ = after coming).'
    ],
    exercise: {
      prompt: 'Which phrase means "After the class was completed"?',
      options: ['ಕ್ಲಾಸ್ ಮುಗಿದ ಮೇಲೆ (Klaas mugida meele)', 'ಕ್ಲಾಸ್ ಮುಗಿಯೋ ವರೆಗೆ (Klaas mugiyoo varege)', 'ಕ್ಲಾಸ್ ಮುಗಿದಾಗ (Klaas mugidaaga)', 'ಕ್ಲಾಸ್ ಮುಗಿಸಿ (Klaas mugisi)'],
      answer: 'ಕ್ಲಾಸ್ ಮುಗಿದ ಮೇಲೆ (Klaas mugida meele)',
      explanation: 'Mugida (completed) + meele (after) = mugida meele.'
    }
  },
  {
    num: 30,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Unreal Past Conditions & Regrets',
    titleKn: 'ಅಸಂಭಾವ್ಯ ಭೂತಕಾಲ: ಹೇಳಿದ್ದರೆ ಹೊಲಿಯುತ್ತಿದ್ದೆ',
    focus: 'Past perfect conditional followed by past continuous / subjunctive (-iddre... -tidde / -boodaagittu: heeliddre maadtidde)',
    desc: 'Express hypothetical past scenarios ("if you had told me yesterday, I would have stitched it").',
    category: 'grammar',
    objectives: ['Form past conditional: heeliddre (if you had told)', 'Form past potential consequence: holiitaa idde (I would have been stitching)', 'Discuss unfulfilled promises and bargaining outcomes'],
    explanation: 'To express "if X had happened, Y would have resulted", Kannada uses past participle + iddre, paired with a past continuous or subjunctive verb.',
    dialogueHeading: 'Tailor Deadlines & Bank Holidays',
    dialogueBody: 'Shirt stitching delays, wedding deadlines, and bank holiday book deliveries.',
    examples: [
      { kannada: 'ಈ ಶರ್ಟು ನಾಳೆ ಕೊಡ್ತೀರಾ? ಇಲ್ಲ, ನಾಳೆ ಕೊಡೋಕೆ ಆಗಲ್ಲ.', transliteration: 'Ii sartu naaLe koDtiiraa? Illa, naaLe koDoke aagalla.', english: 'Will you give this shirt tomorrow? No, I can\'t give it tomorrow.' },
      { kannada: 'ನೀವು ನಿನ್ನೆ ಹೇಳಿದ್ರೆ ಹೊಲಿತಾ ಇದ್ದೆ.', transliteration: 'Niivu ninne heeLiddre holitaa idde.', english: 'If you had told me yesterday, I would have stitched it.' },
      { kannada: 'ನನಗೆ ನಿನ್ನೇನೆ ಗೊತ್ತಾಗಿದ್ರೆ ಹೇಳ್ತಿದ್ದೆ!', transliteration: 'Nange ninneenee gottaagiddre heeLtidde!', english: 'Had I known yesterday itself, I would have told you!' },
      { kannada: 'ನೀವು ತರಕಾರಿ ತಂದಿದ್ರೆ ಸಾಂಬಾರ್ ಮಾಡ್ತಿದ್ದೆ.', transliteration: 'Niivu tarkaari tandiddre saambaar maaDtidde.', english: 'If you had brought vegetables, I would have prepared sambar.' }
    ],
    vocabulary: [
      { id: 'v30-1', english: 'Wedding', kannada: 'ಮದುವೆ', transliteration: 'maduve', meaning: 'Marriage ceremony' },
      { id: 'v30-2', english: 'To stitch', kannada: 'ಹೊಲಿ', transliteration: 'holi', meaning: 'Sew garments' },
      { id: 'v30-3', english: 'To come to know', kannada: 'ಗೊತ್ತಾಗು', transliteration: 'gottaagu', meaning: 'Become aware' },
      { id: 'v30-4', english: 'Bargaining', kannada: 'ಚೌಕಾಸಿ', transliteration: 'caukaasi', meaning: 'Haggling on price' }
    ],
    grammarNotes: [
      'Unreal condition formula: [Past participle + iddre] ... [Root + tidde / boodaagittu].',
      'Example: ಬಂದಿದ್ರೆ ಊಟ ಮಾಡ್ಬಹುದಾಗಿತ್ತು (If you had come, you could have eaten).'
    ],
    exercise: {
      prompt: 'Translate: "If you had told me, I would have brought it."',
      options: ['ನೀವು ಹೇಳಿದ್ರೆ ತರ್ತಿದ್ದೆ (Niivu heeLiddre tartidde)', 'ನೀವು ಹೇಳಿ ತಂದೆ (Niivu heeLi tande)', 'ನೀವು ಹೇಳಿದಾಗ ತರ್ತೀನಿ (Niivu heeLidaaga tartiini)', 'ನೀವು ಹೇಳಬೇಡಿ (Niivu heeLbeeDi)'],
      answer: 'ನೀವು ಹೇಳಿದ್ರೆ ತರ್ತಿದ್ದೆ (Niivu heeLiddre tartidde)',
      explanation: 'HeeLiddre (had told) + tartidde (would have brought).'
    }
  },
  {
    num: 31,
    section: 4,
    sectionTitle: 'Communicate Confidently',
    title: 'Adverbial Manner of Comparison: -haage',
    titleKn: 'ಹೋಲಿಕೆಯ ರೀತಿವಾಚಕ: ಮಾಡುವ ಹಾಗೆ, ಅವನ ಹಾಗೆ',
    focus: 'Adverbial phrase of comparison formed by adding -haage (like that / as) to relative participles (oodoo haage, ogda haage, maaDoo haage)',
    desc: 'Compare manner of action ("nobody cooks as well as he does", "wash clothes as he washes").',
    category: 'conversation',
    objectives: ['Use -haage to compare manner of doing things: avanu oodoo haage (the way he studies)', 'Express unique skills: avanu aDge maadoo haage yaaruu maaDalla', 'Conclude your Spoken Kannada fluency course with mastery of comparison'],
    explanation: 'Attaching "haage" (like/in the manner of) to a relative participle forms comparative clauses of manner: "avanu maaDoo haage" = the way he does.',
    dialogueHeading: 'Praising Good Cooks & Diligent Students',
    dialogueBody: 'Complimenting exemplary study habits, washing techniques, and master cooking.',
    examples: [
      { kannada: 'ನಿಮ್ಮ ಮಗ ಚೆನ್ನಾಗಿ ಓದ್ತಾನಾ? ಹೌದು, ಅವನು ಓದೋ ಹಾಗೆ ಕ್ಲಾಸ್‌ನಲ್ಲಿ ಯಾರೂ ಓದಲ್ಲ.', transliteration: 'Nimma maga cennaagi oodtaanaa? Haudu, avanu oodoo haage klaasnalli yaaruu oodalla.', english: 'Does your son study well? Yes, nobody else studies as well as he does in class.' },
      { kannada: 'ಅವನು ಒಗೆದ ಹಾಗೆ ಬಟ್ಟೆ ಒಗಿಬೇಕು.', transliteration: 'Avanu ogeda haage baTTe ogibeeku.', english: 'You should wash clothes the way he washes.' },
      { kannada: 'ಈ ದೋಸೆ ಯಾರು ಮಾಡಿದ್ದು? ಅವನು ಅಡುಗೆ ಮಾಡೋ ಹಾಗೆ ಯಾರೂ ಮಾಡಲ್ಲ.', transliteration: 'Ii doose yaaru maaDiddu? Avanu aDge maadoo haage yaaruu maaDalla.', english: 'Who made this dosa? Nobody cooks as well as he does.' }
    ],
    vocabulary: [
      { id: 'v31-1', english: 'Correctly / Properly', kannada: 'ಸರಿಯಾಗಿ', transliteration: 'sariyaagi', meaning: 'In right manner' },
      { id: 'v31-2', english: 'Who else / None else', kannada: 'ಇನ್ಯಾರು', transliteration: 'inyaaru', meaning: 'Alternative person' },
      { id: 'v31-3', english: 'To take care of', kannada: 'ನೋಡ್ಕೋ', transliteration: 'nooDkoo', meaning: 'Look after someone' }
    ],
    grammarNotes: [
      'Haage attached to relative participle: ಓದೋ ಹಾಗೆ (the way one reads); ಬರೆದ ಹಾಗೆ (the way one wrote).',
      'This completes the 31 graded spoken Kannada cycles of the Kannada Sahitya Parishat!'
    ],
    exercise: {
      prompt: 'Translate: "Nobody cooks as well as he does."',
      options: ['ಅವನು ಅಡುಗೆ ಮಾಡೋ ಹಾಗೆ ಯಾರೂ ಮಾಡಲ್ಲ (Avanu aDge maadoo haage yaaruu maaDalla)', 'ಅವನು ಚೆನ್ನಾಗಿ ಅಡುಗೆ ಮಾಡ್ತಾನೆ (Avanu cennaagi aDge maaDtaane)', 'ಅವನಿಗೆ ಅಡುಗೆ ಇಷ್ಟ (Avanige aDge iSTa)', 'ಅಡುಗೆ ಮಾಡಿ (ADge maadi)'],
      answer: 'ಅವನು ಅಡುಗೆ ಮಾಡೋ ಹಾಗೆ ಯಾರೂ ಮಾಡಲ್ಲ (Avanu aDge maadoo haage yaaruu maaDalla)',
      explanation: 'ADge maadoo haage (in the manner he cooks) + yaaruu maaDalla (nobody does).'
    }
  }
];

// Helper to group by Section
export const SECTION_DEFINITIONS = [
  {
    sectionNumber: 1,
    id: 'section-1',
    title: 'Start Speaking',
    titleKn: 'ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ',
    lessonRange: 'Lessons 1–5',
    lessonsCount: 5,
    description: 'Foundations of spoken communication: personal pronouns, polite greetings, demonstratives, ownership, dative case, and weekday locatives.',
    category: 'Foundations'
  },
  {
    sectionNumber: 2,
    id: 'section-2',
    title: 'Everyday Kannada',
    titleKn: 'ದೈನಂದಿನ ಕನ್ನಡ',
    lessonRange: 'Lessons 6–12',
    lessonsCount: 7,
    description: 'Conversational essentials: degrees of comparison, existence verbs (ide, ive, iddiini, iddaare), past tense of "iru", weather, and active present verbs.',
    category: 'Conversational Daily Life'
  },
  {
    sectionNumber: 3,
    id: 'section-3',
    title: 'Build Sentences',
    titleKn: 'ವಾಕ್ಯ ರಚನೆ',
    lessonRange: 'Lessons 13–20',
    lessonsCount: 8,
    description: 'Structural mastery: past tense narration, health inquiries, modals (beeku, saaku, gottu), obligations (-beeku, -baardu), sequential participles, and conditionals.',
    category: 'Sentence Structures'
  },
  {
    sectionNumber: 4,
    id: 'section-4',
    title: 'Communicate Confidently',
    titleKn: 'ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಸಂಭಾಷಿಸಿ',
    lessonRange: 'Lessons 21–31',
    lessonsCount: 11,
    description: 'Advanced real-world fluency: purposive infinitives, perfect tenses, continuous aspects, relative participles (-id, -oo), time clauses (-aaga, -varege), and manners of comparison.',
    category: 'Fluency & Nuance'
  }
];
