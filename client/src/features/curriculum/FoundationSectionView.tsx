import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { getFoundationSection } from '../../utils/api';
import { NumbersTable } from './NumbersTable';
import { WordBuilder } from './VarnamaleChart';
import { getVisualIllustration } from './visualAssets';
import {
  ArrowLeft,
  CheckCircle2,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface FoundationTopic {
  id: string;
  topicNumber: number;
  title: string;
  titleKn: string;
  description: string;
  details: string;
  items: any[];
  exercises?: {
    id: string;
    type: string;
    prompt: string;
    options?: string[];
    answer: string;
    explanation: string;
  }[];
}

interface FoundationSectionData {
  id: string;
  sectionNumber: number;
  title: string;
  titleKn: string;
  summary: string;
  category: string;
  topics: FoundationTopic[];
}

interface Props {
  sectionNumber: number;
  onBack: () => void;
}

export const FoundationSectionView: React.FC<Props> = ({ sectionNumber, onBack }) => {
  const [section, setSection] = useState<FoundationSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    getFoundationSection(sectionNumber)
      .then((data) => {
        setSection(data);
        setActiveTopicIdx(0);
      })
      .catch((err) => console.error('Failed to load foundation section', err))
      .finally(() => setLoading(false));
  }, [sectionNumber]);

  const handleSelectOption = (exerciseId: string, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [exerciseId]: option }));
  };

  const handleCheckAnswer = (exerciseId: string) => {
    setCheckedAnswers((prev) => ({ ...prev, [exerciseId]: true }));
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium">
        Loading Section {sectionNumber}...
      </div>
    );
  }

  if (!section) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-gray-500">Section details not found.</p>
        <Button variant="secondary" onClick={onBack}>
          Back to Foundations
        </Button>
      </div>
    );
  }

  const currentTopic = section.topics[activeTopicIdx];

  // Helper to extract the primary display title and audio text for any item shape
  const getItemDetails = (item: any) => {
    // 1. Primary main display string
    let primary =
      item.char ||
      item.kn ||
      item.word ||
      item.letter ||
      item.conjunct ||
      item.challenge ||
      item.tense ||
      item.vibhakti ||
      item.concept ||
      item.digit ||
      item.symbol ||
      item.pair ||
      item.rule ||
      item.zone ||
      item.pattern ||
      item.row ||
      item.root ||
      item.fact ||
      item.para ||
      item.cat ||
      item.scrambled ||
      item.promptText ||
      item.incorrect ||
      item.line ||
      item.phrase ||
      item.nameKn ||
      '';

    // If type is defined (e.g. '2-Letter', '3-Letter') and no primary yet
    if (!primary && item.type) {
      primary = item.type;
    }

    // 2. Transliteration / Phonetic sound / Grammatical marker
    const tr =
      item.tr ||
      item.transliteration ||
      item.pratyaya ||
      item.sound ||
      item.letters ||
      item.parts ||
      item.combo ||
      item.formula ||
      item.inf ||
      '';

    // 3. Subtitle / Meaning / Explanation / Secondary detail
    let meaning =
      item.meaning ||
      item.exampleMeaning ||
      item.sentence ||
      item.answer ||
      item.example ||
      item.examples ||
      item.terms ||
      item.en ||
      item.desc ||
      item.diff ||
      item.sample ||
      item.reason ||
      item.text ||
      item.target ||
      item.hint ||
      item.polite ||
      item.festival ||
      (item.correct ? `ಸರಿ: ${item.correct}` : '') ||
      '';

    // If item has a list of words or strings (like words: ['ಕಮಲ', 'ಕಣ್ಣು'] or words: '...')
    if (item.words) {
      const wordsStr = Array.isArray(item.words) ? item.words.join(', ') : String(item.words);
      if (meaning) {
        meaning = `${wordsStr} • ${meaning}`;
      } else {
        meaning = wordsStr;
      }
    }

    // If item has first and last letter markers
    if (item.first && item.last) {
      const letterInfo = `ಮೊದಲು: "${item.first}" | ಕೊನೆ: "${item.last}"`;
      meaning = meaning ? `${meaning} (${letterInfo})` : letterInfo;
    }

    // 4. Example word
    const exampleWord = item.exampleWord || '';
    const exampleTr = item.exampleTransliteration || '';

    // 5. Valid audio text (must be Kannada script)
    let audio =
      (item.promptAudio && /[\u0C80-\u0CFF]/.test(item.promptAudio) ? item.promptAudio : '') ||
      (item.word && /[\u0C80-\u0CFF]/.test(item.word) ? item.word : '') ||
      (item.char && /[\u0C80-\u0CFF]/.test(item.char) ? item.char : '') ||
      (item.kn && /[\u0C80-\u0CFF]/.test(item.kn) ? item.kn : '') ||
      (item.letter && /[\u0C80-\u0CFF]/.test(item.letter) ? item.letter : '') ||
      (item.conjunct && /[\u0C80-\u0CFF]/.test(item.conjunct) ? item.conjunct : '') ||
      (item.exampleWord && /[\u0C80-\u0CFF]/.test(item.exampleWord) ? item.exampleWord : '') ||
      (item.sentence && /[\u0C80-\u0CFF]/.test(item.sentence) ? item.sentence.replace(/\(.*?\)/g, '').trim() : '') ||
      (item.example && /[\u0C80-\u0CFF]/.test(item.example) ? item.example.split('/')[0].trim() : '') ||
      (item.answer && /[\u0C80-\u0CFF]/.test(item.answer) ? item.answer : '') ||
      (item.pair && /[\u0C80-\u0CFF]/.test(item.pair) ? item.pair.split('↔')[0].trim() : '') ||
      (item.letters && /[\u0C80-\u0CFF]/.test(item.letters) ? item.letters : '') ||
      (item.sample && /[\u0C80-\u0CFF]/.test(item.sample) ? item.sample.split(',')[0].trim() : '') ||
      (primary && /[\u0C80-\u0CFF]/.test(primary) ? primary : '');

    // Fallback audio from words list
    if (!audio && item.words) {
      const firstKn = Array.isArray(item.words) ? item.words[0] : String(item.words);
      const match = firstKn.match(/[\u0C80-\u0CFF]+/);
      if (match) audio = match[0];
    }

    return { primary, tr, meaning, exampleWord, exampleTr, audio };
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-maroon-700 transition-colors"
        >
          <ArrowLeft size={16} /> Back to All 18 Sections
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 text-white p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="gold">{section.category}</Badge>
          <span className="text-xs text-gold-300 font-semibold uppercase">
            Section {section.sectionNumber} • {section.topics.length} In-Depth Topics
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-kannada">
          {section.titleKn}
        </h2>
        <h3 className="text-lg font-semibold text-gray-200 mt-1">
          {section.title}
        </h3>
        <p className="text-xs text-gray-300 mt-2 max-w-2xl leading-relaxed">
          {section.summary}
        </p>
      </div>

      {/* If this is Section 5 (Numbers), embed NumbersTable */}
      {section.sectionNumber === 5 ? (
        <div className="space-y-6">
          <NumbersTable />
        </div>
      ) : (
        /* Standard Topic Tabs & Details */
        <>
          {/* Topics Selector Tabs (Wrapped with scroll buttons for easy navigation) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeTopicIdx === 0}
              onClick={() => setActiveTopicIdx((prev) => Math.max(0, prev - 1))}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Previous Topic"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {section.topics.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTopicIdx(idx);
                    setUserAnswers({});
                    setCheckedAnswers({});
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeTopicIdx === idx
                      ? 'bg-maroon-700 text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-3xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-kannada">{t.titleKn || t.title}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={activeTopicIdx === section.topics.length - 1}
              onClick={() => setActiveTopicIdx((prev) => Math.min(section.topics.length - 1, prev + 1))}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Next Topic"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Current Topic Detail Card */}
          {currentTopic && (
            <div className="space-y-6">
              <Card className="p-6 sm:p-8 space-y-6 border-gold-200 shadow-sm">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="maroon">Topic {currentTopic.topicNumber}</Badge>
                    <span className="text-xs text-gray-500 font-medium">
                      {currentTopic.title}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-kannada">
                    {currentTopic.titleKn}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {currentTopic.description}
                  </p>
                </div>

                {/* Explanation & Conceptual Details with interactive audio on each line */}
                <div className="bg-gold-50/50 p-5 rounded-2xl border border-gold-200/80 text-sm leading-relaxed text-gray-800 space-y-2 font-medium">
                  {currentTopic.details.split('\n').map((line: string, lIdx: number) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    // Extract Kannada text for voice playback
                    const knMatch = trimmed.match(/[\u0C80-\u0CFF]+/g);
                    const knText = knMatch ? knMatch.join(' ') : '';
                    return (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between gap-3 py-1 px-2.5 rounded-xl hover:bg-gold-100/60 transition-colors group"
                      >
                        <span className="font-kannada text-sm text-gray-900 flex-1 leading-snug">
                          {trimmed}
                        </span>
                        {knText && (
                          <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                            <AudioButton text={knText} size={15} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Special Interactive Mode for Word Builder (e.g. Section 18 Topic 2) */}
                {((section.sectionNumber === 18 && currentTopic.topicNumber === 2) ||
                  currentTopic.title.toLowerCase().includes('word builder') ||
                  currentTopic.titleKn.includes('ಪದ ರಚಿಸಿ')) ? (
                  <div className="pt-2">
                    <WordBuilder />
                  </div>
                ) : (
                  /* Standard Structured Topic Items (Tables, Letters, Word grids) */
                  currentTopic.items && currentTopic.items.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers size={14} className="text-maroon-700" /> Topic Vocabulary & Content Items ({currentTopic.items.length})
                      </h4>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentTopic.items.map((rawItem: any, iIdx: number) => {
                          const { primary, tr, meaning, exampleWord, exampleTr, audio } = getItemDetails(rawItem);
                          const visual = getVisualIllustration(primary, rawItem.kn || rawItem.word, exampleWord, meaning);

                          return (
                            <div
                              key={iIdx}
                              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gold-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-start gap-3">
                                {/* Visual Picture Badge if available */}
                                {visual?.emoji && (
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                                      visual.badgeBg || 'bg-amber-50 border-amber-200'
                                    }`}
                                    title={visual.imageHint || primary}
                                  >
                                    {visual.emoji}
                                  </div>
                                )}

                                <div className="space-y-1 min-w-0 flex-1">
                                  <div className="flex items-start gap-2 flex-wrap">
                                    <span className="font-kannada text-xl font-bold text-maroon-800 leading-snug break-words">
                                      {primary}
                                    </span>
                                    {tr && (
                                      <span className="text-xs text-gray-500 font-sans mt-1">
                                        ({tr})
                                      </span>
                                    )}
                                  </div>

                                  {meaning && (
                                    <p className="text-xs text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
                                      {meaning}
                                    </p>
                                  )}

                                  {exampleWord && (
                                    <p className="text-xs text-maroon-700 font-kannada pt-0.5 break-words">
                                      ಉದಾ: <strong>{exampleWord}</strong> {exampleTr && `(${exampleTr})`}
                                    </p>
                                  )}
                                </div>

                                {/* Only render AudioButton if valid Kannada text exists */}
                                {audio ? (
                                  <div className="shrink-0 pt-0.5">
                                    <AudioButton text={audio} size={16} />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}

                {/* Topic Quizzes & Exercises */}
                {currentTopic.exercises && currentTopic.exercises.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-600" /> Guided Topic Check
                    </h4>

                    <div className="space-y-4">
                      {currentTopic.exercises.map((ex, exIdx) => {
                        const isAnswered = !!userAnswers[ex.id];
                        const isChecked = !!checkedAnswers[ex.id];
                        const isCorrect = userAnswers[ex.id] === ex.answer;

                        return (
                          <div
                            key={ex.id || exIdx}
                            className="p-4 rounded-xl border border-gray-200 space-y-3 bg-white"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="font-semibold text-gray-900 font-kannada text-base flex-1">
                                {exIdx + 1}. {ex.prompt}
                              </p>
                              {ex.prompt && /[\u0C80-\u0CFF]/.test(ex.prompt) && (
                                <AudioButton text={ex.prompt} size={18} />
                              )}
                            </div>

                            {ex.options && (
                              <div className="grid sm:grid-cols-2 gap-2">
                                {ex.options.map((opt, oIdx) => {
                                  const isSelected = userAnswers[ex.id] === opt;
                                  return (
                                    <div
                                      key={oIdx}
                                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                                        isSelected
                                          ? 'border-maroon-700 bg-maroon-50 text-maroon-900 font-bold'
                                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                                      }`}
                                    >
                                      <button
                                        type="button"
                                        disabled={isChecked}
                                        onClick={() => handleSelectOption(ex.id, opt)}
                                        className="flex-1 text-left text-sm font-medium whitespace-normal break-words leading-snug"
                                      >
                                        <span className="font-kannada">{opt}</span>
                                      </button>
                                      {opt && /[\u0C80-\u0CFF]/.test(opt) && (
                                        <div className="shrink-0 ml-1">
                                          <AudioButton text={opt.split('(')[0].trim()} size={14} />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {!isChecked ? (
                              <Button
                                variant="secondary"
                                size="sm"
                                disabled={!isAnswered}
                                onClick={() => handleCheckAnswer(ex.id)}
                                className="text-xs"
                              >
                                Check Answer
                              </Button>
                            ) : (
                              <div
                                className={`p-3 rounded-lg text-xs space-y-1 ${
                                  isCorrect
                                    ? 'bg-green-50 border border-green-200 text-green-900'
                                    : 'bg-red-50 border border-red-200 text-red-900'
                                }`}
                              >
                                <p className="font-bold flex items-center gap-1.5">
                                  {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect'}
                                </p>
                                <p>
                                  <strong>Explanation:</strong> {ex.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};
