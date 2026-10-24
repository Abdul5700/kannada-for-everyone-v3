import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { getKannadaNumbers } from '../../utils/api';
import {
  Search,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Trophy,
  Filter,
  Volume2,
} from 'lucide-react';

interface NumberItem {
  number: number;
  kannadaNumeral: string;
  kannadaName: string;
  transliteration: string;
  category: string;
  audioText: string;
}

const RANGES = [
  { label: 'All (1–100)', value: 'all' },
  { label: '1–10', value: '1-10' },
  { label: '11–20', value: '11-20' },
  { label: '21–50', value: '21-50' },
  { label: '51–75', value: '51-75' },
  { label: '76–100', value: '76-100' },
];

export const NumbersTable: React.FC = () => {
  const [allNumbers, setAllNumbers] = useState<NumberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [practiced, setPracticed] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('kannada_numbers_practiced');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Practice Quiz / Dictation state
  const [mode, setMode] = useState<'table' | 'quiz' | 'dictation'>('table');
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizItems, setQuizItems] = useState<NumberItem[]>([]);

  useEffect(() => {
    getKannadaNumbers()
      .then((data) => {
        if (data && data.numbers) {
          setAllNumbers(data.numbers);
        }
      })
      .catch((err) => console.error('Failed to load numbers', err))
      .finally(() => setLoading(false));
  }, []);

  const togglePracticed = (num: number) => {
    setPracticed((prev) => {
      const updated = { ...prev, [num]: !prev[num] };
      try {
        localStorage.setItem('kannada_numbers_practiced', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const filteredNumbers = allNumbers.filter((item) => {
    // Range filter
    if (selectedRange === '1-10' && (item.number < 1 || item.number > 10)) return false;
    if (selectedRange === '11-20' && (item.number < 11 || item.number > 20)) return false;
    if (selectedRange === '21-50' && (item.number < 21 || item.number > 50)) return false;
    if (selectedRange === '51-75' && (item.number < 51 || item.number > 75)) return false;
    if (selectedRange === '76-100' && (item.number < 76 || item.number > 100)) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNum = item.number.toString().includes(q);
      const matchKn = item.kannadaNumeral.includes(q);
      const matchName = item.kannadaName.toLowerCase().includes(q);
      const matchTr = item.transliteration.toLowerCase().includes(q);
      return matchNum || matchKn || matchName || matchTr;
    }
    return true;
  });

  const practicedCount = Object.values(practiced).filter(Boolean).length;

  // Initialize Quiz
  const startQuiz = (quizMode: 'quiz' | 'dictation') => {
    // Pick 10 random numbers from the current filtered set or all numbers
    const pool = filteredNumbers.length >= 10 ? filteredNumbers : allNumbers;
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuizItems(shuffled);
    setQuizIdx(0);
    setQuizScore(0);
    setQuizSelected(null);
    setQuizChecked(false);
    setMode(quizMode);
  };

  const handleQuizAnswer = (option: string) => {
    if (quizChecked) return;
    setQuizSelected(option);
    setQuizChecked(true);
    const current = quizItems[quizIdx];
    if (option === current.kannadaName || option === current.number.toString()) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIdx + 1 < quizItems.length) {
      setQuizIdx((prev) => prev + 1);
      setQuizSelected(null);
      setQuizChecked(false);
    } else {
      // Completed
      setQuizIdx(quizItems.length);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading 1–100 Kannada Numbers Table...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="gold">ಅಂಕಿಗಳು (೧–೧೦೦)</Badge>
            <span className="text-xs font-semibold text-amber-800">
              Verified Kannada Numbers Database
            </span>
          </div>
          <h3 className="text-xl font-bold font-kannada text-gray-900">
            ಸಂಪೂರ್ಣ ಸಂಖ್ಯೆಗಳು ೧ ರಿಂದ ೧೦೦ (Numbers 1 to 100)
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Individual numerals, verified Kannada word names, transliterations, and audio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-amber-200 shadow-2xs text-center">
            <div className="text-xs text-gray-500 font-medium">Practiced</div>
            <div className="text-lg font-bold text-maroon-700">
              {practicedCount} / {allNumbers.length}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mode === 'table' ? 'primary' : 'secondary'}
              onClick={() => setMode('table')}
            >
              Table
            </Button>
            <Button
              size="sm"
              variant={mode === 'quiz' ? 'primary' : 'secondary'}
              onClick={() => startQuiz('quiz')}
            >
              Counting Quiz
            </Button>
            <Button
              size="sm"
              variant={mode === 'dictation' ? 'primary' : 'secondary'}
              onClick={() => startQuiz('dictation')}
            >
              Dictation
            </Button>
          </div>
        </div>
      </div>

      {mode === 'table' && (
        <Card className="p-4 sm:p-6 space-y-4 shadow-sm border-gray-200">
          {/* Controls: Range tabs & Search filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            {/* Range Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setSelectedRange(r.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedRange === r.value
                      ? 'bg-maroon-700 text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search number, numeral, word..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600"
              />
            </div>
          </div>

          {/* Showing Count */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing <strong>{filteredNumbers.length}</strong> of {allNumbers.length} numbers
            </span>
            <span>Click speaker for audio pronunciation</span>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                  <th className="py-3 px-3 w-12 text-center">#</th>
                  <th className="py-3 px-3 w-16 text-center">Arabic</th>
                  <th className="py-3 px-4 w-20 text-center font-kannada">ಕನ್ನಡ ಅಂಕಿ</th>
                  <th className="py-3 px-4 font-kannada">ಕನ್ನಡ ಹೆಸರು (Name)</th>
                  <th className="py-3 px-4">Transliteration</th>
                  <th className="py-3 px-3 w-16 text-center">Audio</th>
                  <th className="py-3 px-3 w-20 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNumbers.map((item) => {
                  const isDone = !!practiced[item.number];
                  return (
                    <tr
                      key={item.number}
                      className={`hover:bg-amber-50/40 transition-colors ${
                        isDone ? 'bg-green-50/30' : ''
                      }`}
                    >
                      {/* Serial */}
                      <td className="py-2.5 px-3 text-center text-gray-400 font-mono text-2xs">
                        {item.number}
                      </td>

                      {/* Arabic numeral */}
                      <td className="py-2.5 px-3 text-center font-bold text-gray-800 font-mono text-sm">
                        {item.number}
                      </td>

                      {/* Kannada numeral */}
                      <td className="py-2.5 px-4 text-center font-kannada font-extrabold text-lg text-maroon-800">
                        {item.kannadaNumeral}
                      </td>

                      {/* Kannada Name */}
                      <td className="py-2.5 px-4 font-kannada font-bold text-sm text-gray-900">
                        {item.kannadaName}
                      </td>

                      {/* Transliteration */}
                      <td className="py-2.5 px-4 font-medium text-gray-600">
                        {item.transliteration}
                      </td>

                      {/* Audio */}
                      <td className="py-2.5 px-3 text-center">
                        <AudioButton text={item.audioText || item.kannadaName} size={15} />
                      </td>

                      {/* Practice status */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => togglePracticed(item.number)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-semibold transition-colors ${
                            isDone
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          <CheckCircle size={12} className={isDone ? 'text-green-600' : 'text-gray-400'} />
                          {isDone ? 'Done' : 'Mark'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              PLACE VALUES SECTION (ಸ್ಥಾನ ಬೆಲೆಗಳು — Ones, Tens, Hundreds, Thousands...)
              Appears directly at the end of the 1–100 numbers table
          ══════════════════════════════════════════════════════════════════════ */}
          <div className="p-6 border-t border-amber-200 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="gold">ಸ್ಥಾನ ಬೆಲೆಗಳು (Place Values)</Badge>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    ಗಣಿತ ಮೂಲಭೂತ (Foundational Math)
                  </span>
                </div>
                <h4 className="font-kannada font-extrabold text-xl text-gray-900 mt-1">
                  ಸಂಖ್ಯಾ ಸ್ಥಾನ ಬೆಲೆಗಳು — ಬಿಡಿ, ಹತ್ತು, ನೂರು, ಸಾವಿರ...
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Understand Indian system place values (Place name, Numeral, Value, and Voice pronunciation).
                </p>
              </div>
              <Badge variant="maroon">8 Place Values</Badge>
            </div>

            {/* Place Values Table */}
            <div className="overflow-x-auto rounded-2xl border border-amber-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-gradient-to-r from-maroon-800 to-amber-900 text-white font-semibold">
                  <tr>
                    <th className="py-3 px-4">ಸ್ಥಾನ (Place Name)</th>
                    <th className="py-3 px-4">English Place</th>
                    <th className="py-3 px-4 text-center">ಅಂಕಿ (Numeral)</th>
                    <th className="py-3 px-4 text-center">ಕನ್ನಡ ಅಂಕಿ</th>
                    <th className="py-3 px-4">ಕನ್ನಡ ಹೆಸರು (Name)</th>
                    <th className="py-3 px-4">ಉದಾಹರಣೆ (Example)</th>
                    <th className="py-3 px-4 text-center">ಧ್ವನಿ (Audio)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {[
                    {
                      placeKn: 'ಬಿಡಿ',
                      placeEn: 'Ones / Units',
                      numeralEn: '1',
                      numeralKn: '೧',
                      nameKn: 'ಒಂದು',
                      translit: 'Ondu',
                      example: '೭ (7 ಬಿಡಿಗಳು = 7)',
                      audioText: 'ಬಿಡಿ, ಒಂದು',
                      bgClass: 'bg-white',
                    },
                    {
                      placeKn: 'ಹತ್ತು',
                      placeEn: 'Tens',
                      numeralEn: '10',
                      numeralKn: '೧೦',
                      nameKn: 'ಹತ್ತು',
                      translit: 'Hattu',
                      example: '೫೦ (5 ಹತ್ತುಗಳು = 50)',
                      audioText: 'ಹತ್ತು',
                      bgClass: 'bg-amber-50/30',
                    },
                    {
                      placeKn: 'ನೂರು',
                      placeEn: 'Hundreds',
                      numeralEn: '100',
                      numeralKn: '೧೦೦',
                      nameKn: 'ನೂರು',
                      translit: 'Nooru',
                      example: '೩೦೦ (3 ನೂರುಗಳು = 300)',
                      audioText: 'ನೂರು',
                      bgClass: 'bg-white',
                    },
                    {
                      placeKn: 'ಸಾವಿರ',
                      placeEn: 'Thousands',
                      numeralEn: '1,000',
                      numeralKn: '೧,೦೦೦',
                      nameKn: 'ಸಾವಿರ',
                      translit: 'Saavira',
                      example: '೪,೦೦೦ (4 ಸಾವಿರಗಳು = 4,000)',
                      audioText: 'ಸಾವಿರ',
                      bgClass: 'bg-amber-50/30',
                    },
                    {
                      placeKn: 'ಹತ್ತು ಸಾವಿರ',
                      placeEn: 'Ten Thousands',
                      numeralEn: '10,000',
                      numeralKn: '೧೦,೦೦೦',
                      nameKn: 'ಹತ್ತು ಸಾವಿರ',
                      translit: 'Hattu Saavira',
                      example: '೨೦,೦೦೦ (2 ಹತ್ತು ಸಾವಿರ = 20,000)',
                      audioText: 'ಹತ್ತು ಸಾವಿರ',
                      bgClass: 'bg-white',
                    },
                    {
                      placeKn: 'ಲಕ್ಷ',
                      placeEn: 'Lakhs (Hundred Thousands)',
                      numeralEn: '1,00,000',
                      numeralKn: '೧,೦೦,೦೦೦',
                      nameKn: 'ಲಕ್ಷ',
                      translit: 'Laksha',
                      example: '೧,೦೦,೦೦೦ (ಒಂದು ಲಕ್ಷ = 1 Lakh)',
                      audioText: 'ಲಕ್ಷ',
                      bgClass: 'bg-amber-50/30',
                    },
                    {
                      placeKn: 'ಹತ್ತು ಲಕ್ಷ',
                      placeEn: 'Ten Lakhs (Millions)',
                      numeralEn: '10,00,000',
                      numeralKn: '೧೦,೦೦,೦೦೦',
                      nameKn: 'ಹತ್ತು ಲಕ್ಷ',
                      translit: 'Hattu Laksha',
                      example: '೧೦,೦೦,೦೦೦ (ಹತ್ತು ಲಕ್ಷ = 1 Million)',
                      audioText: 'ಹತ್ತು ಲಕ್ಷ',
                      bgClass: 'bg-white',
                    },
                    {
                      placeKn: 'ಕೋಟಿ',
                      placeEn: 'Crores (Ten Millions)',
                      numeralEn: '1,00,00,000',
                      numeralKn: '೧,೦೦,೦೦,೦೦೦',
                      nameKn: 'ಕೋಟಿ',
                      translit: 'Koti',
                      example: '೧,೦೦,೦೦,೦೦೦ (ಒಂದು ಕೋಟಿ = 1 Crore)',
                      audioText: 'ಕೋಟಿ',
                      bgClass: 'bg-amber-50/30',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={`${row.bgClass} hover:bg-gold-50/50 transition-colors`}>
                      <td className="py-3 px-4 font-kannada font-bold text-sm text-maroon-900">
                        {row.placeKn}
                      </td>
                      <td className="py-3 px-4 text-gray-700 font-sans text-xs">
                        {row.placeEn}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-gray-900 text-xs">
                        {row.numeralEn}
                      </td>
                      <td className="py-3 px-4 text-center font-kannada font-extrabold text-base text-maroon-700">
                        {row.numeralKn}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-kannada font-bold text-xs text-gray-900">{row.nameKn}</span>
                        <span className="text-3xs text-gray-500 font-sans ml-1">({row.translit})</span>
                      </td>
                      <td className="py-3 px-4 text-xs font-kannada text-gray-600">
                        {row.example}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <AudioButton text={row.audioText} size={16} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Interactive Decomposition Example Box */}
            <div className="p-4 bg-white border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🧮</span>
                <span className="font-bold text-gray-900 text-xs uppercase tracking-wide">
                  ಉದಾಹರಣೆಯೊಂದಿಗೆ ವಿಶ್ಲೇಷಣೆ (Number Decomposition Example):
                </span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl font-kannada text-sm text-maroon-900 leading-relaxed font-semibold">
                ಸಂಖ್ಯೆ: <strong>೪,೫೬೭ (4,567)</strong> =
                ೪ ಸಾವಿರಗಳು (4 x 1000) + ೫ ನೂರುಗಳು (5 x 100) + ೬ ಹತ್ತುಗಳು (6 x 10) + ೭ ಬಿಡಿಗಳು (7 x 1)
              </div>
              <p className="text-2xs text-gray-500 font-sans">
                Notice: In Kannada, counting groups read right-to-left as <strong>ಬಿಡಿ (Ones)</strong>, <strong>ಹತ್ತು (Tens)</strong>, <strong>ನೂರು (Hundreds)</strong>, <strong>ಸಾವಿರ (Thousands)</strong>, <strong>ದಶಸಾವಿರ (Ten Thousands)</strong>, <strong>ಲಕ್ಷ (Lakhs)</strong>, and <strong>ಕೋಟಿ (Crores)</strong>.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Counting Quiz / Dictation Mode */}
      {(mode === 'quiz' || mode === 'dictation') && (
        <Card className="p-6 space-y-6 max-w-xl mx-auto border-gold-200 shadow-sm">
          {quizIdx < quizItems.length ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <Badge variant="maroon">
                  {mode === 'quiz' ? 'Counting Quiz' : 'Audio Dictation'}
                </Badge>
                <span className="text-xs text-gray-500 font-semibold">
                  Question {quizIdx + 1} of {quizItems.length}
                </span>
              </div>

              {mode === 'quiz' ? (
                <div className="text-center py-4 space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    What is the Kannada name for:
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl font-extrabold font-mono text-gray-900">
                      {quizItems[quizIdx].number}
                    </span>
                    <span className="text-4xl font-extrabold font-kannada text-maroon-700">
                      ({quizItems[quizIdx].kannadaNumeral})
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Listen to the audio and identify the numeral:
                  </p>
                  <div className="flex justify-center">
                    <AudioButton
                      text={quizItems[quizIdx].audioText || quizItems[quizIdx].kannadaName}
                      size={28}
                    />
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {(() => {
                  const current = quizItems[quizIdx];
                  // Pick 3 distractors from allNumbers
                  const distractors = allNumbers
                    .filter((n) => n.number !== current.number)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                  const options =
                    mode === 'quiz'
                      ? [current.kannadaName, ...distractors.map((d) => d.kannadaName)].sort()
                      : [
                          current.number.toString(),
                          ...distractors.map((d) => d.number.toString()),
                        ].sort();

                  return options.map((opt, i) => {
                    const isSelected = quizSelected === opt;
                    const isCorrect =
                      mode === 'quiz'
                        ? opt === current.kannadaName
                        : opt === current.number.toString();

                    let btnStyle = 'border-gray-200 hover:border-gray-300 bg-white';
                    if (quizChecked) {
                      if (isCorrect) {
                        btnStyle = 'border-green-500 bg-green-50 text-green-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-red-500 bg-red-50 text-red-900';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-maroon-600 bg-maroon-50 text-maroon-900';
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={quizChecked}
                        onClick={() => handleQuizAnswer(opt)}
                        className={`p-3.5 rounded-xl border text-sm font-semibold transition-all text-center ${btnStyle} ${
                          mode === 'quiz' ? 'font-kannada text-base' : 'font-mono text-base'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  });
                })()}
              </div>

              {quizChecked && (
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs">
                    {quizSelected ===
                    (mode === 'quiz'
                      ? quizItems[quizIdx].kannadaName
                      : quizItems[quizIdx].number.toString()) ? (
                      <span className="text-green-700 font-bold">Correct! ಭೇಷ್!</span>
                    ) : (
                      <span className="text-red-700 font-bold">
                        Correct answer: {quizItems[quizIdx].kannadaNumeral} —{' '}
                        {quizItems[quizIdx].kannadaName} ({quizItems[quizIdx].transliteration})
                      </span>
                    )}
                  </div>
                  <Button size="sm" onClick={nextQuizQuestion}>
                    {quizIdx + 1 === quizItems.length ? 'View Results' : 'Next Question'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <Trophy size={48} className="mx-auto text-amber-500" />
              <h4 className="text-xl font-bold text-gray-900">Activity Completed!</h4>
              <p className="text-sm text-gray-600">
                You scored{' '}
                <strong className="text-maroon-700 text-lg">
                  {quizScore} / {quizItems.length}
                </strong>{' '}
                ({Math.round((quizScore / quizItems.length) * 100)}%)
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="secondary" onClick={() => setMode('table')}>
                  Back to Table
                </Button>
                <Button onClick={() => startQuiz(mode as any)}>Try Again</Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
