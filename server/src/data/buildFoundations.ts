import fs from 'fs';
import path from 'path';

// This script builds server/src/data/foundationsData.ts with all 18 Maggi Pustaka-style sections

const CONSONANTS = [
  { char: 'ಕ', tr: 'ka', group: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಖ', tr: 'kha', group: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಗ', tr: 'ga', group: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಘ', tr: 'gha', group: 'ಕ-ವರ್ಗ (Velar)' },
  { char: 'ಙ', tr: 'nga', group: 'ಕ-ವರ್ಗ (Nasal)' },
  { char: 'ಚ', tr: 'cha', group: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಛ', tr: 'chha', group: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಜ', tr: 'ja', group: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಝ', tr: 'jha', group: 'ಚ-ವರ್ಗ (Palatal)' },
  { char: 'ಞ', tr: 'nya', group: 'ಚ-ವರ್ಗ (Nasal)' },
  { char: 'ಟ', tr: 'ta', group: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಠ', tr: 'tha', group: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಡ', tr: 'da', group: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಢ', tr: 'dha', group: 'ಟ-ವರ್ಗ (Retroflex)' },
  { char: 'ಣ', tr: 'na', group: 'ಟ-ವರ್ಗ (Nasal)' },
  { char: 'ತ', tr: 'ta (dental)', group: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ಥ', tr: 'tha (dental)', group: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ದ', tr: 'da (dental)', group: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ಧ', tr: 'dha (dental)', group: 'ತ-ವರ್ಗ (Dental)' },
  { char: 'ನ', tr: 'na', group: 'ತ-ವರ್ಗ (Nasal)' },
  { char: 'ಪ', tr: 'pa', group: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಫ', tr: 'pha', group: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಬ', tr: 'ba', group: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಭ', tr: 'bha', group: 'ಪ-ವರ್ಗ (Labial)' },
  { char: 'ಮ', tr: 'ma', group: 'ಪ-ವರ್ಗ (Nasal)' },
  { char: 'ಯ', tr: 'ya', group: 'ಅಂತಸ್ಥ (Semi-vowel)' },
  { char: 'ರ', tr: 'ra', group: 'ಅಂತಸ್ಥ (Semi-vowel)' },
  { char: 'ಲ', tr: 'la', group: 'ಅಂತಸ್ಥ (Semi-vowel)' },
  { char: 'ವ', tr: 'va', group: 'ಅಂತಸ್ಥ (Semi-vowel)' },
  { char: 'ಶ', tr: 'sha', group: 'ಊಷ್ಮ (Sibilant)' },
  { char: 'ಷ', tr: 'sha (retroflex)', group: 'ಊಷ್ಮ (Sibilant)' },
  { char: 'ಸ', tr: 'sa', group: 'ಊಷ್ಮ (Sibilant)' },
  { char: 'ಹ', tr: 'ha', group: 'ಊಷ್ಮ (Aspirate)' },
  { char: 'ಳ', tr: 'la (retroflex)', group: 'ಅವರ್ಗೀಯ (Retroflex lateral)' }
];

const VOWEL_SERIES = [
  { vowel: 'ಅ', matra: '', name: 'hrasva a', sound: 'a' },
  { vowel: 'ಆ', matra: 'ಾ', name: 'deergha aa', sound: 'aa' },
  { vowel: 'ಇ', matra: 'ಿ', name: 'hrasva i', sound: 'i' },
  { vowel: 'ಈ', matra: 'ೀ', name: 'deergha ee', sound: 'ee' },
  { vowel: 'ಉ', matra: 'ು', name: 'hrasva u', sound: 'u' },
  { vowel: 'ಊ', matra: 'ೂ', name: 'deergha oo', sound: 'oo' },
  { vowel: 'ಋ', matra: 'ೃ', name: 'vocalic ru', sound: 'ru' },
  { vowel: 'ಎ', matra: 'ೆ', name: 'hrasva e', sound: 'e' },
  { vowel: 'ಏ', matra: 'ೇ', name: 'deergha ee', sound: 'ee' },
  { vowel: 'ಐ', matra: 'ೈ', name: 'diphthong ai', sound: 'ai' },
  { vowel: 'ಒ', matra: 'ೊ', name: 'hrasva o', sound: 'o' },
  { vowel: 'ಓ', matra: 'ೋ', name: 'deergha oo', sound: 'oo' },
  { vowel: 'ಔ', matra: 'ೌ', name: 'diphthong au', sound: 'au' },
  { vowel: 'ಅಂ', matra: 'ಂ', name: 'anusvaara am', sound: 'am' },
  { vowel: 'ಅಃ', matra: 'ಃ', name: 'visarga aha', sound: 'aha' }
];

console.log('Generating complete Kagunita for all', CONSONANTS.length, 'consonants...');
