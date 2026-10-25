import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AudioButton } from '../../components/ui/AudioButton';
import { generateHomework, evaluateHomework } from '../../utils/api';
import { getLearnerId } from '../../utils/storage';
import { CLASS_TOPICS_MAP, getDefaultTopicForClass } from '../../data/classTopics';
import { ClipboardList, Sparkles, CheckCircle2, RotateCcw, BookOpen, HelpCircle } from 'lucide-react';

export const Homework: React.FC = () => {
  const [classLevel, setClassLevel] = useState<string | number>(3);
  const [topic, setTopic] = useState<string>(() => getDefaultTopicForClass(3));
  const [customTopic, setCustomTopic] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [assignment, setAssignment] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submission, setSubmission] = useState<any>(null);

  // Combine topics from all modules
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

  const handleTopicSelect = (val: string) => {
    if (val === '__custom__') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      setTopic(val);
    }
  };

  const activeTopicString = isCustom && customTopic.trim() ? customTopic.trim() : topic;

  const handleGenerate = async () => {
    if (!activeTopicString) return;
    setLoading(true);
    setSubmission(null);
    setAnswers({});
    const lid = getLearnerId();
    try {
      const data = await generateHomework(classLevel, activeTopicString, 4, lid);
      setAssignment(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!assignment?.id) return;
    setEvaluating(true);
    const lid = getLearnerId();
    try {
      const data = await evaluateHomework(assignment.id, answers, lid);
      setSubmission(data);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="text-maroon-700" /> Homework & Mock Exam Center
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Generate class-appropriate assignments and test your reading, comprehension, and grammar skills.
        </p>
      </div>

      {!assignment && (
        <Card className="p-6 space-y-5 shadow-sm border-gold-200">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={18} className="text-maroon-700" /> Generate New Class Assignment
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Select Assignment Topic
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

            {isCustom && (
              <div className="sm:col-span-2 bg-gold-50/60 p-3 rounded-lg border border-gold-200">
                <label className="text-xs font-semibold text-maroon-800 block mb-1">
                  Type Custom Topic / Lesson Name
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. Kannada Tenses, Vachana Sahitya..."
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500"
                />
              </div>
            )}
          </div>

          {/* Quick topic tags */}
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

          <div className="pt-3 flex justify-end">
            <Button
              variant="gold"
              loading={loading}
              onClick={handleGenerate}
              className="gap-2 px-6 py-2.5 font-bold"
            >
              <Sparkles size={16} /> Generate Assignment Paper
            </Button>
          </div>
        </Card>
      )}

      {assignment && (
        <Card className="p-6 sm:p-8 space-y-6 shadow-md border-gold-200">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Badge variant="maroon">Class {assignment.classLevel}</Badge>
              <span className="ml-2 text-sm text-gray-600 font-medium">
                Topic: {assignment.topic}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setAssignment(null);
                setSubmission(null);
              }}
            >
              New Assignment
            </Button>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {assignment.questions?.map((q: any, i: number) => (
              <div
                key={q.id || i}
                className="p-4 rounded-xl border border-gray-200 space-y-3 bg-white shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sm text-maroon-700 mt-0.5">
                      Q{i + 1}.
                    </span>
                    <p className="font-semibold text-gray-900 font-kannada text-base">
                      {q.prompt || q.question}
                    </p>
                  </div>
                  <AudioButton text={q.prompt || q.question} />
                </div>

                {q.type === 'multiple-choice' && q.options ? (
                  <div className="grid sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt: string, optIdx: number) => {
                      const isSelected = answers[q.id] === opt;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                          }
                          className={`p-3 rounded-lg border text-left text-sm font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-maroon-700 bg-maroon-50 text-maroon-900 font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <span className="font-kannada">{opt}</span>
                          <AudioButton text={opt} />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    rows={2}
                    value={answers[q.id] || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    placeholder="Write your answer in Kannada or English..."
                    className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon-500 font-kannada"
                  />
                )}
              </div>
            ))}
          </div>

          {!submission && (
            <div className="pt-2 flex justify-end">
              <Button
                variant="gold"
                loading={evaluating}
                onClick={handleSubmit}
                className="gap-2"
              >
                <CheckCircle2 size={16} /> Submit Answers for AI Evaluation
              </Button>
            </div>
          )}

          {/* Submission Evaluation */}
          {submission && (
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="text-green-600" /> Evaluation Results
                </h4>
                <Badge variant={submission.score >= 70 ? 'green' : submission.score >= 40 ? 'gold' : 'maroon'}>
                  Score: {submission.score || 0}%
                </Badge>
              </div>

              <div className="p-4 rounded-xl bg-gold-50 border border-gold-200 text-sm space-y-1">
                <p className="font-semibold text-gray-900">
                  Overall Score: <span className="text-maroon-800 text-base font-bold">{submission.score || 0}%</span>
                </p>
                <p className="text-gray-600 text-xs">
                  Review the question-by-question breakdown below with correct answers and feedback:
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {assignment.questions?.map((q: any, i: number) => {
                  const fb = submission.feedback?.[q.id];
                  const userAnswer = submission.answers?.[q.id];
                  const isCorrect = fb?.startsWith('✓') || fb?.toLowerCase().includes('correct');
                  return (
                    <div
                      key={q.id || i}
                      className={`p-4 rounded-xl border text-sm space-y-2 ${
                        isCorrect
                          ? 'border-green-200 bg-green-50/60'
                          : 'border-red-200 bg-red-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-gray-900 font-kannada">
                          <span className="text-maroon-700 mr-1 font-bold">Q{i + 1}.</span> {q.prompt || q.question}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          isCorrect ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <div className="text-xs space-y-1 pt-1 border-t border-black/5">
                        <p className="text-gray-700">
                          <span className="font-semibold">Your Answer:</span>{' '}
                          <span className={`font-kannada font-medium ${isCorrect ? 'text-green-800' : 'text-red-700 font-bold'}`}>
                            {userAnswer || '(No answer provided)'}
                          </span>
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Result / Correct Answer:</span>{' '}
                          <span className="font-kannada font-medium text-gray-900">
                            {fb || `Correct answer: ${q.answer}`}
                          </span>
                        </p>
                        {q.explanation && (
                          <p className="text-gray-600 italic font-kannada pt-0.5">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => {
                    setSubmission(null);
                    setAnswers({});
                  }}
                  className="gap-2"
                >
                  <RotateCcw size={16} /> Retake / Try Another Topic
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
