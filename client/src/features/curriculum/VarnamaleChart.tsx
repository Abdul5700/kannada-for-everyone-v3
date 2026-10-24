import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AudioButton } from '../../components/ui/AudioButton';
import { getVarnamale } from '../../utils/api';
import { getVisualIllustration } from './visualAssets';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface VowelItem {
  char: string;
  transliteration: string;
  name: string;
  nameKn: string;
  matra: string;
  sound: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
  type: string;
}

interface ConsonantItem {
  char: string;
  transliteration: string;
  group: string;
  varga: string;
  type: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
}

interface YogavahaItem {
  char: string;
  transliteration: string;
  name: string;
  nameKn: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
}

// ─── Letter Card Component (Wide horizontal rectangle avoiding truncation) ───
const LetterCard: React.FC<{
  char: string;
  transliteration: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
  label?: string;
  labelColor?: string;
}> = ({ char, transliteration, exampleWord, exampleTransliteration, exampleMeaning, label, labelColor = 'text-amber-700' }) => {
  const visual = getVisualIllustration(char, undefined, exampleWord, exampleMeaning);
  return (
    <Card className="p-4 border-gray-200 hover:border-gold-400 hover:shadow-md transition-all flex flex-col justify-between group min-h-[160px] bg-white">
      {/* Top row: large letter + audio */}
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-kannada text-3xl sm:text-4xl font-extrabold text-maroon-800 group-hover:text-gold-600 transition-colors leading-none">
            {char}
          </span>
          <span className="text-xs text-gray-500 font-sans font-medium">/{transliteration}/</span>
        </div>
        <AudioButton text={char} size={16} />
      </div>

      {/* Picture + full word & meaning with dedicated speaker for the example word */}
      <div className="my-2 flex items-center justify-between gap-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-11 h-11 rounded-lg bg-white shadow-xs flex items-center justify-center text-2xl shrink-0 border border-amber-200">
            {visual?.emoji || '📖'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-kannada font-bold text-base text-gray-900 leading-snug break-words">
              {exampleWord}
            </div>
            <div className="text-xs text-gray-600 font-sans break-words leading-relaxed mt-0.5">
              <span className="font-medium text-gray-700">{exampleTransliteration}</span> — {exampleMeaning}
            </div>
          </div>
        </div>
        {exampleWord && (
          <div className="shrink-0">
            <AudioButton text={exampleWord} size={15} label="ಪದ" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-2xs text-gray-500 pt-1 border-t border-gray-100">
        <span className="text-gray-400">ಅಕ್ಷರ (Letter)</span>
        {label && <span className={`font-semibold ${labelColor}`}>{label}</span>}
      </div>
    </Card>
  );
};

// ─── Word Builder Component (10 Core Words + AI Unlimited Expansion) ───
export const WordBuilder: React.FC<{ letters?: string[] }> = () => {
  // Exactly 10 curated core words as requested
  const INITIAL_10_WORDS = [
    { word: 'ಕಮಲ', hint: 'Lotus flower (National Flower)', syllables: ['ಕ', 'ಮ', 'ಲ'], decoys: ['ನ', 'ರ', 'ಸ'] },
    { word: 'ಆನೆ', hint: 'Elephant (ಬೆಟ್ಟದಂತ ಪ್ರಾಣಿ)', syllables: ['ಆ', 'ನೆ'], decoys: ['ಮ', 'ರ', 'ಹ'] },
    { word: 'ಮರ', hint: 'Tree (ಪ್ರಕೃತಿಯ ಜೀವ)', syllables: ['ಮ', 'ರ'], decoys: ['ಲ', 'ಕ', 'ನ'] },
    { word: 'ಹಸು', hint: 'Cow (ಹಾಲು ನೀಡುವ ಕಾಮಧೇನು)', syllables: ['ಹ', 'ಸು'], decoys: ['ಮ', 'ನೆ', 'ಕ'] },
    { word: 'ಅರಸ', hint: 'King (ನಾಡಿನ ಪ್ರಭು)', syllables: ['ಅ', 'ರ', 'ಸ'], decoys: ['ಕ', 'ಮ', 'ಲ'] },
    { word: 'ಕುದುರೆ', hint: 'Horse (ವೇಗದ ಪ್ರಾಣಿ)', syllables: ['ಕು', 'ದು', 'ರೆ'], decoys: ['ನೆ', 'ಆ', 'ಕ'] },
    { word: 'ಪುಸ್ತಕ', hint: 'Book (ಜ್ಞಾನ ಭಂಡಾರ)', syllables: ['ಪು', 'ಸ್ತ', 'ಕ'], decoys: ['ಮ', 'ರ', 'ಲ'] },
    { word: 'ಬಾಳೆಹಣ್ಣು', hint: 'Banana (ಸಿಹಿ ಹಣ್ಣು)', syllables: ['ಬಾ', 'ಳೆ', 'ಹ', 'ಣ್ಣು'], decoys: ['ಕ', 'ರ', 'ಸ'] },
    { word: 'ಶಾಲೆ', hint: 'School (ಕಲಿಕಾ ಕೇಂದ್ರ)', syllables: ['ಶಾ', 'ಲೆ'], decoys: ['ಮ', 'ನೆ', 'ಕ'] },
    { word: 'ಮನೆ', hint: 'Home / House (ವಾಸಿಸುವ ತಾಣ)', syllables: ['ಮ', 'ನೆ'], decoys: ['ಶಾ', 'ಲ', 'ರ'] },
  ];

  const [words, setWords] = useState(INITIAL_10_WORDS);
  const [currentTargetIdx, setCurrentTargetIdx] = useState(0);
  const [loadingAi, setLoadingAi] = useState(false);

  const target = words[currentTargetIdx % words.length];

  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Pool of tiles: correct syllables + decoys
  const generateTiles = (tgt: typeof target) => {
    return [...tgt.syllables, ...tgt.decoys].sort(() => Math.random() - 0.5);
  };

  const [shuffledTiles, setShuffledTiles] = useState<string[]>(() => generateTiles(target));

  const reset = () => {
    setSelected([]);
    setFeedback(null);
  };

  const nextWord = () => {
    const nextIdx = currentTargetIdx + 1;
    setCurrentTargetIdx(nextIdx);
    setSelected([]);
    setFeedback(null);

    // If reaching the end of available words, seamlessly fetch next batch of AI words
    if (nextIdx >= words.length - 2 && !loadingAi) {
      fetchMoreAiWords();
    }

    const nextTarget = words[nextIdx % words.length];
    setShuffledTiles(generateTiles(nextTarget));
  };

  const fetchMoreAiWords = async () => {
    setLoadingAi(true);
    try {
      const resp = await fetch('/api/foundations/word-builder/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 8 }),
      });
      const json = await resp.json();
      if (json.success && json.data?.words?.length) {
        setWords((prev) => [...prev, ...json.data.words]);
      }
    } catch (e) {
      console.warn('AI word generation error:', e);
    } finally {
      setLoadingAi(false);
    }
  };

  const pickTile = (s: string) => {
    if (feedback) return;
    setSelected((prev) => [...prev, s]);
  };

  const removeLast = () => {
    setSelected((prev) => prev.slice(0, -1));
    setFeedback(null);
  };

  const checkWord = () => {
    const formed = selected.join('');
    setAttempts((a) => a + 1);
    if (formed === target.word) {
      setScore((s) => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-bold text-gray-900 text-base font-kannada">
            ಅಕ್ಷರ ಜೋಡಿಸಿ ಪದ ರಚಿಸಿ — Word Builder
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Tap the syllables below in the right order to form the target word.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="green">Score: {score}/{attempts}</Badge>
          <Badge variant="gold">
            Word {currentTargetIdx + 1} of {words.length}
            {words.length > 10 && ' (AI Active)'}
          </Badge>
          <button
            type="button"
            onClick={nextWord}
            disabled={loadingAi}
            className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-gray-600 flex items-center gap-1.5 text-xs font-semibold"
            title="Next word"
          >
            <RefreshCw size={14} className={loadingAi ? 'animate-spin' : ''} />
            {loadingAi ? 'Generating AI Words...' : 'Next Word'}
          </button>
        </div>
      </div>

      {/* Target word display */}
      <div className="bg-gradient-to-r from-maroon-50 via-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center space-y-2">
        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Form this word • ಪದ ರಚಿಸಿ
        </div>
        <div className="font-kannada text-4xl sm:text-5xl font-extrabold text-maroon-800 tracking-wide py-1">
          {target.word}
        </div>
        <div className="text-sm text-gray-600 font-medium">
          Hint: <em>{target.hint}</em>
        </div>
        <div className="pt-1">
          <AudioButton text={target.word} label="Hear it" />
        </div>
      </div>

      {/* Selection area (drop zone) */}
      <div className="min-h-[70px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-4 flex items-center justify-center gap-3 flex-wrap">
        {selected.length === 0 ? (
          <span className="text-gray-400 text-sm">Tap tiles below to build the word…</span>
        ) : (
          selected.map((syl, i) => (
            <span
              key={i}
              className="font-kannada text-2xl font-extrabold text-maroon-800 bg-white border-2 border-maroon-300 rounded-xl px-4 py-2 shadow-sm animate-in fade-in"
            >
              {syl}
            </span>
          ))
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={checkWord}
          disabled={selected.length === 0 || !!feedback}
          className="px-6 py-2.5 bg-maroon-700 text-white rounded-xl text-sm font-bold disabled:opacity-40 hover:bg-maroon-800 shadow-sm transition-all"
        >
          Check ✓
        </button>
        <button
          type="button"
          onClick={removeLast}
          disabled={selected.length === 0}
          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-gray-50 transition-colors"
        >
          ← Remove
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Feedback */}
      {feedback === 'correct' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl animate-in fade-in">
          <CheckCircle2 className="text-green-600 shrink-0" size={24} />
          <div>
            <p className="font-bold text-green-900 text-sm">Correct! 🎉 ಸರಿ ಉತ್ತರ!</p>
            <p className="text-xs text-green-700 mt-0.5">
              <span className="font-kannada font-bold">{target.word}</span> means "{target.hint}".{' '}
              <button type="button" onClick={nextWord} className="underline font-bold ml-1 text-green-800">
                Next Word →
              </button>
            </p>
          </div>
        </div>
      )}
      {feedback === 'wrong' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in">
          <p className="font-bold text-red-900 text-sm">Not quite! ತಪ್ಪು ಆಗಿದೆ, ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.</p>
          <p className="text-xs text-red-700 mt-1">
            You formed: <span className="font-kannada font-bold">{selected.join('')}</span>.
            Target word is: <span className="font-kannada font-bold">{target.word}</span>.{' '}
            <button type="button" onClick={reset} className="underline font-bold ml-1 text-red-800">
              Try again
            </button>
          </p>
        </div>
      )}

      {/* Syllable tiles to tap */}
      <div className="space-y-2 pt-2">
        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Available Syllables • ಅಕ್ಷರಗಳು
        </h5>
        <div className="flex flex-wrap gap-3">
          {shuffledTiles.map((syl, idx) => (
            <button
              key={`${syl}-${idx}`}
              type="button"
              onClick={() => pickTile(syl)}
              disabled={!!feedback}
              className="font-kannada text-2xl font-extrabold text-maroon-800 bg-white border-2 border-gray-200 hover:border-maroon-500 hover:bg-maroon-50 rounded-2xl px-5 py-3.5 shadow-sm transition-all disabled:opacity-50 active:scale-95"
            >
              {syl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VarnamaleChart: React.FC = () => {
  const [vowels, setVowels] = useState<VowelItem[]>([]);
  const [consonants, setConsonants] = useState<ConsonantItem[]>([]);
  const [yogavaha, setYogavaha] = useState<YogavahaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'swara' | 'vyanjana' | 'yogavaha' | 'wordbuilder'>('all');

  useEffect(() => {
    getVarnamale()
      .then((res) => {
        if (res) {
          setVowels(res.vowels || []);
          setConsonants(res.consonants || []);
          setYogavaha(res.yogavaha || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500 font-medium">
        Loading Complete Varnamale Chart…
      </div>
    );
  }

  const tabs = [
    { key: 'all', label: 'All (49)', emoji: '🔤' },
    { key: 'swara', label: 'ಸ್ವರಗಳು — Vowels (13)', emoji: '🅰️' },
    { key: 'yogavaha', label: 'ಯೋಗವಾಹಗಳು (2)', emoji: '🔣' },
    { key: 'vyanjana', label: 'ವ್ಯಂಜನಗಳು — Consonants (34)', emoji: '🅱️' },
    { key: 'wordbuilder', label: 'Word Builder (ಅಕ್ಷರ ಜೋಡಿಸಿ)', emoji: '🏗️' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-900 via-maroon-800 to-amber-900 text-white p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="gold">ವರ್ಣಮಾಲೆ ಚಾರ್ಟ್ — Varnamale Chart</Badge>
          <span className="text-xs text-gold-300 font-bold uppercase">
            13 Swaras • 34 Vyanjanas • 2 Yogavahas
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-kannada">
          ಸಂಪೂರ್ಣ ಕನ್ನಡ ವರ್ಣಮಾಲೆ ಚಿತ್ರ ಕೋಶ
        </h3>
        <p className="text-xs text-gray-200 mt-1 max-w-2xl leading-relaxed">
          Complete Kannada Alphabet with clear pictures, correct pronunciation, examples, and audio. Practice
          interactive word building in the Word Builder tab.
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === tab.key
                ? 'bg-maroon-700 text-white border-maroon-700 shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <span>{tab.emoji}</span>
            <span className="font-kannada">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Word Builder Tab */}
      {activeTab === 'wordbuilder' && (
        <Card className="p-6">
          <WordBuilder />
        </Card>
      )}

      {/* Swaras (Vowels) — Generous 2-3 col layout to avoid hiding any text */}
      {(activeTab === 'all' || activeTab === 'swara') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-lg font-bold font-kannada text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-rose-100 text-rose-800 text-sm flex items-center justify-center font-bold">ಅ</span>
              ಸ್ವರಗಳು — 13 Vowels
            </h4>
            <Badge variant="maroon">13 Vowels</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vowels.map((v) => (
              <LetterCard
                key={v.char}
                char={v.char}
                transliteration={v.transliteration}
                exampleWord={v.exampleWord}
                exampleTransliteration={v.exampleTransliteration}
                exampleMeaning={v.exampleMeaning}
                label={v.type}
                labelColor="text-rose-700"
              />
            ))}
          </div>
        </div>
      )}

      {/* Yogavahas */}
      {(activeTab === 'all' || activeTab === 'yogavaha') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-lg font-bold font-kannada text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 text-sm flex items-center justify-center font-bold">ಂ</span>
              ಯೋಗವಾಹಗಳು — 2 Yogavahas
            </h4>
            <Badge variant="blue">2 Special</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {yogavaha.map((y) => (
              <LetterCard
                key={y.char}
                char={y.char}
                transliteration={y.transliteration}
                exampleWord={y.exampleWord}
                exampleTransliteration={y.exampleTransliteration}
                exampleMeaning={y.exampleMeaning}
                label={y.nameKn}
                labelColor="text-blue-700"
              />
            ))}
          </div>
        </div>
      )}

      {/* Vyanjanas (Consonants) — Generous 2-3 col layout */}
      {(activeTab === 'all' || activeTab === 'vyanjana') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-lg font-bold font-kannada text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 text-sm flex items-center justify-center font-bold">ಕ</span>
              ವ್ಯಂಜನಗಳು — 34 Consonants
            </h4>
            <Badge variant="gold">34 Consonants</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {consonants.map((c) => (
              <LetterCard
                key={c.char}
                char={c.char}
                transliteration={c.transliteration}
                exampleWord={c.exampleWord}
                exampleTransliteration={c.exampleTransliteration}
                exampleMeaning={c.exampleMeaning}
                label={c.varga || c.group.split(' ')[0]}
                labelColor="text-emerald-700"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
