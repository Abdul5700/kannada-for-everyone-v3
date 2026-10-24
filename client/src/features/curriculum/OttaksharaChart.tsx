import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AudioButton } from '../../components/ui/AudioButton';
import { getVisualIllustration } from './visualAssets';
import { Volume2, Sparkles, Layers, Grid } from 'lucide-react';

export interface OttaksharaItem {
  consonant: string;
  transliteration: string;
  name: string;
  recitationKn: string; // e.g. "ಕ ಗೆ ಕ-ಒತ್ತು"
  recitationEn: string; // e.g. "ka ge ka-vattu"
  varga: string;
  sajatiyaConjunct: string; // e.g. ಕ್ಕ
  sajatiyaExample: string;  // e.g. ಅಕ್ಕ
  sajatiyaMeaning: string;  // e.g. Elder sister
  sajatiyaTranslit: string; // e.g. Akka
  vijatiyaExample?: string; // e.g. ವಾಕ್ಯ
  vijatiyaConjunct?: string;// e.g. ಕ್ಯ
  vijatiyaMeaning?: string; // e.g. Sentence
  vijatiyaTranslit?: string;// e.g. Vaakya
  subscriptFormHint: string;// description of how ottu looks
}

export const ALL_OTTAKSHARA_DATA: OttaksharaItem[] = [
  // 1. ಕ-ವರ್ಗ (5)
  {
    consonant: 'ಕ',
    transliteration: 'ka',
    name: 'ಕ-ಒತ್ತು',
    recitationKn: 'ಕ ಗೆ ಕ-ಒತ್ತು',
    recitationEn: 'ka ge ka-vattu',
    varga: 'ಕ-ವರ್ಗ (Gutturals)',
    sajatiyaConjunct: 'ಕ್ಕ',
    sajatiyaExample: 'ಅಕ್ಕ',
    sajatiyaTranslit: 'Akka',
    sajatiyaMeaning: 'Elder sister',
    vijatiyaConjunct: 'ಕ್ಯ',
    vijatiyaExample: 'ವಾಕ್ಯ',
    vijatiyaTranslit: 'Vaakya',
    vijatiyaMeaning: 'Sentence',
    subscriptFormHint: 'ಕ ಕೆಳಗೆ ಸಣ್ಣ ಕ-ಒತ್ತು',
  },
  {
    consonant: 'ಖ',
    transliteration: 'kha',
    name: 'ಖ-ಒತ್ತು',
    recitationKn: 'ಖ ಗೆ ಖ-ಒತ್ತು',
    recitationEn: 'kha ge kha-vattu',
    varga: 'ಕ-ವರ್ಗ (Gutturals)',
    sajatiyaConjunct: 'ಖ್ಖ',
    sajatiyaExample: 'ಮುಖ್ಯ',
    sajatiyaTranslit: 'Mukhya',
    sajatiyaMeaning: 'Important / Chief',
    vijatiyaConjunct: 'ಖ್ಯ',
    vijatiyaExample: 'ಸಂಖ್ಯೆ',
    vijatiyaTranslit: 'Sankhye',
    vijatiyaMeaning: 'Number',
    subscriptFormHint: 'ಖ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಗ',
    transliteration: 'ga',
    name: 'ಗ-ಒತ್ತು',
    recitationKn: 'ಗ ಗೆ ಗ-ಒತ್ತು',
    recitationEn: 'ga ge ga-vattu',
    varga: 'ಕ-ವರ್ಗ (Gutturals)',
    sajatiyaConjunct: 'ಗ್ಗ',
    sajatiyaExample: 'ಹಗ್ಗ',
    sajatiyaTranslit: 'Hagga',
    sajatiyaMeaning: 'Rope',
    vijatiyaConjunct: 'ಗ್ವ',
    vijatiyaExample: 'ಭಗವಾನ್',
    vijatiyaTranslit: 'Bhagavan',
    vijatiyaMeaning: 'Lord / God',
    subscriptFormHint: 'ಗ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಘ',
    transliteration: 'gha',
    name: 'ಘ-ಒತ್ತು',
    recitationKn: 'ಘ ಗೆ ಘ-ಒತ್ತು',
    recitationEn: 'gha ge gha-vattu',
    varga: 'ಕ-ವರ್ಗ (Gutturals)',
    sajatiyaConjunct: 'ಘ್ಘ',
    sajatiyaExample: 'ಶೀಘ್ರ',
    sajatiyaTranslit: 'Sheeghra',
    sajatiyaMeaning: 'Fast / Soon',
    vijatiyaConjunct: 'ಘ್ನ',
    vijatiyaExample: 'ವಿಘ್ನ',
    vijatiyaTranslit: 'Vighna',
    vijatiyaMeaning: 'Obstacle',
    subscriptFormHint: 'ಘ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಙ',
    transliteration: 'nga',
    name: 'ಙ-ಒತ್ತು',
    recitationKn: 'ಙ ಗೆ ಙ-ಒತ್ತು',
    recitationEn: 'nga ge nga-vattu',
    varga: 'ಕ-ವರ್ಗ (Gutturals)',
    sajatiyaConjunct: 'ಙ್ಙ',
    sajatiyaExample: 'ವಾಙ್ಮಯ',
    sajatiyaTranslit: 'Vaangmaya',
    sajatiyaMeaning: 'Literature / Speech',
    vijatiyaConjunct: 'ಙ್ಕ',
    vijatiyaExample: 'ಅಙ್ಕ',
    vijatiyaTranslit: 'Anka',
    vijatiyaMeaning: 'Mark / Act',
    subscriptFormHint: 'ಙ ರೂಪದ ಒತ್ತು (ಅನುನಾಸಿಕ)',
  },

  // 2. ಚ-ವರ್ಗ (5)
  {
    consonant: 'ಚ',
    transliteration: 'cha',
    name: 'ಚ-ಒತ್ತು',
    recitationKn: 'ಚ ಗೆ ಚ-ಒತ್ತು',
    recitationEn: 'cha ge cha-vattu',
    varga: 'ಚ-ವರ್ಗ (Palatals)',
    sajatiyaConjunct: 'ಚ್ಚ',
    sajatiyaExample: 'ಹಚ್ಚು',
    sajatiyaTranslit: 'Hacchu',
    sajatiyaMeaning: 'Apply / Light a lamp',
    vijatiyaConjunct: 'ಶ್ಯ',
    vijatiyaExample: 'ಆಶ್ಚರ್ಯ',
    vijatiyaTranslit: 'Aashcharya',
    vijatiyaMeaning: 'Wonder / Surprise',
    subscriptFormHint: 'ಚ ಕೆಳಗೆ ಚ-ಒತ್ತು',
  },
  {
    consonant: 'ಛ',
    transliteration: 'chha',
    name: 'ಛ-ಒತ್ತು',
    recitationKn: 'ಛ ಗೆ ಛ-ಒತ್ತು',
    recitationEn: 'chha ge chha-vattu',
    varga: 'ಚ-ವರ್ಗ (Palatals)',
    sajatiyaConjunct: 'ಛ್ಛ',
    sajatiyaExample: 'ಅಚ್ಛ',
    sajatiyaTranslit: 'Accha',
    sajatiyaMeaning: 'Clear / Pure',
    vijatiyaConjunct: 'ಚ್ಛ',
    vijatiyaExample: 'ಇಚ್ಛೆ',
    vijatiyaTranslit: 'Ichhe',
    vijatiyaMeaning: 'Wish / Desire',
    subscriptFormHint: 'ಛ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಜ',
    transliteration: 'ja',
    name: 'ಜ-ಒತ್ತು',
    recitationKn: 'ಜ ಗೆ ಜ-ಒತ್ತು',
    recitationEn: 'ja ge ja-vattu',
    varga: 'ಚ-ವರ್ಗ (Palatals)',
    sajatiyaConjunct: 'ಜ್ಜ',
    sajatiyaExample: 'ಅಜ್ಜಿ',
    sajatiyaTranslit: 'Ajji',
    sajatiyaMeaning: 'Grandmother',
    vijatiyaConjunct: 'ಜ್ಯ',
    vijatiyaExample: 'ಜ್ಯೋತಿ',
    vijatiyaTranslit: 'Jyoti',
    vijatiyaMeaning: 'Flame / Light',
    subscriptFormHint: 'ಜ ಕೆಳಗೆ ಜ-ಒತ್ತು',
  },
  {
    consonant: 'ಝ',
    transliteration: 'jha',
    name: 'ಝ-ಒತ್ತು',
    recitationKn: 'ಝ ಗೆ ಝ-ಒತ್ತು',
    recitationEn: 'jha ge jha-vattu',
    varga: 'ಚ-ವರ್ಗ (Palatals)',
    sajatiyaConjunct: 'ಝ್ಝ',
    sajatiyaExample: 'ನಿರ್ಝರ',
    sajatiyaTranslit: 'Nirjhara',
    sajatiyaMeaning: 'Waterfall / Cascade',
    vijatiyaConjunct: 'ಜ್ಝ',
    vijatiyaExample: 'ಮಜ್ಝಣ',
    vijatiyaTranslit: 'Majjhana',
    vijatiyaMeaning: 'Afternoon',
    subscriptFormHint: 'ಝ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಞ',
    transliteration: 'nya',
    name: 'ಞ-ಒತ್ತು',
    recitationKn: 'ಞ ಗೆ ಞ-ಒತ್ತು',
    recitationEn: 'nya ge nya-vattu',
    varga: 'ಚ-ವರ್ಗ (Palatals)',
    sajatiyaConjunct: 'ಞ್ಞ',
    sajatiyaExample: 'ಯಜ್ಞ',
    sajatiyaTranslit: 'Yajna',
    sajatiyaMeaning: 'Sacred ritual',
    vijatiyaConjunct: 'ಜ್ಞ',
    vijatiyaExample: 'ಜ್ಞಾನ',
    vijatiyaTranslit: 'Jnaana',
    vijatiyaMeaning: 'Knowledge / Wisdom',
    subscriptFormHint: 'ಞ ರೂಪದ ಒತ್ತು (ವಿಶೇಷ ರೂಪ)',
  },

  // 3. ಟ-ವರ್ಗ (5)
  {
    consonant: 'ಟ',
    transliteration: 'ta',
    name: 'ಟ-ಒತ್ತು',
    recitationKn: 'ಟ ಗೆ ಟ-ಒತ್ತು',
    recitationEn: 'ta ge ta-vattu',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    sajatiyaConjunct: 'ಟ್ಟ',
    sajatiyaExample: 'ಪಟ್ಟಣ',
    sajatiyaTranslit: 'Pattana',
    sajatiyaMeaning: 'City / Town',
    vijatiyaConjunct: 'ಷ್ಟ',
    vijatiyaExample: 'ಕಷ್ಟ',
    vijatiyaTranslit: 'Kashta',
    vijatiyaMeaning: 'Difficulty / Hard work',
    subscriptFormHint: 'ಟ ಕೆಳಗೆ ಟ-ಒತ್ತು',
  },
  {
    consonant: 'ಠ',
    transliteration: 'tha',
    name: 'ಠ-ಒತ್ತು',
    recitationKn: 'ಠ ಗೆ ಠ-ಒತ್ತು',
    recitationEn: 'tha ge tha-vattu',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    sajatiyaConjunct: 'ಠ್ಠ',
    sajatiyaExample: 'ನಿಷ್ಠೆ',
    sajatiyaTranslit: 'Nishthe',
    sajatiyaMeaning: 'Loyalty / Devotion',
    vijatiyaConjunct: 'ಷ್ಠ',
    vijatiyaExample: 'ಶ್ರೇಷ್ಠ',
    vijatiyaTranslit: 'Shreshtha',
    vijatiyaMeaning: 'Greatest / Superior',
    subscriptFormHint: 'ಠ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಡ',
    transliteration: 'da',
    name: 'ಡ-ಒತ್ತು',
    recitationKn: 'ಡ ಗೆ ಡ-ಒತ್ತು',
    recitationEn: 'da ge da-vattu',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    sajatiyaConjunct: 'ಡ್ಡ',
    sajatiyaExample: 'ಲಡ್ಡು',
    sajatiyaTranslit: 'Laddu',
    sajatiyaMeaning: 'Sweet Laddu',
    vijatiyaConjunct: 'ಡ್ಗ',
    vijatiyaExample: 'ಖಡ್ಗ',
    vijatiyaTranslit: 'Khadga',
    vijatiyaMeaning: 'Sword',
    subscriptFormHint: 'ಡ ಕೆಳಗೆ ಡ-ಒತ್ತು',
  },
  {
    consonant: 'ಢ',
    transliteration: 'dha',
    name: 'ಢ-ಒತ್ತು',
    recitationKn: 'ಢ ಗೆ ಢ-ಒತ್ತು',
    recitationEn: 'dha ge dha-vattu',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    sajatiyaConjunct: 'ಢ್ಢ',
    sajatiyaExample: 'ಢಕ್ಕೆ',
    sajatiyaTranslit: 'Dhakke',
    sajatiyaMeaning: 'Drum instrument',
    vijatiyaConjunct: 'ಗಢ',
    vijatiyaExample: 'ದುರ್ಗಢ',
    vijatiyaTranslit: 'Durgadha',
    vijatiyaMeaning: 'Impenetrable fort',
    subscriptFormHint: 'ಢ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಣ',
    transliteration: 'na',
    name: 'ಣ-ಒತ್ತು',
    recitationKn: 'ಣ ಗೆ ಣ-ಒತ್ತು',
    recitationEn: 'na ge na-vattu',
    varga: 'ಟ-ವರ್ಗ (Retroflex)',
    sajatiyaConjunct: 'ಣ್ಣ',
    sajatiyaExample: 'ಅಣ್ಣ',
    sajatiyaTranslit: 'Anna',
    sajatiyaMeaning: 'Elder brother',
    vijatiyaConjunct: 'ರ್ಣ',
    vijatiyaExample: 'ಕರ್ನಾಟಕ',
    vijatiyaTranslit: 'Karnaataka',
    vijatiyaMeaning: 'Karnataka state',
    subscriptFormHint: 'ಣ ರೂಪದ ಒತ್ತು (ತ್ರಿಭುಜ ಆಕಾರ)',
  },

  // 4. ತ-ವರ್ಗ (5)
  {
    consonant: 'ತ',
    transliteration: 'ta',
    name: 'ತ-ಒತ್ತು',
    recitationKn: 'ತ ಗೆ ತ-ಒತ್ತು',
    recitationEn: 'ta ge ta-vattu',
    varga: 'ತ-ವರ್ಗ (Dentals)',
    sajatiyaConjunct: 'ತ್ತ',
    sajatiyaExample: 'ಮುತ್ತು',
    sajatiyaTranslit: 'Muttu',
    sajatiyaMeaning: 'Pearl',
    vijatiyaConjunct: 'ತ್ಯ',
    vijatiyaExample: 'ಸತ್ಯ',
    vijatiyaTranslit: 'Satya',
    vijatiyaMeaning: 'Truth',
    subscriptFormHint: 'ತ ಕೆಳಗೆ ತ-ಒತ್ತು',
  },
  {
    consonant: 'ಥ',
    transliteration: 'tha',
    name: 'ಥ-ಒತ್ತು',
    recitationKn: 'ಥ ಗೆ ಥ-ಒತ್ತು',
    recitationEn: 'tha ge tha-vattu',
    varga: 'ತ-ವರ್ಗ (Dentals)',
    sajatiyaConjunct: 'ಥ್ಥ',
    sajatiyaExample: 'ತಥ್ಯ',
    sajatiyaTranslit: 'Tathya',
    sajatiyaMeaning: 'Fact / Reality',
    vijatiyaConjunct: 'ರ್ಥ',
    vijatiyaExample: 'ಅರ್ಥ',
    vijatiyaTranslit: 'Artha',
    vijatiyaMeaning: 'Meaning',
    subscriptFormHint: 'ಥ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ದ',
    transliteration: 'da',
    name: 'ದ-ಒತ್ತು',
    recitationKn: 'ದ ಗೆ ದ-ಒತ್ತು',
    recitationEn: 'da ge da-vattu',
    varga: 'ತ-ವರ್ಗ (Dentals)',
    sajatiyaConjunct: 'ದ್ದ',
    sajatiyaExample: 'ಮುದ್ದು',
    sajatiyaTranslit: 'Muddu',
    sajatiyaMeaning: 'Darling / Cute',
    vijatiyaConjunct: 'ದ್ಯ',
    vijatiyaExample: 'ವಿದ್ಯೆ',
    vijatiyaTranslit: 'Vidye',
    vijatiyaMeaning: 'Education / Learning',
    subscriptFormHint: 'ದ ಕೆಳಗೆ ದ-ಒತ್ತು',
  },
  {
    consonant: 'ಧ',
    transliteration: 'dha',
    name: 'ಧ-ಒತ್ತು',
    recitationKn: 'ಧ ಗೆ ಧ-ಒತ್ತು',
    recitationEn: 'dha ge dha-vattu',
    varga: 'ತ-ವರ್ಗ (Dentals)',
    sajatiyaConjunct: 'ಧ್ಧ',
    sajatiyaExample: 'ಬುದ್ಧ',
    sajatiyaTranslit: 'Buddha',
    sajatiyaMeaning: 'The Enlightened One',
    vijatiyaConjunct: 'ಧ್ಯ',
    vijatiyaExample: 'ಧ್ಯಾನ',
    vijatiyaTranslit: 'Dhyaana',
    vijatiyaMeaning: 'Meditation',
    subscriptFormHint: 'ಧ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ನ',
    transliteration: 'na',
    name: 'ನ-ಒತ್ತು',
    recitationKn: 'ನ ಗೆ ನ-ಒತ್ತು',
    recitationEn: 'na ge na-vattu',
    varga: 'ತ-ವರ್ಗ (Dentals)',
    sajatiyaConjunct: 'ನ್ನ',
    sajatiyaExample: 'ಚಿನ್ನ',
    sajatiyaTranslit: 'Chinna',
    sajatiyaMeaning: 'Gold',
    vijatiyaConjunct: 'ನ್ಯ',
    vijatiyaExample: 'ಧನ್ಯ',
    vijatiyaTranslit: 'Dhanya',
    vijatiyaMeaning: 'Blessed / Thankful',
    subscriptFormHint: 'ನ ರೂಪದ ಒತ್ತು',
  },

  // 5. ಪ-ವರ್ಗ (5)
  {
    consonant: 'ಪ',
    transliteration: 'pa',
    name: 'ಪ-ಒತ್ತು',
    recitationKn: 'ಪ ಗೆ ಪ-ಒತ್ತು',
    recitationEn: 'pa ge pa-vattu',
    varga: 'ಪ-ವರ್ಗ (Labials)',
    sajatiyaConjunct: 'ಪ್ಪ',
    sajatiyaExample: 'ಅಪ್ಪ',
    sajatiyaTranslit: 'Appa',
    sajatiyaMeaning: 'Father',
    vijatiyaConjunct: 'ಪ್ಯ',
    vijatiyaExample: 'ಪ್ರಿಯ',
    vijatiyaTranslit: 'Priya',
    vijatiyaMeaning: 'Beloved / Dear',
    subscriptFormHint: 'ಪ ಕೆಳಗೆ ಪ-ಒತ್ತು',
  },
  {
    consonant: 'ಫ',
    transliteration: 'pha',
    name: 'ಫ-ಒತ್ತು',
    recitationKn: 'ಫ ಗೆ ಫ-ಒತ್ತು',
    recitationEn: 'pha ge pha-vattu',
    varga: 'ಪ-ವರ್ಗ (Labials)',
    sajatiyaConjunct: 'ಫ್ಫ',
    sajatiyaExample: 'ಆಫೀಸ್',
    sajatiyaTranslit: 'Afees',
    sajatiyaMeaning: 'Office',
    vijatiyaConjunct: 'ಲ್ಫ',
    vijatiyaExample: 'ಗುಲ್ಫ',
    vijatiyaTranslit: 'Gulpha',
    vijatiyaMeaning: 'Ankle',
    subscriptFormHint: 'ಫ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಬ',
    transliteration: 'ba',
    name: 'ಬ-ಒತ್ತು',
    recitationKn: 'ಬ ಗೆ ಬ-ಒತ್ತು',
    recitationEn: 'ba ge ba-vattu',
    varga: 'ಪ-ವರ್ಗ (Labials)',
    sajatiyaConjunct: 'ಬ್ಬ',
    sajatiyaExample: 'ಹಬ್ಬ',
    sajatiyaTranslit: 'Habba',
    sajatiyaMeaning: 'Festival',
    vijatiyaConjunct: 'ಬ್ದ',
    vijatiyaExample: 'ಶಬ್ದ',
    vijatiyaTranslit: 'Shabda',
    vijatiyaMeaning: 'Sound / Word',
    subscriptFormHint: 'ಬ ಕೆಳಗೆ ಬ-ಒತ್ತು',
  },
  {
    consonant: 'ಭ',
    transliteration: 'bha',
    name: 'ಭ-ಒತ್ತು',
    recitationKn: 'ಭ ಗೆ ಭ-ಒತ್ತು',
    recitationEn: 'bha ge bha-vattu',
    varga: 'ಪ-ವರ್ಗ (Labials)',
    sajatiyaConjunct: 'ಭ್ಭ',
    sajatiyaExample: 'ಲಭ್ಯ',
    sajatiyaTranslit: 'Labhya',
    sajatiyaMeaning: 'Available',
    vijatiyaConjunct: 'ಭ್ಯ',
    vijatiyaExample: 'ಅಭ್ಯಾಸ',
    vijatiyaTranslit: 'Abhyaasa',
    vijatiyaMeaning: 'Practice',
    subscriptFormHint: 'ಭ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಮ',
    transliteration: 'ma',
    name: 'ಮ-ಒತ್ತು',
    recitationKn: 'ಮ ಗೆ ಮ-ಒತ್ತು',
    recitationEn: 'ma ge ma-vattu',
    varga: 'ಪ-ವರ್ಗ (Labials)',
    sajatiyaConjunct: 'ಮ್ಮ',
    sajatiyaExample: 'ಅಮ್ಮ',
    sajatiyaTranslit: 'Amma',
    sajatiyaMeaning: 'Mother',
    vijatiyaConjunct: 'ಸ್ಮ',
    vijatiyaExample: 'ಭಸ್ಮ',
    vijatiyaTranslit: 'Bhasma',
    vijatiyaMeaning: 'Ash',
    subscriptFormHint: 'ಮ ಕೆಳಗೆ ವಿಶೇಷ ಮ-ಒತ್ತು',
  },

  // 6. ಅವರ್ಗೀಯ ವ್ಯಂಜನಗಳು (9)
  {
    consonant: 'ಯ',
    transliteration: 'ya',
    name: 'ಯ-ಒತ್ತು',
    recitationKn: 'ಯ ಗೆ ಯ-ಒತ್ತು',
    recitationEn: 'ya ge ya-vattu',
    varga: 'ಅವರ್ಗೀಯ (Semi-vowels)',
    sajatiyaConjunct: 'ಯ್ಯ',
    sajatiyaExample: 'ಅಯ್ಯೋ',
    sajatiyaTranslit: 'Ayyo',
    sajatiyaMeaning: 'Oh dear!',
    vijatiyaConjunct: 'ರ್ಯ',
    vijatiyaExample: 'ಸೂರ್ಯ',
    vijatiyaTranslit: 'Surya',
    vijatiyaMeaning: 'Sun',
    subscriptFormHint: 'ಯ ರೂಪದ ಒತ್ತು (ವಿಶೇಷ ರೂಪ)',
  },
  {
    consonant: 'ರ',
    transliteration: 'ra',
    name: 'ರ-ಒತ್ತು (ಅರ್ಕಾವತ್ತು)',
    recitationKn: 'ರ ಗೆ ರ-ಒತ್ತು',
    recitationEn: 'ra ge ra-vattu',
    varga: 'ಅವರ್ಗೀಯ (Semi-vowels)',
    sajatiyaConjunct: 'ರ್ರ',
    sajatiyaExample: 'ಕರ್ನಾಟಕ',
    sajatiyaTranslit: 'Karnaataka',
    sajatiyaMeaning: 'Land of Kannada',
    vijatiyaConjunct: 'ರ್ಕ',
    vijatiyaExample: 'ತರ್ಕ',
    vijatiyaTranslit: 'Tarka',
    vijatiyaMeaning: 'Logic / Debate',
    subscriptFormHint: 'ಅರ್ಕಾವತ್ತು ( ರ್ ) ಮತ್ತು ರ-ಒತ್ತು ( ್ರ )',
  },
  {
    consonant: 'ಲ',
    transliteration: 'la',
    name: 'ಲ-ಒತ್ತು',
    recitationKn: 'ಲ ಗೆ ಲ-ಒತ್ತು',
    recitationEn: 'la ge la-vattu',
    varga: 'ಅವರ್ಗೀಯ (Semi-vowels)',
    sajatiyaConjunct: 'ಲ್ಲ',
    sajatiyaExample: 'ಬೆಲ್ಲ',
    sajatiyaTranslit: 'Bella',
    sajatiyaMeaning: 'Jaggery (sweet)',
    vijatiyaConjunct: 'ಕ್ಲ',
    vijatiyaExample: 'ಶುಕ್ಲ',
    vijatiyaTranslit: 'Shukla',
    vijatiyaMeaning: 'Bright / White',
    subscriptFormHint: 'ಲ ಕೆಳಗೆ ಲ-ಒತ್ತು',
  },
  {
    consonant: 'ವ',
    transliteration: 'va',
    name: 'ವ-ಒತ್ತು',
    recitationKn: 'ವ ಗೆ ವ-ಒತ್ತು',
    recitationEn: 'va ge va-vattu',
    varga: 'ಅವರ್ಗೀಯ (Semi-vowels)',
    sajatiyaConjunct: 'ವ್ವ',
    sajatiyaExample: 'ಅವ್ವ',
    sajatiyaTranslit: 'Avva',
    sajatiyaMeaning: 'Mother (folk dialect)',
    vijatiyaConjunct: 'ಶ್ವ',
    vijatiyaExample: 'ವಿಶ್ವ',
    vijatiyaTranslit: 'Vishwa',
    vijatiyaMeaning: 'Universe / World',
    subscriptFormHint: 'ವ ಕೆಳಗೆ ವ-ಒತ್ತು',
  },
  {
    consonant: 'ಶ',
    transliteration: 'sha',
    name: 'ಶ-ಒತ್ತು',
    recitationKn: 'ಶ ಗೆ ಶ-ಒತ್ತು',
    recitationEn: 'sha ge sha-vattu',
    varga: 'ಅವರ್ಗೀಯ (Sibilants)',
    sajatiyaConjunct: 'ಶ್ಶ',
    sajatiyaExample: 'ವಿಶ್ಲೇಷಣೆ',
    sajatiyaTranslit: 'Vishleshane',
    sajatiyaMeaning: 'Analysis',
    vijatiyaConjunct: 'ಶ್ಚ',
    vijatiyaExample: 'ನಿಶ್ಚಯ',
    vijatiyaTranslit: 'Nishchaya',
    vijatiyaMeaning: 'Certainty / Decision',
    subscriptFormHint: 'ಶ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಷ',
    transliteration: 'sha',
    name: 'ಷ-ಒತ್ತು',
    recitationKn: 'ಷ ಗೆ ಷ-ಒತ್ತು',
    recitationEn: 'sha ge sha-vattu',
    varga: 'ಅವರ್ಗೀಯ (Sibilants)',
    sajatiyaConjunct: 'ಷ್ಷ',
    sajatiyaExample: 'ನಿಷ್ಪಾಪ',
    sajatiyaTranslit: 'Nishpaapa',
    sajatiyaMeaning: 'Sinless / Innocent',
    vijatiyaConjunct: 'ಷ್ಟ',
    vijatiyaExample: 'ಇಷ್ಟ',
    vijatiyaTranslit: 'Ishta',
    vijatiyaMeaning: 'Like / Favourite',
    subscriptFormHint: 'ಷ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಸ',
    transliteration: 'sa',
    name: 'ಸ-ಒತ್ತು',
    recitationKn: 'ಸ ಗೆ ಸ-ಒತ್ತು',
    recitationEn: 'sa ge sa-vattu',
    varga: 'ಅವರ್ಗೀಯ (Sibilants)',
    sajatiyaConjunct: 'ಸ್ಸ',
    sajatiyaExample: 'ಮನಸ್ಸು',
    sajatiyaTranslit: 'Manassu',
    sajatiyaMeaning: 'Mind / Heart',
    vijatiyaConjunct: 'ಸ್ತ',
    vijatiyaExample: 'ಪುಸ್ತಕ',
    vijatiyaTranslit: 'Pustaka',
    vijatiyaMeaning: 'Book',
    subscriptFormHint: 'ಸ ಕೆಳಗೆ ಸ-ಒತ್ತು',
  },
  {
    consonant: 'ಹ',
    transliteration: 'ha',
    name: 'ಹ-ಒತ್ತು',
    recitationKn: 'ಹ ಗೆ ಹ-ಒತ್ತು',
    recitationEn: 'ha ge ha-vattu',
    varga: 'ಅವರ್ಗೀಯ (Aspirates)',
    sajatiyaConjunct: 'ಹ್ಹ',
    sajatiyaExample: 'ಬ್ರಹ್ಮ',
    sajatiyaTranslit: 'Brahma',
    sajatiyaMeaning: 'Creator Brahma',
    vijatiyaConjunct: 'ಹ್ನ',
    vijatiyaExample: 'ಚಿಹ್ನೆ',
    vijatiyaTranslit: 'Chihne',
    vijatiyaMeaning: 'Sign / Symbol',
    subscriptFormHint: 'ಹ ರೂಪದ ಒತ್ತು',
  },
  {
    consonant: 'ಳ',
    transliteration: 'la',
    name: 'ಳ-ಒತ್ತು',
    recitationKn: 'ಳ ಗೆ ಳ-ಒತ್ತು',
    recitationEn: 'la ge la-vattu',
    varga: 'ಅವರ್ಗೀಯ (Retroflex lateral)',
    sajatiyaConjunct: 'ಳ್ಳ',
    sajatiyaExample: 'ಬೆಳ್ಳಿ',
    sajatiyaTranslit: 'Belli',
    sajatiyaMeaning: 'Silver',
    vijatiyaConjunct: 'ಕ್ಳ',
    vijatiyaExample: 'ಕಳ್ಳ',
    vijatiyaTranslit: 'Kalla',
    vijatiyaMeaning: 'Thief',
    subscriptFormHint: 'ಳ ಕೆಳಗೆ ಳ-ಒತ್ತು',
  },
];

export const OttaksharaChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classicGrid' | 'detailedCards'>('classicGrid');
  const [activeFilter, setActiveFilter] = useState<'all' | 'sajatiya' | 'vijatiya'>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_OTTAKSHARA_DATA.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.consonant.includes(q) ||
      item.name.includes(q) ||
      item.recitationKn.includes(q) ||
      item.recitationEn.toLowerCase().includes(q) ||
      item.sajatiyaConjunct.includes(q) ||
      item.sajatiyaExample.includes(q) ||
      item.sajatiyaMeaning.toLowerCase().includes(q) ||
      item.sajatiyaTranslit.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="gold">ಕನ್ನಡ ಒತ್ತಕ್ಷರಗಳು — Complete 34 Ottakshara Chart</Badge>
          <span className="text-xs text-gold-300 font-bold uppercase tracking-wider">
            ಕ ರಿಂದ ಳ ವರೆಗೆ • Authentic Recitation Pronunciation
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-kannada tracking-wide">
          ಕನ್ನಡ ಒತ್ತಕ್ಷರಗಳು (ಕ ರಿಂದ ಳ) — ಧ್ವನಿ ಸಹಿತ
        </h3>
        <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-3xl leading-relaxed">
          Traditional classroom chant pronunciation for each subscript consonant:
          <span className="text-gold-300 font-bold ml-1 font-kannada">"ಕ ಗೆ ಕ-ಒತ್ತು" (ka ge ka-vattu), "ಗ ಗೆ ಗ-ಒತ್ತು" (ga ge ga-vattu)</span>.
          Tap the voice speaker on any letter or button to hear the correct teacher pronunciation!
        </p>

        {/* View Switcher Tabs */}
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('classicGrid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'classicGrid'
                ? 'bg-gold-500 text-maroon-950 shadow-md font-extrabold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Grid size={15} />
            <span>ಕ್ಲಾಸಿಕ್ ಚಾರ್ಟ್ (Classic Textbook Grid — 5x7)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('detailedCards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'detailedCards'
                ? 'bg-gold-500 text-maroon-950 shadow-md font-extrabold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Layers size={15} />
            <span>ವಿವರವಾದ ಕಾರ್ಡ್‌ಗಳು (Detailed Cards & Words)</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          VIEW 1: CLASSIC TEXTBOOK GRID (Inspired directly by user's book photo)
          Displays 5 columns exactly like the traditional chart:
          ಕ     ಖ್ಖ    ಗ್ಗ    ಘ್ಘ    ಙ್ಙ
          ಚ್ಚ    ಛ್ಛ    ಜ್ಜ    ಝ್ಝ    ಞ್ಞ
          ಟ್ಟ    ಠ್ಠ    ಡ್ಡ    ಢ್ಢ    ಣ್ಣ
          ತ್ತ    ಥ್ಥ    ದ್ದ    ಧ್ಧ    ನ್ನ
          ಪ್ಪ    ಫ್ಫ    ಬ್ಬ    ಭ್ಭ    ಮ್ಮ
          ಯ್ಯ   ರ್ರ     ಲ್ಲ    ವ್ವ     ಶ್ಶ
                ಷ್ಷ    ಸ್ಸ    ಹ್ಹ    ಳ್ಳ
      ══════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'classicGrid' && (
        <Card className="p-6 sm:p-8 bg-white border-purple-200 shadow-sm space-y-6">
          <div className="text-center space-y-1.5 border-b border-gray-100 pb-4">
            <h4 className="font-kannada text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-wider underline decoration-blue-400 decoration-2 underline-offset-8">
              ಕನ್ನಡ ಒತ್ತಕ್ಷರಗಳು
            </h4>
            <p className="text-xs text-gray-500 pt-1 font-medium">
              Tap any letter card or speaker button to hear: <strong>"ಕ ಗೆ ಕ-ಒತ್ತು (ka ge ka-vattu)"</strong>
            </p>
          </div>

          {/* 5-Column Grid matching standard Kannada school chart layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {ALL_OTTAKSHARA_DATA.map((item) => (
              <div
                key={item.consonant}
                className="group relative bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30 border-2 border-blue-200/80 hover:border-blue-600 rounded-2xl p-4 text-center transition-all duration-150 hover:shadow-md flex flex-col items-center justify-between min-h-[160px]"
              >
                {/* Top Badge: Consonant Name */}
                <div className="w-full flex items-center justify-between text-2xs text-gray-500 mb-1">
                  <span className="font-semibold text-blue-950 font-kannada">{item.consonant}</span>
                  <span className="text-3xs uppercase tracking-wider text-purple-700 font-bold">/{item.transliteration}/</span>
                </div>

                {/* Main Large Conjunct Symbol (like ಕ್ಕ, ಗ್ಗ, ಟ್ಟ in the textbook) */}
                <div className="my-1 py-1">
                  <span className="font-kannada text-4xl sm:text-5xl font-extrabold text-blue-900 group-hover:text-blue-700 transition-colors drop-shadow-2xs leading-tight">
                    {item.sajatiyaConjunct}
                  </span>
                </div>

                {/* Traditional Recitation Pronunciation */}
                <div className="w-full bg-white/90 border border-blue-100 rounded-xl p-2 mt-1 space-y-0.5 shadow-2xs">
                  <div className="font-kannada font-bold text-xs text-maroon-800 leading-snug">
                    {item.recitationKn}
                  </div>
                  <div className="text-3xs text-gray-600 font-sans italic leading-tight">
                    "{item.recitationEn}"
                  </div>
                </div>

                {/* Audio Button that plays the exact recitation */}
                <div className="mt-2 flex items-center justify-center gap-1.5 w-full pt-1">
                  <AudioButton
                    text={item.recitationKn}
                    size={16}
                    label="ಉಚ್ಚಾರಣೆ"
                    className="w-full justify-center text-xs font-semibold bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-lg py-1"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <span className="text-xl shrink-0">💡</span>
            <div>
              <strong>ಕಲಿಕಾ ಸಲಹೆ (Learning Tip):</strong> In traditional Kannada teaching, learners chant every subscript consonant in rhythm:
              <em> "Ka ge Ka-vattu, Kha ge Kha-vattu, Ga ge Ga-vattu, Gha ge Gha-vattu..."</em>.
              Clicking the speaker button under any consonant plays this exact rhythmic teacher pronunciation!
            </div>
          </div>
        </Card>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          VIEW 2: DETAILED CARDS & WORDS
          Includes Sajatiya, Vijatiya, visual badges, and example words
      ══════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'detailedCards' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-maroon-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All (೩೪ ಒತ್ತುಗಳು)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('sajatiya')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'sajatiya'
                    ? 'bg-maroon-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ಸಜಾತೀಯ (Same Ottu)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('vijatiya')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'vijatiya'
                    ? 'bg-maroon-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ವಿಜಾತೀಯ (Blends)
              </button>
            </div>

            <input
              type="text"
              placeholder="Search by letter or word (e.g. ಕ, ಅಕ್ಕ, Akka)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-maroon-400 w-full sm:w-72"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const sajatiyaVisual = getVisualIllustration(item.sajatiyaConjunct, item.sajatiyaExample, item.sajatiyaExample, item.sajatiyaMeaning);
              const vijatiyaVisual = item.vijatiyaExample
                ? getVisualIllustration(item.vijatiyaConjunct || '', item.vijatiyaExample, item.vijatiyaExample, item.vijatiyaMeaning)
                : null;

              return (
                <Card
                  key={item.consonant}
                  className="p-5 border-gray-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group bg-white space-y-4"
                >
                  {/* Header: Large Letter + Recitation Chant + Voice */}
                  <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center text-blue-950 font-extrabold text-3xl font-kannada shadow-2xs">
                        {item.sajatiyaConjunct}
                      </div>
                      <div>
                        {/* Pronunciation Title */}
                        <h4 className="font-kannada font-bold text-base text-maroon-900 leading-snug">
                          {item.recitationKn}
                        </h4>
                        <p className="text-xs text-gray-500 font-sans italic">
                          "{item.recitationEn}"
                        </p>
                        <p className="text-2xs text-purple-700 font-medium mt-0.5">
                          {item.varga}
                        </p>
                      </div>
                    </div>
                    {/* Audio button speaks the chant */}
                    <AudioButton text={item.recitationKn} size={18} label="ಕೇಳಿ" />
                  </div>

                  {/* Sajatiya Box (ಸಜಾತೀಯ) */}
                  {(activeFilter === 'all' || activeFilter === 'sajatiya') && (
                    <div className="p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-2xs font-bold text-purple-900">
                        <span className="flex items-center gap-1">
                          <Sparkles size={13} className="text-purple-600" /> ಸಜಾತೀಯ (Doubling)
                        </span>
                        <Badge variant="maroon">{item.consonant} + {item.consonant} = {item.sajatiyaConjunct}</Badge>
                      </div>

                      <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-purple-100 text-xl flex items-center justify-center shrink-0">
                            {sajatiyaVisual?.emoji || '✨'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-kannada font-extrabold text-base text-maroon-900">
                              {item.sajatiyaExample}
                            </div>
                            <div className="text-xs text-gray-600 truncate">
                              {item.sajatiyaTranslit} — <em>{item.sajatiyaMeaning}</em>
                            </div>
                          </div>
                        </div>
                        <AudioButton text={item.sajatiyaExample} size={16} />
                      </div>
                    </div>
                  )}

                  {/* Vijatiya Box (ವಿಜಾತೀಯ) */}
                  {(activeFilter === 'all' || activeFilter === 'vijatiya') && item.vijatiyaExample && (
                    <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-2xs font-bold text-indigo-900">
                        <span className="flex items-center gap-1">
                          <Layers size={13} className="text-indigo-600" /> ವಿಜಾತೀಯ (Blend)
                        </span>
                        <Badge variant="blue">{item.vijatiyaConjunct}</Badge>
                      </div>

                      <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-xl flex items-center justify-center shrink-0">
                            {vijatiyaVisual?.emoji || '📚'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-kannada font-extrabold text-base text-indigo-950">
                              {item.vijatiyaExample}
                            </div>
                            <div className="text-xs text-gray-600 truncate">
                              {item.vijatiyaTranslit} — <em>{item.vijatiyaMeaning}</em>
                            </div>
                          </div>
                        </div>
                        <AudioButton text={item.vijatiyaExample} size={16} />
                      </div>
                    </div>
                  )}

                  {/* Subscript Hint Footer */}
                  <div className="pt-2 border-t border-gray-100 text-2xs text-gray-500 flex items-center justify-between">
                    <span className="text-gray-400">ಒತ್ತು ಆಕಾರ:</span>
                    <span className="font-kannada font-semibold text-gray-700">{item.subscriptFormHint}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
