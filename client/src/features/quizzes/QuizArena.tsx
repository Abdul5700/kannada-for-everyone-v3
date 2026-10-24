import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AudioButton } from '../../components/ui/AudioButton';
import { generateQuiz, submitQuiz } from '../../utils/api';
import { getLearnerId } from '../../utils/storage';
import { QuizQuestion } from '../../types';
import { CLASS_TOPICS_MAP, getDefaultTopicForClass } from '../../data/classTopics';
import { Brain, Sparkles, CheckCircle2, RotateCcw, XCircle, HelpCircle, BookOpen } from 'lucide-react';

const QUIZ_STATE_KEY = 'kannada_v3_quiz_session_state';

interface SavedQuizSession {
  topic: string;
  customTopic: string;
  isCustom: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
  batchNumber: number;
  seenQuestionPrompts: string[];
  quizActive: boolean;
  sessionId: string;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  currentIndex: number;
  result: any | null;
}

export const QuizArena: React.FC = () => {
  // Load saved session or initialize default
  const savedState: SavedQuizSession | null = (() => {
    try {
      const raw = localStorage.getItem(QUIZ_STATE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [topic, setTopic] = useState<string>(
    () => savedState?.topic || getDefaultTopicForClass('beginner')
  );
  const [customTopic, setCustomTopic] = useState(savedState?.customTopic || '');
  const [isCustom, setIsCustom] = useState(savedState?.isCustom || false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    savedState?.difficulty || 'easy'
  );
  const [count, setCount] = useState(savedState?.count || 5);

  const [loading, setLoading] = useState(false);
  const [quizActive, setQuizActive] = useState(savedState?.quizActive || false);
  const [sessionId, setSessionId] = useState(savedState?.sessionId || '');
  const [questions, setQuestions] = useState<QuizQuestion[]>(savedState?.questions || []);
  const [answers, setAnswers] = useState<Record<string, string>>(savedState?.answers || {});
  const [currentIndex, setCurrentIndex] = useState(savedState?.currentIndex || 0);
  const [result, setResult] = useState<any>(savedState?.result || null);

  // Track batches and previously asked questions so each batch is fresh
  const [batchNumber, setBatchNumber] = useState(savedState?.batchNumber || 1);
  const [seenQuestionPrompts, setSeenQuestionPrompts] = useState<string[]>(
    savedState?.seenQuestionPrompts || []
  );

  // Auto-persist quiz session state to localStorage on any progress change
  useEffect(() => {
    try {
      const stateToSave: SavedQuizSession = {
        topic,
        customTopic,
        isCustom,
        difficulty,
        count,
        batchNumber,
        seenQuestionPrompts,
        quizActive,
        sessionId,
        questions,
        answers,
        currentIndex,
        result,
      };
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error('Failed to save quiz state:', err);
    }
  }, [
    topic,
    customTopic,
    isCustom,
    difficulty,
    count,
    batchNumber,
    seenQuestionPrompts,
    quizActive,
    sessionId,
    questions,
    answers,
    currentIndex,
    result,
  ]);

  // Combine topics from all curriculum modules for quick selection
  const allCombinedTopics = React.useMemo(() => {
    const list: { value: string; label: string }[] = [];
    Object.entries(CLASS_TOPICS_MAP).forEach(([key, topics]) => {
      topics.forEach((t) => {
        if (!list.some((existing) => existing.value === t.value)) {
          list.push({
            value: t.value,
            label: `${t.label} (${t.labelKn || ''})`,
          });
        }
      });
    });
    return list;
  }, []);

  const handleResetBatchProgress = () => {
    setBatchNumber(1);
    setSeenQuestionPrompts([]);
    setAnswers({});
    setCurrentIndex(0);
    setQuizActive(false);
    setResult(null);
    setQuestions([]);
    try {
      localStorage.removeItem(QUIZ_STATE_KEY);
    } catch {}
  };

  const handleTopicSelect = (val: string) => {
    if (val === '__custom__') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      setTopic(val);
    }
    // Retain continuity or reset on topic change
    setSeenQuestionPrompts([]);
    setBatchNumber(1);
    setQuizActive(false);
    setResult(null);
  };

  const activeTopicString = isCustom && customTopic.trim() ? customTopic.trim() : topic;

  const handleStartQuiz = async (isNewBatch = false) => {
    if (!activeTopicString) return;
    setLoading(true);
    setResult(null);
    setAnswers({});
    setCurrentIndex(0);
    const lid = getLearnerId();

    const nextBatchNum = isNewBatch ? batchNumber + 1 : batchNumber;
    const currentSeen = isNewBatch ? seenQuestionPrompts : [];

    try {
      const res = await generateQuiz({
        classLevel: 'beginner',
        topic: activeTopicString,
        difficulty,
        count,
        learnerId: lid,
        batchNumber: nextBatchNum,
        excludeQuestions: currentSeen,
      });

      if (res?.questions?.length) {
        setQuestions(res.questions);
        setSessionId(res.sessionId);
        setQuizActive(true);
        setBatchNumber(nextBatchNum);
        const newPrompts = res.questions.map((q: any) => q.prompt);
        setSeenQuestionPrompts((prev) => Array.from(new Set([...prev, ...newPrompts])));
      }
    } catch (err) {
      console.error('Quiz generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (opt: string) => {
    const currentQ = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: opt,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const lid = getLearnerId();
    try {
      const data = await submitQuiz({
        sessionId,
        learnerId: lid,
        answers,
        questions: questions.map((q) => ({
          id: q.id,
          prompt: q.prompt,
          answer: q.answer,
          topic: q.topic,
        })),
      });
      setResult(data);
      setQuizActive(false);
    } catch (err) {
      console.error('Quiz submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Brain className="text-maroon-700" /> AI Quiz Arena & Continuous Practice
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Select your class and syllabus topic to generate adaptive questions with instant answer review.
        </p>
      </div>

      {/* Quiz Config Form */}
      {!quizActive && !result && (
        <Card className="p-6 space-y-5 border-gold-200 shadow-sm">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={18} className="text-maroon-700" /> Choose Practice Topic
            </h3>
            {batchNumber > 1 && (
              <div className="flex items-center gap-2">
                <Badge variant="gold">Continuing at Batch #{batchNumber}</Badge>
                <button
                  type="button"
                  onClick={handleResetBatchProgress}
                  title="Reset back to Batch 1"
                  className="text-[11px] text-gray-500 hover:text-red-600 underline font-medium"
                >
                  Reset to Batch 1
                </button>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Topic Dropdown */}
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Select Practice Topic
              </label>
              <select
                value={isCustom ? '__custom__' : topic}
                onChange={(e) => handleTopicSelect(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-maroon-500"
              >
                {allCombinedTopics.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
                <option value="__custom__">✏️ Custom Topic (Enter your own)...</option>
              </select>
            </div>

            {/* Custom Topic Input if selected */}
            {isCustom && (
              <div className="sm:col-span-2 bg-gold-50/60 p-3 rounded-lg border border-gold-200">
                <label className="text-xs font-semibold text-maroon-800 block mb-1">
                  Type Custom Topic / Lesson Name
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. Halegannada Sandhi, Pronouns, Bengaluru City..."
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500"
                />
              </div>
            )}

            {/* Difficulty */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['easy', 'medium', 'hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDifficulty(d as any);
                      setSeenQuestionPrompts([]);
                      setBatchNumber(1);
                    }}
                    className={`py-2 rounded-lg border text-xs font-bold uppercase transition-all ${
                      difficulty === d
                        ? 'bg-maroon-700 text-white border-maroon-700 shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Questions Count
              </label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
              </select>
            </div>
          </div>

          {/* Quick topic tags pill rack */}
          {!isCustom && (
            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-500 block mb-1.5">
                Popular Foundation Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allCombinedTopics.slice(0, 10).map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => handleTopicSelect(t.value)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      topic === t.value && !isCustom
                        ? 'bg-maroon-50 border-maroon-700 text-maroon-800 font-semibold shadow-xs'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 flex justify-between items-center">
            {batchNumber > 1 && (
              <span className="text-xs text-gray-500">
                Resumes from <strong>Batch #{batchNumber}</strong> ({seenQuestionPrompts.length} prior questions recorded)
              </span>
            )}
            <div className="ml-auto">
              <Button
                variant="gold"
                loading={loading}
                onClick={() => handleStartQuiz(false)}
                className="gap-2 px-6 py-2.5 font-bold"
              >
                <Brain size={18} /> {batchNumber > 1 ? `Resume Batch #${batchNumber}` : 'Launch Practice Batch'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Active Quiz Question Screen */}
      {quizActive && currentQ && (
        <Card className="p-6 sm:p-8 space-y-6 shadow-md border-gold-300">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Badge variant="maroon">
                Question {currentIndex + 1} of {questions.length}
              </Badge>
              <Badge variant="gold">Batch #{batchNumber}</Badge>
            </div>
            <span className="text-xs text-gray-500 font-semibold">
              Batch #{batchNumber} • {activeTopicString}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug font-kannada">
              {currentQ.prompt}
            </h3>
            <AudioButton text={currentQ.prompt} />
          </div>

          {/* Options Grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {currentQ.options?.map((opt, i) => {
              const isSelected = answers[currentQ.id] === opt;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-maroon-700 bg-maroon-50 text-maroon-900 shadow-sm ring-1 ring-maroon-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-400">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="font-kannada text-base">{opt}</span>
                  </div>
                  <AudioButton text={opt} />
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-gray-100">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              ← Previous
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next Question →
              </Button>
            ) : (
              <Button
                variant="gold"
                size="sm"
                loading={loading}
                onClick={handleSubmit}
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Results View with Correct Answers & Explanations */}
      {result && (
        <div className="space-y-6">
          <Card className="p-8 text-center space-y-6 shadow-lg border-gold-300">
            <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Batch #{batchNumber} Completed!
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Topic: <strong className="text-maroon-700">{activeTopicString}</strong>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="text-xs text-gray-500">Score</p>
                <h4 className="text-2xl font-extrabold text-maroon-700">
                  {result.score}%
                </h4>
              </div>
              <div>
                <p className="text-xs text-gray-500">Correct</p>
                <h4 className="text-2xl font-extrabold text-green-700">
                  {result.correct}
                </h4>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <h4 className="text-2xl font-extrabold text-gray-800">
                  {result.total}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button variant="secondary" onClick={() => setResult(null)}>
                Change Topic / Class
              </Button>
              <Button
                variant="gold"
                onClick={() => handleStartQuiz(true)}
                className="gap-2"
              >
                <RotateCcw size={16} /> Generate Next Batch (Batch #{batchNumber + 1})
              </Button>
            </div>
          </Card>

          {/* Question Breakdown with Correct Answer Display */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="text-maroon-700" size={20} />
              Detailed Answer Review
            </h4>

            {questions.map((q, idx) => {
              const userAns = answers[q.id] || '(No answer provided)';
              const isCorrect = userAns.trim().toLowerCase() === q.answer.trim().toLowerCase();

              return (
                <Card
                  key={q.id || idx}
                  className={`p-5 space-y-3 border-l-4 shadow-sm ${
                    isCorrect
                      ? 'border-l-green-500 bg-white'
                      : 'border-l-red-500 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-500">
                        Q{idx + 1}.
                      </span>
                      <h5 className="font-semibold text-gray-900 font-kannada text-base">
                        {q.prompt}
                      </h5>
                    </div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                        <CheckCircle2 size={14} /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                        <XCircle size={14} /> Incorrect
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm pt-1">
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        Your Answer:
                      </p>
                      <p
                        className={`font-kannada font-medium ${
                          isCorrect ? 'text-green-800' : 'text-red-700'
                        }`}
                      >
                        {userAns}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                      <p className="text-xs font-semibold text-green-700 mb-1">
                        Correct Answer:
                      </p>
                      <p className="font-kannada font-bold text-green-900">
                        {q.answer}
                      </p>
                    </div>
                  </div>

                  {q.explanation && (
                    <div className="p-3 rounded-lg bg-gold-50 border border-gold-200 text-xs text-gray-700">
                      <span className="font-bold text-maroon-800">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
