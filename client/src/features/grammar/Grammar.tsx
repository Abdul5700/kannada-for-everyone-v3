import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { Badge } from '../../components/ui/Badge';
import { generateGrammarLesson } from '../../utils/api';
import { BookOpen, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export const Grammar: React.FC = () => {
  const [topicInput, setTopicInput] = useState('');
  const [classLevel, setClassLevel] = useState('3');
  const [loading, setLoading] = useState(false);
  const [grammarLesson, setGrammarLesson] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const sampleGrammarTopics = [
    'Past, Present and Future Tenses (ಕಾಲಗಳು)',
    'Noun Cases and Vibhaktis (ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು)',
    'Personal Pronouns and Respectful Forms (ಸರ್ವನಾಮಗಳು)',
    'Kannada Swaras and Vyanjanas (ವರ್ಣಮಾಲೆ ಮತ್ತು ಧ್ವನಿಗಳು)',
    'Compound Words (ಸಮಾಸಗಳು: ತತ್ಪುರುಷ, ಕರ್ಮಧಾರಯ)',
    'Question Words and Sentence Formation (ಪ್ರಶ್ನಾರ್ಥಕ ವಾಕ್ಯಗಳು)',
    'Adjectives and Descriptions (ಗುಣವಿಶೇಷಣಗಳು)',
  ];

  // Default starter lesson
  const defaultLesson = {
    topicTitle: 'Personal Pronouns & Politeness in Kannada',
    topicTitleKn: 'ಪುರುಷವಾಚಕ ಸರ್ವನಾಮಗಳು ಮತ್ತು ಗೌರವ ಸೂಚಕ ಪ್ರಯೋಗ',
    conceptSummary: 'In Kannada, pronouns are rich in social respect. Just like French or Hindi, Kannada makes a sharp grammatical distinction between informal address ("Neenu" for friends/children) and respectful/plural address ("Neevu" for elders, teachers, or colleagues).',
    sections: [
      {
        heading: 'First Person (ಉತ್ತಮ ಪುರುಷ)',
        description: 'Used when referring to oneself or an inclusive group.',
        rules: [
          'Singular: "Naanu" (ನಾನು) = I',
          'Plural: "Naavu" (ನಾವು) = We',
        ],
        examples: [
          {
            kannada: 'ನಾನು ವಿದ್ಯಾರ್ಥಿ.',
            transliteration: 'Naanu vidyaarthi.',
            english: 'I am a student.',
            breakdown: 'Naanu (I) + Vidyaarthi (Student)',
          },
          {
            kannada: 'ನಾವು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇವೆ.',
            transliteration: 'Naavu Kannada kaliyuttiddêve.',
            english: 'We are learning Kannada.',
            breakdown: 'Naavu (We) + Kannada + kaliyuttiddeve (learning)',
          },
        ],
      },
      {
        heading: 'Second Person: Formal vs Informal (ಮಧ್ಯಮ ಪುರುಷ)',
        description: 'Notice the difference in respect markers when addressing another person.',
        rules: [
          'Informal (friends/younger): "Neenu" (ನೀನು)',
          'Respectful / Formal / Plural: "Neevu" (ನೀವು)',
        ],
        examples: [
          {
            kannada: 'ನೀನು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀಯ?',
            transliteration: 'Neenu elligê hooguttiddiya?',
            english: 'Where are you going? (Informal)',
            breakdown: 'Neenu + ellige (where to) + hooguttiddiya',
          },
          {
            kannada: 'ನೀವು ದಯವಿಟ್ಟು ಬನ್ನಿ.',
            transliteration: 'Neevu dayavittu banni.',
            english: 'Please come. (Respectful)',
            breakdown: 'Neevu + dayavittu (please) + banni (polite imperative)',
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: 'Which pronoun should you use to respectfully address your teacher or an elder?',
        options: ['ನೀವು (Neevu)', 'ನೀನು (Neenu)', 'ಅವನು (Avanu)', 'ಅದು (Adu)'],
        answer: 'ನೀವು (Neevu)',
        explanation: '"Neevu" is the formal and respectful second-person pronoun in Kannada.',
      },
      {
        prompt: 'Translate: "We are learning" (First Person Plural)',
        options: ['ನಾವು ಕಲಿಯುತ್ತಿದ್ದೇವೆ (Naavu kaliyuttiddeve)', 'ನಾನು ಕಲಿಯುತ್ತಿದ್ದೇನೆ (Naanu kaliyuttiddene)', 'ಅವಳು ಕಲಿಯುತ್ತಿದ್ದಾಳೆ (Avalu kaliyuttiddale)', 'ಅವರು ಕಲಿಯುತ್ತಿದ್ದಾರೆ (Avaru kaliyuttiddare)'],
        answer: 'ನಾವು ಕಲಿಯುತ್ತಿದ್ದೇವೆ (Naavu kaliyuttiddeve)',
        explanation: '"Naavu" (We) takes the plural verb ending "-eëve".',
      },
    ],
  };

  const current = grammarLesson || defaultLesson;

  const handleGenerate = async (customTopic?: string) => {
    const t = customTopic || topicInput;
    if (!t.trim()) return;
    setLoading(true);
    setSelectedAnswers({});
    try {
      const data = await generateGrammarLesson(t.trim(), classLevel);
      if (data) {
        setGrammarLesson(data);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate grammar lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          AI Kannada Grammar Studio (ವ್ಯಾಕರಣ ಕಲಿಯಿರಿ)
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Ask Gemini AI to generate structured grammar lessons on any Kannada grammatical rule with rules, breakdowns, and tests.
        </p>
      </div>

      {/* Generator Prompt Box */}
      <Card className="p-6 space-y-4 border-gold-200 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <Sparkles size={16} className="text-gold-600" />
          Generate Custom Grammar Lesson with Gemini
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Type any grammar topic (e.g. Past tense, Saptami Vibhakti, Tatpurusha Samasa, Sandhis)..."
            className="flex-1 p-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />

          <Button
            variant="gold"
            loading={loading}
            onClick={() => handleGenerate()}
            className="gap-2 shrink-0"
          >
            <Sparkles size={16} /> Explain Grammar
          </Button>
        </div>

        {/* Quick Topics */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-gray-400 font-semibold mr-1">
            Grammar Presets:
          </span>
          {sampleGrammarTopics.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopicInput(t);
                handleGenerate(t);
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gold-50 border border-gray-200 text-gray-700 transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Lesson View Card */}
      <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-gold-200">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="maroon">
              {grammarLesson ? 'AI Generated Lesson' : 'Core Concept'}
            </Badge>
            {grammarLesson && (
              <Badge variant="gold" className="gap-1">
                <Sparkles size={11} /> Live Gemini
              </Badge>
            )}
          </div>
          <span className="text-xs text-gray-400 font-semibold">
            Interactive Grammar Module
          </span>
        </div>

        <div>
          <h3 className="font-kannada font-bold text-2xl text-maroon-900">
            {current.topicTitleKn}
          </h3>
          <p className="text-base font-bold text-gray-800 mt-0.5">
            {current.topicTitle}
          </p>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            💡 {current.conceptSummary}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {current.sections?.map((sec: any, sIdx: number) => (
            <div key={sIdx} className="space-y-3 p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <h4 className="font-bold text-base text-gray-900">
                {sec.heading}
              </h4>
              <p className="text-xs text-gray-600">{sec.description}</p>

              {sec.rules?.length > 0 && (
                <div className="bg-gold-50/50 border border-gold-200/50 p-3 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-gold-800 uppercase tracking-wider block">
                    Key Grammatical Rules:
                  </span>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                    {sec.rules.map((r: string, rIdx: number) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples */}
              <div className="space-y-2 pt-1">
                {sec.examples?.map((ex: any, eIdx: number) => (
                  <div
                    key={eIdx}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-kannada font-bold text-lg text-maroon-900">
                        {ex.kannada}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        [{ex.transliteration}]
                      </p>
                      <p className="text-xs text-gray-500 italic mt-0.5">
                        {ex.english}
                      </p>
                      {ex.breakdown && (
                        <p className="text-[11px] font-semibold text-gold-700 mt-1">
                          Breakdown: {ex.breakdown}
                        </p>
                      )}
                    </div>
                    <AudioButton text={ex.kannada} size={18} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Exercises */}
        {current.exercises?.length > 0 && (
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Grammar Practice Drill
            </h4>
            {current.exercises.map((q: any, qIdx: number) => (
              <div key={qIdx} className="space-y-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {qIdx + 1}. {q.prompt}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options?.map((opt: string, i: number) => {
                    const isSelected = selectedAnswers[qIdx] === opt;
                    const isCorrect = opt === q.answer;
                    const show = !!selectedAnswers[qIdx];

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [qIdx]: opt,
                          }))
                        }
                        className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                          show
                            ? isCorrect
                              ? 'bg-green-50 border-green-500 text-green-900 font-bold'
                              : isSelected
                              ? 'bg-red-50 border-red-300 text-red-800'
                              : 'border-gray-200 opacity-60 bg-white'
                            : isSelected
                            ? 'border-maroon-700 bg-maroon-50 text-maroon-900'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <span className="font-kannada text-sm">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedAnswers[qIdx] && q.explanation && (
                  <p className="text-xs text-gray-500 pt-1">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
