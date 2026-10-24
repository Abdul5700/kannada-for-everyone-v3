import { KANNADA_VOWELS, KANNADA_CONSONANTS, KANNADA_YOGAVAHA, KAGUNITA_FULL_CHART } from './varnamaleAndKagunita';

export interface FoundationTopic {
  id: string;
  topicNumber: number;
  title: string;
  titleKn: string;
  description: string;
  details: string;
  items: any[];
  exercises?: {
    id: string;
    type: 'multiple-choice' | 'identification' | 'fill-blank';
    prompt: string;
    options?: string[];
    answer: string;
    explanation: string;
  }[];
}

export interface FoundationSection {
  id: string;
  sectionNumber: number;
  title: string;
  titleKn: string;
  summary: string;
  category: string;
  topics: FoundationTopic[];
}

export const FOUNDATION_SECTIONS: FoundationSection[] = [
  // SECTION 1: ಕನ್ನಡ ವರ್ಣಮಾಲೆ — Kannada Alphabet
  {
    id: 'f-sec-1',
    sectionNumber: 1,
    title: 'Kannada Alphabet (Varnamale)',
    titleKn: 'ಕನ್ನಡ ವರ್ಣಮಾಲೆ',
    summary: 'The complete foundation: Swaras (13), Vyanjanas (34), Yogavahas (2), letter identification, tracing order, and acoustic differentiation.',
    category: 'Varnamale',
    topics: [
      {
        id: 'f-sec-1-t1',
        topicNumber: 1,
        title: 'Vowels (ಸ್ವರಗಳು - 13 Letters)',
        titleKn: 'ಸ್ವರಗಳು — ಹ್ರಸ್ವ, ದೀರ್ಘ ಮತ್ತು ಸಂಧ್ಯಕ್ಷರ',
        description: 'Complete inventory of independent Kannada vowel sounds from ಅ to ಔ.',
        details: 'Kannada vowels (ಸ್ವರಗಳು) are pronounced independently. Hrasva (short) vowels take 1 matra (beat): ಅ, ಇ, ಉ, ಋ, ಎ, ಒ. Deergha (long) vowels take 2 matras: ಆ, ಈ, ಊ, ಏ, ಓ. Sandhyaksharas (diphthongs) are compound vowels: ಐ, ಔ.',
        items: KANNADA_VOWELS,
        exercises: [
          {
            id: 'ex-f1-1',
            type: 'multiple-choice',
            prompt: 'Which of the following is a long vowel (ದೀರ್ಘ ಸ್ವರ)?',
            options: ['ಆ (aa)', 'ಅ (a)', 'ಇ (i)', 'ಉ (u)'],
            answer: 'ಆ (aa)',
            explanation: '"ಆ" takes two beats of time (ಮಾತ್ರೆ) and is a Deergha Swara.'
          },
          {
            id: 'ex-f1-2',
            type: 'multiple-choice',
            prompt: 'Which word starts with the vowel "ಇ" (i)?',
            options: ['ಇಲಿ (Ili)', 'ಆನೆ (Aane)', 'ಊಟ (Oota)', 'ಏಣಿ (Eeni)'],
            answer: 'ಇಲಿ (Ili)',
            explanation: 'ಇಲಿ (mouse) begins with the short vowel ಇ.'
          }
        ]
      },
      {
        id: 'f-sec-1-t2',
        topicNumber: 2,
        title: 'Consonants (ವ್ಯಂಜನಗಳು - 34 Letters)',
        titleKn: 'ವ್ಯಂಜನಗಳು — ವರ್ಗೀಯ ಮತ್ತು ಅವರ್ಗೀಯ',
        description: 'Structured consonants from ಕ to ಳ classified by point of articulation.',
        details: 'Kannada consonants are scientifically organized. 25 Vargeeya Vyanjanas are grouped into 5 rows (Ka, Cha, Ta, Tha, Pa vargas) featuring Alpaprana (unaspirated), Mahaprana (aspirated), and Anunasika (nasal). 9 Avargeeya Vyanjanas comprise Antastha (semi-vowels ಯ, ರ, ಲ, ವ), Ooshma (sibilants ಶ, ಷ, ಸ, ಹ), and the retroflex lateral ಳ.',
        items: KANNADA_CONSONANTS,
        exercises: [
          {
            id: 'ex-f1-3',
            type: 'multiple-choice',
            prompt: 'Which letter belongs to the Ka-varga nasal group (ಅನುನಾಸಿಕ)?',
            options: ['ಙ (nga)', 'ಕ (ka)', 'ಮ (ma)', 'ಣ (na)'],
            answer: 'ಙ (nga)',
            explanation: '"ಙ" is the 5th letter and nasal consonant of Ka-varga.'
          }
        ]
      },
      {
        id: 'f-sec-1-t3',
        topicNumber: 3,
        title: 'Yogavahas (ಯೋಗವಾಹಗಳು - ಅಂ ಮತ್ತು ಅಃ)',
        titleKn: 'ಯೋಗವಾಹಗಳು: ಅನುಸ್ವಾರ ಮತ್ತು ವಿಸರ್ಗ',
        description: 'Auxiliary nasal (ಅನುಸ್ವಾರ ಂ) and aspirate (ವಿಸರ್ಗ ಃ) characters.',
        details: 'Yogavahas ("those that move in company") cannot be pronounced alone; they join with preceding vowels. Anusvaara (ಅಂ) produces a bindu nasal sound (ಅಂಗಡಿ, ಸಿಂಹ), and Visarga (ಅಃ) adds an unvoiced breath (ದುಃಖ, ನಮಃ).',
        items: KANNADA_YOGAVAHA,
        exercises: [
          {
            id: 'ex-f1-4',
            type: 'multiple-choice',
            prompt: 'What is the symbol "ಂ" called in Kannada?',
            options: ['ಅನುಸ್ವಾರ (Anusvaara)', 'ವಿಸರ್ಗ (Visarga)', 'ಹ್ರಸ್ವ (Hrasva)', 'ದೀರ್ಘ (Deergha)'],
            answer: 'ಅನುಸ್ವಾರ (Anusvaara)',
            explanation: 'The circle "ಂ" is the Anusvaara (ಬಿಂದು).'
          }
        ]
      },
      {
        id: 'f-sec-1-t4',
        topicNumber: 4,
        title: 'Letter Recognition & Pronunciation',
        titleKn: 'ಅಕ್ಷರ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಉಚ್ಚಾರಣೆ',
        description: 'Distinguish vocal acoustic zones: KanThya (Throat), Taalavya (Palate), Moordhanya (Retroflex), Dantya (Teeth), and OshThya (Lips).',
        details: 'Articulating consonants correctly: Velar (ಕ, ಖ, ಗ, ಘ) from throat; Palatal (ಚ, ಛ, ಜ, ಝ) with tongue flat against palate; Retroflex (ಟ, ಠ, ಡ, ಢ) with tongue curled back; Dental (ತ, ಥ, ದ, ಧ) with tongue against upper teeth; Labial (ಪ, ಫ, ಬ, ಭ) using both lips.',
        items: [
          { zone: 'ಕಂಠ್ಯ (Throat)', letters: 'ಅ, ಆ, ಕ, ಖ, ಗ, ಘ, ಙ, ಹ' },
          { zone: 'ತಾಲವ್ಯ (Palatal)', letters: 'ಇ, ಈ, ಚ, ಛ, ಜ, ಝ, ಞ, ಯ, ಶ' },
          { zone: 'ಮೂರ್ಧನ್ಯ (Retroflex)', letters: 'ಋ, ಟ, ಠ, ಡ, ಢ, ಣ, ರ, ಷ, ಳ' },
          { zone: 'ದಂತ್ಯ (Dental)', letters: 'ತ, ಥ, ದ, ಧ, ನ, ಲ, ಸ' },
          { zone: 'ಓಷ್ಠ್ಯ (Labial)', letters: 'ಉ, ಊ, ಪ, ಫ, ಬ, ಭ, ಮ, ವ' }
        ]
      },
      {
        id: 'f-sec-1-t5',
        topicNumber: 5,
        title: 'Stroke Order & Handwriting Tracing',
        titleKn: 'ಅಕ್ಷರ ಬರೆಯುವ ಕ್ರಮ ಮತ್ತು Tracing',
        description: 'Standard pen movement directions from left-to-right with top-stroke (ತಲೆಕಟ್ಟು).',
        details: 'Most Kannada letters begin with a rounded loop at bottom or center, sweep upward, and conclude with the distinctive horizontal crown stroke (ತಲೆಕಟ್ಟು). Examples: ರ → simple circle with top-stroke; ಕ → starts bottom loop, arcs up, intersects with cross and head-line.',
        items: [
          { rule: '1. Left to Right Flow', desc: 'Always trace clockwise or outward from central loop.' },
          { rule: '2. Talekattu (Headstroke)', desc: 'The curved top-stroke is added last to seal the consonant.' },
          { rule: '3. Bottom Openings', desc: 'Preserve clear distinction between closed circles (ರ) and open curves (ದ).' }
        ]
      },
      {
        id: 'f-sec-1-t6',
        topicNumber: 6,
        title: 'Differentiating Visually Similar Letters',
        titleKn: 'ಹೋಲುವ ಅಕ್ಷರಗಳ ಸೂಕ್ಷ್ಮ ವ್ಯತ್ಯಾಸ',
        description: 'Avoid common confusion between visually similar letter pairs.',
        details: 'Critical contrast pairs in Kannada script:\n1. ರ (ra) vs ದ (da) — ರ is closed at bottom, ದ remains open.\n2. ಘ (gha) vs ಧ (dha) — ಘ has an internal vertical line, ಧ has an indented waist.\n3. ಚ (cha) vs ಬ (ba) — ಚ has a horizontal left stroke; ಬ is purely round.\n4. ವ (va) vs ಮ (ma) — ವ has a top talekattu; ಮ has a smaller circle on the left.\n5. ಪ (pa) vs ಫ (pha) — ಫ has an internal vertical downstroke.',
        items: [
          { pair: 'ರ (ra) ↔ ದ (da)', diff: 'ರ is a closed loop at bottom; ದ has an open curved bottom.' },
          { pair: 'ಬ (ba) ↔ ಚ (cha)', diff: 'ಬ is rounded; ಚ has an extended upper horizontal stroke.' },
          { pair: 'ವ (va) ↔ ಮ (ma)', diff: 'ವ is simple curve; ಮ has a miniature left-side loop.' },
          { pair: 'ಪ (pa) ↔ ಫ (pha)', diff: 'ಫ has a vertical aspirate stroke descending inside.' },
          { pair: 'ಟ (ta) ↔ ಠ (tha)', diff: 'ಠ has an internal bindu/dot denoting Mahaprana.' }
        ]
      },
      {
        id: 'f-sec-1-t7',
        topicNumber: 7,
        title: 'Listening & Acoustic Recognition',
        titleKn: 'ಅಕ್ಷರಗಳನ್ನು ಕೇಳಿ ಗುರುತಿಸುವುದು',
        description: 'Listen to native Kannada audio and identify the corresponding character.',
        details: 'Sharpen your ear to hear the difference between Alpaprana (soft) and Mahaprana (aspirated with strong breath), as well as dental versus retroflex sounds.',
        items: [
          { promptAudio: 'ಕ', promptText: 'Listen to the sound and identify: Ka' },
          { promptAudio: 'ಖ', promptText: 'Listen to the sound and identify: Kha (Aspirated)' },
          { promptAudio: 'ತ', promptText: 'Listen to the sound and identify: Ta (Dental)' },
          { promptAudio: 'ಟ', promptText: 'Listen to the sound and identify: Ta (Retroflex)' }
        ]
      }
    ]
  },

  // SECTION 2: ಕಾಗುಣಿತ — Complete Kagunita
  {
    id: 'f-sec-2',
    sectionNumber: 2,
    title: 'Complete Kagunita (ಗುಣಿತಾಕ್ಷರಗಳು)',
    titleKn: 'ಕಾಗುಣಿತ — ಕದಿಂದ ಳವರೆಗೆ ಸಂಪೂರ್ಣ ಚಾರ್ಟ್',
    summary: 'The complete mathematical combination of all 34 consonants with all 15 vowel signs (510 verified syllables).',
    category: 'Kagunita',
    topics: [
      {
        id: 'f-sec-2-t1',
        topicNumber: 1,
        title: 'Complete 34-Consonant Kagunita Grid',
        titleKn: 'ಕದಿಂದ ಳವರೆಗೆ ಪೂರ್ಣ ಕಾಗುಣಿತ ಚಾರ್ಟ್ (೩೪ ವ್ಯಂಜನಗಳು)',
        description: 'Every single consonant from ಕ to ಳ combined with 15 vowel forms (ಅ to ಅಃ).',
        details: 'Kagunita represents the syllabic script where consonant roots blend with vowel signs (ಮಾತ್ರೆಗಳು). Consonant + ಅ = inherent consonant; + ಆ = ದೀರ್ಘ (ಾ); + ಇ = ಗುಡಿಸು (ಿ); + ಈ = ಗುಡಿಸು ದೀರ್ಘ (ೀ); + ಉ = ಕೊಂಬು (ು); + ಊ = ಕೊಂಬು ದೀರ್ಘ (ೂ); + ಋ = ಋ-ತ್ವ (ೃ); + ಎ = ಏತ್ವ (ೆ); + ಏ = ಏತ್ವ ದೀರ್ಘ (ೇ); + ಐ = ಐ-ತ್ವ (ೈ); + ಒ = ಒ-ತ್ವ (ೊ); + ಓ = ಓ-ತ್ವ (ೋ); + ಔ = ಔ-ತ್ವ (ೌ); + ಅಂ = ಅನುಸ್ವಾರ (ಂ); + ಅಃ = ವಿಸರ್ಗ (ಃ).',
        items: KAGUNITA_FULL_CHART
      },
      {
        id: 'f-sec-2-t2',
        topicNumber: 2,
        title: 'Mastering the 15 Vowel Sign Forms',
        titleKn: 'ಹದಿನೈದು ಗುಣಿತಾಕ್ಷರ ಸ್ವರ ಚಿಹ್ನೆಗಳು',
        description: 'Detailed analysis of the 15 forms for each consonant.',
        details: 'Exemplified by the primary row:\nಕ, ಕಾ, ಕಿ, ಕೀ, ಕು, ಕೂ, ಕೃ, ಕೆ, ಕೇ, ಕೈ, ಕೊ, ಕೋ, ಕೌ, ಕಂ, ಕಃ.',
        items: KAGUNITA_FULL_CHART[0].series
      },
      {
        id: 'f-sec-2-t3',
        topicNumber: 3,
        title: 'Phonetics & Pronunciation of Gunithaksharas',
        titleKn: 'ಗುಣಿತಾಕ್ಷರಗಳ ಧ್ವನಿ ಮತ್ತು ಉಚ್ಚಾರಣೆ',
        description: 'Acoustic cadence of short versus prolonged syllables.',
        details: 'Syllables with short vowels take 1 beat: ಕಿ (ki), ಕು (ku), ಕೆ (ke), ಕೊ (ko). Syllables with long vowels take 2 beats: ಕೀ (kee), ಕೂ (koo), ಕೇ (kay), ಕೋ (koo). Note the resonance of ಕಂ (kam) and release of ಕಃ (kaha).',
        items: [
          { pattern: 'ಕ + ಅ = ಕ', sound: 'ka (1 matra)' },
          { pattern: 'ಕ + ಆ = ಕಾ', sound: 'kaa (2 matras)' },
          { pattern: 'ಕ + ಇ = ಕಿ', sound: 'ki (1 matra)' },
          { pattern: 'ಕ + ಈ = ಕೀ', sound: 'kee (2 matras)' },
          { pattern: 'ಕ + ಉ = ಕು', sound: 'ku (1 matra)' },
          { pattern: 'ಕ + ಊ = ಕೂ', sound: 'koo (2 matras)' }
        ]
      },
      {
        id: 'f-sec-2-t4',
        topicNumber: 4,
        title: 'Reading and Writing Kagunita',
        titleKn: 'ಕಾಗುಣಿತ ಓದುವಿಕೆ ಮತ್ತು ಬರವಣಿಗೆ',
        description: 'Read and write syllables fluently in sequence and randomly.',
        details: 'Practice reading rows backwards and vertically to build rapid sight-recognition.',
        items: [
          { row: 'ಗ-ಸರಣಿ', sample: 'ಗ, ಗಾ, ಗಿ, ಗೀ, ಗು, ಗೂ, ಗೃ, ಗೆ, ಗೇ, ಗೈ, ಗೊ, ಗೋ, ಗೌ, ಗಂ, ಗಃ' },
          { row: 'ಜ-ಸರಣಿ', sample: 'ಜ, ಜಾ, ಜಿ, ಜೀ, ಜು, ಜೂ, ಜೃ, ಜೆ, ಜೇ, ಜೈ, ಜೊ, ಜೋ, ಜೌ, ಜಂ, ಜಃ' },
          { row: 'ತ-ಸರಣಿ', sample: 'ತ, ತಾ, ತಿ, ತೀ, ತು, ತೂ, ತೃ, ತೆ, ತೇ, ತೈ, ತೊ, ತೋ, ತೌ, ತಂ, ತಃ' },
          { row: 'ಳ-ಸರಣಿ', sample: 'ಳ, ಳಾ, ಳಿ, ಳೀ, ಳು, ಳೂ, ಳೃ, ಳೆ, ಳೇ, ಳೈ, ಳೊ, ಳೋ, ಳೌ, ಳಂ, ಳಃ' }
        ]
      },
      {
        id: 'f-sec-2-t5',
        topicNumber: 5,
        title: 'Word Formation from Kagunita',
        titleKn: 'ಕಾಗುಣಿತದಿಂದ ಪದ ರಚನೆ',
        description: 'Combine Gunithaksharas to build meaningful everyday words.',
        details: 'Words formed by combining Kagunita letters:\n1. ಕಾ + ಕಿ = ಕಾಕಿ (crow - colloquial)\n2. ಗಿ + ಳಿ = ಗಿಳಿ (parrot)\n3. ಕು + ದು + ರೆ = ಕುದುರೆ (horse)\n4. ಸೇ + ಬು = ಸೇಬು (apple)\n5. ಕೋ + ತಿ = ಕೋತಿ (monkey)\n6. ದೋ + ಸೆ = ದೋಸೆ (dosa)',
        items: [
          { word: 'ಗಿಳಿ', parts: 'ಗಿ (Ga+i) + ಳಿ (La+i)', meaning: 'Parrot' },
          { word: 'ಕುದುರೆ', parts: 'ಕು (Ka+u) + ದು (Da+u) + ರೆ (Ra+e)', meaning: 'Horse' },
          { word: 'ಸೇಬು', parts: 'ಸೇ (Sa+ee) + ಬು (Ba+u)', meaning: 'Apple' },
          { word: 'ಕೋತಿ', parts: 'ಕೋ (Ka+oo) + ತಿ (Ta+i)', meaning: 'Monkey' }
        ]
      },
      {
        id: 'f-sec-2-t6',
        topicNumber: 6,
        title: 'Detecting & Correcting Kagunita Spelling Errors',
        titleKn: 'ಕಾಗುಣಿತ ತಪ್ಪುಗಳನ್ನು ಗುರುತಿಸುವುದು',
        description: 'Identify common vowel-sign confusion in student writing.',
        details: 'Frequent errors in student writing:\n- Confusing short ಇ (ಿ) with long ಈ (ೀ): ದಿನ (day - correct) vs ದೀನ (poor/helpless)\n- Confusing short ಉ (ು) with long ಊ (ೂ): ಊಟ (meal - correct) vs ಉಟ (error)\n- Misplacing kombu on dental vs retroflex consonants.',
        items: [
          { incorrect: 'ದೀನ (when meaning day)', correct: 'ದಿನ (Dina)', reason: 'Short vowel "i" is required for "day".' },
          { incorrect: 'ಕುದುರೇ', correct: 'ಕುದುರೆ (Kudure)', reason: 'Short "e" ending is correct, not long "ee".' }
        ]
      }
    ]
  },

  // SECTION 3: ಒತ್ತಕ್ಷರಗಳು — Ottaksharagalu (Conjuncts)
  {
    id: 'f-sec-3',
    sectionNumber: 3,
    title: 'Ottaksharagalu (Consonant Conjuncts)',
    titleKn: 'ಒತ್ತಕ್ಷರಗಳು — ಸಜಾತೀಯ ಮತ್ತು ವಿಜಾತೀಯ',
    summary: 'Consonant doubling, subscripts, Sajatiya (geminate) and Vijatiya (heterogeneous) conjuncts, and dictation.',
    category: 'Ottakshara',
    topics: [
      {
        id: 'f-sec-3-t1',
        topicNumber: 1,
        title: 'Introduction & Structure of Ottakshara',
        titleKn: 'ಒತ್ತಕ್ಷರಗಳ ಪರಿಚಯ ಮತ್ತು ರಚನೆ',
        description: 'How Virama/Halant (್) joins two consonants together.',
        details: 'When two consonants blend without an intervening vowel, the second consonant appears as a subscript (ಒತ್ತು) underneath the first. If both consonants are identical (ಕ್ + ಕ = ಕ್ಕ), it is Sajatiya (ಸಜಾತೀಯ). If they are different (ಕ್ + ಯ = ಕ್ಯ, ಕ್ + ಷ = ಕ್ಷ), it is Vijatiya (ವಿಜಾತೀಯ).',
        items: [
          { type: 'ಸಜಾತೀಯ (Same Consonant)', formula: 'ಕ್ + ಕ = ಕ್ಕ', example: 'ಅಕ್ಕ (Akka = Elder sister)' },
          { type: 'ವಿಜಾತೀಯ (Different Consonants)', formula: 'ಕ್ + ಯ = ಕ್ಯ', example: 'ವಾಕ್ಯ (Vaakya = Sentence)' },
          { type: 'ವಿಜಾತೀಯ ಸಂಯುಕ್ತಾಕ್ಷರ', formula: 'ಕ್ + ಷ = ಕ್ಷ', example: 'ಪಕ್ಷಿ (Pakshi = Bird)' }
        ]
      },
      {
        id: 'f-sec-3-t2',
        topicNumber: 2,
        title: 'Common Geminate Conjuncts (Sajatiya Ottu)',
        titleKn: 'ಪ್ರಮುಖ ಸಜಾತೀಯ ಒತ್ತಕ್ಷರಗಳು: ಕ್ಕ, ಗ್ಗ, ಚ್ಚ, ಟ್ಟ...',
        description: 'Daily vocabulary utilizing doubled consonants.',
        details: 'Essential Sajatiya pairs in daily words:\n- ಕ್ಕ: ಅಕ್ಕ (elder sister), ಚುಕ್ಕಿ (star/dot)\n- ಗ್ಗ: ಮೊಗ್ಗು (flower bud), ಸಿಗ್ಗು (shyness)\n- ಚ್ಚ: ಹಚ್ಚು (apply), ಹೆಚ್ಚು (more)\n- ಜ್ಜ: ಹೆಜ್ಜೆ (footstep), ಅಜ್ಜ (grandfather)\n- ಟ್ಟ: ಬೆಟ್ಟ (hill), ಪಟ್ಟಣ (town)\n- ಣ್ಣ: ಅಣ್ಣ (elder brother), ಕಣ್ಣು (eye)\n- ತ್ತ: ಕತ್ತೆ (donkey), ಹತ್ತು (ten)\n- ದ್ದ: ಎದ್ದು (having risen), ಮುದ್ದು (sweet/affectionate)\n- ನ್ನ: ನಿನ್ನೆ (yesterday), ಚಿನ್ನ (gold)\n- ಪ್ಪ: ಅಪ್ಪ (father), ಕಪ್ಪು (black)\n- ಮ್ಮ: ಅಮ್ಮ (mother), ನಮ್ಮ (our)',
        items: [
          { conjunct: 'ಕ್ಕ', word: 'ಅಕ್ಕ', tr: 'Akka', meaning: 'Elder sister' },
          { conjunct: 'ಣ್ಣ', word: 'ಅಣ್ಣ', tr: 'Anna', meaning: 'Elder brother' },
          { conjunct: 'ಪ್ಪ', word: 'ಅಪ್ಪ', tr: 'Appa', meaning: 'Father' },
          { conjunct: 'ಮ್ಮ', word: 'ಅಮ್ಮ', tr: 'Amma', meaning: 'Mother' },
          { conjunct: 'ನ್ನ', word: 'ನಿನ್ನೆ', tr: 'Ninne', meaning: 'Yesterday' },
          { conjunct: 'ಟ್ಟ', word: 'ಬೆಟ್ಟ', tr: 'Betta', meaning: 'Hill' }
        ]
      },
      {
        id: 'f-sec-3-t3',
        topicNumber: 3,
        title: 'Special Conjuncts: ಕ್ಷ, ಜ್ಞ & Arkavattu',
        titleKn: 'ವಿಶೇಷ ಸಂಯುಕ್ತಾಕ್ಷರಗಳು: ಕ್ಷ, ಜ್ಞ ಮತ್ತು ಅರ್ಕಾವತ್ತು (ರ್)',
        description: 'Unique ligatures and the pre-consonantal R symbol (ಅರ್ಕಾವತ್ತು ೯).',
        details: '1. ಕ್ಷ (ksha) = ಕ್ + ಷ (ರಕ್ಷಣೆ = protection, ಅಕ್ಷರ = letter).\n2. ಜ್ಞ (jnya) = ಜ್ + ಞ (ಜ್ಞಾನ = knowledge, ವಿಜ್ಞಾನ = science).\n3. ಅರ್ಕಾವತ್ತು (Arkavattu): When ರ precedes another consonant (ರ್ + ವ = ರ್ವ), it is written as a hook on top: ಸೂರ್ಯ (Suurya = Sun), ಕರ್ತವ್ಯ (Kartavya = Duty).',
        items: [
          { char: 'ಕ್ಷ', combo: 'ಕ್ + ಷ', word: 'ಅಕ್ಷರ (Akshara)', meaning: 'Letter / Alphabet' },
          { char: 'ಜ್ಞ', combo: 'ಜ್ + ಞ', word: 'ಜ್ಞಾನ (Jnyaana)', meaning: 'Knowledge / Wisdom' },
          { char: 'ರ್ವ', combo: 'ರ್ + ವ (Arkavattu)', word: 'ಸೂರ್ಯ (Suurya)', meaning: 'Sun' },
          { char: 'ರ್ಥ', combo: 'ರ್ + ಥ (Arkavattu)', word: 'ಅರ್ಥ (Artha)', meaning: 'Meaning / Wealth' }
        ]
      },
      {
        id: 'f-sec-3-t4',
        topicNumber: 4,
        title: 'Reading Words with Conjuncts',
        titleKn: 'ಒತ್ತಕ್ಷರ ಇರುವ ಪದಗಳ ವಾಚನ',
        description: 'Read multi-syllabic words with stress on the conjunct syllable.',
        details: 'When pronouncing an Ottakshara, hold the consonant closure for an extra instant before releasing: ಪುಸ್ತಕ (pus-taka), ವಿದ್ಯಾರ್ಥಿ (vid-yaar-thi), ಕರ್ನಾಟಕ (kar-naa-taka).',
        items: [
          { word: 'ಪುಸ್ತಕ', tr: 'Pustaka', meaning: 'Book' },
          { word: 'ವಿದ್ಯಾರ್ಥಿ', tr: 'Vidyaarthi', meaning: 'Student' },
          { word: 'ಕರ್ನಾಟಕ', tr: 'Karnaataka', meaning: 'Karnataka' },
          { word: 'ಸ್ನೇಹಿತ', tr: 'Sneehita', meaning: 'Friend' }
        ]
      },
      {
        id: 'f-sec-3-t5',
        topicNumber: 5,
        title: 'Ottakshara Dictation and Spelling Mastery',
        titleKn: 'ಒತ್ತಕ್ಷರ ಬರವಣಿಗೆ ಮತ್ತು Dictation ಅಭ್ಯಾಸ',
        description: 'Practice writing and spotting proper subscript alignment.',
        details: 'Ensure the subscript consonant is centered neatly beneath the parent consonant letter.',
        items: [
          { challenge: 'Spell: Akka', answer: 'ಅಕ್ಕ', hint: 'ಅ + ಕ + ಕ-ಒತ್ತು' },
          { challenge: 'Spell: Pustaka', answer: 'ಪುಸ್ತಕ', hint: 'ಪು + ಸ + ತ-ಒತ್ತು + ಕ' },
          { challenge: 'Spell: Karnaataka', answer: 'ಕರ್ನಾಟಕ', hint: 'ಕ + ರ್ + ಣ-ದೀರ್ಘ + ಟ + ಕ' }
        ]
      }
    ]
  },

  // SECTION 4: ಅಕ್ಷರದಿಂದ ಪದ — Letter to Word (Vocabulary Foundations)
  {
    id: 'f-sec-4',
    sectionNumber: 4,
    title: 'Letter to Word (ಅಕ್ಷರದಿಂದ ಪದ)',
    titleKn: 'ಅಕ್ಷರದಿಂದ ಪದ — ಸರಳ ಪದರಚನೆ',
    summary: 'Building verified words from letters, matching pictures, 2-letter, 3-letter, and 4-letter vocabulary.',
    category: 'Words',
    topics: [
      {
        id: 'f-sec-4-t1',
        topicNumber: 1,
        title: 'Alphabetical Words: ಅ to ಔ Primary Vocabulary',
        titleKn: 'ಸ್ವರಗಳಿಂದ ಪ್ರಾರಂಭವಾಗುವ ಪದಗಳು (ಅ — ಅಮ್ಮ)',
        description: 'Authentic Kannada vocabulary for every single vowel.',
        details: 'ಅ — ಅಮ್ಮ (Mother), ಆ — ಆನೆ (Elephant), ಇ — ಇಲಿ (Mouse), ಈ — ಈಜು (Swim), ಉ — ಉಡುಗೊರೆ (Gift), ಊ — ಊಟ (Meal), ಋ — ಋಷಿ (Sage), ಎ — ಎಲೆ (Leaf), ಏ — ಏಣಿ (Ladder), ಐ — ಐದು (Five), ಒ — ಒಂಟೆ (Camel), ಓ — ಓಟ (Race), ಔ — ಔಷಧ (Medicine).',
        items: [
          { letter: 'ಅ', word: 'ಅಮ್ಮ', tr: 'Amma', meaning: 'Mother' },
          { letter: 'ಆ', word: 'ಆನೆ', tr: 'Aane', meaning: 'Elephant' },
          { letter: 'ಇ', word: 'ಇಲಿ', tr: 'Ili', meaning: 'Mouse' },
          { letter: 'ಈ', word: 'ಈಜು', tr: 'Eeju', meaning: 'Swimming' },
          { letter: 'ಉ', word: 'ಉಡುಪು', tr: 'Udupu', meaning: 'Clothes / Dress' },
          { letter: 'ಊ', word: 'ಊಟ', tr: 'Oota', meaning: 'Meal' },
          { letter: 'ಋ', word: 'ಋಷಿ', tr: 'Rushi', meaning: 'Sage' },
          { letter: 'ಎ', word: 'ಎಲೆ', tr: 'Ele', meaning: 'Leaf' },
          { letter: 'ಏ', word: 'ಏಣಿ', tr: 'Eeni', meaning: 'Ladder' },
          { letter: 'ಐ', word: 'ಐದು', tr: 'Aidu', meaning: 'Five' },
          { letter: 'ಒ', word: 'ಒಂಟೆ', tr: 'Onte', meaning: 'Camel' },
          { letter: 'ಓ', word: 'ಓಟ', tr: 'Oota', meaning: 'Running race' },
          { letter: 'ಔ', word: 'ಔಷಧ', tr: 'AuSadha', meaning: 'Medicine' }
        ]
      },
      {
        id: 'f-sec-4-t2',
        topicNumber: 2,
        title: 'Multiple Words Per Letter',
        titleKn: 'ಪ್ರತಿ ಅಕ್ಷರಕ್ಕೆ ಹಲವು ಸರಿಯಾದ ಪದಗಳು',
        description: 'Broaden vocabulary depth with multiple words per letter.',
        details: 'Expand vocabulary beyond single associations:\n- ಕ: ಕಮಲ (Lotus), ಕಣ್ಣು (Eye), ಕರಡಿ (Bear), ಕಾಗೆ (Crow)\n- ಗ: ಗಿಳಿ (Parrot), ಗಡಿಯಾರ (Clock), ಗಂಟೆ (Bell), ಗುಲಾಬಿ (Rose)\n- ಮ: ಮನೆ (House), ಮರ (Tree), ಮಗು (Child), ಮಳೆ (Rain)',
        items: [
          { letter: 'ಕ', words: 'ಕಮಲ, ಕಣ್ಣು, ಕರಡಿ, ಕಾಗೆ', tr: 'Kamala, KaNNu, Karadi, Kaage', en: 'Lotus, Eye, Bear, Crow', exampleWord: 'ಕಮಲ' },
          { letter: 'ಗ', words: 'ಗಿಳಿ, ಗಡಿಯಾರ, ಗಂಟೆ, ಗುಲಾಬಿ', tr: 'GiLi, Gadiyaara, Gante, Gulaabi', en: 'Parrot, Clock, Bell, Rose', exampleWord: 'ಗಿಳಿ' },
          { letter: 'ಮ', words: 'ಮನೆ, ಮರ, ಮಗು, ಮಳೆ', tr: 'Mane, Mara, Magu, MaLe', en: 'House, Tree, Child, Rain', exampleWord: 'ಮನೆ' }
        ]
      },
      {
        id: 'f-sec-4-t3',
        topicNumber: 3,
        title: 'Two-Letter, Three-Letter & Four-Letter Words',
        titleKn: 'ಎರಡು, ಮೂರು ಮತ್ತು ನಾಲ್ಕು ಅಕ್ಷರಗಳ ಸರಳ ಪದಗಳು',
        description: 'Progressive word-length building without conjuncts first.',
        details: '1. Two-letter words: ಮರ (Tree), ಹಣ (Money), ಆಟ (Game), ಮನೆ (House).\n2. Three-letter words: ಅರಸ (King), ಕಮಲ (Lotus), ಸರಳ (Simple), ಚಮಚ (Spoon).\n3. Four-letter words: ಅರಮನೆ (Palace), ಗರಗಸ (Saw tool), ದಿನಚರಿ (Diary).',
        items: [
          { type: '2-Letter Words', kn: 'ಮರ, ಹಣ, ಆಟ, ಮನೆ', tr: 'Mara, HaNa, Aata, Mane', en: 'Tree, Money, Play, House', exampleWord: 'ಮರ' },
          { type: '3-Letter Words', kn: 'ಅರಸ, ಕಮಲ, ಸರಳ, ಚಮಚ', tr: 'Arasa, Kamala, SaraLa, Chamacha', en: 'King, Lotus, Simple, Spoon', exampleWord: 'ಕಮಲ' },
          { type: '4-Letter Words', kn: 'ಅರಮನೆ, ಗರಗಸ, ದಿನಚರಿ', tr: 'Aramane, Garagasa, Dinachari', en: 'Palace, Saw, Diary', exampleWord: 'ಅರಮನೆ' }
        ]
      },
      {
        id: 'f-sec-4-t4',
        topicNumber: 4,
        title: 'First and Last Letter Identification',
        titleKn: 'ಪದದ ಮೊದಲ ಮತ್ತು ಕೊನೆಯ ಅಕ್ಷರ ಗುರುತಿಸುವುದು',
        description: 'Recognize opening and closing sounds in Kannada words.',
        details: 'E.g., in ಕಮಲ: First letter is "ಕ", last letter is "ಲ". In ಅರಸ: First is "ಅ", last is "ಸ".',
        items: [
          { word: 'ಕಮಲ', first: 'ಕ', last: 'ಲ', tr: 'Kamala', en: 'First: ಕ, Last: ಲ (Lotus)', exampleWord: 'ಕಮಲ' },
          { word: 'ಅರಮನೆ', first: 'ಅ', last: 'ನೆ', tr: 'Aramane', en: 'First: ಅ, Last: ನೆ (Palace)', exampleWord: 'ಅರಮನೆ' },
          { word: 'ಗುಲಾಬಿ', first: 'ಗು', last: 'ಬಿ', tr: 'Gulaabi', en: 'First: ಗು, Last: ಬಿ (Rose)', exampleWord: 'ಗುಲಾಬಿ' }
        ]
      }
    ]
  },

  // SECTION 5: ಸಂಖ್ಯೆಗಳು — Numbers (1 to 100)
  {
    id: 'f-sec-5',
    sectionNumber: 5,
    title: 'Kannada Numbers (ಸಂಖ್ಯೆಗಳು ೦-೧೦೦)',
    titleKn: 'ಸಂಖ್ಯೆಗಳು — ಕನ್ನಡ ಅಂಕಿಗಳು ಮತ್ತು ಹೆಸರುಗಳು',
    summary: 'Kannada numerals ೦-೯, numbers ೧-೧೦, ೧೧-೫೦, ೫೧-೧೦೦, counting forward/backward, and quantity matching.',
    category: 'Numbers',
    topics: [
      {
        id: 'f-sec-5-t1',
        topicNumber: 1,
        title: 'Kannada Numerals: ೦ to ೯',
        titleKn: 'ಕನ್ನಡ ಮೂಲ ಅಂಕಿಗಳು ೦ ರಿಂದ ೯',
        description: 'Numeral shapes and digit values.',
        details: '೦ (ಸೊನ್ನೆ - Zero), ೧ (ಒಂದು - 1), ೨ (ಎರಡು - 2), ೩ (ಮೂರು - 3), ೪ (ನಾಲ್ಕು - 4), ೫ (ಐದು - 5), ೬ (ಆರು - 6), ೭ (ಏಳು - 7), ೮ (ಎಂಟು - 8), ೯ (ಒಂಬತ್ತು - 9).',
        items: [
          { digit: '೦', name: 'ಸೊನ್ನೆ', tr: 'Sonne', arabic: 0 },
          { digit: '೧', name: 'ಒಂದು', tr: 'Ondu', arabic: 1 },
          { digit: '೨', name: 'ಎರಡು', tr: 'Eradu', arabic: 2 },
          { digit: '೩', name: 'ಮೂರು', tr: 'Mooru', arabic: 3 },
          { digit: '೪', name: 'ನಾಲ್ಕು', tr: 'Naalku', arabic: 4 },
          { digit: '೫', name: 'ಐದು', tr: 'Aidu', arabic: 5 },
          { digit: '೬', name: 'ಆರು', tr: 'Aaru', arabic: 6 },
          { digit: '೭', name: 'ಏಳು', tr: 'Eelu', arabic: 7 },
          { digit: '೮', name: 'ಎಂಟು', tr: 'Entu', arabic: 8 },
          { digit: '೯', name: 'ಒಂಬತ್ತು', tr: 'Ombattu', arabic: 9 }
        ]
      },
      {
        id: 'f-sec-5-t2',
        topicNumber: 2,
        title: 'Numbers ೧ to ೨೦ with Full Spellings',
        titleKn: '೧ ರಿಂದ ೨೦ ರವರೆಗೆ ಸಂಖ್ಯೆಗಳ ಹೆಸರುಗಳು',
        description: 'Complete word names for 1 through 20.',
        details: '೧ - ಒಂದು (1), ೨ - ಎರಡು (2), ೩ - ಮೂರು (3), ೪ - ನಾಲ್ಕು (4), ೫ - ಐದು (5), ೬ - ಆರು (6), ೭ - ಏಳು (7), ೮ - ಎಂಟು (8), ೯ - ಒಂಬತ್ತು (9), ೧೦ - ಹತ್ತು (10), ೧೧ - ಹನ್ನೊಂದು (11), ೧೨ - ಹನ್ನೆರಡು (12), ೧೩ - ಹದಿಮೂರು (13), ೧೪ - ಹದಿನಾಲ್ಕು (14), ೧೫ - ಹದಿನೈದು (15), ೧೬ - ಹದಿನಾರು (16), ೧೭ - ಹದಿನೇಳು (17), ೧೮ - ಹದಿನೆಂಟು (18), ೧೯ - ಹತ್ತೊಂಬತ್ತು (19), ೨೦ - ಇಪ್ಪತ್ತು (20).',
        items: [
          { num: '೧೦', word: 'ಹತ್ತು', tr: 'Hattu', value: 10 },
          { num: '೧೧', word: 'ಹನ್ನೊಂದು', tr: 'Hannondu', value: 11 },
          { num: '೧೨', word: 'ಹನ್ನೆರಡು', tr: 'Hanneradu', value: 12 },
          { num: '೧೫', word: 'ಹದಿನೈದು', tr: 'Hadinaidu', value: 15 },
          { num: '೨೦', word: 'ಇಪ್ಪತ್ತು', tr: 'Ippattu', value: 20 }
        ]
      },
      {
        id: 'f-sec-5-t3',
        topicNumber: 3,
        title: 'Tens & Counting up to ೧೦೦ (ನೂರು)',
        titleKn: 'ಹತ್ತರ ಗುಣಕಗಳು: ೨೦ ರಿಂದ ೧೦೦ ರವರೆಗೆ',
        description: 'Master 20, 30, 40, 50, 60, 70, 80, 90, 100.',
        details: '೨೦ - ಇಪ್ಪತ್ತು (20), ೩೦ - ಮೂವತ್ತು (30), ೪೦ - ನಲವತ್ತು (40), ೫೦ - ಐವತ್ತು (50), ೬೦ - ಅರವತ್ತು (60), ೭೦ - ಎಪ್ಪತ್ತು (70), ೮೦ - ಎಂಬತ್ತು (80), ೯೦ - ತೊಂಬತ್ತು (90), ೧೦೦ - ನೂರು (100). Intermediate example: ೨೫ - ಇಪ್ಪತ್ತೈದು, ೯೯ - ತೊಂಬತ್ತೊಂಬತ್ತು.',
        items: [
          { num: '೨೦', word: 'ಇಪ್ಪತ್ತು', tr: 'Ippattu', value: 20 },
          { num: '೩೦', word: 'ಮೂವತ್ತು', tr: 'Moovattu', value: 30 },
          { num: '೪೦', word: 'ನಲವತ್ತು', tr: 'Nalavattu', value: 40 },
          { num: '೫೦', word: 'ಐವತ್ತು', tr: 'Aivattu', value: 50 },
          { num: '೬೦', word: 'ಅರವತ್ತು', tr: 'Aravattu', value: 60 },
          { num: '೭೦', word: 'ಎಪ್ಪತ್ತು', tr: 'Eppattu', value: 70 },
          { num: '೮೦', word: 'ಎಂಬತ್ತು', tr: 'Embattu', value: 80 },
          { num: '೯೦', word: 'ತೊಂಬತ್ತು', tr: 'Tombattu', value: 90 },
          { num: '೧೦೦', word: 'ನೂರು', tr: 'Nooru', value: 100 }
        ]
      },
      {
        id: 'f-sec-5-t4',
        topicNumber: 4,
        title: 'Forward & Backward Counting, Greater/Lesser',
        titleKn: 'ಮುಂದೆ ಮತ್ತು ಹಿಂದೆ ಎಣಿಕೆ, ದೊಡ್ಡದು-ಚಿಕ್ಕದು',
        description: 'Number sequence and comparing numerical quantities.',
        details: 'Forward counting: ೧, ೨, ೩, ೪, ೫... Backward: ೧೦, ೯, ೮, ೭, ೬, ೫... Comparison: ಹತ್ತು (10) ಗಿಂತ ಐವತ್ತು (50) ದೊಡ್ಡದು.',
        items: [
          { concept: 'ಮುಂದೆ ಎಣಿಕೆ (Forward)', sample: '೧, ೨, ೩, ೪, ೫...' },
          { concept: 'ಹಿಂದೆ ಎಣಿಕೆ (Backward)', sample: '೧೦, ೯, ೮, ೭, ೬, ೫...' },
          { concept: 'ದೊಡ್ಡದು (Greater)', sample: '೨೦ > ೧೦ (ಇಪ್ಪತ್ತು ಹತ್ತಕ್ಕಿಂತ ದೊಡ್ಡದು)' },
          { concept: 'ಚಿಕ್ಕದು (Smaller)', sample: '೫ < ೧೫ (ಐದು ಹದಿನೈದಕ್ಕಿಂತ ಚಿಕ್ಕದು)' }
        ]
      }
    ]
  },

  // SECTION 6: ಗಣಿತ ಚಿಹ್ನೆಗಳು — Maths Symbols
  {
    id: 'f-sec-6',
    sectionNumber: 6,
    title: 'Mathematical Symbols & Measurements',
    titleKn: 'ಗಣಿತ ಚಿಹ್ನೆಗಳು, ಅಳತೆ ಮತ್ತು ಹಣದ ಪದಗಳು',
    summary: 'Symbols (+, -, ×, ÷, =, >, <), arithmetic operations, units of weight, money, and simple word problems.',
    category: 'Mathematics',
    topics: [
      {
        id: 'f-sec-6-t1',
        topicNumber: 1,
        title: 'Core Arithmetic Symbols',
        titleKn: 'ಮೂಲ ಗಣಿತ ಚಿಹ್ನೆಗಳು: +, -, ×, ÷',
        description: 'Addition, subtraction, multiplication, and division.',
        details: '+ (ಕೂಡಿಸುವುದು - Addition)\n− (ಕಳೆಯುವುದು - Subtraction)\n× (ಗುಣಿಸುವುದು - Multiplication)\n÷ (ಭಾಗಿಸುವುದು - Division)\n= (ಸಮ - Equals)\n> (ಗಿಂತ ದೊಡ್ಡದು - Greater than)\n< (ಗಿಂತ ಚಿಕ್ಕದು - Less than)',
        items: [
          { symbol: '+', kn: 'ಕೂಡಿಸುವುದು', en: 'Addition', example: '೨ + ೩ = ೫ (ಎರಡಕ್ಕೆ ಮೂರು ಕೂಡಿಸಿದರೆ ಐದು)' },
          { symbol: '−', kn: 'ಕಳೆಯುವುದು', en: 'Subtraction', example: '೫ − ೨ = ೩ (ಐದರಲ್ಲಿ ಎರಡು ಕಳೆದರೆ ಮೂರು)' },
          { symbol: '×', kn: 'ಗುಣಿಸುವುದು', en: 'Multiplication', example: '೨ × ೪ = ೮ (ಎರಡು ನಾಲ್ಕಲಿ ಎಂಟು)' },
          { symbol: '÷', kn: 'ಭಾಗಿಸುವುದು', en: 'Division', example: '೬ ÷ ೨ = ೩ (ಆರನ್ನು ಎರಡರಿಂದ ಭಾಗಿಸಿದರೆ ಮೂರು)' },
          { symbol: '=', kn: 'ಸಮ', en: 'Equals', example: '೫ = ೫ (ಐದು ಐದಕ್ಕೆ ಸಮ)' },
          { symbol: '>', kn: 'ಗಿಂತ ದೊಡ್ಡದು', en: 'Greater than', example: '೭ > ೩ (ಏಳು ಮೂರಕ್ಕಿಂತ ದೊಡ್ಡದು)' },
          { symbol: '<', kn: 'ಗಿಂತ ಚಿಕ್ಕದು', en: 'Less than', example: '೩ < ೭ (ಮೂರು ಏಳಕ್ಕಿಂತ ಚಿಕ್ಕದು)' }
        ]
      },
      {
        id: 'f-sec-6-t2',
        topicNumber: 2,
        title: 'Shapes, Measurement, Time & Money',
        titleKn: 'ಆಕಾರಗಳು, ಅಳತೆ, ಸಮಯ ಮತ್ತು ಹಣ',
        description: 'Shapes (ವೃತ್ತ, ಚೌಕ), weights (ಕಿಲೋಗ್ರಾಂ, ಲೀಟರ್), and currency (ರೂಪಾಯಿ, ಪೈಸೆ).',
        details: 'Shapes: ವೃತ್ತ (Circle), ಚೌಕ (Square), ತ್ರಿಕೋನ (Triangle), ಆಯತ (Rectangle).\nMoney: ರೂಪಾಯಿ (Rupee), ಪೈಸೆ (Paise).\nUnits: ಮೀಟರ್ (Meter), ಕಿಲೋಮೀಟರ್ (Kilometer), ಗ್ರಾಂ (Gram), ಲೀಟರ್ (Liter).',
        items: [
          { cat: 'ಹಣ (Money)', terms: 'ಒಂದು ರೂಪಾಯಿ (1 Rupee), ನೂರು ಪೈಸೆ (100 Paise)' },
          { cat: 'ಅಳತೆ (Measure)', terms: 'ಮೀಟರ್ (Meter), ಕಿಲೋ (Kilogram), ಲೀಟರ್ (Liter)' },
          { cat: 'ಸಮಯ (Time)', terms: 'ಗಂಟೆ (Hour), ನಿಮಿಷ (Minute), ಸೆಕೆಂಡು (Second)' }
        ]
      }
    ]
  },

  // SECTION 7: ಪದವರ್ಗಗಳು ಮತ್ತು ವ್ಯಾಕರಣ — Grammar
  {
    id: 'f-sec-7',
    sectionNumber: 7,
    title: 'Parts of Speech & Essential Grammar',
    titleKn: 'ಪದವರ್ಗಗಳು ಮತ್ತು ಕನ್ನಡ ವ್ಯಾಕರಣ',
    summary: 'Nouns, pronouns, verbs, adjectives, adverbs, gender (ಲಿಂಗ), number (ವಚನ), cases (ವಿಭಕ್ತಿ), and tenses (ಕಾಲಗಳು).',
    category: 'Grammar',
    topics: [
      {
        id: 'f-sec-7-t1',
        topicNumber: 1,
        title: 'The 5 Core Parts of Speech (ಪದವರ್ಗಗಳು)',
        titleKn: 'ನಾಮಪದ, ಸರ್ವನಾಮ, ಕ್ರಿಯಾಪದ, ವಿಶೇಷಣ, ಕ್ರಿಯಾವಿಶೇಷಣ',
        description: 'Fundamental sentence components with clear examples.',
        details: '1. ನಾಮಪದ (Noun): Name of person/place/thing — ರಾಮು, ಬೆಂಗಳೂರು, ಮರ.\n2. ಸರ್ವನಾಮ (Pronoun): Replaces noun — ನಾನು, ಅವನು, ಅವಳು, ನಾವು, ಅವರು.\n3. ಕ್ರಿಯಾಪದ (Verb): Expresses action — ತಿನ್ನುತ್ತಾನೆ, ಓದುತ್ತಾಳೆ, ಹೋಗುವುದು.\n4. ವಿಶೇಷಣ (Adjective): Qualifies a noun — ದೊಡ್ಡ, ಸಿಹಿಯಾದ, ಒಳ್ಳೆಯ.\n5. ಕ್ರಿಯಾವಿಶೇಷಣ (Adverb): Qualifies a verb — ವೇಗವಾಗಿ, ನಿಧಾನವಾಗಿ, ಚೆನ್ನಾಗಿ.',
        items: [
          { type: 'ನಾಮಪದ (Noun)', examples: 'ರಾಮು, ಬೆಂಗಳೂರು, ಪುಸ್ತಕ, ಶಾಲೆ' },
          { type: 'ಸರ್ವನಾಮ (Pronoun)', examples: 'ನಾನು, ನೀನು, ಅವನು, ಅವಳು, ನಾವು' },
          { type: 'ಕ್ರಿಯಾಪದ (Verb)', examples: 'ಓದುತ್ತಾನೆ, ಬರೆಯುತ್ತಾಳೆ, ಹೋಗು, ಬರು' },
          { type: 'ವಿಶೇಷಣ (Adjective)', examples: 'ದೊಡ್ಡ ಆನೆ, ಸಿಹಿ ಮಾವು, ಹೊಸ ಪುಸ್ತಕ' },
          { type: 'ಕ್ರಿಯಾವಿಶೇಷಣ (Adverb)', examples: 'ವೇಗವಾಗಿ ಓಡಿದನು, ಚೆನ್ನಾಗಿ ಹಾಡಿದಳು' }
        ]
      },
      {
        id: 'f-sec-7-t2',
        topicNumber: 2,
        title: 'Gender (ಲಿಂಗ) & Number (ವಚನ)',
        titleKn: 'ಲಿಂಗ (ಪುಲ್ಲಿಂಗ, ಸ್ತ್ರೀಲಿಂಗ, ನಪುಂಸಕಲಿಂಗ) ಮತ್ತು ವಚನ',
        description: 'Masculine, feminine, neuter gender; singular and plural forms.',
        details: 'Gender (ಲಿಂಗ):\n- ಪುಲ್ಲಿಂಗ (Masculine): ಹುಡುಗ (Boy), ಅರಸ (King), ಅವನು (He).\n- ಸ್ತ್ರೀಲಿಂಗ (Feminine): ಹುಡುಗಿ (Girl), ರಾಣಿ (Queen), ಅವಳು (She).\n- ನಪುಂಸಕಲಿಂಗ (Neuter): ಮರ (Tree), ನೀರು (Water), ಅದು (It).\n\nNumber (ವಚನ):\n- ಏಕವಚನ (Singular): ಹುಡುಗ (Boy), ಪುಸ್ತಕ (Book).\n- ಬಹುವಚನ (Plural): ಹುಡುಗರು (Boys), ಪುಸ್ತಕಗಳು (Books).',
        items: [
          { category: 'ಪುಲ್ಲಿಂಗ ↔ ಸ್ತ್ರೀಲಿಂಗ', pair: 'ಹುಡುಗ (Boy) ↔ ಹುಡುಗಿ (Girl); ಅಣ್ಣ ↔ ಅಕ್ಕ' },
          { category: 'ಏಕವಚನ ↔ ಬಹುವಚನ', pair: 'ಮನೆ (House) ↔ ಮನೆಗಳು (Houses); ಮಗು ↔ ಮಕ್ಕಳು' }
        ]
      },
      {
        id: 'f-sec-7-t3',
        topicNumber: 3,
        title: 'The Three Tenses (ಕಾಲಗಳು)',
        titleKn: 'ಮೂರು ಕಾಲಗಳು: ಭೂತ, ವರ್ತಮಾನ, ಭವಿಷ್ಯತ್',
        description: 'Past, present, and future tense conjugation.',
        details: '1. ಭೂತಕಾಲ (Past Tense): Action completed — ನಾನು ನಿನ್ನೆ ಓದಿದೆ (I read yesterday).\n2. ವರ್ತಮಾನಕಾಲ (Present Tense): Ongoing action — ನಾನು ಈಗ ಓದುತ್ತಿದ್ದೇನೆ (I am reading now).\n3. ಭವಿಷ್ಯತ್ಕಾಲ (Future Tense): Upcoming action — ನಾನು ನಾಳೆ ಓದುವೆನು (I will read tomorrow).',
        items: [
          { tense: 'ಭೂತಕಾಲ (Past)', sentence: 'ಅವನು ಶಾಲೆಗೆ ಹೋದನು (He went to school)' },
          { tense: 'ವರ್ತಮಾನಕಾಲ (Present)', sentence: 'ಅವನು ಶಾಲೆಗೆ ಹೋಗುತ್ತಿದ್ದಾನೆ (He is going to school)' },
          { tense: 'ಭವಿಷ್ಯತ್ಕಾಲ (Future)', sentence: 'ಅವನು ಶಾಲೆಗೆ ಹೋಗುವನು (He will go to school)' }
        ]
      },
      {
        id: 'f-sec-7-t4',
        topicNumber: 4,
        title: 'Seven Noun Cases (ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು)',
        titleKn: 'ಏಳು ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು (ಪ್ರಥಮೆಯಿಂದ ಸಪ್ತಮಿ)',
        description: 'Prathama, Dwiteeya, Triteeya, Chaturthi, Panchami, Shashthi, Saptami.',
        details: '೧. ಪ್ರಥಮಾ (ಉ) — ಮರವು (The tree)\n೨. ದ್ವಿತೀಯಾ (ಅನ್ನು) — ಮರವನ್ನು (Tree - object)\n೩. ತೃತೀಯಾ (ಇಂದ) — ಮರದಿಂದ (By/from the tree)\n೪. ಚತುರ್ಥಿ (ಗೆ/ಕ್ಕೆ) — ಮರಕ್ಕೆ (To/for the tree)\n೫. ಪಂಚಮೀ (ದೆಸೆಯಿಂದ) — ಮರದ ದೆಸೆಯಿಂದ (From the cause of tree)\n೬. ಷಷ್ಠೀ (ಅ) — ಮರದ (Of the tree)\n೭. ಸಪ್ತಮೀ (ಅಲ್ಲಿ) — ಮರದಲ್ಲಿ (In the tree)',
        items: [
          { vibhakti: 'ಪ್ರಥಮಾ', pratyaya: 'ಉ', example: 'ರಾಮನು' },
          { vibhakti: 'ದ್ವಿತೀಯಾ', pratyaya: 'ಅನ್ನು', example: 'ರಾಮನನ್ನು' },
          { vibhakti: 'ತೃತೀಯಾ', pratyaya: 'ಇಂದ', example: 'ರಾಮನಿಂದ' },
          { vibhakti: 'ಚತುರ್ಥಿ', pratyaya: 'ಗೆ / ಕ್ಕೆ', example: 'ರಾಮನಿಗೆ / ಮರಕ್ಕೆ' },
          { vibhakti: 'ಷಷ್ಠೀ', pratyaya: 'ಅ', example: 'ರಾಮನ / ಶಾಲೆಯ' },
          { vibhakti: 'ಸಪ್ತಮೀ', pratyaya: 'ಅಲ್ಲಿ', example: 'ಮನೆಯಲ್ಲಿ / ಊರಿನಲ್ಲಿ' }
        ]
      }
    ]
  },

  // SECTION 8: ಶರೀರ ಪರಿಚಯ — Body Parts
  {
    id: 'f-sec-8',
    sectionNumber: 8,
    title: 'Body Parts (ಶರೀರ ಪರಿಚಯ)',
    titleKn: 'ದೇಹದ ಅಂಗಾಂಗಗಳ ಪರಿಚಯ',
    summary: 'Head to toe anatomical vocabulary in Kannada with illustrative sentences.',
    category: 'Anatomy',
    topics: [
      {
        id: 'f-sec-8-t1',
        topicNumber: 1,
        title: 'Head and Facial Features',
        titleKn: 'ತಲೆ ಮತ್ತು ಮುಖದ ಭಾಗಗಳು',
        description: 'ತಲೆ (Head), ಕಣ್ಣು (Eye), ಕಿವಿ (Ear), ಮೂಗು (Nose), ಬಾಯಿ (Mouth), ಹಲ್ಲು (Tooth), ನಾಲಿಗೆ (Tongue).',
        details: 'Essential facial vocabulary:\n- ಕಣ್ಣುಗಳಿಂದ ನೋಡುತ್ತೇವೆ (We see with eyes)\n- ಕಿವಿಗಳಿಂದ ಕೇಳುತ್ತೇವೆ (We hear with ears)\n- ಮೂಗಿನಿಂದ ಉಸಿರಾಡುತ್ತೇವೆ (We breathe with nose)\n- ಬಾಯಿಯಿಂದ ಮಾತನಾಡುತ್ತೇವೆ (We speak with mouth)',
        items: [
          { kn: 'ತಲೆ', tr: 'Tale', en: 'Head' },
          { kn: 'ಕಣ್ಣು', tr: 'KaNNu', en: 'Eye' },
          { kn: 'ಕಿವಿ', tr: 'Kivi', en: 'Ear' },
          { kn: 'ಮೂಗು', tr: 'Moogu', en: 'Nose' },
          { kn: 'ಬಾಯಿ', tr: 'Baayi', en: 'Mouth' },
          { kn: 'ಹಲ್ಲು', tr: 'Hallu', en: 'Teeth' },
          { kn: 'ನಾಲಿಗೆ', tr: 'Naalige', en: 'Tongue' },
          { kn: 'ಕೂದಲು', tr: 'Koodalu', en: 'Hair' }
        ]
      },
      {
        id: 'f-sec-8-t2',
        topicNumber: 2,
        title: 'Limbs and Torso',
        titleKn: 'ಕೈ, ಕಾಲು ಮತ್ತು ದೇಹದ ಅಂಗಗಳು',
        description: 'ಕೈ (Hand), ಬೆರಳು (Finger), ಕಾಲು (Leg), ಮೊಣಕಾಲು (Knee), ಪಾದ (Foot), ಕುತ್ತಿಗೆ (Neck).',
        details: 'Action sentences:\n- ಕೈಗಳಿಂದ ಬರೆಯುತ್ತೇವೆ (We write with hands)\n- ಕಾಲುಗಳಿಂದ ನಡೆಯುತ್ತೇವೆ (We walk with legs)\n- ಎರಡು ಕೈಗಳು ಮತ್ತು ಹತ್ತು ಬೆರಳುಗಳು (Two hands and ten fingers).',
        items: [
          { kn: 'ಕೈ', tr: 'Kai', en: 'Hand / Arm' },
          { kn: 'ಬೆರಳು', tr: 'BeraLu', en: 'Finger' },
          { kn: 'ಕಾಲು', tr: 'Kaalu', en: 'Leg' },
          { kn: 'ಮೊಣಕಾಲು', tr: 'MoNakaalu', en: 'Knee' },
          { kn: 'ಪಾದ', tr: 'Paada', en: 'Foot' },
          { kn: 'ಕುತ್ತಿಗೆ', tr: 'Kuttige', en: 'Neck' },
          { kn: 'ಹೊಟ್ಟೆ', tr: 'HoTTe', en: 'Stomach' }
        ]
      }
    ]
  },

  // SECTION 9: ಬಣ್ಣಗಳು ಮತ್ತು ಆಕಾರಗಳು — Colors & Shapes
  {
    id: 'f-sec-9',
    sectionNumber: 9,
    title: 'Colors and Shapes (ಬಣ್ಣಗಳು ಮತ್ತು ಆಕಾರಗಳು)',
    titleKn: 'ಬಣ್ಣಗಳು ಮತ್ತು ಜ್ಯಾಮಿತೀಯ ಆಕಾರಗಳು',
    summary: 'Primary and secondary colors (ಕೆಂಪು, ನೀಲಿ, ಹಸಿರು...) and geometric shapes (ವೃತ್ತ, ಚೌಕ, ತ್ರಿಕೋನ...).',
    category: 'Visuals',
    topics: [
      {
        id: 'f-sec-9-t1',
        topicNumber: 1,
        title: 'Essential Colors (ಬಣ್ಣಗಳು)',
        titleKn: 'ಕೆಂಪು, ನೀಲಿ, ಹಸಿರು, ಹಳದಿ, ಕಪ್ಪು, ಬಿಳಿ',
        description: 'Primary and common color adjectives with environmental associations.',
        details: '- ಕೆಂಪು (Red) — ರಕ್ತ ಕೆಂಪು (Blood is red), ಕೆಂಪು ಗುಲಾಬಿ (Red rose)\n- ನೀಲಿ (Blue) — ಆಕಾಶ ನೀಲಿ (Sky is blue)\n- ಹಸಿರು (Green) — ಗಿಡದ ಎಲೆ ಹಸಿರು (Plant leaf is green)\n- ಹಳದಿ (Yellow) — ಸೂರ್ಯಕಾಂತಿ ಹಳದಿ (Sunflower is yellow)\n- ಬಿಳಿ (White) — ಹಾಲು ಬಿಳಿ (Milk is white)\n- ಕಪ್ಪು (Black) — ಕಾಗೆ ಕಪ್ಪು (Crow is black)\n- ಕಿತ್ತಳೆ (Orange), ಕಂದು (Brown), ಗುಲಾಬಿ (Pink).',
        items: [
          { kn: 'ಕೆಂಪು', tr: 'Kempu', en: 'Red', hex: '#dc2626' },
          { kn: 'ನೀಲಿ', tr: 'Neeli', en: 'Blue', hex: '#2563eb' },
          { kn: 'ಹಸಿರು', tr: 'Hasiru', en: 'Green', hex: '#16a34a' },
          { kn: 'ಹಳದಿ', tr: 'HaLadi', en: 'Yellow', hex: '#eab308' },
          { kn: 'ಬಿಳಿ', tr: 'BiLi', en: 'White', hex: '#ffffff' },
          { kn: 'ಕಪ್ಪು', tr: 'Kappu', en: 'Black', hex: '#18181b' },
          { kn: 'ಕಿತ್ತಳೆ', tr: 'KittaLe', en: 'Orange', hex: '#f97316' },
          { kn: 'ಗುಲಾಬಿ', tr: 'Gulaabi', en: 'Pink', hex: '#ec4899' }
        ]
      },
      {
        id: 'f-sec-9-t2',
        topicNumber: 2,
        title: 'Geometric Shapes (ಆಕಾರಗಳು)',
        titleKn: 'ವೃತ್ತ, ಚೌಕ, ತ್ರಿಕೋನ ಮತ್ತು ಆಯತ',
        description: 'Geometric shapes with real-world object analogies.',
        details: '- ವೃತ್ತ (Circle) — ನಾಣ್ಯ ವೃತ್ತಾಕಾರದಲ್ಲಿದೆ (Coin is circular)\n- ಚೌಕ (Square) — ಕ್ಯಾರಮ್ ಬೋರ್ಡ್ ಚೌಕವಾಗಿದೆ (Carrom board is square)\n- ತ್ರಿಕೋನ (Triangle) — ಸಮೋಸ ತ್ರಿಕೋನಾಕಾರದಲ್ಲಿದೆ (Samosa is triangular)\n- ಆಯತ (Rectangle) — ಬ್ಲಾಕ್‌ಬೋರ್ಡ್ ಆಯತಾಕಾರದಲ್ಲಿದೆ (Blackboard is rectangular)\n- ನಕ್ಷತ್ರ (Star), ಅಂಡಾಕಾರ (Oval).',
        items: [
          { kn: 'ವೃತ್ತ', tr: 'Vritta', en: 'Circle' },
          { kn: 'ಚೌಕ', tr: 'Chawka', en: 'Square' },
          { kn: 'ತ್ರಿಕೋನ', tr: 'Trikoona', en: 'Triangle' },
          { kn: 'ಆಯತ', tr: 'Aayata', en: 'Rectangle' },
          { kn: 'ಅಂಡಾಕಾರ', tr: 'Andaakaara', en: 'Oval' }
        ]
      }
    ]
  },

  // SECTION 10: ಹಣ್ಣುಗಳು, ತರಕಾರಿಗಳು ಮತ್ತು ಆಹಾರ
  {
    id: 'f-sec-10',
    sectionNumber: 10,
    title: 'Fruits, Vegetables and Food',
    titleKn: 'ಹಣ್ಣುಗಳು, ತರಕಾರಿಗಳು, ಧಾನ್ಯಗಳು ಮತ್ತು ಆಹಾರ',
    summary: 'Fresh fruits, market vegetables, staples, beverages, 4 basic tastes, and market shopping phrases.',
    category: 'Food',
    topics: [
      {
        id: 'f-sec-10-t1',
        topicNumber: 1,
        title: 'Fruits of Karnataka (ಹಣ್ಣುಗಳು)',
        titleKn: 'ಮಾವಿನ ಹಣ್ಣು, ಬಾಳೆಹಣ್ಣು, ಸೇಬು, ದಾಳಿಂಬೆ...',
        description: 'Common fruits with English translations and seasonal contexts.',
        details: 'ಮಾವಿನ ಹಣ್ಣು (Mango — King of fruits), ಬಾಳೆಹಣ್ಣು (Banana), ಸೇಬು (Apple), ಕಿತ್ತಳೆ (Orange), ದಾಳಿಂಬೆ (Pomegranate), ದ್ರಾಕ್ಷಿ (Grapes), ಹಲಸಿನ ಹಣ್ಣು (Jackfruit), ಪಪ್ಪಾಯಿ (Papaya), ಸೀಬೆಹಣ್ಣು (Guava).',
        items: [
          { kn: 'ಮಾವಿನ ಹಣ್ಣು', tr: 'Maavina haNNu', en: 'Mango' },
          { kn: 'ಬಾಳೆಹಣ್ಣು', tr: 'BaaLehaNNu', en: 'Banana' },
          { kn: 'ಸೇಬು', tr: 'Seebu', en: 'Apple' },
          { kn: 'ದಾಳಿಂಬೆ', tr: 'DaaLimbe', en: 'Pomegranate' },
          { kn: 'ದ್ರಾಕ್ಷಿ', tr: 'Draakshi', en: 'Grapes' },
          { kn: 'ಹಲಸಿನ ಹಣ್ಣು', tr: 'Halasina haNNu', en: 'Jackfruit' }
        ]
      },
      {
        id: 'f-sec-10-t2',
        topicNumber: 2,
        title: 'Vegetables & Greens (ತರಕಾರಿಗಳು ಮತ್ತು ಸೊಪ್ಪುಗಳು)',
        titleKn: 'ಬದನೆಕಾಯಿ, ಆಲೂಗಡ್ಡೆ, ಈರುಳ್ಳಿ, ಸೊಪ್ಪು',
        description: 'Kitchen vegetables and leafy greens.',
        details: 'ಬದನೆಕಾಯಿ (Brinjal / Eggplant), ಆಲೂಗಡ್ಡೆ (Potato), ಈರುಳ್ಳಿ (Onion), ಟೊಮೆಟೊ (Tomato), ಬೆಂಡೆಕಾಯಿ (Okra / Ladyfinger), ಕ್ಯಾರೆಟ್ (Carrot), ಸೌತೆಕಾಯಿ (Cucumber), ಮೆಂತ್ಯ ಸೊಪ್ಪು (Fenugreek leaves), ಪಾಲಕ್ ಸೊಪ್ಪು (Spinach).',
        items: [
          { kn: 'ಬದನೆಕಾಯಿ', tr: 'Badanekaayi', en: 'Brinjal / Eggplant' },
          { kn: 'ಆಲೂಗಡ್ಡೆ', tr: 'Aaloogadde', en: 'Potato' },
          { kn: 'ಈರುಳ್ಳಿ', tr: 'EeruLLi', en: 'Onion' },
          { kn: 'ಬೆಂಡೆಕಾಯಿ', tr: 'BeNDekaayi', en: 'Okra / Lady\'s finger' },
          { kn: 'ಸೌತೆಕಾಯಿ', tr: 'Sowtekaayi', en: 'Cucumber' }
        ]
      },
      {
        id: 'f-sec-10-t3',
        topicNumber: 3,
        title: 'Staples, Grains & Dishes (ಧಾನ್ಯಗಳು ಮತ್ತು ಊಟ)',
        titleKn: 'ಅಕ್ಕಿ, ರಾಗಿ ಮುದ್ದೆ, ಅನ್ನ, ಬೇಳೆ, ರೊಟ್ಟಿ',
        description: 'Daily meals and grains of Karnataka.',
        details: 'ಅನ್ನ (Cooked rice), ಸಾರು (Rasam), ಸಾಂಬಾರ್ (Sambar), ರಾಗಿ ಮುದ್ದೆ (Ragi ball), ರೊಟ್ಟಿ (Roti), ದೋಸೆ (Dosa), ಇಡ್ಲಿ (Idli), ಉಪ್ಪಿಟ್ಟು (Upma), ಕಾಫಿ (Filter coffee), ಹಾಲು (Milk), ಮೊಸರು (Curd).',
        items: [
          { kn: 'ಅನ್ನ', tr: 'Anna', en: 'Cooked Rice' },
          { kn: 'ರಾಗಿ ಮುದ್ದೆ', tr: 'Raagi Mudde', en: 'Ragi Ball' },
          { kn: 'ದೋಸೆ', tr: 'Doose', en: 'Dosa pancake' },
          { kn: 'ಹಾಲು', tr: 'Haalu', en: 'Milk' },
          { kn: 'ಮೊಸರು', tr: 'Mosaru', en: 'Curd / Yogurt' }
        ]
      },
      {
        id: 'f-sec-10-t4',
        topicNumber: 4,
        title: 'The Six Tastes (ಷಡ್ರಸಗಳು / ರುಚಿಗಳು)',
        titleKn: 'ಸಿಹಿ, ಹುಳಿ, ಖಾರ, ಉಪ್ಪು, ಕಹಿ, ಒಗರು',
        description: 'Taste sensations in Kannada.',
        details: 'ಸಿಹಿ (Sweet — ಜಿಲೇಬಿ ಸಿಹಿಯಾಗಿದೆ), ಹುಳಿ (Sour — ನಿಂಬೆಹಣ್ಣು ಹುಳಿ), ಖಾರ (Spicy — ಮೆಣಸಿನಕಾಯಿ ಖಾರ), ಉಪ್ಪು (Salty), ಕಹಿ (Bitter — ಹಾಗಲಕಾಯಿ ಕಹಿ), ಒಗರು (Astringent — ಅಡಿಕೆ ಒಗರು).',
        items: [
          { kn: 'ಸಿಹಿ', tr: 'Sihi', en: 'Sweet', example: 'ಪಾಯಸ ಸಿಹಿಯಾಗಿದೆ' },
          { kn: 'ಹುಳಿ', tr: 'HuLi', en: 'Sour', example: 'ನಿಂಬೆಹಣ್ಣು ಹುಳಿ' },
          { kn: 'ಖಾರ', tr: 'Khaara', en: 'Spicy / Hot', example: 'ಮೆಣಸಿನಕಾಯಿ ಖಾರ' },
          { kn: 'ಕಹಿ', tr: 'Kahi', en: 'Bitter', example: 'ಹಾಗಲಕಾಯಿ ಕಹಿ' },
          { kn: 'ಉಪ್ಪು', tr: 'Uppu', en: 'Salty', example: 'ಉಪ್ಪು ಜಾಸ್ತಿ ಇದೆ' }
        ]
      }
    ]
  },

  // SECTION 11: ಪ್ರಾಣಿಗಳು, ಪಕ್ಷಿಗಳು ಮತ್ತು ಪ್ರಕೃತಿ
  {
    id: 'f-sec-11',
    sectionNumber: 11,
    title: 'Animals, Birds and Nature',
    titleKn: 'ಪ್ರಾಣಿಗಳು, ಪಕ್ಷಿಗಳು, ಕೀಟಗಳು ಮತ್ತು ಪ್ರಕೃತಿ',
    summary: 'Domestic & wild animals, birds, insects, trees, and natural elements (rain, sunlight, soil).',
    category: 'Nature',
    topics: [
      {
        id: 'f-sec-11-t1',
        topicNumber: 1,
        title: 'Domestic & Wild Animals',
        titleKn: 'ಸಾಕುಪ್ರಾಣಿಗಳು ಮತ್ತು ಕಾಡುಪ್ರಾಣಿಗಳು',
        description: 'ಹಸು, ನಾಯಿ, ಬೆಕ್ಕು, ಆನೆ, ಹುಲಿ, ಸಿಂಹ, ಕರಡಿ...',
        details: 'Domestic (ಸಾಕುಪ್ರಾಣಿಗಳು):\n- ಹಸು (Cow), ನಾಯಿ (Dog), ಬೆಕ್ಕು (Cat), ಕುರಿ (Sheep), ಕುದುರೆ (Horse).\n\nWild (ಕಾಡುಪ್ರಾಣಿಗಳು):\n- ಹುಲಿ (Tiger — National animal), ಸಿಂಹ (Lion), ಆನೆ (Elephant — State heritage), ಚಿರತೆ (Leopard), ಕರಡಿ (Bear), ಜಿಂಕೆ (Deer).',
        items: [
          { kn: 'ಹಸು', tr: 'Hasu', en: 'Cow' },
          { kn: 'ನಾಯಿ', tr: 'Naayi', en: 'Dog' },
          { kn: 'ಬೆಕ್ಕು', tr: 'Bekku', en: 'Cat' },
          { kn: 'ಆನೆ', tr: 'Aane', en: 'Elephant' },
          { kn: 'ಹುಲಿ', tr: 'Huli', en: 'Tiger' },
          { kn: 'ಸಿಂಹ', tr: 'Simha', en: 'Lion' },
          { kn: 'ಜಿಂಕೆ', tr: 'Jinke', en: 'Deer' }
        ]
      },
      {
        id: 'f-sec-11-t2',
        topicNumber: 2,
        title: 'Birds of Karnataka (ಪಕ್ಷಿಗಳು)',
        titleKn: 'ನವಿಲು, ಗಿಳಿ, ಕಾಗೆ, ಕೋಗಿಲೆ, ಹದ್ದು...',
        description: 'Birds with distinguishing traits and sounds.',
        details: 'ನವಿಲು (Peacock — National bird), ಗಿಳಿ (Parrot), ಕಾಗೆ (Crow), ಕೋಗಿಲೆ (Cuckoo — Sweet singer), ಹದ್ದು (Eagle), ಪಾರಿವಾಳ (Pigeon), ಬಾತುಕೋಳಿ (Duck).',
        items: [
          { kn: 'ನವಿಲು', tr: 'Navilu', en: 'Peacock' },
          { kn: 'ಗಿಳಿ', tr: 'GiLi', en: 'Parrot' },
          { kn: 'ಕಾಗೆ', tr: 'Kaage', en: 'Crow' },
          { kn: 'ಕೋಗಿಲೆ', tr: 'Koogile', en: 'Cuckoo' },
          { kn: 'ಪಾರಿವಾಳ', tr: 'PaarivaaLa', en: 'Pigeon' }
        ]
      },
      {
        id: 'f-sec-11-t3',
        topicNumber: 3,
        title: 'Elements of Nature (ಪಂಚಭೂತಗಳು ಮತ್ತು ಪರಿಸರ)',
        titleKn: 'ಮಳೆ, ಬಿಸಿಲು, ಗಾಳಿ, ನೀರು, ಮಣ್ಣು, ಆಕಾಶ',
        description: 'Sunlight, rain, wind, water, earth, trees, and flowers.',
        details: 'ಮಳೆ (Rain), ಬಿಸಿಲು (Sunlight), ಗಾಳಿ (Wind / Air), ನೀರು (Water), ಮಣ್ಣು (Soil / Earth), ಆಕಾಶ (Sky), ಬೆಟ್ಟ (Hill), ನದಿ (River), ಸಾಗರ (Ocean), ಮರ (Tree), ಹೂವು (Flower), ಎಲೆ (Leaf).',
        items: [
          { kn: 'ಮಳೆ', tr: 'MaLe', en: 'Rain' },
          { kn: 'ಬಿಸಿಲು', tr: 'Bisilu', en: 'Sunshine' },
          { kn: 'ಗಾಳಿ', tr: 'GaaLi', en: 'Wind' },
          { kn: 'ನೀರು', tr: 'Niiru', en: 'Water' },
          { kn: 'ಮರ', tr: 'Mara', en: 'Tree' },
          { kn: 'ಹೂವು', tr: 'Hoovu', en: 'Flower' }
        ]
      }
    ]
  },

  // SECTION 12: ಕುಟುಂಬ ಮತ್ತು ಸಂಬಂಧಗಳು — Family & Relations
  {
    id: 'f-sec-12',
    sectionNumber: 12,
    title: 'Family and Kinship (ಕುಟುಂಬ ಮತ್ತು ಸಂಬಂಧಗಳು)',
    titleKn: 'ಕುಟುಂಬದ ಸದಸ್ಯರು ಮತ್ತು ಸಂಬಂಧವಾಚಕಗಳು',
    summary: 'Direct family (ಅಪ್ಪ, ಅಮ್ಮ, ಅಣ್ಣ...), extended relations (ಅಜ್ಜ, ಅಜ್ಜಿ, ಮಾವ...), and family introductions.',
    category: 'Kinship',
    topics: [
      {
        id: 'f-sec-12-t1',
        topicNumber: 1,
        title: 'Immediate Family Members',
        titleKn: 'ಅಪ್ಪ, ಅಮ್ಮ, ಅಣ್ಣ, ಅಕ್ಕ, ತಮ್ಮ, ತಂಗಿ',
        description: 'Nuclear family terms and honorifics.',
        details: 'ಅಪ್ಪ / ತಂದೆ (Father), ಅಮ್ಮ / ತಾಯಿ (Mother), ಅಣ್ಣ (Elder brother), ಅಕ್ಕ (Elder sister), ತಮ್ಮ (Younger brother), ತಂಗಿ (Younger sister), ಮಗ (Son), ಮಗಳು (Daughter).',
        items: [
          { kn: 'ಅಪ್ಪ / ತಂದೆ', tr: 'Appa / Tande', en: 'Father' },
          { kn: 'ಅಮ್ಮ / ತಾಯಿ', tr: 'Amma / Taayi', en: 'Mother' },
          { kn: 'ಅಣ್ಣ', tr: 'ANNa', en: 'Elder Brother' },
          { kn: 'ಅಕ್ಕ', tr: 'Akka', en: 'Elder Sister' },
          { kn: 'ತಮ್ಮ', tr: 'Tamma', en: 'Younger Brother' },
          { kn: 'ತಂಗಿ', tr: 'Tangi', en: 'Younger Sister' }
        ]
      },
      {
        id: 'f-sec-12-t2',
        topicNumber: 2,
        title: 'Extended Kinship Terms',
        titleKn: 'ಅಜ್ಜ, ಅಜ್ಜಿ, ಮಾವ, ಅತ್ತೆ, ಚಿಕ್ಕಪ್ಪ',
        description: 'Grandparents, uncles, aunts, and in-laws.',
        details: 'ಅಜ್ಜ / ತಾತ (Grandfather), ಅಜ್ಜಿ (Grandmother), ಮಾವ (Maternal uncle / Father-in-law), ಅತ್ತೆ (Aunt / Mother-in-law), ಚಿಕ್ಕಪ್ಪ (Paternal junior uncle), ದೊಡ್ಡಪ್ಪ (Paternal senior uncle).',
        items: [
          { kn: 'ತಾತ / ಅಜ್ಜ', tr: 'Taata / Ajja', en: 'Grandfather' },
          { kn: 'ಅಜ್ಜಿ', tr: 'Ajji', en: 'Grandmother' },
          { kn: 'ಮಾವ', tr: 'Maava', en: 'Maternal Uncle' },
          { kn: 'ಅತ್ತೆ', tr: 'Atte', en: 'Paternal Aunt' }
        ]
      },
      {
        id: 'f-sec-12-t3',
        topicNumber: 3,
        title: 'Introducing One\'s Family in Kannada',
        titleKn: 'ನನ್ನ ಕುಟುಂಬದ ಬಗ್ಗೆ ೫ ವಾಕ್ಯಗಳು',
        description: 'Sample guided composition about one\'s family.',
        details: '1. ಇದು ನನ್ನ ಕುಟುಂಬ (This is my family).\n2. ನನ್ನ ತಂದೆಯ ಹೆಸರು ರಾಜೇಶ್ (My father\'s name is Rajesh).\n3. ನನ್ನ ತಾಯಿಯ ಹೆಸರು ಸುಧಾ (My mother\'s name is Sudha).\n4. ನನಗೆ ಒಬ್ಬ ಅಣ್ಣ ಇದ್ದಾನೆ (I have one elder brother).\n5. ನಾವು ಬೆಂಗಳೂರಿನಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೇವೆ (We live in Bengaluru).',
        items: [
          { line: 'ಇದು ನನ್ನ ಕುಟುಂಬ.', tr: 'Idu nanna kuTumba.', en: 'This is my family.' },
          { line: 'ನನ್ನ ತಂದೆ ಶಿಕ್ಷಕರು.', tr: 'Nanna tande shikshakaru.', en: 'My father is a teacher.' },
          { line: 'ನಾವು ಸಂತೋಷವಾಗಿದ್ದೇವೆ.', tr: 'Naavu santoosavaagiddeevi.', en: 'We live happily.' }
        ]
      }
    ]
  },

  // SECTION 13: ಮನೆ, ಶಾಲೆ ಮತ್ತು ದೈನಂದಿನ ವಸ್ತುಗಳು
  {
    id: 'f-sec-13',
    sectionNumber: 13,
    title: 'Home, School and Daily Objects',
    titleKn: 'ಮನೆ, ಶಾಲೆ, ವಾಹನಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸ್ಥಳಗಳು',
    summary: 'Household rooms, classroom essentials, clothing, vehicles, and public urban locations.',
    category: 'Objects',
    topics: [
      {
        id: 'f-sec-13-t1',
        topicNumber: 1,
        title: 'Around the House (ಮನೆ ಮತ್ತು ಕೊಠಡಿಗಳು)',
        titleKn: 'ಮನೆಯ ಕೊಠಡಿಗಳು ಮತ್ತು ಗೃಹೋಪಯೋಗಿ ವಸ್ತುಗಳು',
        description: 'ಬಾಗಿಲು, ಕಿಟಕಿ, ಮಂಚ, ಕುರ್ಚಿ, ಮೇಜು, ಅಡುಗೆಮನೆ...',
        details: 'ಬಾಗಿಲು (Door), ಕಿಟಕಿ (Window), ಮಂಚ (Bed / Cot), ಕುರ್ಚಿ (Chair), ಮೇಜು (Table), ಅಡುಗೆಮನೆ (Kitchen), ಸ್ನಾನದ ಮನೆ (Bathroom), ದೀಪ (Lamp / Light), ಫ್ಯಾನ್ (Fan), ಕನ್ನಡಿ (Mirror).',
        items: [
          { kn: 'ಬಾಗಿಲು', tr: 'Baagilu', en: 'Door' },
          { kn: 'ಕಿಟಕಿ', tr: 'KiTaki', en: 'Window' },
          { kn: 'ಕುರ್ಚಿ', tr: 'Kurchi', en: 'Chair' },
          { kn: 'ಮೇಜು', tr: 'Meeju', en: 'Table' },
          { kn: 'ಅಡುಗೆಮನೆ', tr: 'ADugemane', en: 'Kitchen' }
        ]
      },
      {
        id: 'f-sec-13-t2',
        topicNumber: 2,
        title: 'Classroom & School Supplies (ಶಾಲೆ)',
        titleKn: 'ಶಾಲೆಯ ವಸ್ತುಗಳು ಮತ್ತು ತರಗತಿ ಪದಗಳು',
        description: 'ಪುಸ್ತಕ, ಪೆನ್ನು, ಚೀಲ, ಕಪ್ಪುಹಲಗೆ, ಮೇಷ್ಟ್ರು...',
        details: 'ಪುಸ್ತಕ (Book), ನೋಟ್‌ಬುಕ್ (Notebook), ಪೆನ್ನು (Pen), ಪೆನ್ಸಿಲ್ (Pencil), ಚೀಲ / ಬ್ಯಾಗ್ (School bag), ಕಪ್ಪುಹಲಗೆ (Blackboard), ತರಗತಿ (Classroom), ಶಾಲೆ (School), ಶಿಕ್ಷಕರು (Teacher), ವಿದ್ಯಾರ್ಥಿ (Student).',
        items: [
          { kn: 'ಪುಸ್ತಕ', tr: 'Pustaka', en: 'Book' },
          { kn: 'ಚೀಲ', tr: 'Cheela', en: 'School bag' },
          { kn: 'ತರಗತಿ', tr: 'Taragati', en: 'Classroom' },
          { kn: 'ಶಿಕ್ಷಕರು', tr: 'Shikshakaru', en: 'Teacher' }
        ]
      },
      {
        id: 'f-sec-13-t3',
        topicNumber: 3,
        title: 'Vehicles & Public Places (ವಾಹನಗಳು ಮತ್ತು ಸ್ಥಳಗಳು)',
        titleKn: 'ಬಸ್ಸು, ರೈಲು, ಆಸ್ಪತ್ರೆ, ಪೋಲೀಸ್ ಠಾಣೆ, ಅಂಗಡಿ',
        description: 'Transportation modes and urban infrastructure.',
        details: 'ಬಸ್ಸು (Bus), ರೈಲು (Train), ಕಾರು (Car), ವಿಮಾನ (Airplane), ಸೈಕಲ್ (Bicycle), ಆಸ್ಪತ್ರೆ (Hospital), ಅಂಚೆ ಕಚೇರಿ (Post office), ಬ್ಯಾಂಕ್ (Bank), ಗ್ರಂಥಾಲಯ (Library), ಮಾರುಕಟ್ಟೆ (Market), ರಸ್ತೆ (Road).',
        items: [
          { kn: 'ಬಸ್ಸು', tr: 'Bassu', en: 'Bus' },
          { kn: 'ರೈಲು', tr: 'Railu', en: 'Train' },
          { kn: 'ಆಸ್ಪತ್ರೆ', tr: 'Aaspatre', en: 'Hospital' },
          { kn: 'ಮಾರುಕಟ್ಟೆ', tr: 'MaarukaTTe', en: 'Market' },
          { kn: 'ಅಂಚೆ ಕಚೇರಿ', tr: 'Anche Kaceeri', en: 'Post office' }
        ]
      }
    ]
  },

  // SECTION 14: ದಿನಗಳು, ತಿಂಗಳುಗಳು ಮತ್ತು ಸಮಯ
  {
    id: 'f-sec-14',
    sectionNumber: 14,
    title: 'Days, Months, Seasons and Time',
    titleKn: 'ದಿನಗಳು, ತಿಂಗಳುಗಳು, ಋತುಗಳು ಮತ್ತು ಸಮಯ ಹೇಳುವುದು',
    summary: 'The 7 weekdays, 12 Chandramana & English calendar months, 6 Ritus, clock reading, and temporal parts of day.',
    category: 'Time',
    topics: [
      {
        id: 'f-sec-14-t1',
        topicNumber: 1,
        title: 'The Seven Days of the Week (ವಾರದ ೭ ದಿನಗಳು)',
        titleKn: 'ಭಾನುವಾರದಿಂದ ಶನಿವಾರದವರೆಗೆ ವಾರದ ದಿನಗಳು',
        description: 'Sunday through Saturday in Kannada.',
        details: '೧. ಭಾನುವಾರ (Sunday — Ravi vaara)\n೨. ಸೋಮವಾರ (Monday — Chandra vaara)\n೩. ಮಂಗಳವಾರ (Tuesday — Angaaraka vaara)\n೪. ಬುಧವಾರ (Wednesday — Budha vaara)\n೫. ಗುರುವಾರ (Thursday — Brihaspati vaara)\n೬. ಶುಕ್ರವಾರ (Friday — Shukra vaara)\n೭. ಶನಿವಾರ (Saturday — Shani vaara)',
        items: [
          { kn: 'ಭಾನುವಾರ', tr: 'Bhaanuvaara', en: 'Sunday' },
          { kn: 'ಸೋಮವಾರ', tr: 'Soomavaara', en: 'Monday' },
          { kn: 'ಮಂಗಳವಾರ', tr: 'MangaLavaara', en: 'Tuesday' },
          { kn: 'ಬುಧವಾರ', tr: 'Budhavaara', en: 'Wednesday' },
          { kn: 'ಗುರುವಾರ', tr: 'Guruvaara', en: 'Thursday' },
          { kn: 'ಶುಕ್ರವಾರ', tr: 'Shukravaara', en: 'Friday' },
          { kn: 'ಶನಿವಾರ', tr: 'Shanivaara', en: 'Saturday' }
        ]
      },
      {
        id: 'f-sec-14-t2',
        topicNumber: 2,
        title: 'The 12 Kannada Months (ಹನ್ನೆರಡು ಮಾಸಗಳು)',
        titleKn: 'ಚೈತ್ರದಿಂದ ಫಾಲ್ಗುಣದವರೆಗೆ ಕನ್ನಡ ಮಾಸಗಳು',
        description: 'Traditional lunar calendar months of Karnataka.',
        details: '೧. ಚೈತ್ರ (Chaitra — Ugadi spring)\n೨. ವೈಶಾಖ (Vaishaakha)\n೩. ಜ್ಯೇಷ್ಠ (JyeSTha)\n೪. ಆಷಾಢ (AaShaaDha)\n೫. ಶ್ರಾವಣ (ShraavaNa)\n೬. ಭಾದ್ರಪದ (Bhaadrapada — Ganesha)\n೭. ಆಶ್ವಯುಜ (Aashwayuja — Dasara)\n೮. ಕಾರ್ತಿಕ (Kaartika — Deepavali)\n೯. ಮಾರ್ಗಶಿರ (Maargashira)\n೧೦. ಪುಷ್ಯ (PuSya — Sankranti)\n೧೧. ಮಾಘ (Maagha)\n೧೨. ಫಾಲ್ಗುಣ (PhaalguNa).',
        items: [
          { kn: 'ಚೈತ್ರ', tr: 'Chaitra', festival: 'ಯುಗಾದಿ (Ugadi)' },
          { kn: 'ಭಾದ್ರಪದ', tr: 'Bhaadrapada', festival: 'ಗಣೇಶ ಚತುರ್ಥಿ (Ganesha)' },
          { kn: 'ಆಶ್ವಯುಜ', tr: 'Aashwayuja', festival: 'ವಿಜಯದಶಮಿ (Dasara)' },
          { kn: 'ಕಾರ್ತಿಕ', tr: 'Kaartika', festival: 'ದೀಪಾವಳಿ (Deepavali)' }
        ]
      },
      {
        id: 'f-sec-14-t3',
        topicNumber: 3,
        title: 'Seasons & Parts of the Day (ಋತುಗಳು ಮತ್ತು ಸಮಯ)',
        titleKn: 'ಋತುಗಳು, ಬೆಳಗ್ಗೆ, ಮಧ್ಯಾಹ್ನ, ಸಂಜೆ, ರಾತ್ರಿ',
        description: 'Times of day and telling time on the clock.',
        details: 'Times of Day:\n- ಬೆಳಗ್ಗೆ (Morning)\n- ಮಧ್ಯಾಹ್ನ (Afternoon)\n- ಸಂಜೆ (Evening)\n- ರಾತ್ರಿ (Night)\n\nRelative Time:\n- ಮೊನ್ನೆ (Day before yesterday)\n- ನಿನ್ನೆ (Yesterday)\n- ಇಂದು / ಇವತ್ತು (Today)\n- ನಾಳೆ (Tomorrow)\n- ನಾಡಿದ್ದು (Day after tomorrow)\n\nClock Time:\n- ಎಷ್ಟು ಗಂಟೆ? (What time is it?)\n- ಹತ್ತು ಗಂಟೆ (10:00)\n- ಹತ್ತೂವರೆ (10:30)\n- ಹತ್ತೂಕಾಲು (10:15)\n- ಹನ್ನೊಂದಕ್ಕೆ ಕಾಲು ಕಡಿಮೆ (10:45).',
        items: [
          { kn: 'ಬೆಳಗ್ಗೆ', tr: 'BeLagge', en: 'Morning' },
          { kn: 'ಮಧ್ಯಾಹ್ನ', tr: 'Madhyaahna', en: 'Afternoon' },
          { kn: 'ಸಂಜೆ', tr: 'Sanje', en: 'Evening' },
          { kn: 'ರಾತ್ರಿ', tr: 'Raatri', en: 'Night' },
          { kn: 'ಈಗ ಸಮಯ ಎಷ್ಟು?', tr: 'Iiga samaya eSTu?', en: 'What time is it now?' }
        ]
      }
    ]
  },

  // SECTION 15: ಕ್ರಿಯಾಪದಗಳು ಮತ್ತು ವಿರುದ್ಧ ಪದಗಳು
  {
    id: 'f-sec-15',
    sectionNumber: 15,
    title: 'Verbs & Antonyms (ಕ್ರಿಯಾಪದ ಮತ್ತು ವಿರುದ್ಧ ಪದಗಳು)',
    titleKn: 'ದೈನಂದಿನ ಕ್ರಿಯಾಪದಗಳು ಮತ್ತು ವಿರುದ್ಧಾರ್ಥಕ ಜೋಡಿಗಳು',
    summary: 'Common action verbs (ಬರು, ಹೋಗು, ತಿನ್ನು...) and essential opposite pairs (ದೊಡ್ಡ-ಚಿಕ್ಕ, ಮೇಲೆ-ಕೆಳಗೆ...).',
    category: 'Actions & Opposites',
    topics: [
      {
        id: 'f-sec-15-t1',
        topicNumber: 1,
        title: 'Daily Action Verbs (ಮೂಲ ಕ್ರಿಯಾಪದಗಳು)',
        titleKn: 'ಬರು, ಹೋಗು, ತಿನ್ನು, ಕುಡಿ, ಓದು, ಬರೆ, ಮಲಗು...',
        description: 'Essential action roots in informal and polite imperative forms.',
        details: '- ಬರು (Come): ಇಲ್ಲಿ ಬಾ (Come here - informal) / ಬನ್ನಿ (Please come - polite)\n- ಹೋಗು (Go): ಹೋಗು / ಹೋಗಿ\n- ತಿನ್ನು (Eat): ತಿನ್ನು / ತಿನ್ನಿ\n- ಕುಡಿ (Drink): ಕುಡಿ / ಕುಡಿಯಿರಿ\n- ಓದು (Read): ಓದು / ಓದಿ\n- ಬರೆ (Write): ಬರೆ / ಬರೆಯಿರಿ\n- ನೋಡು (See / Look): ನೋಡು / ನೋಡಿ\n- ಕೇಳು (Listen / Ask): ಕೇಳು / ಕೇಳಿ\n- ಆಡು (Play): ಆಡು / ಆಡಿ\n- ಮಲಗು (Sleep): ಮಲಗು / ಮಲಗಿ.',
        items: [
          { root: 'ಬರು (Come)', inf: 'ಬಾ (Baa)', polite: 'ಬನ್ನಿ (Banni)' },
          { root: 'ಹೋಗು (Go)', inf: 'ಹೋಗು (Hoogu)', polite: 'ಹೋಗಿ (Hoogi)' },
          { root: 'ತಿನ್ನು (Eat)', inf: 'ತಿನ್ನು (Tinnu)', polite: 'ತಿನ್ನಿ (Tinni)' },
          { root: 'ಓದು (Read)', inf: 'ಓದು (Oodu)', polite: 'ಓದಿ (Oodi)' },
          { root: 'ಬರೆ (Write)', inf: 'ಬರೆ (Bare)', polite: 'ಬರೆಯಿರಿ (Bareyiri)' }
        ]
      },
      {
        id: 'f-sec-15-t2',
        topicNumber: 2,
        title: 'Essential Antonym Pairs (ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು)',
        titleKn: 'ದೊಡ್ಡ-ಚಿಕ್ಕ, ಮೇಲೆ-ಕೆಳಗೆ, ಒಳಗೆ-ಹೊರಗೆ, ಬಿಸಿ-ತಣ್ಣಗೆ',
        description: 'Crucial contrast word-pairs.',
        details: '1. ದೊಡ್ಡದು (Big) ↔ ಚಿಕ್ಕದು (Small)\n2. ಮೇಲೆ (Above / Up) ↔ ಕೆಳಗೆ (Below / Down)\n3. ಮುಂದೆ (In front) ↔ ಹಿಂದೆ (Behind)\n4. ಒಳಗೆ (Inside) ↔ ಹೊರಗೆ (Outside)\n5. ಹತ್ತಿರ (Near) ↔ ದೂರ (Far)\n6. ಬಿಸಿ (Hot) ↔ ತಣ್ಣಗೆ (Cold)\n7. ಹೊಸದು (New) ↔ ಹಳೆಯದು (Old)\n8. ಒಳ್ಳೆಯ (Good) ↔ ಕೆಟ್ಟ (Bad)\n9. ಹೆಚ್ಚು (More) ↔ ಕಡಿಮೆ (Less)\n10. ಬೆಳಕು (Light) ↔ ಕತ್ತಲೆ (Darkness).',
        items: [
          { pair: 'ದೊಡ್ಡದು (Big) ↔ ಚಿಕ್ಕದು (Small)' },
          { pair: 'ಮೇಲೆ (Up) ↔ ಕೆಳಗೆ (Down)' },
          { pair: 'ಒಳಗೆ (Inside) ↔ ಹೊರಗೆ (Outside)' },
          { pair: 'ಹತ್ತಿರ (Near) ↔ ದೂರ (Far)' },
          { pair: 'ಬಿಸಿ (Hot) ↔ ತಣ್ಣಗೆ (Cold)' },
          { pair: 'ಬೆಳಕು (Light) ↔ ಕತ್ತಲೆ (Dark)' }
        ]
      }
    ]
  },

  // SECTION 16: ಸರಳ ವಾಕ್ಯಗಳು ಮತ್ತು ಸಂಭಾಷಣೆ
  {
    id: 'f-sec-16',
    sectionNumber: 16,
    title: 'Simple Sentences & Conversational Phrases',
    titleKn: 'ದೈನಂದಿನ ಸರಳ ವಾಕ್ಯಗಳು ಮತ್ತು ಸನ್ನಿವೇಶ ಸಂಭಾಷಣೆ',
    summary: 'Self-introductions, courtesy formulas (ದಯವಿಟ್ಟು, ಧನ್ಯವಾದಗಳು), and situational dialogues for shops and travel.',
    category: 'Conversation',
    topics: [
      {
        id: 'f-sec-16-t1',
        topicNumber: 1,
        title: 'Golden Courtesy Phrases & Questions',
        titleKn: 'ಶುಭೋದಯ, ಧನ್ಯವಾದಗಳು, ದಯವಿಟ್ಟು, ಕ್ಷಮಿಸಿ',
        description: 'Polite formulas for smooth social interactions.',
        details: '- ಶುಭೋದಯ (Good morning)\n- ಶುಭ ಸಂಜೆ (Good evening)\n- ನಮಸ್ಕಾರ (Greetings)\n- ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ (Please help me)\n- ತುಂಬಾ ಧನ್ಯವಾದಗಳು (Thank you very much)\n- ಕ್ಷಮಿಸಿ / ತಪ್ಪಾಯಿತು (Pardon me / Excuse me)\n- ಪರವಾಗಿಲ್ಲ (It does not matter / That\'s alright)\n- ಹೋಗಿ ಬರುತ್ತೇನೆ (Goodbye / See you again).',
        items: [
          { phrase: 'ಶುಭೋದಯ!', tr: 'Shubhodaya!', en: 'Good morning!' },
          { phrase: 'ದಯವಿಟ್ಟು ಬನ್ನಿ.', tr: 'Dayavittu banni.', en: 'Please come.' },
          { phrase: 'ಧನ್ಯವಾದಗಳು.', tr: 'DhanyavaadagaLu.', en: 'Thank you.' },
          { phrase: 'ಕ್ಷಮಿಸಿ.', tr: 'Kshamisi.', en: 'Excuse me / Sorry.' }
        ]
      },
      {
        id: 'f-sec-16-t2',
        topicNumber: 2,
        title: 'Basic First-Meeting Dialogue',
        titleKn: 'ಪರಿಚಯ ಸಂಭಾಷಣೆ (ನನ್ನ ಹೆಸರು..., ನಿಮ್ಮ ಹೆಸರು ಏನು?)',
        description: 'Meeting someone for the first time.',
        details: 'A: ನಮಸ್ಕಾರ! (Hello!)\nB: ನಮಸ್ಕಾರ! ಬನ್ನಿ, ಕುಳಿತುಕೊಳ್ಳಿ. (Hello! Please come, sit down.)\nA: ನಿಮ್ಮ ಹೆಸರೇನು? (What is your name?)\nB: ನನ್ನ ಹೆಸರು ರಮೇಶ್. ನಿಮ್ಮ ಹೆಸರು? (My name is Ramesh. And yours?)\nA: ನನ್ನ ಹೆಸರು ಆನಂದ್. ನೀವು ಹೇಗಿದ್ದೀರಿ? (My name is Anand. How are you?)\nB: ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು. (I am fine, thank you.)',
        items: [
          { speaker: 'A', kn: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಹೆಸರೇನು?', en: 'Hello! What is your name?' },
          { speaker: 'B', kn: 'ನನ್ನ ಹೆಸರು ರಮೇಶ್. ನೀವು ಹೇಗಿದ್ದೀರಿ?', en: 'My name is Ramesh. How are you?' },
          { speaker: 'A', kn: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು.', en: 'I am doing well, thank you.' }
        ]
      },
      {
        id: 'f-sec-16-t3',
        topicNumber: 3,
        title: 'At the Market / Shop (ಅಂಗಡಿಯಲ್ಲಿ)',
        titleKn: 'ಅಂಗಡಿಯಲ್ಲಿ ಖರೀದಿ ಸಂಭಾಷಣೆ',
        description: 'Asking prices, requesting quantities, and bargaining.',
        details: 'ಗ್ರಾಹಕ: ನಮಸ್ಕಾರ, ಈ ಮಾವಿನ ಹಣ್ಣಿನ ಬೆಲೆ ಎಷ್ಟು?\nವ್ಯಾಪಾರಿ: ಒಂದು ಕೆಜಿಗೆ ನೂರು ರೂಪಾಯಿ.\nಗ್ರಾಹಕ: ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ, ತೊಂಬತ್ತು ರೂಪಾಯಿಗೆ ಕೊಡಿ.\nವ್ಯಾಪಾರಿ: ಆಯ್ತು, ಎರಡು ಕೆಜಿ ಕೊಡಲಾ?\nಗ್ರಾಹಕ: ಹೌದು, ಎರಡು ಕೆಜಿ ಕೊಡಿ. ಇದು ಇನ್ನೂರು ರೂಪಾಯಿ.',
        items: [
          { role: 'ಗ್ರಾಹಕ', kn: 'ಈ ಸೇಬಿನ ಬೆಲೆ ಎಷ್ಟು?', en: 'What is the price of this apple?' },
          { role: 'ವ್ಯಾಪಾರಿ', kn: 'ಒಂದು ಕೆಜಿಗೆ ನೂರ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ.', en: 'Rs. 120 per kilogram.' },
          { role: 'ಗ್ರಾಹಕ', kn: 'ದಯವಿಟ್ಟು ಒಂದು ಕೆಜಿ ಕೊಡಿ.', en: 'Please give one kilogram.' }
        ]
      }
    ]
  },

  // SECTION 17: ಓದುವಿಕೆ ಮತ್ತು ಬರವಣಿಗೆ — Reading & Writing
  {
    id: 'f-sec-17',
    sectionNumber: 17,
    title: 'Reading and Writing Practice',
    titleKn: 'ಓದುವಿಕೆ, ಬರವಣಿಗೆ ಮತ್ತು ಅರ್ಥಗ್ರಹಣ',
    summary: 'Graded reading passages, short moral stories, dictation exercises, and reading comprehension quizzes.',
    category: 'Comprehension',
    topics: [
      {
        id: 'f-sec-17-t1',
        topicNumber: 1,
        title: 'Story 1: The Thirsty Crow (ಬುದ್ಧಿವಂತ ಕಾಗೆ)',
        titleKn: 'ಸಣ್ಣ ಕಥೆ ೧: ಬುದ್ಧಿವಂತ ಕಾಗೆ',
        description: 'Classic fable in natural, graded Kannada prose.',
        details: 'ಒಂದು ಕಾಗೆ ಇತ್ತು. ಒಂದು ದಿನ ಅದಕ್ಕೆ ತುಂಬಾ ಬಾಯಾರಿಕೆ ಆಯಿತು. ಅದು ನೀರಿನ ಹುಡುಕಾಟದಲ್ಲಿ ಅತ್ತಿತ್ತ ಹಾರಾಡಿತು. ಕೊನೆಗೆ ಅದಕ್ಕೆ ಒಂದು ಮಣ್ಣಿನ ಕೊಡ ಕಂಡಿತು. ಆದರೆ ಕೊಡದಲ್ಲಿ ನೀರು ತುಂಬಾ ಕೆಳಗೆ ಇತ್ತು. ಕಾಗೆಯ ಕೊಕ್ಕಿಗೆ ನೀರು ಸಿಗಲಿಲ್ಲ. ಕಾಗೆ ಒಂದು ಉಪಾಯ ಮಾಡಿತು. ಹತ್ತಿರದಲ್ಲಿದ್ದ ಸಣ್ಣ ಸಣ್ಣ ಕಲ್ಲುಗಳನ್ನು ಒಂದೊಂದಾಗಿ ಕೊಕ್ಕಿನಲ್ಲಿ ಎತ್ತಿ ಕೊಡದೊಳಗೆ ಹಾಕಿತು. ನೀರು ನಿಧಾನವಾಗಿ ಮೇಲೆ ಬಂದಿತು. ಕಾಗೆ ತೃಪ್ತಿಯಾಗಿ ನೀರು ಕುಡಿದು ಸಂತೋಷದಿಂದ ಹಾರಿಹೋಯಿತು.',
        items: [
          { para: 'ಒಂದು ಕಾಗೆಗೆ ತುಂಬಾ ಬಾಯಾರಿಕೆ ಆಯಿತು.', tr: 'Ondu kaagege tumba baayaarike aaytu.', en: 'A crow became very thirsty.' },
          { para: 'ಅದು ಸಣ್ಣ ಕಲ್ಲುಗಳನ್ನು ಕೊಡದೊಳಗೆ ಹಾಕಿತು.', tr: 'Adu sanna kallugaLannu koDadoLage haakitu.', en: 'It dropped pebbles into the pot.' },
          { para: 'ನೀರು ಮೇಲೆ ಬಂದಿತು; ಕಾಗೆ ನೀರು ಕುಡಿಯಿತು.', tr: 'Niiru meele banditu; kaage niiru kuDiyitu.', en: 'The water rose; the crow drank the water.' }
        ],
        exercises: [
          {
            id: 'ex-f17-1',
            type: 'multiple-choice',
            prompt: 'ಕಾಗೆಗೆ ಏನಾಯಿತು? (What happened to the crow?)',
            options: ['ಬಾಯಾರಿಕೆ ಆಯಿತು (Became thirsty)', 'ಹಸಿವಾಯಿತು (Became hungry)', 'ನಿದ್ರೆ ಬಂದಿತು (Felt sleepy)', 'ಜ್ವರ ಬಂದಿತು (Had fever)'],
            answer: 'ಬಾಯಾರಿಕೆ ಆಯಿತು (Became thirsty)',
            explanation: 'The story states: ಕಾಗೆಗೆ ತುಂಬಾ ಬಾಯಾರಿಕೆ ಆಯಿತು.'
          },
          {
            id: 'ex-f17-2',
            type: 'multiple-choice',
            prompt: 'ಕಾಗೆ ಕೊಡದೊಳಗೆ ಏನನ್ನು ಹಾಕಿತು?',
            options: ['ಕಲ್ಲುಗಳನ್ನು (Pebbles)', 'ಎಲೆಗಳನ್ನು (Leaves)', 'ಹಣ್ಣುಗಳನ್ನು (Fruits)', 'ಮಣ್ಣನ್ನು (Mud)'],
            answer: 'ಕಲ್ಲುಗಳನ್ನು (Pebbles)',
            explanation: 'The crow dropped small stones (ಕಲ್ಲುಗಳನ್ನು) to raise the water level.'
          }
        ]
      },
      {
        id: 'f-sec-17-t2',
        topicNumber: 2,
        title: 'Story 2: Our Beautiful Karnataka (ನಮ್ಮ ಸುಂದರ ಕರ್ನಾಟಕ)',
        titleKn: 'ಗದ್ಯಭಾಗ ೨: ನಮ್ಮ ಸುಂದರ ಕರ್ನಾಟಕ',
        description: 'Short descriptive cultural passage about Karnataka state.',
        details: 'ಕರ್ನಾಟಕವು ನಮ್ಮ ಹೆಮ್ಮೆಯ ರಾಜ್ಯ. ಬೆಂಗಳೂರು ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ. ಕಾವೇರಿ, ಕೃಷ್ಣಾ, ತುಂಗಭದ್ರಾ ನಮ್ಮ ಪುಣ್ಯ ನದಿಗಳು. ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಬೇಲೂರಿನ ಶಿಲಾಬಾಲಿಕೆಯರು ಜಗತ್ಪ್ರಸಿದ್ಧ. ಕನ್ನಡವು ಎರಡು ಸಾವಿರ ವರ್ಷಗಳ ಪ್ರಾಚೀನ ಇತಿಹಾಸವುಳ್ಳ ಸುಂದರ ಭಾಷೆ. "ಕನ್ನಡ ಎನೆ ಕುಣಿದಾಡುವುದೆನ್ನೆದೆ, ಕನ್ನಡ ಎನೆ ಕಿವಿ ನಿಮಿರುವುದು!"',
        items: [
          { fact: 'ರಾಜಧಾನಿ (Capital)', text: 'ಬೆಂಗಳೂರು' },
          { fact: 'ಪ್ರಮುಖ ನದಿ (Major river)', text: 'ಕಾವೇರಿ' },
          { fact: 'ಐತಿಹಾಸಿಕ ಸ್ಥಳ (Heritage site)', text: 'ಹಂಪಿ (ವಿಜಯನಗರ)' }
        ]
      }
    ]
  },

  // SECTION 18: ಕಲಿಕಾ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಮೌಲ್ಯಮಾಪನ
  {
    id: 'f-sec-18',
    sectionNumber: 18,
    title: 'Learning Activities & Assessment Arena',
    titleKn: 'ಕಲಿಕಾ ಚಟುವಟಿಕೆಗಳು, ರಸಪ್ರಶ್ನೆ ಮತ್ತು ಮೌಲ್ಯಮಾಪನ',
    summary: 'Interactive quizzes, flashcards, word-unscramble, spelling checks, memory retention, and instant score evaluation.',
    category: 'Assessment',
    topics: [
      {
        id: 'f-sec-18-t1',
        topicNumber: 1,
        title: 'Foundations Comprehensive Mastery Quiz',
        titleKn: 'ಕನ್ನಡ ಮೂಲಭೂತ ಸಮಗ್ರ ಪರೀಕ್ಷೆ (Quiz)',
        description: 'Multi-topic assessment evaluating alphabet, Kagunita, numbers, and vocabulary.',
        details: 'Test your understanding across all foundational sections with instant score computation and answer rationales.',
        items: [],
        exercises: [
          {
            id: 'ex-f18-1',
            type: 'multiple-choice',
            prompt: 'ಕನ್ನಡ ವರ್ಣಮಾಲೆಯಲ್ಲಿ ಒಟ್ಟು ಎಷ್ಟು ಸ್ವರಗಳಿವೆ?',
            options: ['೧೩ (13)', '೧೪ (14)', '೩೪ (34)', '೨೫ (25)'],
            answer: '೧೩ (13)',
            explanation: 'Standard modern Kannada alphabet recognizes 13 Swaras (ಅ to ಔ).'
          },
          {
            id: 'ex-f18-2',
            type: 'multiple-choice',
            prompt: '"ಕ" ವ್ಯಂಜನಕ್ಕೆ "ಓ" ಸ್ವರ ಸೇರಿದಾಗ ಯಾವ ಅಕ್ಷರವಾಗುತ್ತದೆ?',
            options: ['ಕೋ', 'ಕೆ', 'ಕೌ', 'ಕೊ'],
            answer: 'ಕೋ',
            explanation: 'ಕ + ಓ = ಕೋ (ಓ-ತ್ವ ದೀರ್ಘ).'
          },
          {
            id: 'ex-f18-3',
            type: 'multiple-choice',
            prompt: 'ಕನ್ನಡ ಅಂಕಿ "೫೦" ರ ಹೆಸರೇನು?',
            options: ['ಐವತ್ತು', 'ನಲವತ್ತು', 'ಅರವತ್ತು', 'ಇಪ್ಪತ್ತು'],
            answer: 'ಐವತ್ತು',
            explanation: '೫೦ is "ಐವತ್ತು" (Fifty) in Kannada.'
          },
          {
            id: 'ex-f18-4',
            type: 'multiple-choice',
            prompt: '"ಅಕ್ಕ" ಪದದಲ್ಲಿರುವ ಒತ್ತಕ್ಷರ ಯಾವುದು?',
            options: ['ಕ್ಕ', 'ಣ್ಣ', 'ಪ್ಪ', 'ಮ್ಮ'],
            answer: 'ಕ್ಕ',
            explanation: 'ಅಕ್ಕ contains the geminate (ಸಜಾತೀಯ) conjunct "ಕ್ಕ".'
          },
          {
            id: 'ex-f18-5',
            type: 'multiple-choice',
            prompt: 'ಇವುಗಳಲ್ಲಿ ಯಾವುದು ತರಕಾರಿ?',
            options: ['ಬದನೆಕಾಯಿ', 'ಸೇಬು', 'ಹಾಲು', 'ಮಾವಿನ ಹಣ್ಣು'],
            answer: 'ಬದನೆಕಾಯಿ',
            explanation: 'ಬದನೆಕಾಯಿ (Brinjal) is a vegetable; others are fruits and milk.'
          }
        ]
      },
      {
        id: 'f-sec-18-t2',
        topicNumber: 2,
        title: 'Word Unscramble & Spelling Puzzle',
        titleKn: 'ಅಕ್ಷರ ಜೋಡಿಸಿ ಪದ ರಚಿಸಿ (Word Builder)',
        description: 'Reassemble scrambled syllables into authentic Kannada words.',
        details: 'Challenge your orthographic memory by putting jumbled letters in correct order.',
        items: [
          { scrambled: ['ಲ', 'ಮ', 'ಕ'], target: 'ಕಮಲ', hint: 'National flower (Lotus)' },
          { scrambled: ['ನೆ', 'ಆ'], target: 'ಆನೆ', hint: 'Largest land animal (Elephant)' },
          { scrambled: ['ರೆ', 'ದು', 'ಕು'], target: 'ಕುದುರೆ', hint: 'Fast animal (Horse)' },
          { scrambled: ['ಕ', 'ಸ್ತ', 'ಪು'], target: 'ಪುಸ್ತಕ', hint: 'Reading item (Book)' }
        ]
      }
    ]
  }
];
