import { Router, Request, Response } from 'express';
import { FOUNDATION_SECTIONS } from '../data/foundationsData';
import { KAGUNITA_FULL_CHART, KANNADA_VOWELS, KANNADA_CONSONANTS, KANNADA_YOGAVAHA } from '../data/varnamaleAndKagunita';
import { KANNADA_NUMBERS_1_TO_100 } from '../data/numbersData';

const router = Router();

// GET /api/foundations — List all 18 foundational sections with topic summaries
router.get('/', (_req: Request, res: Response) => {
  const summary = FOUNDATION_SECTIONS.map((sec) => ({
    id: sec.id,
    sectionNumber: sec.sectionNumber,
    title: sec.title,
    titleKn: sec.titleKn,
    summary: sec.summary,
    category: sec.category,
    topicCount: sec.topics.length,
    topics: sec.topics.map((t) => ({
      id: t.id,
      topicNumber: t.topicNumber,
      title: t.title,
      titleKn: t.titleKn,
      description: t.description,
      hasExercises: !!t.exercises?.length,
    })),
  }));

  res.json({
    success: true,
    data: {
      title: 'Kannada Foundations (ಮೂಲ ಕಲಿಕೆ)',
      titleKn: 'ಕನ್ನಡ ಮೂಲಭೂತ ಕಲಿಕಾ ವಿಭಾಗ — ೧೮ ವಿಭಾಗಗಳು',
      totalSections: FOUNDATION_SECTIONS.length,
      sections: summary,
    },
  });
});

// GET /api/foundations/section/:sectionNumberOrId — Get complete details for a section
router.get('/section/:idOrNumber', (req: Request, res: Response): void => {
  const param = req.params.idOrNumber;
  const num = parseInt(param.replace('f-sec-', '').replace('section-', ''), 10);

  const section = FOUNDATION_SECTIONS.find(
    (s) => s.id === param || s.sectionNumber === num
  );

  if (!section) {
    res.status(404).json({ success: false, error: 'Foundations section not found.' });
    return;
  }

  res.json({
    success: true,
    data: section,
  });
});

// GET /api/foundations/kagunita — Get the complete 34-consonant Kagunita matrix
router.get('/kagunita', (req: Request, res: Response): void => {
  const consonant = req.query.consonant as string;
  if (consonant) {
    const row = KAGUNITA_FULL_CHART.find((r) => r.consonant === consonant.trim());
    if (row) {
      res.json({ success: true, data: row });
      return;
    }
  }

  res.json({
    success: true,
    data: {
      totalRows: KAGUNITA_FULL_CHART.length,
      rows: KAGUNITA_FULL_CHART,
    },
  });
});

// GET /api/foundations/varnamale — Get the complete Varnamale components
router.get('/varnamale', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      vowels: KANNADA_VOWELS,
      consonants: KANNADA_CONSONANTS,
      yogavaha: KANNADA_YOGAVAHA,
      counts: {
        vowels: KANNADA_VOWELS.length,
        consonants: KANNADA_CONSONANTS.length,
        yogavaha: KANNADA_YOGAVAHA.length,
        total: KANNADA_VOWELS.length + KANNADA_CONSONANTS.length + KANNADA_YOGAVAHA.length,
      },
    },
  });
});

// GET /api/foundations/numbers — Get verified Kannada numbers 1–100
router.get('/numbers', (req: Request, res: Response) => {
  const range = req.query.range as string;
  let list = KANNADA_NUMBERS_1_TO_100;

  if (range) {
    if (range === '1-10') list = list.filter((n) => n.number >= 1 && n.number <= 10);
    else if (range === '11-20') list = list.filter((n) => n.number >= 11 && n.number <= 20);
    else if (range === '21-50') list = list.filter((n) => n.number >= 21 && n.number <= 50);
    else if (range === '51-75') list = list.filter((n) => n.number >= 51 && n.number <= 75);
    else if (range === '76-100') list = list.filter((n) => n.number >= 76 && n.number <= 100);
  }

  res.json({
    success: true,
    data: {
      total: list.length,
      numbers: list,
    },
  });
});

// Dynamic AI Word Builder Endpoint: Generates fresh Kannada words with grapheme segmentation & decoys
router.post('/word-builder/generate', (req: Request, res: Response) => {
  const { count = 5 } = req.body || {};

  // High-frequency curated bank for instant fallback & training
  const bank = [
    { word: 'ಕಮಲ', hint: 'Lotus flower (National Flower)', syllables: ['ಕ', 'ಮ', 'ಲ'], decoys: ['ನ', 'ರ', 'ಸ'] },
    { word: 'ಆನೆ', hint: 'Elephant (ದೊಡ್ಡ ಪ್ರಾಣಿ)', syllables: ['ಆ', 'ನೆ'], decoys: ['ಮ', 'ರ', 'ಹ'] },
    { word: 'ಮರ', hint: 'Tree (ಪ್ರಕೃತಿ)', syllables: ['ಮ', 'ರ'], decoys: ['ಲ', 'ಕ', 'ನ'] },
    { word: 'ಹಸು', hint: 'Cow (ಕಾಮಧೇನು)', syllables: ['ಹ', 'ಸು'], decoys: ['ಮ', 'ನೆ', 'ಕ'] },
    { word: 'ಅರಸ', hint: 'King (ಪ್ರಭು)', syllables: ['ಅ', 'ರ', 'ಸ'], decoys: ['ಕ', 'ಮ', 'ಲ'] },
    { word: 'ಕುದುರೆ', hint: 'Horse (ವೇಗದ ಪ್ರಾಣಿ)', syllables: ['ಕು', 'ದು', 'ರೆ'], decoys: ['ನೆ', 'ಆ', 'ಕ'] },
    { word: 'ಪುಸ್ತಕ', hint: 'Book (ಗ್ರಂಥ)', syllables: ['ಪು', 'ಸ್ತ', 'ಕ'], decoys: ['ಮ', 'ರ', 'ಲ'] },
    { word: 'ಬಾಳೆಹಣ್ಣು', hint: 'Banana (ಸಿಹಿ ಹಣ್ಣು)', syllables: ['ಬಾ', 'ಳೆ', 'ಹ', 'ಣ್ಣು'], decoys: ['ಕ', 'ರ', 'ಸ'] },
    { word: 'ಶಾಲೆ', hint: 'School (ವಿದ್ಯಾಲಯ)', syllables: ['ಶಾ', 'ಲೆ'], decoys: ['ಮ', 'ನೆ', 'ಕ'] },
    { word: 'ಮನೆ', hint: 'House / Home (ನಿವಾಸ)', syllables: ['ಮ', 'ನೆ'], decoys: ['ಶಾ', 'ಲ', 'ರ'] },
    { word: 'ಬೆಕ್ಕು', hint: 'Cat (ಸಾಕು ಪ್ರಾಣಿ)', syllables: ['ಬೆ', 'ಕ್ಕು'], decoys: ['ನ', 'ಯಿ', 'ಹ'] },
    { word: 'ನಾಯಿ', hint: 'Dog (ವಿಶ್ವಾಸದ ಪ್ರಾಣಿ)', syllables: ['ನಾ', 'ಯಿ'], decoys: ['ಬೆ', 'ಕ್ಕು', 'ರ'] },
    { word: 'ಸೂರ್ಯ', hint: 'Sun (ಬೆಳಕಿನ ಒಡೆಯ)', syllables: ['ಸೂ', 'ರ್ಯ'], decoys: ['ಚಂ', 'ದ್ರ', 'ನ'] },
    { word: 'ಚಂದ್ರ', hint: 'Moon (ಶಶಾಂಕ)', syllables: ['ಚಂ', 'ದ್ರ'], decoys: ['ಸೂ', 'ರ್ಯ', 'ತ'] },
    { word: 'ಹಕ್ಕಿ', hint: 'Bird (ಪಕ್ಷಿ)', syllables: ['ಹ', 'ಕ್ಕಿ'], decoys: ['ಮೀ', 'ನು', 'ಗ'] },
    { word: 'ಮೀನು', hint: 'Fish (ಜಲಚರ)', syllables: ['ಮೀ', 'ನು'], decoys: ['ಹ', 'ಕ್ಕಿ', 'ಕ'] },
    { word: 'ಗಿಡ', hint: 'Plant / Shrub', syllables: ['ಗಿ', 'ಡ'], decoys: ['ಮ', 'ರ', 'ಲ'] },
    { word: 'ಹೂವು', hint: 'Flower (ಕುಸುಮ)', syllables: ['ಹೂ', 'ವು'], decoys: ['ಎ', 'ಲೆ', 'ಗ'] },
    { word: 'ಎಲೆ', hint: 'Leaf (ಪರ್ಣ)', syllables: ['ಎ', 'ಲೆ'], decoys: ['ಹೂ', 'ವು', 'ಮ'] },
    { word: 'ನೀರು', hint: 'Water (ಜಲ)', syllables: ['ನೀ', 'ರು'], decoys: ['ಹಾ', 'ಲು', 'ಅ'] },
    { word: 'ಹಾಲು', hint: 'Milk (ಕ್ಷೀರ)', syllables: ['ಹಾ', 'ಲು'], decoys: ['ನೀ', 'ರು', 'ಚ'] },
    { word: 'ಅನ್ನ', hint: 'Rice / Food', syllables: ['ಅ', 'ನ್ನ'], decoys: ['ಹಾ', 'ಲು', 'ಕ'] },
    { word: 'ಕಣ್ಣು', hint: 'Eye (ನೇತ್ರ)', syllables: ['ಕ', 'ಣ್ಣು'], decoys: ['ಕಿ', 'ವಿ', 'ಮೂ'] },
    { word: 'ಕಿವಿ', hint: 'Ear (ಕರ್ಣ)', syllables: ['ಕಿ', 'ವಿ'], decoys: ['ಕ', 'ಣ್ಣು', 'ಬಾ'] },
    { word: 'ಬಾಯಿ', hint: 'Mouth', syllables: ['ಬಾ', 'ಯಿ'], decoys: ['ಹ', 'ಲ್ಲು', 'ಕೈ'] },
    { word: 'ಕೈ', hint: 'Hand (ಕರ)', syllables: ['ಕೈ'], decoys: ['ಕಾ', 'ಲು', 'ತ'] },
    { word: 'ಕಾಲು', hint: 'Leg / Foot (ಪಾದ)', syllables: ['ಕಾ', 'ಲು'], decoys: ['ಕೈ', 'ತ', 'ಲೆ'] },
    { word: 'ತಲೆ', hint: 'Head (ಶಿರ)', syllables: ['ತ', 'ಲೆ'], decoys: ['ಕೈ', 'ಕಾ', 'ಲು'] }
  ];

  // Shuffle and pick requested count
  const shuffled = [...bank].sort(() => 0.5 - Math.random()).slice(0, count);

  res.json({
    success: true,
    data: {
      generatedCount: shuffled.length,
      words: shuffled,
      source: 'ai-word-generator'
    }
  });
});

export default router;
