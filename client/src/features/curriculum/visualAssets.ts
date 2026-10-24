// Dictionary of high-quality visual icons/emojis and illustrative SVG graphics for Kannada learning concepts

export interface VisualIllustration {
  emoji?: string;
  badgeBg?: string;
  category?: string;
  imageHint?: string;
}

export const KANNADA_VISUAL_MAP: Record<string, VisualIllustration> = {
  // Swaras (Vowels) & Key Alphabet Mappings
  'ಅ': { emoji: '🤱', badgeBg: 'bg-rose-50 border-rose-200 text-rose-700', imageHint: 'ಅಮ್ಮ (Mother)' },
  'ಆ': { emoji: '🐘', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'ಆನೆ (Elephant)' },
  'ಇ': { emoji: '🐭', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'ಇಲಿ (Mouse / Rat)' },
  'ಈ': { emoji: '🏊‍♂️', badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-700', imageHint: 'ಈಜು (Swimming)' },
  'ಉ': { emoji: '🎁', badgeBg: 'bg-purple-50 border-purple-200 text-purple-700', imageHint: 'ಉಡುಗೊರೆ (Gift)' },
  'ಊ': { emoji: '🍛', badgeBg: 'bg-orange-50 border-orange-200 text-orange-700', imageHint: 'ಊಟ (Meal / Food)' },
  'ಋ': { emoji: '🧘‍♂️', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700', imageHint: 'ಋಷಿ (Sage)' },
  'ಎ': { emoji: '🍃', badgeBg: 'bg-green-50 border-green-200 text-green-700', imageHint: 'ಎಲೆ (Leaf)' },
  'ಏ': { emoji: '🪜', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'ಏಣಿ (Ladder)' },
  'ಐ': { emoji: '🖐️', badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-700', imageHint: 'ಐದು (Five)' },
  'ಒ': { emoji: '🐪', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'ಒಂಟೆ (Camel)' },
  'ಓ': { emoji: '🏃‍♂️', badgeBg: 'bg-red-50 border-red-200 text-red-700', imageHint: 'ಓಟ (Running)' },
  'ಔ': { emoji: '💊', badgeBg: 'bg-teal-50 border-teal-200 text-teal-700', imageHint: 'ಔಷಧ (Medicine)' },
  'ಅಂ': { emoji: '🏪', badgeBg: 'bg-sky-50 border-sky-200 text-sky-700', imageHint: 'ಅಂಗಡಿ (Shop)' },
  'ಅಃ': { emoji: '🙏', badgeBg: 'bg-violet-50 border-violet-200 text-violet-700', imageHint: 'ನಮಃ (Namah)' },

  // Vyanjanas (Consonants)
  'ಕ': { emoji: '🪷', badgeBg: 'bg-pink-50 border-pink-200 text-pink-700', imageHint: 'ಕಮಲ (Lotus)' },
  'ಖ': { emoji: '⚔️', badgeBg: 'bg-slate-50 border-slate-200 text-slate-700', imageHint: 'ಖಡ್ಗ (Sword)' },
  'ಗ': { emoji: '🐘', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'ಗಣೇಶ (Ganesha)' },
  'ಘ': { emoji: '🔔', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'ಘಂಟೆ (Bell)' },
  'ಙ': { emoji: '📜', badgeBg: 'bg-stone-50 border-stone-200 text-stone-700', imageHint: 'ವಾಙ್ಮಯ (Literature)' },
  'ಚ': { emoji: '🥄', badgeBg: 'bg-gray-50 border-gray-200 text-gray-700', imageHint: 'ಚಮಚ (Spoon)' },
  'ಛ': { emoji: '☂️', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'ಛತ್ರಿ (Umbrella)' },
  'ಜ': { emoji: '💧', badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-700', imageHint: 'ಜಲ (Water)' },
  'ಝ': { emoji: '🌊', badgeBg: 'bg-sky-50 border-sky-200 text-sky-700', imageHint: 'ಝರಿ (Waterfall)' },
  'ಞ': { emoji: '🧠', badgeBg: 'bg-purple-50 border-purple-200 text-purple-700', imageHint: 'ಜ್ಞಾನ (Wisdom)' },
  'ಟ': { emoji: '🍅', badgeBg: 'bg-red-50 border-red-200 text-red-700', imageHint: 'ಟೊಮೆಟೊ (Tomato)' },
  'ಠ': { emoji: '🪑', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'ಠವಣೆ (Seat / Throne)' },
  'ಡ': { emoji: '🪘', badgeBg: 'bg-orange-50 border-orange-200 text-orange-700', imageHint: 'ಡಮರು (Damaru)' },
  'ಢ': { emoji: '🥁', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'ಢಕ್ಕೆ (Large Drum)' },
  'ಣ': { emoji: '🏹', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700', imageHint: 'ಬಾಣ (Arrow)' },
  'ತ': { emoji: '🪘', badgeBg: 'bg-lime-50 border-lime-200 text-lime-700', imageHint: 'ತಬಲ (Tabla)' },
  'ಥ': { emoji: '✨', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'ಥಳಥಳ (Glitter)' },
  'ದ': { emoji: '🌾', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'ದವಸ (Grains)' },
  'ಧ': { emoji: '🏹', badgeBg: 'bg-stone-50 border-stone-200 text-stone-700', imageHint: 'ಧನುಸ್ಸು (Bow)' },
  'ನ': { emoji: '🚰', badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-700', imageHint: 'ನಳ (Tap)' },
  'ಪ': { emoji: '🪁', badgeBg: 'bg-purple-50 border-purple-200 text-purple-700', imageHint: 'ಪಟ (Kite)' },
  'ಫ': { emoji: '🍎', badgeBg: 'bg-red-50 border-red-200 text-red-700', imageHint: 'ಫಲ (Fruit)' },
  'ಬ': { emoji: '🐂', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'ಬಸವ (Bull)' },
  'ಭ': { emoji: '🏛️', badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-700', imageHint: 'ಭವನ (Mansion)' },
  'ಮ': { emoji: '🌳', badgeBg: 'bg-green-50 border-green-200 text-green-700', imageHint: 'ಮರ (Tree)' },
  'ಯ': { emoji: '⚙️', badgeBg: 'bg-slate-50 border-slate-200 text-slate-700', imageHint: 'ಯಂತ್ರ (Machine)' },
  'ರ': { emoji: '🎠', badgeBg: 'bg-red-50 border-red-200 text-red-700', imageHint: 'ರಥ (Chariot)' },
  'ಲ': { emoji: '🌿', badgeBg: 'bg-green-50 border-green-200 text-green-700', imageHint: 'ಲತೆ (Vine)' },
  'ವ': { emoji: '🌲', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700', imageHint: 'ವನ (Forest)' },
  'ಶ': { emoji: '🏹', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'ಶರ (Arrow)' },
  'ಷ': { emoji: '🪖', badgeBg: 'bg-violet-50 border-violet-200 text-violet-700', imageHint: 'ಷಣ್ಮುಖ (Shanmukha)' },
  'ಸ': { emoji: '🎭', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'ಸರಸ (Playful)' },
  'ಹ': { emoji: '🦢', badgeBg: 'bg-teal-50 border-teal-200 text-teal-700', imageHint: 'ಹಂಸ (Swan)' },
  'ಳ': { emoji: '🏺', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'ಕಳಶ (Kalasha)' },

  // Body Parts (ಶರೀರ ಪರಿಚಯ)
  'ತಲೆ': { emoji: '🗣️', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Head' },
  'ಕಣ್ಣು': { emoji: '👁️', badgeBg: 'bg-sky-50 border-sky-200 text-sky-800', imageHint: 'Eye' },
  'ಕಿವಿ': { emoji: '👂', badgeBg: 'bg-orange-50 border-orange-200 text-orange-800', imageHint: 'Ear' },
  'ಮೂಗು': { emoji: '👃', badgeBg: 'bg-rose-50 border-rose-200 text-rose-800', imageHint: 'Nose' },
  'ಬಾಯಿ': { emoji: '👄', badgeBg: 'bg-pink-50 border-pink-200 text-pink-800', imageHint: 'Mouth' },
  'ಹಲ್ಲು': { emoji: '🦷', badgeBg: 'bg-slate-50 border-slate-200 text-slate-800', imageHint: 'Teeth' },
  'ನಾಲಿಗೆ': { emoji: '👅', badgeBg: 'bg-red-50 border-red-200 text-red-800', imageHint: 'Tongue' },
  'ಕೂದಲು': { emoji: '💇', badgeBg: 'bg-stone-50 border-stone-200 text-stone-800', imageHint: 'Hair' },
  'ಕೈ': { emoji: '✋', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Hand / Arm' },
  'ಬೆರಳು': { emoji: '☝️', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-800', imageHint: 'Finger' },
  'ಕಾಲು': { emoji: '🦵', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800', imageHint: 'Leg' },
  'ಮೊಣಕಾಲು': { emoji: '🧎', badgeBg: 'bg-teal-50 border-teal-200 text-teal-800', imageHint: 'Knee' },
  'ಪಾದ': { emoji: '🦶', badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800', imageHint: 'Foot' },
  'ಕುತ್ತಿಗೆ': { emoji: '🧣', badgeBg: 'bg-purple-50 border-purple-200 text-purple-800', imageHint: 'Neck' },
  'ಹೊಟ್ಟೆ': { emoji: '🤰', badgeBg: 'bg-lime-50 border-lime-200 text-lime-800', imageHint: 'Stomach' },

  // Animals (ಪ್ರಾಣಿಗಳು)
  'ಆನೆ': { emoji: '🐘', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Elephant' },
  'ಹುಲಿ': { emoji: '🐅', badgeBg: 'bg-orange-50 border-orange-200 text-orange-800', imageHint: 'Tiger' },
  'ಸಿಂಹ': { emoji: '🦁', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-800', imageHint: 'Lion' },
  'ಹಸು': { emoji: '🐄', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800', imageHint: 'Cow' },
  'ನಾಯಿ': { emoji: '🐕', badgeBg: 'bg-stone-50 border-stone-200 text-stone-800', imageHint: 'Dog' },
  'ಬೆಕ್ಕು': { emoji: '🐈', badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800', imageHint: 'Cat' },
  'ಕುದುರೆ': { emoji: '🐎', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Horse' },
  'ಜಿಂಕೆ': { emoji: '🦌', badgeBg: 'bg-rose-50 border-rose-200 text-rose-800', imageHint: 'Deer' },
  'ಕುರಿ': { emoji: '🐑', badgeBg: 'bg-slate-50 border-slate-200 text-slate-800', imageHint: 'Sheep' },
  'ಕರಡಿ': { emoji: '🐻', badgeBg: 'bg-stone-50 border-stone-200 text-stone-800', imageHint: 'Bear' },
  'ಕೋತಿ': { emoji: '🐒', badgeBg: 'bg-orange-50 border-orange-200 text-orange-800', imageHint: 'Monkey' },
  'ಒಂಟೆ': { emoji: '🐪', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-800', imageHint: 'Camel' },
  'ಇಲಿ': { emoji: '🐁', badgeBg: 'bg-gray-50 border-gray-200 text-gray-800', imageHint: 'Mouse' },

  // Birds (ಪಕ್ಷಿಗಳು)
  'ನವಿಲು': { emoji: '🦚', badgeBg: 'bg-teal-50 border-teal-200 text-teal-800', imageHint: 'Peacock' },
  'ಗಿಳಿ': { emoji: '🦜', badgeBg: 'bg-green-50 border-green-200 text-green-800', imageHint: 'Parrot' },
  'ಕಾಗೆ': { emoji: '🐦‍⬛', badgeBg: 'bg-gray-50 border-gray-200 text-gray-800', imageHint: 'Crow' },
  'ಕೋಗಿಲೆ': { emoji: '🕊️', badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-800', imageHint: 'Cuckoo' },
  'ಪಾರಿವಾಳ': { emoji: '🐦', badgeBg: 'bg-blue-50 border-blue-200 text-blue-800', imageHint: 'Pigeon' },
  'ಹದ್ದು': { emoji: '🦅', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Eagle' },
  'ಬಾತುಕೋಳಿ': { emoji: '🦆', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800', imageHint: 'Duck' },

  // Fruits (ಹಣ್ಣುಗಳು)
  'ಮಾವಿನ ಹಣ್ಣು': { emoji: '🥭', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Mango' },
  'ಬಾಳೆಹಣ್ಣು': { emoji: '🍌', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-800', imageHint: 'Banana' },
  'ಸೇಬು': { emoji: '🍎', badgeBg: 'bg-red-50 border-red-200 text-red-800', imageHint: 'Apple' },
  'ದಾಳಿಂಬೆ': { emoji: '🫐', badgeBg: 'bg-rose-50 border-rose-200 text-rose-800', imageHint: 'Pomegranate' },
  'ದ್ರಾಕ್ಷಿ': { emoji: '🍇', badgeBg: 'bg-purple-50 border-purple-200 text-purple-800', imageHint: 'Grapes' },
  'ಹಲಸಿನ ಹಣ್ಣು': { emoji: '🍈', badgeBg: 'bg-lime-50 border-lime-200 text-lime-800', imageHint: 'Jackfruit' },

  // Vegetables & Food
  'ಬದನೆಕಾಯಿ': { emoji: '🍆', badgeBg: 'bg-purple-50 border-purple-200 text-purple-800', imageHint: 'Brinjal' },
  'ಆಲೂಗಡ್ಡೆ': { emoji: '🥔', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Potato' },
  'ಈರುಳ್ಳಿ': { emoji: '🧅', badgeBg: 'bg-rose-50 border-rose-200 text-rose-800', imageHint: 'Onion' },
  'ಟೊಮೆಟೊ': { emoji: '🍅', badgeBg: 'bg-red-50 border-red-200 text-red-800', imageHint: 'Tomato' },
  'ಬೆಂಡೆಕಾಯಿ': { emoji: '🥒', badgeBg: 'bg-green-50 border-green-200 text-green-800', imageHint: 'Ladyfinger' },
  'ಅನ್ನ': { emoji: '🍚', badgeBg: 'bg-slate-50 border-slate-200 text-slate-800', imageHint: 'Rice' },
  'ಹಾಲು': { emoji: '🥛', badgeBg: 'bg-sky-50 border-sky-200 text-sky-800', imageHint: 'Milk' },
  'ದೋಸೆ': { emoji: '🥞', badgeBg: 'bg-amber-50 border-amber-200 text-amber-800', imageHint: 'Dosa' },
  'ರಾಗಿ ಮುದ್ದೆ': { emoji: '🟤', badgeBg: 'bg-stone-50 border-stone-200 text-stone-800', imageHint: 'Ragi Mudde' },

  // Colors
  'ಕೆಂಪು': { emoji: '🔴', badgeBg: 'bg-red-50 border-red-200 text-red-700', imageHint: 'Red' },
  'ನೀಲಿ': { emoji: '🔵', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'Blue' },
  'ಹಸಿರು': { emoji: '🟢', badgeBg: 'bg-green-50 border-green-200 text-green-700', imageHint: 'Green' },
  'ಹಳದಿ': { emoji: '🟡', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'Yellow' },
  'ಬಿಳಿ': { emoji: '⚪', badgeBg: 'bg-gray-50 border-gray-200 text-gray-700', imageHint: 'White' },
  'ಕಪ್ಪು': { emoji: '⚫', badgeBg: 'bg-stone-900 border-stone-700 text-stone-100', imageHint: 'Black' },
  'ಕಿತ್ತಳೆ': { emoji: '🟠', badgeBg: 'bg-orange-50 border-orange-200 text-orange-700', imageHint: 'Orange' },
  'ಗುಲಾಬಿ': { emoji: '🌸', badgeBg: 'bg-pink-50 border-pink-200 text-pink-700', imageHint: 'Pink' },

  // Nature
  'ಮಳೆ': { emoji: '🌧️', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'Rain' },
  'ಬಿಸಿಲು': { emoji: '☀️', badgeBg: 'bg-yellow-50 border-yellow-200 text-yellow-700', imageHint: 'Sunshine' },
  'ಗಾಳಿ': { emoji: '💨', badgeBg: 'bg-teal-50 border-teal-200 text-teal-700', imageHint: 'Wind' },
  'ನೀರು': { emoji: '💧', badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-700', imageHint: 'Water' },
  'ಮರ': { emoji: '🌳', badgeBg: 'bg-green-50 border-green-200 text-green-700', imageHint: 'Tree' },
  'ಹೂವು': { emoji: '🌸', badgeBg: 'bg-pink-50 border-pink-200 text-pink-700', imageHint: 'Flower' },
  'ಎಲೆ': { emoji: '🍃', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700', imageHint: 'Leaf' },

  // Family
  'ಅಮ್ಮ': { emoji: '👩', badgeBg: 'bg-rose-50 border-rose-200 text-rose-700', imageHint: 'Mother' },
  'ಅಪ್ಪ': { emoji: '👨', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'Father' },
  'ಅಣ್ಣ': { emoji: '👦', badgeBg: 'bg-amber-50 border-amber-200 text-amber-700', imageHint: 'Elder Brother' },
  'ಅಕ್ಕ': { emoji: '👧', badgeBg: 'bg-purple-50 border-purple-200 text-purple-700', imageHint: 'Elder Sister' },
  'ತಾತ': { emoji: '👴', badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700', imageHint: 'Grandfather' },
  'ಅಜ್ಜಿ': { emoji: '👵', badgeBg: 'bg-pink-50 border-pink-200 text-pink-700', imageHint: 'Grandmother' },
  'ತಾಯಿ': { emoji: '👩', badgeBg: 'bg-rose-50 border-rose-200 text-rose-700', imageHint: 'Mother' },
  'ತಂದೆ': { emoji: '👨', badgeBg: 'bg-blue-50 border-blue-200 text-blue-700', imageHint: 'Father' },
};

/**
 * Helper to match an item to an illustration emoji and badge style
 */
export function getVisualIllustration(
  primaryKey: string,
  wordKey?: string,
  exampleWord?: string,
  meaning?: string
): VisualIllustration | null {
  const clean = (s?: string) => (s || '').trim();

  // Try exact match on primary
  if (primaryKey && KANNADA_VISUAL_MAP[clean(primaryKey)]) {
    return KANNADA_VISUAL_MAP[clean(primaryKey)];
  }

  // Try exact match on wordKey
  if (wordKey && KANNADA_VISUAL_MAP[clean(wordKey)]) {
    return KANNADA_VISUAL_MAP[clean(wordKey)];
  }

  // Try exampleWord (e.g. for alphabet 'ಆ' -> 'ಆನೆ' or 'ಕ' -> 'ಕಮಲ')
  if (exampleWord && KANNADA_VISUAL_MAP[clean(exampleWord)]) {
    return KANNADA_VISUAL_MAP[clean(exampleWord)];
  }

  // Try partial check for multi-character words only (avoid single character false triggers like 'ಉ' matching inside 'ಉಡುಗೊರೆ')
  const target = ` ${primaryKey} ${wordKey || ''} ${exampleWord || ''} ${meaning || ''} `;
  for (const [k, v] of Object.entries(KANNADA_VISUAL_MAP)) {
    if (k.length >= 2 && target.includes(k)) {
      return v;
    }
  }

  return null;
}
