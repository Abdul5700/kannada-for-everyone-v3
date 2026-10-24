export interface TopicOption {
  value: string;
  label: string;
  labelKn?: string;
}

export const CLASS_TOPICS_MAP: Record<string, TopicOption[]> = {
  beginner: [
    { value: 'Greetings and Daily Communication', label: 'Greetings and Daily Communication', labelKn: 'ಶುಭಾಶಯಗಳು ಮತ್ತು ದಿನನಿತ್ಯದ ಮಾತುಕತೆ' },
    { value: 'Vowels (Swaragalu) & Kannada Alphabet', label: 'Vowels (ಸ್ವರಗಳು) & Basic Letters', labelKn: 'ಸ್ವರಗಳು ಮತ್ತು ಅಕ್ಷರಮಾಲೆ' },
    { value: 'Numbers 1 to 20', label: 'Numbers 1 to 20 (ಅಂಕಿಗಳು)', labelKn: 'ಅಂಕಿಗಳು ೧-೨೦' },
    { value: 'Colors and Shapes', label: 'Colors and Shapes (ಬಣ್ಣಗಳು)', labelKn: 'ಬಣ್ಣಗಳು ಮತ್ತು ಆಕಾರಗಳು' },
    { value: 'Family Members and Relations', label: 'Family Relations (ಕುಟುಂಬದ ಸಂಬಂಧಗಳು)', labelKn: 'ಕುಟುಂಬದ ಸದಸ್ಯರು' },
    { value: 'Common Fruits and Vegetables', label: 'Fruits & Vegetables (ಹಣ್ಣು-ತರಕಾರಿಗಳು)', labelKn: 'ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿಗಳು' },
  ],
  '1': [
    { value: 'Kannada Alphabet (Vowels and Consonants)', label: 'Vowels & Consonants (ಸ್ವರಗಳು - ವ್ಯಂಜನಗಳು)', labelKn: 'ವರ್ಣಮಾಲೆ ಪರಿಚಯ' },
    { value: 'Simple Two-Letter Words', label: 'Simple Two-Letter Words (ಸರಳ ಪದಗಳು)', labelKn: 'ಸರಳ ಎರಡು ಅಕ್ಷರದ ಪದಗಳು' },
    { value: 'Numbers 1 to 30', label: 'Numbers 1 to 30 (ಅಂಕಿಗಳು)', labelKn: 'ಸಂಖ್ಯೆಗಳು ೧ ರಿಂದ ೩೦' },
    { value: 'Parts of the Body', label: 'Parts of the Body (ದೇಹದ ಅಂಗಗಳು)', labelKn: 'ದೇಹದ ಭಾಗಗಳು' },
    { value: 'Animals and Birds', label: 'Animals and Birds (ಪ್ರಾಣಿ-ಪಕ್ಷಿಗಳು)', labelKn: 'ಪ್ರಾಣಿ ಮತ್ತು ಪಕ್ಷಿಗಳು' },
  ],
  '2': [
    { value: 'Gunithakshara (Syllabic Signs)', label: 'Gunithakshara (ಗುಣಿತಾಕ್ಷರಗಳು)', labelKn: 'ಗುಣಿತಾಕ್ಷರಗಳು' },
    { value: 'Simple Everyday Sentences', label: 'Simple Everyday Sentences (ಸರಳ ವಾಕ್ಯಗಳು)', labelKn: 'ದೈನಂದಿನ ಸರಳ ವಾಕ್ಯಗಳು' },
    { value: 'Our School and Classroom', label: 'Our School and Classroom (ನಮ್ಮ ಶಾಲೆ)', labelKn: 'ಶಾಲೆ ಮತ್ತು ತರಗತಿ' },
    { value: 'Days of the Week and Months', label: 'Days of the Week & Months (ವಾರಗಳು ಮತ್ತು ಮಾಸಗಳು)', labelKn: 'ವಾರಗಳು ಮತ್ತು ತಿಂಗಳುಗಳು' },
    { value: 'Numbers 1 to 50', label: 'Numbers 1 to 50 (ಅಂಕಿಗಳು)', labelKn: 'ಅಂಕಿಗಳು ೧ ರಿಂದ ೫೦' },
  ],
  '3': [
    { value: 'Othakshara (Compound Consonants)', label: 'Othakshara - Sajatiya & Vijatiya (ಒತ್ತಕ್ಷರಗಳು)', labelKn: 'ಒತ್ತಕ್ಷರಗಳು' },
    { value: 'Action Words and Verbs', label: 'Action Words & Verbs (ಕ್ರಿಯಾಪದಗಳು)', labelKn: 'ಕ್ರಿಯಾಪದಗಳು' },
    { value: 'Opposite Words and Synonyms', label: 'Opposite Words (ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು)', labelKn: 'ವಿರುದ್ಧ ಪದಗಳು' },
    { value: 'Simple Story Reading & Comprehension', label: 'Reading Comprehension (ಸಣ್ಣ ಕಥೆಗಳು)', labelKn: 'ವಾಚನ ಮತ್ತು ಗ್ರಹಿಕೆ' },
    { value: 'Daily Routines and Time', label: 'Daily Routines & Time (ದೈನಂದಿನ ಚಟುವಟಿಕೆ)', labelKn: 'ದಿನಚರಿ ಮತ್ತು ಸಮಯ' },
  ],
  '4': [
    { value: 'Three Tenses - Past, Present, Future', label: 'Three Tenses (ಭೂತ, ವರ್ತಮಾನ, ಭವಿಷ್ಯತ್ ಕಾಲ)', labelKn: 'ಕಾಲಗಳು (ಭೂತ/ವರ್ತಮಾನ/ಭವಿಷ್ಯತ್)' },
    { value: 'Adjectives and Descriptive Words', label: 'Adjectives (ಗುಣವಿಶೇಷಣಗಳು)', labelKn: 'ಗುಣವಿಶೇಷಣಗಳು' },
    { value: 'Singular and Plural Nouns', label: 'Singular & Plural (ಏಕವಚನ - ಬಹುವಚನ)', labelKn: 'ವಚನಗಳು' },
    { value: 'Genders in Kannada Grammar', label: 'Genders (ಲಿಂಗಗಳು - ಪುಲ್ಲಿಂಗ, ಸ್ತ್ರೀಲಿಂಗ, ನಪುಂಸಕಲಿಂಗ)', labelKn: 'ಲಿಂಗಗಳು' },
    { value: 'Numbers 1 to 100 with Spellings', label: 'Numbers 1 to 100 (ಸಂಖ್ಯಾವಾಚಕಗಳು)', labelKn: 'ಸಂಖ್ಯೆಗಳು ೧ ರಿಂದ ೧೦೦' },
  ],
  '5': [
    { value: 'Vibhakti Pratyayagalu (Case Endings)', label: 'Vibhakti Pratyaya (ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು)', labelKn: 'ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು' },
    { value: 'Kannada Sandhigalu (Lopa, Aagama, Aadesha)', label: 'Kannada Sandhigalu (ಕನ್ನಡ ಸಂಧಿಗಳು)', labelKn: 'ಕನ್ನಡ ಸಂಧಿಗಳು' },
    { value: 'Occupations and Community Helpers', label: 'Occupations & Society (ವೃತ್ತಿಗಳು ಮತ್ತು ಸಮಾಜ)', labelKn: 'ವೃತ್ತಿಗಳು' },
    { value: 'Paragraph Comprehension and Questions', label: 'Reading Passages & Questions (ಪ್ಯಾರಾಗ್ರಾಫ್ ವಾಚನ)', labelKn: 'ಗದ್ಯ ಭಾಗ ಗ್ರಹಿಕೆ' },
    { value: 'Sentences: Types and Construction', label: 'Sentence Construction (ವಾಕ್ಯ ರಚನೆ)', labelKn: 'ವಾಕ್ಯ ರಚನೆ' },
  ],
  '6': [
    { value: 'Sanskrit Sandhigalu (Savarnadeergha, Guna, Vriddhi)', label: 'Sanskrit Sandhis (ಸಂಸ್ಕೃತ ಸಂಧಿಗಳು)', labelKn: 'ಸಂಸ್ಕೃತ ಸಂಧಿಗಳು' },
    { value: 'Samasagalu (Compound Words)', label: 'Samasagalu (ಸಮಾಸಗಳು)', labelKn: 'ಸಮಾಸಗಳು' },
    { value: 'Karnataka Heritage, Geography and Rivers', label: 'Karnataka Heritage & Rivers (ಕರ್ನಾಟಕದ ಪರಂಪರೆ)', labelKn: 'ಕರ್ನಾಟಕ ಪರಂಪರೆ' },
    { value: 'Proverbs (Gaadegalu) with Meanings', label: 'Proverbs (ಗಾದೆ ಮಾತುಗಳು)', labelKn: 'ಗಾದೆ ಮಾತುಗಳು' },
    { value: 'Letter Writing - Informal and Permission Letters', label: 'Letter Writing (ಪತ್ರ ಲೇಖನ)', labelKn: 'ಪತ್ರ ಲೇಖನ' },
  ],
  '7': [
    { value: 'Tatsama and Tadbhava Words', label: 'Tatsama - Tadbhava (ತತ್ಸಮ - ತದ್ಭವ)', labelKn: 'ತತ್ಸಮ - ತದ್ಭವ ಪದಗಳು' },
    { value: 'Kridanta and Taddhitanta', label: 'Kridanta and Taddhitanta (ಕೃದಂತ - ತದ್ಧಿತಾಂತ)', labelKn: 'ಕೃದಂತ ಮತ್ತು ತದ್ಧಿತಾಂತ' },
    { value: 'Alankara (Upama, Rupaka)', label: 'Alankara Figures of Speech (ಅಲಂಕಾರಗಳು)', labelKn: 'ಅಲಂಕಾರಗಳು' },
    { value: 'Vachana Sahitya (Basavanna, Akka Mahadevi)', label: 'Vachana Sahitya (ವಚನ ಸಾಹಿತ್ಯ ಪರಿಚಯ)', labelKn: 'ವಚನ ಸಾಹಿತ್ಯ' },
    { value: 'Formal Letter and Essay Writing', label: 'Formal Letter & Essay Writing (ಪ್ರಬಂಧ ಲೇಖನ)', labelKn: 'ಪ್ರಬಂಧ ಮತ್ತು ಪತ್ರ ಲೇಖನ' },
  ],
  '8': [
    { value: 'Chhandassu (Matra and Akshara Gana)', label: 'Chhandassu - Prosody (ಛಂದಸ್ಸು)', labelKn: 'ಛಂದಸ್ಸು' },
    { value: 'Dvirukti and Jodu Nudi Words', label: 'Dvirukti and Jodu Nudi (ದ್ವಿರುಕ್ತಿ - ಜೋಡುನುಡಿ)', labelKn: 'ದ್ವಿರುಕ್ತಿ ಮತ್ತು ಜೋಡುನುಡಿ' },
    { value: 'Halegannada (Old Kannada) Basics & Poetry', label: 'Halegannada Poetry (ಹಳಗನ್ನಡ ಕಾವ್ಯ ಪ್ರವೇಶ)', labelKn: 'ಹಳಗನ್ನಡ ಕಾವ್ಯ' },
    { value: 'Active and Passive Voice (Karthari - Karmani)', label: 'Voice in Kannada (ಕರ್ತರಿ - ಕರ್ಮಣಿ ಪ್ರಯೋಗ)', labelKn: 'ಕರ್ತರಿ - ಕರ್ಮಣಿ ಪ್ರಯೋಗ' },
    { value: 'Unseen Prose Comprehension and Summary', label: 'Advanced Comprehension (ಅಪರಿಚಿತ ಗದ್ಯ ವಾಚನ)', labelKn: 'ಅಪರಿಚಿತ ಗದ್ಯ' },
  ],
  '9': [
    { value: 'Kavya Lakshana and Rasa Siddhanta', label: 'Kavya Lakshana & Navarasa (ಕಾವ್ಯ ಲಕ್ಷಣ ಮತ್ತು ರಸಗಳು)', labelKn: 'ಕಾವ್ಯ ಲಕ್ಷಣ ಮತ್ತು ರಸಗಳು' },
    { value: 'All Major Sandhis and Complex Samasas', label: 'Comprehensive Sandhi & Samasa (ಸಂಧಿ-ಸಮಾಸ ಸಮಗ್ರ)', labelKn: 'ಸಂಧಿ ಮತ್ತು ಸಮಾಸ ಸಮಗ್ರ' },
    { value: 'Dasa Sahitya and Keerthanas (Purandara, Kanaka Dasa)', label: 'Dasa Sahitya (ದಾಸ ಸಾಹಿತ್ಯ)', labelKn: 'ದಾಸ ಸಾಹಿತ್ಯ' },
    { value: 'Idioms, Nanudi and Historical Expressions', label: 'Idioms & Nuḍigaṭṭu (ನುಡಿಗಟ್ಟುಗಳು)', labelKn: 'ನುಡಿಗಟ್ಟುಗಳು' },
    { value: 'Official Correspondence & Report Writing', label: 'Official Correspondence (ವರದಿ ಮತ್ತು ಅಧಿಕೃತ ಪತ್ರ)', labelKn: 'ಅಧಿಕೃತ ಪತ್ರ ವ್ಯವಹಾರ' },
  ],
  '10': [
    { value: 'SSLC Board Examination Model Preparation', label: 'SSLC Board Exam Complete Preparation', labelKn: 'ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ ಪರೀಕ್ಷಾ ಸಿದ್ಧತೆ' },
    { value: 'Complete Kannada Grammar Blueprint (Samagra Vyakarana)', label: 'Complete Grammar Blueprint (ಸಮಗ್ರ ವ್ಯಾಕರಣ)', labelKn: 'ಸಮಗ್ರ ವ್ಯಾಕರಣ ಬ್ಲೂಪ್ರಿಂಟ್' },
    { value: 'Classic Kannada Literature (Ranna, Pampa, Harihara)', label: 'Classic Literature & Poets (ಪಂಪ, ರನ್ನ, ಜನ್ನ)', labelKn: 'ಪ್ರಾಚೀನ ಕವಿ ಕಾವ್ಯ ಪರಿಚಯ' },
    { value: 'Modern Kannada Literature (Navodaya, Pragatisheela, Navya)', label: 'Modern Literature (ನವೋದಯ, ಪ್ರಗತಿಶೀಲ, ನವ್ಯ)', labelKn: 'ಆಧುನಿಕ ಸಾಹಿತ್ಯ' },
    { value: 'Analytical Essay Writing and Critical Appreciation', label: 'Critical Appreciation & Essays (ವಿಮರ್ಶಾತ್ಮಕ ಪ್ರಬಂಧ)', labelKn: 'ವಿಮರ್ಶಾತ್ಮಕ ಪ್ರಬಂಧ' },
  ],
};

export const getDefaultTopicForClass = (classLevel: string | number): string => {
  const key = String(classLevel).toLowerCase();
  const list = CLASS_TOPICS_MAP[key] || CLASS_TOPICS_MAP['beginner'];
  return list[0]?.value || 'Greetings and Daily Communication';
};
