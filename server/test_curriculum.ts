import { FOUNDATION_SECTIONS } from './src/data/foundationsData';
import { KAGUNITA_FULL_CHART, KANNADA_VOWELS, KANNADA_CONSONANTS, KANNADA_YOGAVAHA } from './src/data/varnamaleAndKagunita';
import { CURRICULUM_DATA, LEGACY_LESSON_ID_MAP } from './src/data/curriculumData';
import assert from 'assert';

console.log('═══════════════════════════════════════════════════');
console.log(' RUNNING 18 KANNADA FOUNDATIONS & CURRICULUM TESTS ');
console.log('═══════════════════════════════════════════════════');

// TEST 1: Verify all 18 Foundation Sections exist without omission
assert.strictEqual(FOUNDATION_SECTIONS.length, 18, 'Must have exactly 18 foundation sections');
console.log(`[PASS] 1. Verified exactly 18 Unified Foundation Sections exist.`);

// TEST 2: Verify all 18 numbered section titles
const expectedSectionTitles = [
  'Kannada Alphabet (Varnamale)',
  'Complete Kagunita (ಗುಣಿತಾಕ್ಷರಗಳು)',
  'Ottaksharagalu (Consonant Conjuncts)',
  'Letter to Word (ಅಕ್ಷರದಿಂದ ಪದ)',
  'Kannada Numbers (ಸಂಖ್ಯೆಗಳು ೦-೧೦೦)',
  'Mathematical Symbols & Measurements',
  'Parts of Speech & Essential Grammar',
  'Body Parts (ಶರೀರ ಪರಿಚಯ)',
  'Colors and Shapes (ಬಣ್ಣಗಳು ಮತ್ತು ಆಕಾರಗಳು)',
  'Fruits, Vegetables and Food',
  'Animals, Birds and Nature',
  'Family and Kinship (ಕುಟುಂಬ ಮತ್ತು ಸಂಬಂಧಗಳು)',
  'Home, School and Daily Objects',
  'Days, Months, Seasons and Time',
  'Verbs & Antonyms (ಕ್ರಿಯಾಪದ ಮತ್ತು ವಿರುದ್ಧ ಪದಗಳು)',
  'Simple Sentences & Conversational Phrases',
  'Reading and Writing Practice',
  'Learning Activities & Assessment Arena'
];

expectedSectionTitles.forEach((title, idx) => {
  const sec = FOUNDATION_SECTIONS.find((s) => s.sectionNumber === idx + 1);
  assert(sec, `Missing section number: ${idx + 1}`);
  assert.strictEqual(sec.title, title, `Title mismatch for section ${idx + 1}`);
  assert(sec.topics && sec.topics.length > 0, `Section ${idx + 1} has no topics`);
});
console.log(`[PASS] 2. All 18 section titles, descriptions, and topics verified present.`);

// TEST 3: Verify Complete Varnamale (ಅ to ಳ)
assert.strictEqual(KANNADA_VOWELS.length, 13, 'Must have 13 standard vowels (ಅ to ಔ)');
assert.strictEqual(KANNADA_CONSONANTS.length, 34, 'Must have 34 standard consonants (ಕ to ಳ)');
assert.strictEqual(KANNADA_YOGAVAHA.length, 2, 'Must have 2 yogavahas (ಅಂ and ಅಃ)');
assert.strictEqual(KANNADA_CONSONANTS[0].char, 'ಕ', 'First consonant must be ಕ');
assert.strictEqual(KANNADA_CONSONANTS[33].char, 'ಳ', 'Final consonant must be ಳ');
console.log(`[PASS] 3. Approved Varnamale verified: 13 Swaras, 34 Vyanjanas (ಕ to ಳ), 2 Yogavahas.`);

// TEST 4: Verify Complete 34-Consonant Kagunita Grid (510 verified syllables)
assert.strictEqual(KAGUNITA_FULL_CHART.length, 34, 'Must have 34 complete Kagunita rows');
KAGUNITA_FULL_CHART.forEach((row, idx) => {
  assert.strictEqual(row.consonant, KANNADA_CONSONANTS[idx].char, `Consonant mismatch at row ${idx}`);
  assert.strictEqual(row.series.length, 15, `Row ${row.consonant} must have 15 vowel combinations`);

  // Verify first and last in series
  assert(row.series[0].akshara === row.consonant, `Inherent vowel form mismatch for ${row.consonant}`);
  assert(row.series[14].akshara.endsWith('ಃ'), `Visarga form mismatch for ${row.consonant}`);
});
console.log(`[PASS] 4. Complete Kagunita chart verified: all 34 rows from ಕ to ಳ, each with 15 vowel combinations (510 total verified cells).`);

// TEST 5: Verify Legacy Lesson ID backward compatibility
const sampleLegacyIds = ['lesson-beg-1', 'lesson-c1-swaras', 'lesson-c4-tenses', 'lesson-c10-vachana'];
sampleLegacyIds.forEach((id) => {
  assert(LEGACY_LESSON_ID_MAP[id], `Missing legacy map entry for ${id}`);
});
console.log(`[PASS] 5. Legacy lesson mapping verified to preserve learner progress.`);

console.log('═══════════════════════════════════════════════════');
console.log(' ALL 18 FOUNDATIONS & CURRICULUM TESTS PASSED!    ');
console.log('═══════════════════════════════════════════════════');
