import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { Badge } from '../../components/ui/Badge';
import { getLesson, teachLesson, completeLesson } from '../../utils/api';
import { addCompletedLesson, getLearnerId, getLearnerProfile } from '../../utils/storage';
import {
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  PlayCircle,
  FileCheck2,
  HelpCircle,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';

export const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<any>(null);
  const [taughtData, setTaughtData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [teaching, setTeaching] = useState(false);
  const [teachMode, setTeachMode] = useState<'complete' | 'continue'>('complete');
  const [completed, setCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Load lesson base and saved section progress
  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);

    const savedSection = localStorage.getItem(`lesson_section_${lessonId}`);
    if (savedSection) {
      setActiveSectionIdx(parseInt(savedSection, 10) || 0);
    }

    getLesson(lessonId)
      .then((res) => {
        setLesson(res);
        // Automatically request deep Gemini lesson teaching
        runGeminiTeaching(res, 'complete');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [lessonId]);

  const runGeminiTeaching = async (baseLesson: any, mode: 'complete' | 'continue') => {
    if (!baseLesson || !lessonId) return;
    setTeaching(true);
    setTeachMode(mode);

    const profile = getLearnerProfile();
    const explanationLanguage = profile?.explanationLanguage || 'english';
    const learnerId = getLearnerId();

    try {
      const taught = await teachLesson(lessonId, {
        mode,
        sectionIndex: activeSectionIdx,
        explanationLanguage,
        learnerId,
      });
      if (taught) {
        setTaughtData(taught);
      }
    } catch (err) {
      console.warn('Gemini teachLesson fallback to base lesson', err);
    } finally {
      setTeaching(false);
      setLoading(false);
    }
  };

  const handleNextSection = () => {
    const nextIdx = activeSectionIdx + 1;
    setActiveSectionIdx(nextIdx);
    if (lessonId) {
      localStorage.setItem(`lesson_section_${lessonId}`, String(nextIdx));
    }
  };

  const handleComplete = async () => {
    if (!lessonId) return;
    const lid = getLearnerId();
    try {
      await completeLesson(lessonId, lid, lesson?.estimatedMinutes || 5);
      addCompletedLesson(lessonId);
      setCompleted(true);
    } catch (err) {
      console.error(err);
      addCompletedLesson(lessonId);
      setCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 space-y-3">
        <RefreshCw className="animate-spin mx-auto text-maroon-700" size={32} />
        <p className="text-base font-bold text-gray-800">
          Preparing Comprehensive Lesson...
        </p>
        <p className="text-xs text-gray-500">
          Gemini AI is structuring deep pedagogical explanations, vocabulary, and exercises.
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <Card className="text-center py-16">
        <h3 className="text-lg font-bold text-gray-800">Lesson Not Found</h3>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => navigate('/curriculum')}
        >
          Return to Curriculum
        </Button>
      </Card>
    );
  }

  // Active data is taughtData if available, otherwise base lesson
  const displayTitle = taughtData?.title || lesson.title;
  const displayTitleKn = taughtData?.titleKn || lesson.titleKn;
  const displayExplanation = taughtData?.explanation || lesson.content?.explanation;
  const displayObjectives = taughtData?.objectives || lesson.objectives || [];
  const displaySections = taughtData?.sections || lesson.content?.sections || [];
  const displayVocabulary = taughtData?.vocabulary || lesson.content?.vocabulary || [];
  const displaySentenceBreakdowns = taughtData?.sentenceBreakdowns || [];
  const displayGrammarNotes = taughtData?.grammarNotes || lesson.content?.grammarNotes || [];
  const displayRecap = taughtData?.recap || null;
  const displayExercises = taughtData?.exercises || lesson.exercises || [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Nav & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/curriculum')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-maroon-700"
        >
          <ArrowLeft size={14} /> Back to Curriculum
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant={teachMode === 'complete' ? 'primary' : 'secondary'}
            onClick={() => runGeminiTeaching(lesson, 'complete')}
            disabled={teaching}
            className="text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            {teaching && teachMode === 'complete' ? (
              <RefreshCw size={13} className="animate-spin" />
            ) : (
              <GraduationCap size={14} />
            )}
            Complete Lesson
          </Button>

          <Button
            variant={teachMode === 'continue' ? 'primary' : 'secondary'}
            onClick={() => runGeminiTeaching(lesson, 'continue')}
            disabled={teaching}
            className="text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            {teaching && teachMode === 'continue' ? (
              <RefreshCw size={13} className="animate-spin" />
            ) : (
              <PlayCircle size={14} />
            )}
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Lesson Hero Header */}
      <Card className="p-6 sm:p-8 border-gold-200 bg-gradient-to-br from-white to-gold-50/20">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="maroon">
            {lesson.classLevel === 'beginner'
              ? 'Beginner'
              : `Class ${lesson.classLevel}`}
          </Badge>
          <Badge variant="gray">{lesson.category}</Badge>
          {taughtData ? (
            <Badge variant="gold">
              <Sparkles size={11} className="mr-1 inline text-gold-600" />
              Gemini Deep Pedagogical Teaching
            </Badge>
          ) : (
            <Badge variant="gray">Standard Source</Badge>
          )}
          {(taughtData?.unitTitle || lesson.unitTitle) && (
            <span className="text-xs text-gray-500">
              Unit: {taughtData?.unitTitle || lesson.unitTitle}
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {displayTitle}
        </h2>
        <h3 className="font-kannada text-xl font-bold text-maroon-800 mt-1">
          {displayTitleKn}
        </h3>

        {taughtData?.prerequisites && (
          <div className="mt-3 p-3 rounded-lg bg-blue-50/80 border border-blue-200/60 text-xs text-blue-900">
            <strong>Prerequisites & Context:</strong> {taughtData.prerequisites}
          </div>
        )}

        <p className="text-sm text-gray-700 mt-3 leading-relaxed">
          {displayExplanation}
        </p>

        {/* Objectives */}
        {displayObjectives.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Learning Objectives
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {displayObjectives.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Content Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BookOpen size={18} className="text-maroon-700" />
            Core Lesson Modules & Concepts ({displaySections.length})
          </h3>
          <span className="text-xs text-gray-500">
            Progressive Grade-Appropriate Instruction
          </span>
        </div>

        {displaySections.map((sec: any, idx: number) => (
          <Card key={idx} className="p-6 border-gray-200 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="w-7 h-7 rounded-full bg-maroon-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-lg text-gray-900">
                  {sec.heading}
                </h4>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            </div>

            {/* Specific Rules */}
            {sec.rules && sec.rules.length > 0 && (
              <div className="mt-3 ml-10 p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">
                  Grammar & Linguistic Rules:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                  {sec.rules.map((rule: string, rIdx: number) => (
                    <li key={rIdx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples Grid */}
            {sec.examples && sec.examples.length > 0 && (
              <div className="mt-4 ml-0 sm:ml-10">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Step-by-Step Examples:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sec.examples.map((ex: any, eIdx: number) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-xl bg-gold-50/50 border border-gold-200/60 flex items-start justify-between gap-4 hover:border-gold-300 transition-all"
                    >
                      <div>
                        <p className="font-kannada font-bold text-lg text-maroon-900">
                          {ex.kannada}
                        </p>
                        <p className="text-xs text-gray-700 font-semibold mt-0.5">
                          {ex.transliteration}
                        </p>
                        <p className="text-xs text-gray-600 italic mt-0.5">
                          {ex.english}
                        </p>
                        {ex.breakdown && (
                          <p className="text-[11px] text-maroon-700 font-medium mt-1 pt-1 border-t border-gold-200/60">
                            🔍 {ex.breakdown}
                          </p>
                        )}
                      </div>
                      <AudioButton text={ex.kannada} size={20} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            {sec.commonMistakes && sec.commonMistakes.length > 0 && (
              <div className="mt-4 ml-0 sm:ml-10 p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-1">
                  <AlertTriangle size={14} />
                  <span>Common Mistakes & Corrections:</span>
                </div>
                <div className="space-y-1.5 text-xs text-rose-900">
                  {sec.commonMistakes.map((m: any, mIdx: number) => (
                    <div key={mIdx}>
                      <span className="line-through text-rose-600 mr-2">❌ {m.incorrect}</span>
                      <span className="font-bold text-green-700">✓ {m.correct}</span>
                      {m.explanation && (
                        <p className="text-[11px] text-gray-600 mt-0.5 italic pl-4">
                          ↳ {m.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Sentence-by-Sentence Breakdown for Passages */}
      {displaySentenceBreakdowns.length > 0 && (
        <Card className="p-6 border-indigo-200 bg-indigo-50/20">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck2 size={18} className="text-indigo-700" />
            <h4 className="font-bold text-lg text-gray-900">
              Sentence-by-Sentence Analysis
            </h4>
          </div>
          <div className="space-y-3">
            {displaySentenceBreakdowns.map((sb: any, sIdx: number) => (
              <div key={sIdx} className="p-3.5 rounded-xl bg-white border border-indigo-100 space-y-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-kannada font-bold text-base text-gray-900">{sb.kannada}</p>
                  <AudioButton text={sb.kannada} size={18} />
                </div>
                <p className="text-xs text-indigo-950 font-medium">{sb.transliteration}</p>
                <p className="text-xs text-gray-700 italic">{sb.english}</p>
                {sb.analysis && (
                  <p className="text-[11px] text-indigo-700 font-medium pt-1 border-t border-indigo-50">
                    💡 Analysis: {sb.analysis}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Target Vocabulary */}
      {displayVocabulary.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark size={18} className="text-gold-600" />
            <h4 className="font-bold text-lg text-gray-900">
              Essential Vocabulary & Usages ({displayVocabulary.length})
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayVocabulary.map((v: any, vIdx: number) => (
              <div
                key={v.id || vIdx}
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/80 flex items-start justify-between gap-2 hover:bg-white hover:border-gold-300 transition-all"
              >
                <div>
                  <p className="font-kannada font-bold text-lg text-maroon-900">{v.kannada}</p>
                  <p className="text-xs font-bold text-gray-800">{v.english}</p>
                  {v.transliteration && (
                    <p className="text-[11px] text-gray-600 italic">{v.transliteration}</p>
                  )}
                  {v.meaning && (
                    <p className="text-[11px] text-gray-600 mt-1">{v.meaning}</p>
                  )}
                  {v.exampleUsage && (
                    <p className="text-[11px] text-maroon-700 font-kannada mt-1 bg-gold-50/60 p-1 rounded">
                      {v.exampleUsage}
                    </p>
                  )}
                </div>
                <AudioButton text={v.kannada} size={18} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Grammar Notes */}
      {displayGrammarNotes.length > 0 && (
        <Card className="p-6 bg-amber-50/30 border-amber-200/70">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-amber-600" />
            <h4 className="font-bold text-base text-amber-900">
              Teacher's Linguistic & Grammar Notes
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-amber-950/90 leading-relaxed list-disc list-inside">
            {displayGrammarNotes.map((note: string, nIdx: number) => (
              <li key={nIdx}>{note}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Lesson Recap */}
      {displayRecap && (
        <Card className="p-6 bg-emerald-50/30 border-emerald-200/70">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-emerald-700" />
            <h4 className="font-bold text-base text-emerald-950">
              Lesson Summary & Key Takeaways
            </h4>
          </div>
          <p className="text-xs text-emerald-900/90 leading-relaxed">
            {displayRecap}
          </p>
        </Card>
      )}

      {/* Interactive Exercises */}
      {displayExercises.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HelpCircle size={18} className="text-maroon-700" />
              <h4 className="font-bold text-lg text-gray-900">
                Check Understanding (Exercises & Assessment)
              </h4>
            </div>
            <span className="text-xs text-gray-500">
              {displayExercises.length} Questions
            </span>
          </div>

          <div className="space-y-6">
            {displayExercises.map((ex: any, qIdx: number) => {
              const options = Array.isArray(ex.options)
                ? ex.options
                : typeof ex.options === 'string'
                ? ex.options.split(' ')
                : [];

              return (
                <div key={ex.id || qIdx} className="space-y-2 p-4 rounded-xl border border-gray-100 bg-gray-50/40">
                  <p className="text-sm font-semibold text-gray-900">
                    {qIdx + 1}. {ex.prompt}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 pt-1">
                    {options.map((opt: string, oIdx: number) => {
                      const isSelected = selectedAnswers[ex.id || qIdx] === opt;
                      const isCorrect = opt === ex.answer;
                      const showResult = !!selectedAnswers[ex.id || qIdx];

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [ex.id || qIdx]: opt,
                            }))
                          }
                          className={`p-3 text-left rounded-xl border text-sm font-medium transition-all ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-50 border-green-500 text-green-900 font-bold'
                                : isSelected
                                ? 'bg-red-50 border-red-300 text-red-800'
                                : 'border-gray-200 opacity-60'
                              : isSelected
                              ? 'border-maroon-700 bg-maroon-50 text-maroon-900 font-semibold'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selectedAnswers[ex.id || qIdx] && (
                    <p className="text-xs text-gray-600 pt-1.5">
                      💡 {ex.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Completion & Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/curriculum')}>
          Back to Curriculum
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handleNextSection}
            className="text-xs flex items-center gap-1"
          >
            Save Progress <ChevronRight size={14} />
          </Button>

          <Button
            variant={completed ? 'secondary' : 'primary'}
            onClick={handleComplete}
            disabled={completed}
            className="gap-2 shadow-sm"
          >
            {completed ? (
              <>
                <CheckCircle2 size={16} className="text-green-600" />
                Lesson Completed!
              </>
            ) : (
              'Mark Lesson as Completed'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
