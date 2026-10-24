export interface VocabularyItem {
  id: string;
  english: string;
  kannada: string;
  transliteration: string;
  partOfSpeech: string;
  meaning: string;
  topic: string;
  classLevel: string | number;
  difficulty: 'easy' | 'medium' | 'hard';
  example?: {
    kannada: string;
    transliteration: string;
    english: string;
  };
}

export const LOCAL_VOCAB: VocabularyItem[] = [
  // Numbers
  { id: 'v001', english: 'one', kannada: 'ಒಂದು', transliteration: 'ondu', partOfSpeech: 'numeral', meaning: 'Number 1', topic: 'numbers', classLevel: 'beginner', difficulty: 'easy', example: { kannada: 'ನನಗೆ ಒಂದು ಪುಸ್ತಕ ಬೇಕು.', transliteration: 'Nanage ondu pustaka beeku.', english: 'I need one book.' } },
  { id: 'v002', english: 'two', kannada: 'ಎರಡು', transliteration: 'eradu', partOfSpeech: 'numeral', meaning: 'Number 2', topic: 'numbers', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v003', english: 'three', kannada: 'ಮೂರು', transliteration: 'mooru', partOfSpeech: 'numeral', meaning: 'Number 3', topic: 'numbers', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v004', english: 'four', kannada: 'ನಾಲ್ಕು', transliteration: 'naalku', partOfSpeech: 'numeral', meaning: 'Number 4', topic: 'numbers', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v005', english: 'five', kannada: 'ಐದು', transliteration: 'aidu', partOfSpeech: 'numeral', meaning: 'Number 5', topic: 'numbers', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v006', english: 'six', kannada: 'ಆರು', transliteration: 'aaru', partOfSpeech: 'numeral', meaning: 'Number 6', topic: 'numbers', classLevel: 1, difficulty: 'easy' },
  { id: 'v007', english: 'seven', kannada: 'ಏಳು', transliteration: 'eelu', partOfSpeech: 'numeral', meaning: 'Number 7', topic: 'numbers', classLevel: 1, difficulty: 'easy' },
  { id: 'v008', english: 'eight', kannada: 'ಎಂಟು', transliteration: 'entu', partOfSpeech: 'numeral', meaning: 'Number 8', topic: 'numbers', classLevel: 1, difficulty: 'easy' },
  { id: 'v009', english: 'nine', kannada: 'ಒಂಬತ್ತು', transliteration: 'ombattu', partOfSpeech: 'numeral', meaning: 'Number 9', topic: 'numbers', classLevel: 1, difficulty: 'easy' },
  { id: 'v010', english: 'ten', kannada: 'ಹತ್ತು', transliteration: 'hattu', partOfSpeech: 'numeral', meaning: 'Number 10', topic: 'numbers', classLevel: 1, difficulty: 'easy' },

  // Colors
  { id: 'v011', english: 'red', kannada: 'ಕೆಂಪು', transliteration: 'kempu', partOfSpeech: 'adjective', meaning: 'Red color', topic: 'colors', classLevel: 'beginner', difficulty: 'easy', example: { kannada: 'ಇದು ಕೆಂಪು ಗುಲಾಬಿ.', transliteration: 'Idu kempu gulaabi.', english: 'This is a red rose.' } },
  { id: 'v012', english: 'blue', kannada: 'ನೀಲಿ', transliteration: 'neeli', partOfSpeech: 'adjective', meaning: 'Blue color', topic: 'colors', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v013', english: 'green', kannada: 'ಹಸಿರು', transliteration: 'hasiru', partOfSpeech: 'adjective', meaning: 'Green color', topic: 'colors', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v014', english: 'yellow', kannada: 'ಹಳದಿ', transliteration: 'haladi', partOfSpeech: 'adjective', meaning: 'Yellow color', topic: 'colors', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v015', english: 'white', kannada: 'ಬಿಳಿ', transliteration: 'bili', partOfSpeech: 'adjective', meaning: 'White color', topic: 'colors', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v016', english: 'black', kannada: 'ಕಪ್ಪು', transliteration: 'kappu', partOfSpeech: 'adjective', meaning: 'Black color', topic: 'colors', classLevel: 'beginner', difficulty: 'easy' },

  // Fruits & Food
  { id: 'v017', english: 'apple', kannada: 'ಸೇಬು', transliteration: 'seebu', partOfSpeech: 'noun', meaning: 'Apple fruit', topic: 'food', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v018', english: 'mango', kannada: 'ಮಾವಿನ ಹಣ್ಣು', transliteration: 'maavina hannu', partOfSpeech: 'noun', meaning: 'Mango fruit', topic: 'food', classLevel: 1, difficulty: 'easy' },
  { id: 'v019', english: 'banana', kannada: 'ಬಾಳೆ ಹಣ್ಣು', transliteration: 'baale hannu', partOfSpeech: 'noun', meaning: 'Banana fruit', topic: 'food', classLevel: 1, difficulty: 'easy' },
  { id: 'v020', english: 'rice', kannada: 'ಅನ್ನ', transliteration: 'anna', partOfSpeech: 'noun', meaning: 'Cooked rice', topic: 'food', classLevel: 'beginner', difficulty: 'easy', example: { kannada: 'ಬಿಸಿ ಅನ್ನ ತಿನ್ನಿ.', transliteration: 'Bisi anna tinni.', english: 'Eat hot rice.' } },
  { id: 'v021', english: 'milk', kannada: 'ಹಾಲು', transliteration: 'haalu', partOfSpeech: 'noun', meaning: 'Milk', topic: 'food', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v022', english: 'vegetable', kannada: 'ತರಕಾರಿ', transliteration: 'tarakaari', partOfSpeech: 'noun', meaning: 'Vegetables', topic: 'food', classLevel: 2, difficulty: 'easy' },
  { id: 'v023', english: 'water', kannada: 'ನೀರು', transliteration: 'neeru', partOfSpeech: 'noun', meaning: 'Water', topic: 'food', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v024', english: 'tea', kannada: 'ಚಹಾ', transliteration: 'chahaa', partOfSpeech: 'noun', meaning: 'Tea', topic: 'food', classLevel: 1, difficulty: 'easy' },

  // Body Parts
  { id: 'v025', english: 'head', kannada: 'ತಲೆ', transliteration: 'tale', partOfSpeech: 'noun', meaning: 'Head', topic: 'body', classLevel: 1, difficulty: 'easy' },
  { id: 'v026', english: 'eye', kannada: 'ಕಣ್ಣು', transliteration: 'kannu', partOfSpeech: 'noun', meaning: 'Eye', topic: 'body', classLevel: 1, difficulty: 'easy' },
  { id: 'v027', english: 'nose', kannada: 'ಮೂಗು', transliteration: 'moogu', partOfSpeech: 'noun', meaning: 'Nose', topic: 'body', classLevel: 1, difficulty: 'easy' },
  { id: 'v028', english: 'ear', kannada: 'ಕಿವಿ', transliteration: 'kivi', partOfSpeech: 'noun', meaning: 'Ear', topic: 'body', classLevel: 1, difficulty: 'easy' },
  { id: 'v029', english: 'mouth', kannada: 'ಬಾಯಿ', transliteration: 'baayi', partOfSpeech: 'noun', meaning: 'Mouth', topic: 'body', classLevel: 1, difficulty: 'easy' },
  { id: 'v030', english: 'hand', kannada: 'ಕೈ', transliteration: 'kai', partOfSpeech: 'noun', meaning: 'Hand', topic: 'body', classLevel: 1, difficulty: 'easy' },
  { id: 'v031', english: 'leg', kannada: 'ಕಾಲು', transliteration: 'kaalu', partOfSpeech: 'noun', meaning: 'Leg/foot', topic: 'body', classLevel: 1, difficulty: 'easy' },

  // Family
  { id: 'v032', english: 'mother', kannada: 'ತಾಯಿ', transliteration: 'taayi', partOfSpeech: 'noun', meaning: 'Mother', topic: 'family', classLevel: 'beginner', difficulty: 'easy', example: { kannada: 'ನನ್ನ ತಾಯಿ ಪ್ರೀತಿಯುಳ್ಳವರು.', transliteration: 'Nanna taayi preetiyullavaru.', english: 'My mother is loving.' } },
  { id: 'v033', english: 'father', kannada: 'ತಂದೆ', transliteration: 'tande', partOfSpeech: 'noun', meaning: 'Father', topic: 'family', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v034', english: 'brother (elder)', kannada: 'ಅಣ್ಣ', transliteration: 'anna', partOfSpeech: 'noun', meaning: 'Elder brother', topic: 'family', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v035', english: 'sister (elder)', kannada: 'ಅಕ್ಕ', transliteration: 'akka', partOfSpeech: 'noun', meaning: 'Elder sister', topic: 'family', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v036', english: 'grandfather', kannada: 'ತಾತ', transliteration: 'taata', partOfSpeech: 'noun', meaning: 'Grandfather', topic: 'family', classLevel: 1, difficulty: 'easy' },
  { id: 'v037', english: 'grandmother', kannada: 'ಅಜ್ಜಿ', transliteration: 'ajji', partOfSpeech: 'noun', meaning: 'Grandmother', topic: 'family', classLevel: 1, difficulty: 'easy' },
  { id: 'v038', english: 'younger brother', kannada: 'ತಮ್ಮ', transliteration: 'tamma', partOfSpeech: 'noun', meaning: 'Younger brother', topic: 'family', classLevel: 2, difficulty: 'easy' },
  { id: 'v039', english: 'younger sister', kannada: 'ತಂಗಿ', transliteration: 'tangi', partOfSpeech: 'noun', meaning: 'Younger sister', topic: 'family', classLevel: 2, difficulty: 'easy' },

  // Nature & Weather
  { id: 'v040', english: 'sun', kannada: 'ಸೂರ್ಯ', transliteration: 'soorya', partOfSpeech: 'noun', meaning: 'Sun', topic: 'nature', classLevel: 1, difficulty: 'easy' },
  { id: 'v041', english: 'moon', kannada: 'ಚಂದ್ರ', transliteration: 'chandra', partOfSpeech: 'noun', meaning: 'Moon', topic: 'nature', classLevel: 1, difficulty: 'easy' },
  { id: 'v042', english: 'sky', kannada: 'ಆಕಾಶ', transliteration: 'aakaasha', partOfSpeech: 'noun', meaning: 'Sky', topic: 'nature', classLevel: 1, difficulty: 'easy' },
  { id: 'v043', english: 'rain', kannada: 'ಮಳೆ', transliteration: 'male', partOfSpeech: 'noun', meaning: 'Rain', topic: 'weather', classLevel: 'beginner', difficulty: 'easy', example: { kannada: 'ಇಂದು ಜೋರು ಮಳೆ ಬರುತ್ತಿದೆ.', transliteration: 'Indu jooru male baruttide.', english: 'It is raining heavily today.' } },
  { id: 'v044', english: 'tree', kannada: 'ಮರ', transliteration: 'mara', partOfSpeech: 'noun', meaning: 'Tree', topic: 'nature', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v045', english: 'flower', kannada: 'ಹೂವು', transliteration: 'hoovu', partOfSpeech: 'noun', meaning: 'Flower', topic: 'nature', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v046', english: 'hot', kannada: 'ಬಿಸಿ', transliteration: 'bisi', partOfSpeech: 'adjective', meaning: 'Hot', topic: 'weather', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v047', english: 'cold', kannada: 'ತಣ್ಣನೆ', transliteration: 'tannane', partOfSpeech: 'adjective', meaning: 'Cold', topic: 'weather', classLevel: 'beginner', difficulty: 'easy' },

  // School & Education
  { id: 'v048', english: 'school', kannada: 'ಶಾಲೆ', transliteration: 'shaale', partOfSpeech: 'noun', meaning: 'School', topic: 'school', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v049', english: 'teacher', kannada: 'ಶಿಕ್ಷಕ', transliteration: 'shikshaka', partOfSpeech: 'noun', meaning: 'Teacher (male)', topic: 'school', classLevel: 1, difficulty: 'easy' },
  { id: 'v050', english: 'teacher (female)', kannada: 'ಶಿಕ್ಷಕಿ', transliteration: 'shikshaki', partOfSpeech: 'noun', meaning: 'Teacher (female)', topic: 'school', classLevel: 1, difficulty: 'easy' },
  { id: 'v051', english: 'book', kannada: 'ಪುಸ್ತಕ', transliteration: 'pustaka', partOfSpeech: 'noun', meaning: 'Book', topic: 'school', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v052', english: 'pen', kannada: 'ಲೇಖನಿ', transliteration: 'lekhani', partOfSpeech: 'noun', meaning: 'Pen', topic: 'school', classLevel: 2, difficulty: 'medium' },
  { id: 'v053', english: 'student', kannada: 'ವಿದ್ಯಾರ್ಥಿ', transliteration: 'vidyaarthi', partOfSpeech: 'noun', meaning: 'Student', topic: 'school', classLevel: 2, difficulty: 'medium' },

  // Occupations
  { id: 'v054', english: 'farmer', kannada: 'ರೈತ', transliteration: 'raita', partOfSpeech: 'noun', meaning: 'Farmer', topic: 'occupations', classLevel: 3, difficulty: 'easy', example: { kannada: 'ರೈತ ದೇಶದ ಬೆನ್ನೆಲುಬು.', transliteration: 'Raita deshada bennelubu.', english: 'The farmer is the backbone of the nation.' } },
  { id: 'v055', english: 'doctor', kannada: 'ವೈದ್ಯ', transliteration: 'vaidya', partOfSpeech: 'noun', meaning: 'Doctor', topic: 'occupations', classLevel: 3, difficulty: 'medium' },
  { id: 'v056', english: 'police', kannada: 'ಪೊಲೀಸ್', transliteration: 'polees', partOfSpeech: 'noun', meaning: 'Police officer', topic: 'occupations', classLevel: 3, difficulty: 'easy' },
  { id: 'v057', english: 'engineer', kannada: 'ಇಂಜಿನಿಯರ್', transliteration: 'injiniyar', partOfSpeech: 'noun', meaning: 'Engineer', topic: 'occupations', classLevel: 4, difficulty: 'medium' },
  { id: 'v058', english: 'soldier', kannada: 'ಸೈನಿಕ', transliteration: 'sainika', partOfSpeech: 'noun', meaning: 'Soldier', topic: 'occupations', classLevel: 4, difficulty: 'medium' },

  // Transport & Directions
  { id: 'v059', english: 'road', kannada: 'ರಸ್ತೆ', transliteration: 'raste', partOfSpeech: 'noun', meaning: 'Road / street', topic: 'transport', classLevel: 1, difficulty: 'easy' },
  { id: 'v060', english: 'car', kannada: 'ಕಾರು', transliteration: 'kaaru', partOfSpeech: 'noun', meaning: 'Car', topic: 'transport', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v061', english: 'bus', kannada: 'ಬಸ್ಸು', transliteration: 'bassu', partOfSpeech: 'noun', meaning: 'Bus', topic: 'transport', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v062', english: 'train', kannada: 'ರೈಲು', transliteration: 'railu', partOfSpeech: 'noun', meaning: 'Train', topic: 'transport', classLevel: 2, difficulty: 'easy' },
  { id: 'v063', english: 'left', kannada: 'ಎಡ', transliteration: 'eda', partOfSpeech: 'direction', meaning: 'Left side', topic: 'directions', classLevel: 2, difficulty: 'easy' },
  { id: 'v064', english: 'right', kannada: 'ಬಲ', transliteration: 'bala', partOfSpeech: 'direction', meaning: 'Right side', topic: 'directions', classLevel: 2, difficulty: 'easy' },
  { id: 'v065', english: 'straight', kannada: 'ನೇರ', transliteration: 'neera', partOfSpeech: 'direction', meaning: 'Straight ahead', topic: 'directions', classLevel: 2, difficulty: 'easy' },

  // Technology & Modern Terms
  { id: 'v066', english: 'phone', kannada: 'ದೂರವಾಣಿ / ಫೋನ್', transliteration: 'dooravaani / phon', partOfSpeech: 'noun', meaning: 'Telephone/Phone', topic: 'technology', classLevel: 3, difficulty: 'medium' },
  { id: 'v067', english: 'computer', kannada: 'ಗಣಕಯಂತ್ರ / ಕಂಪ್ಯೂಟರ್', transliteration: 'ganakayantra / kampyootar', partOfSpeech: 'noun', meaning: 'Computer', topic: 'technology', classLevel: 4, difficulty: 'hard' },
  { id: 'v068', english: 'internet', kannada: 'ಅಂತರ್ಜಾಲ', transliteration: 'antarjaala', partOfSpeech: 'noun', meaning: 'Internet', topic: 'technology', classLevel: 5, difficulty: 'hard' },

  // Emotions & Common Expressions
  { id: 'v069', english: 'happiness', kannada: 'ಸಂತೋಷ', transliteration: 'santosha', partOfSpeech: 'noun', meaning: 'Happiness / Joy', topic: 'emotions', classLevel: 3, difficulty: 'medium' },
  { id: 'v070', english: 'sorrow', kannada: 'ದುಃಖ', transliteration: 'duhkha', partOfSpeech: 'noun', meaning: 'Sadness / Sorrow', topic: 'emotions', classLevel: 3, difficulty: 'medium' },
  { id: 'v071', english: 'peace', kannada: 'ಶಾಂತಿ', transliteration: 'shaanti', partOfSpeech: 'noun', meaning: 'Peace', topic: 'emotions', classLevel: 4, difficulty: 'medium' },
  { id: 'v072', english: 'anger', kannada: 'ಕೋಪ', transliteration: 'kopa', partOfSpeech: 'noun', meaning: 'Anger', topic: 'emotions', classLevel: 3, difficulty: 'medium' },

  // Shopping & Civics
  { id: 'v073', english: 'money', kannada: 'ಹಣ', transliteration: 'hana', partOfSpeech: 'noun', meaning: 'Money / Currency', topic: 'shopping', classLevel: 'beginner', difficulty: 'easy' },
  { id: 'v074', english: 'price', kannada: 'ಬೆಲೆ', transliteration: 'bele', partOfSpeech: 'noun', meaning: 'Price / Cost', topic: 'shopping', classLevel: 1, difficulty: 'easy' },
  { id: 'v075', english: 'shop', kannada: 'ಅಂಗಡಿ', transliteration: 'angadi', partOfSpeech: 'noun', meaning: 'Shop / Store', topic: 'shopping', classLevel: 1, difficulty: 'easy' },
  { id: 'v076', english: 'village', kannada: 'ಹಳ್ಳಿ', transliteration: 'halli', partOfSpeech: 'noun', meaning: 'Village', topic: 'civics', classLevel: 2, difficulty: 'easy' },
  { id: 'v077', english: 'city', kannada: 'ನಗರ', transliteration: 'nagara', partOfSpeech: 'noun', meaning: 'City', topic: 'civics', classLevel: 2, difficulty: 'easy' },
  { id: 'v078', english: 'country', kannada: 'ದೇಶ', transliteration: 'desha', partOfSpeech: 'noun', meaning: 'Country / Nation', topic: 'civics', classLevel: 3, difficulty: 'easy' },
  { id: 'v079', english: 'state', kannada: 'ರಾಜ್ಯ', transliteration: 'raajya', partOfSpeech: 'noun', meaning: 'State / Realm', topic: 'civics', classLevel: 3, difficulty: 'medium' },
  { id: 'v080', english: 'constitution', kannada: 'ಸಂವಿಧಾನ', transliteration: 'samvidhaana', partOfSpeech: 'noun', meaning: 'Constitution', topic: 'civics', classLevel: 6, difficulty: 'hard' }
];
