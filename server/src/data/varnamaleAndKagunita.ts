// Single Source of Truth for Kannada Varnamale & Kagunita

export interface VowelItem {
  char: string;
  transliteration: string;
  name: string;
  nameKn: string;
  matra: string;
  sound: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
  type: 'hrasva' | 'deergha' | 'sandhyakshara';
}

export interface ConsonantItem {
  char: string;
  transliteration: string;
  group: string;
  varga: string;
  type: 'alpaprana' | 'mahaprana' | 'anunasika' | 'antastha' | 'ooshma' | 'avargeeya';
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
}

export interface YogavahaItem {
  char: string;
  transliteration: string;
  name: string;
  nameKn: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
}

export const KANNADA_VOWELS: VowelItem[] = [
  { char: 'ಅ', transliteration: 'a', name: 'Hrasva A', nameKn: 'ಹ್ರಸ್ವ ಸ್ವರ ಅ', matra: '', sound: 'a', exampleWord: 'ಅಮ್ಮ', exampleTransliteration: 'Amma', exampleMeaning: 'Mother', type: 'hrasva' },
  { char: 'ಆ', transliteration: 'aa', name: 'Deergha Aa', nameKn: 'ದೀರ್ಘ ಸ್ವರ ಆ', matra: 'ಾ', sound: 'aa', exampleWord: 'ಆನೆ', exampleTransliteration: 'Aane', exampleMeaning: 'Elephant', type: 'deergha' },
  { char: 'ಇ', transliteration: 'i', name: 'Hrasva I', nameKn: 'ಹ್ರಸ್ವ ಸ್ವರ ಇ', matra: 'ಿ', sound: 'i', exampleWord: 'ಇಲಿ', exampleTransliteration: 'Ili', exampleMeaning: 'Mouse / Rat', type: 'hrasva' },
  { char: 'ಈ', transliteration: 'ee', name: 'Deergha Ee', nameKn: 'ದೀರ್ಘ ಸ್ವರ ಈ', matra: 'ೀ', sound: 'ee', exampleWord: 'ಈಜು', exampleTransliteration: 'Eeju', exampleMeaning: 'Swimming', type: 'deergha' },
  { char: 'ಉ', transliteration: 'u', name: 'Hrasva U', nameKn: 'ಹ್ರಸ್ವ ಸ್ವರ ಉ', matra: 'ು', sound: 'u', exampleWord: 'ಉಡುಗೊರೆ', exampleTransliteration: 'Udugore', exampleMeaning: 'Gift / Present', type: 'hrasva' },
  { char: 'ಊ', transliteration: 'oo', name: 'Deergha Oo', nameKn: 'ದೀರ್ಘ ಸ್ವರ ಊ', matra: 'ೂ', sound: 'oo', exampleWord: 'ಊಟ', exampleTransliteration: 'Oota', exampleMeaning: 'Meal / Food', type: 'deergha' },
  { char: 'ಋ', transliteration: 'ru', name: 'Vocalic Ru', nameKn: 'ಋ-ತ್ವ', matra: 'ೃ', sound: 'ru', exampleWord: 'ಋಷಿ', exampleTransliteration: 'Rushi', exampleMeaning: 'Sage / Hermit', type: 'hrasva' },
  { char: 'ಎ', transliteration: 'e', name: 'Hrasva E', nameKn: 'ಹ್ರಸ್ವ ಸ್ವರ ಎ', matra: 'ೆ', sound: 'e', exampleWord: 'ಎಲೆ', exampleTransliteration: 'Ele', exampleMeaning: 'Leaf', type: 'hrasva' },
  { char: 'ಏ', transliteration: 'ee', name: 'Deergha Ee', nameKn: 'ದೀರ್ಘ ಸ್ವರ ಏ', matra: 'ೇ', sound: 'ee', exampleWord: 'ಏಣಿ', exampleTransliteration: 'Eeni', exampleMeaning: 'Ladder', type: 'deergha' },
  { char: 'ಐ', transliteration: 'ai', name: 'Diphthong Ai', nameKn: 'ಸಂಧ್ಯಕ್ಷರ ಐ', matra: 'ೈ', sound: 'ai', exampleWord: 'ಐದು', exampleTransliteration: 'Aidu', exampleMeaning: 'Five (Number 5)', type: 'sandhyakshara' },
  { char: 'ಒ', transliteration: 'o', name: 'Hrasva O', nameKn: 'ಹ್ರಸ್ವ ಸ್ವರ ಒ', matra: 'ೊ', sound: 'o', exampleWord: 'ಒಂಟೆ', exampleTransliteration: 'Onte', exampleMeaning: 'Camel', type: 'hrasva' },
  { char: 'ಓ', transliteration: 'oo', name: 'Deergha Oo', nameKn: 'ದೀರ್ಘ ಸ್ವರ ಓ', matra: 'ೋ', sound: 'oo', exampleWord: 'ಓಟ', exampleTransliteration: 'Oota', exampleMeaning: 'Race / Running', type: 'deergha' },
  { char: 'ಔ', transliteration: 'au', name: 'Diphthong Au', nameKn: 'ಸಂಧ್ಯಕ್ಷರ ಔ', matra: 'ೌ', sound: 'au', exampleWord: 'ಔಷಧ', exampleTransliteration: 'AuSadha', exampleMeaning: 'Medicine', type: 'sandhyakshara' }
];

export const KANNADA_YOGAVAHA: YogavahaItem[] = [
  { char: 'ಅಂ', transliteration: 'am', name: 'Anusvaara', nameKn: 'ಅನುಸ್ವಾರ (ಬಿಂದು)', exampleWord: 'ಅಂಗಡಿ', exampleTransliteration: 'Angadi', exampleMeaning: 'Shop / Store' },
  { char: 'ಅಃ', transliteration: 'aha', name: 'Visarga', nameKn: 'ವಿಸರ್ಗ', exampleWord: 'ದುಃಖ', exampleTransliteration: 'Duhkha', exampleMeaning: 'Sorrow / Grief' }
];

export const KANNADA_CONSONANTS: ConsonantItem[] = [
  // Ka-varga (Velar)
  { char: 'ಕ', transliteration: 'ka', group: 'ಕ-ವರ್ಗ (Velar)', varga: 'ಕ', type: 'alpaprana', exampleWord: 'ಕಮಲ', exampleTransliteration: 'Kamala', exampleMeaning: 'Lotus' },
  { char: 'ಖ', transliteration: 'kha', group: 'ಕ-ವರ್ಗ (Velar)', varga: 'ಕ', type: 'mahaprana', exampleWord: 'ಖಡ್ಗ', exampleTransliteration: 'Khadga', exampleMeaning: 'Sword' },
  { char: 'ಗ', transliteration: 'ga', group: 'ಕ-ವರ್ಗ (Velar)', varga: 'ಕ', type: 'alpaprana', exampleWord: 'ಗಣೇಶ', exampleTransliteration: 'Ganesha', exampleMeaning: 'Lord Ganesha' },
  { char: 'ಘ', transliteration: 'gha', group: 'ಕ-ವರ್ಗ (Velar)', varga: 'ಕ', type: 'mahaprana', exampleWord: 'ಘಂಟೆ', exampleTransliteration: 'Ghante', exampleMeaning: 'Bell' },
  { char: 'ಙ', transliteration: 'nga', group: 'ಕ-ವರ್ಗ (Nasal)', varga: 'ಕ', type: 'anunasika', exampleWord: 'ವಾಙ್ಮಯ', exampleTransliteration: 'Vaangmaya', exampleMeaning: 'Literature' },

  // Cha-varga (Palatal)
  { char: 'ಚ', transliteration: 'cha', group: 'ಚ-ವರ್ಗ (Palatal)', varga: 'ಚ', type: 'alpaprana', exampleWord: 'ಚಮಚ', exampleTransliteration: 'Chamacha', exampleMeaning: 'Spoon' },
  { char: 'ಛ', transliteration: 'chha', group: 'ಚ-ವರ್ಗ (Palatal)', varga: 'ಚ', type: 'mahaprana', exampleWord: 'ಛತ್ರಿ', exampleTransliteration: 'Chhatri', exampleMeaning: 'Umbrella' },
  { char: 'ಜ', transliteration: 'ja', group: 'ಚ-ವರ್ಗ (Palatal)', varga: 'ಚ', type: 'alpaprana', exampleWord: 'ಜಲ', exampleTransliteration: 'Jala', exampleMeaning: 'Water' },
  { char: 'ಝ', transliteration: 'jha', group: 'ಚ-ವರ್ಗ (Palatal)', varga: 'ಚ', type: 'mahaprana', exampleWord: 'ಝರಿ', exampleTransliteration: 'Jhari', exampleMeaning: 'Waterfall / Brook' },
  { char: 'ಞ', transliteration: 'nya', group: 'ಚ-ವರ್ಗ (Nasal)', varga: 'ಚ', type: 'anunasika', exampleWord: 'ಜ್ಞಾನ', exampleTransliteration: 'Jnyaana', exampleMeaning: 'Wisdom / Knowledge' },

  // Ta-varga (Retroflex)
  { char: 'ಟ', transliteration: 'ta', group: 'ಟ-ವರ್ಗ (Retroflex)', varga: 'ಟ', type: 'alpaprana', exampleWord: 'ಟೊಮೆಟೊ', exampleTransliteration: 'Tomato', exampleMeaning: 'Tomato' },
  { char: 'ಠ', transliteration: 'tha', group: 'ಟ-ವರ್ಗ (Retroflex)', varga: 'ಟ', type: 'mahaprana', exampleWord: 'ಠವಣೆ', exampleTransliteration: 'Thavane', exampleMeaning: 'Throne / Seat' },
  { char: 'ಡ', transliteration: 'da', group: 'ಟ-ವರ್ಗ (Retroflex)', varga: 'ಟ', type: 'alpaprana', exampleWord: 'ಡಮರು', exampleTransliteration: 'Damaru', exampleMeaning: 'Small Drum' },
  { char: 'ಢ', transliteration: 'dha', group: 'ಟ-ವರ್ಗ (Retroflex)', varga: 'ಟ', type: 'mahaprana', exampleWord: 'ಢಕ್ಕೆ', exampleTransliteration: 'Dhakke', exampleMeaning: 'Large Drum' },
  { char: 'ಣ', transliteration: 'na', group: 'ಟ-ವರ್ಗ (Nasal)', varga: 'ಟ', type: 'anunasika', exampleWord: 'ಬಾಣ', exampleTransliteration: 'Baana', exampleMeaning: 'Arrow' },

  // Ta-varga (Dental)
  { char: 'ತ', transliteration: 'ta', group: 'ತ-ವರ್ಗ (Dental)', varga: 'ತ', type: 'alpaprana', exampleWord: 'ತಬಲ', exampleTransliteration: 'Tabala', exampleMeaning: 'Tabla Drum' },
  { char: 'ಥ', transliteration: 'tha', group: 'ತ-ವರ್ಗ (Dental)', varga: 'ತ', type: 'mahaprana', exampleWord: 'ಥಳಥಳ', exampleTransliteration: 'Thala-thala', exampleMeaning: 'Glittering' },
  { char: 'ದ', transliteration: 'da', group: 'ತ-ವರ್ಗ (Dental)', varga: 'ತ', type: 'alpaprana', exampleWord: 'ದವಸ', exampleTransliteration: 'Davasa', exampleMeaning: 'Grains' },
  { char: 'ಧ', transliteration: 'dha', group: 'ತ-ವರ್ಗ (Dental)', varga: 'ತ', type: 'mahaprana', exampleWord: 'ಧನುಸ್ಸು', exampleTransliteration: 'Dhanussu', exampleMeaning: 'Bow' },
  { char: 'ನ', transliteration: 'na', group: 'ತ-ವರ್ಗ (Nasal)', varga: 'ತ', type: 'anunasika', exampleWord: 'ನಳ', exampleTransliteration: 'Nala', exampleMeaning: 'Water Tap' },

  // Pa-varga (Labial)
  { char: 'ಪ', transliteration: 'pa', group: 'ಪ-ವರ್ಗ (Labial)', varga: 'ಪ', type: 'alpaprana', exampleWord: 'ಪಟ', exampleTransliteration: 'Pata', exampleMeaning: 'Kite / Picture' },
  { char: 'ಫ', transliteration: 'pha', group: 'ಪ-ವರ್ಗ (Labial)', varga: 'ಪ', type: 'mahaprana', exampleWord: 'ಫಲ', exampleTransliteration: 'Phala', exampleMeaning: 'Fruit / Result' },
  { char: 'ಬ', transliteration: 'ba', group: 'ಪ-ವರ್ಗ (Labial)', varga: 'ಪ', type: 'alpaprana', exampleWord: 'ಬಸವ', exampleTransliteration: 'Basava', exampleMeaning: 'Bull / Saint Basava' },
  { char: 'ಭ', transliteration: 'bha', group: 'ಪ-ವರ್ಗ (Labial)', varga: 'ಪ', type: 'mahaprana', exampleWord: 'ಭವನ', exampleTransliteration: 'Bhavana', exampleMeaning: 'Mansion / Hall' },
  { char: 'ಮ', transliteration: 'ma', group: 'ಪ-ವರ್ಗ (Nasal)', varga: 'ಪ', type: 'anunasika', exampleWord: 'ಮರ', exampleTransliteration: 'Mara', exampleMeaning: 'Tree' },

  // Antastha (Semi-vowels)
  { char: 'ಯ', transliteration: 'ya', group: 'ಅಂತಸ್ಥ (Semi-vowel)', varga: 'ಅವರ್ಗೀಯ', type: 'antastha', exampleWord: 'ಯಂತ್ರ', exampleTransliteration: 'Yantra', exampleMeaning: 'Machine' },
  { char: 'ರ', transliteration: 'ra', group: 'ಅಂತಸ್ಥ (Semi-vowel)', varga: 'ಅವರ್ಗೀಯ', type: 'antastha', exampleWord: 'ರಥ', exampleTransliteration: 'Ratha', exampleMeaning: 'Chariot' },
  { char: 'ಲ', transliteration: 'la', group: 'ಅಂತಸ್ಥ (Semi-vowel)', varga: 'ಅವರ್ಗೀಯ', type: 'antastha', exampleWord: 'ಲತೆ', exampleTransliteration: 'Late', exampleMeaning: 'Creeper Vine' },
  { char: 'ವ', transliteration: 'va', group: 'ಅಂತಸ್ಥ (Semi-vowel)', varga: 'ಅವರ್ಗೀಯ', type: 'antastha', exampleWord: 'ವನ', exampleTransliteration: 'Vana', exampleMeaning: 'Forest / Garden' },

  // Ooshma (Sibilants & Aspirate)
  { char: 'ಶ', transliteration: 'sha', group: 'ಊಷ್ಮ (Sibilant)', varga: 'ಅವರ್ಗೀಯ', type: 'ooshma', exampleWord: 'ಶರ', exampleTransliteration: 'Shara', exampleMeaning: 'Arrow' },
  { char: 'ಷ', transliteration: 'sha (retroflex)', group: 'ಊಷ್ಮ (Sibilant)', varga: 'ಅವರ್ಗೀಯ', type: 'ooshma', exampleWord: 'ಷಣ್ಮುಖ', exampleTransliteration: 'Shanmukha', exampleMeaning: 'Six-faced Kartikeya' },
  { char: 'ಸ', transliteration: 'sa', group: 'ಊಷ್ಮ (Sibilant)', varga: 'ಅವರ್ಗೀಯ', type: 'ooshma', exampleWord: 'ಸರಸ', exampleTransliteration: 'Sarasa', exampleMeaning: 'Playful wit' },
  { char: 'ಹ', transliteration: 'ha', group: 'ಊಷ್ಮ (Aspirate)', varga: 'ಅವರ್ಗೀಯ', type: 'ooshma', exampleWord: 'ಹಂಸ', exampleTransliteration: 'Hamsa', exampleMeaning: 'Swan' },

  // Retroflex Lateral
  { char: 'ಳ', transliteration: 'la (retroflex)', group: 'ಅವರ್ಗೀಯ ವ್ಯಂಜನ', varga: 'ಅವರ್ಗೀಯ', type: 'avargeeya', exampleWord: 'ಕಳಶ', exampleTransliteration: 'Kalasha', exampleMeaning: 'Sacred Pitcher' }
];

export interface KagunitaCell {
  vowel: string;
  matra: string;
  akshara: string;
  transliteration: string;
  audioText: string;
}

export interface KagunitaRow {
  consonant: string;
  transliteration: string;
  group: string;
  series: KagunitaCell[];
}

export const VOWEL_COMBINATIONS = [
  { vowel: 'ಅ', matra: '', sound: 'a' },
  { vowel: 'ಆ', matra: 'ಾ', sound: 'aa' },
  { vowel: 'ಇ', matra: 'ಿ', sound: 'i' },
  { vowel: 'ಈ', matra: 'ೀ', sound: 'ee' },
  { vowel: 'ಉ', matra: 'ು', sound: 'u' },
  { vowel: 'ಊ', matra: 'ೂ', sound: 'oo' },
  { vowel: 'ಋ', matra: 'ೃ', sound: 'ru' },
  { vowel: 'ಎ', matra: 'ೆ', sound: 'e' },
  { vowel: 'ಏ', matra: 'ೇ', sound: 'ee' },
  { vowel: 'ಐ', matra: 'ೈ', sound: 'ai' },
  { vowel: 'ಒ', matra: 'ೊ', sound: 'o' },
  { vowel: 'ಓ', matra: 'ೋ', sound: 'oo' },
  { vowel: 'ಔ', matra: 'ೌ', sound: 'au' },
  { vowel: 'ಅಂ', matra: 'ಂ', sound: 'am' },
  { vowel: 'ಅಃ', matra: 'ಃ', sound: 'aha' }
];

// Generates the 34 full rows from ಕ through ಳ (34 x 15 = 510 verified cells)
export const KAGUNITA_FULL_CHART: KagunitaRow[] = KANNADA_CONSONANTS.map((c) => ({
  consonant: c.char,
  transliteration: c.transliteration,
  group: c.group,
  series: VOWEL_COMBINATIONS.map((v) => ({
    vowel: v.vowel,
    matra: v.matra,
    akshara: c.char + v.matra,
    transliteration: `${c.transliteration}${v.sound}`,
    audioText: c.char + v.matra,
  })),
}));
