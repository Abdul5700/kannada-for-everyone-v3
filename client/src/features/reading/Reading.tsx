import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { Badge } from '../../components/ui/Badge';
import { generateReadingPassage } from '../../utils/api';
import { BookOpen, Sparkles, Send } from 'lucide-react';

export const Reading: React.FC = () => {
  const [topicInput, setTopicInput] = useState('');
  const [classLevel, setClassLevel] = useState('3');
  const [loading, setLoading] = useState(false);
  const [passage, setPassage] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const sampleTopics = [
    'Mysore Dasara Festival',
    'Rainy Season in Malnad (ಮಳೆಗಾಲ)',
    'The Historical Stone Chariot of Hampi',
    'A Day at Lalbagh Botanical Garden',
    'Farming in Karnataka (ನಮ್ಮ ರೈತರು)',
    'Basavanna and Sharana Heritage',
  ];

  // Default starter passage
  const defaultPassage = {
    title: 'An Evening in Lalbagh',
    titleKn: 'ಲಾಲ್‌ಬಾಗ್‌ನಲ್ಲಿ ಒಂದು ಸಂಜೆ',
    classLevel: 'Beginner',
    passageKn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿರುವ ಲಾಲ್‌ಬಾಗ್ ಒಂದು ಪ್ರಸಿದ್ಧ ಸಸ್ಯತೋಟ. ಇಲ್ಲಿ ನೂರಾರು ವರ್ಷಗಳ ಹಳೆಯ ದೊಡ್ಡ ಮರಗಳಿವೆ. ಸಂಜೆಯ ಸಮಯದಲ್ಲಿ ಅನೇಕ ಜನರು ಇಲ್ಲಿ ವಾಯುವಿಹಾರಕ್ಕೆ ಬರುತ್ತಾರೆ. ಗಾಜಿನ ಮನೆಯು ಹೂವಿನ ಪ್ರದರ್ಶನದ ಸಮಯದಲ್ಲಿ ಬಹಳ ಸುಂದರವಾಗಿ ಕಾಣುತ್ತದೆ.',
    transliteration: 'Bengalurinalliruva Lalbagh ondu prasiddha sasyatota. Illi nooraaru varshagala haleya dodda maragalive. Sanjeya samayadalli aneka janaru illi vaayuvihaarakke baruttaare. Gaajina maneyu hoovina pradarshanada samayadalli bahala sundaravaagi kaanuttade.',
    englishTranslation: 'Lalbagh in Bengaluru is a famous botanical garden. There are huge trees here that are hundreds of years old. In the evening, many people come here for walking. The Glass House looks exceptionally beautiful during the flower show.',
    vocabulary: [
      { kannada: 'ಸಸ್ಯತೋಟ (Sasyatota)', transliteration: 'Sasyatota', english: 'Botanical Garden' },
      { kannada: 'ವಾಯುವಿಹಾರ (Vaayuvihaara)', transliteration: 'Vaayuvihaara', english: 'Stroll / Evening Walk' },
      { kannada: 'ಗಾಜಿನ ಮನೆ (Gaajina mane)', transliteration: 'Gaajina mane', english: 'Glass House' },
    ],
    questions: [
      {
        prompt: 'Where is Lalbagh Botanical Garden situated?',
        options: ['ಬೆಂಗಳೂರು (Bengaluru)', 'ಮೈಸೂರು (Mysuru)', 'ಮಂಗಳೂರು (Mangaluru)', 'ಹುಬ್ಬಳ್ಳಿ (Hubballi)'],
        answer: 'ಬೆಂಗಳೂರು (Bengaluru)',
        explanation: 'The passage explicitly introduces Lalbagh as a famous garden in Bengaluru.',
      },
      {
        prompt: 'What looks very beautiful during the flower show?',
        options: ['ಗಾಜಿನ ಮನೆ (Glass House)', 'ಬಸ್ ನಿಲ್ದಾಣ (Bus Stand)', 'ರಸ್ತೆ (Road)', 'ಶಾಲೆ (School)'],
        answer: 'ಗಾಜಿನ ಮನೆ (Glass House)',
        explanation: 'The passage mentions the Glass House looks exceptionally beautiful during flower shows.',
      },
    ],
  };

  const current = passage || defaultPassage;

  const handleGenerateAI = async (customTopic?: string) => {
    const t = customTopic || topicInput;
    if (!t.trim()) return;
    setLoading(true);
    setSelectedAnswers({});
    try {
      const data = await generateReadingPassage(t.trim(), classLevel);
      if (data) {
        setPassage(data);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate reading passage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          AI Reading & Comprehension Studio (ಗದ್ಯ ವಾಚನ)
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Generate authentic Kannada stories and cultural essays on any topic using Google Gemini.
        </p>
      </div>

      {/* AI Topic Generator Form */}
      <Card className="p-6 space-y-4 border-gold-200 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <Sparkles size={16} className="text-gold-600" />
          Generate Passage on Any Topic with Gemini
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Type any topic (e.g. Kaveri River, Belur Temple, Yakshagana, Space Mission)..."
            className="flex-1 p-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />

          <Button
            variant="gold"
            loading={loading}
            onClick={() => handleGenerateAI()}
            className="gap-2 shrink-0"
          >
            <Sparkles size={16} /> Generate Passage
          </Button>
        </div>

        {/* Suggested Quick Topics */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-gray-400 font-semibold mr-1">
            Quick Topics:
          </span>
          {sampleTopics.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopicInput(t);
                handleGenerateAI(t);
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gold-50 border border-gray-200 text-gray-700 transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Reader Card */}
      <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-gold-200">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="maroon">
              Reading Passage
            </Badge>
            {passage && (
              <Badge variant="gold" className="gap-1">
                <Sparkles size={11} /> AI Generated
              </Badge>
            )}
          </div>
          <AudioButton text={current.passageKn} size={22} label="Listen to Passage" />
        </div>

        <div>
          <h3 className="font-kannada font-bold text-2xl text-maroon-900">
            {current.titleKn}
          </h3>
          <p className="text-sm font-semibold text-gray-700 mt-0.5">
            {current.title}
          </p>
        </div>

        {/* Kannada Passage Text */}
        <div className="p-6 rounded-2xl bg-gold-50/40 border border-gold-200/60">
          <p className="font-kannada font-bold text-xl sm:text-2xl text-maroon-950 leading-relaxed whitespace-pre-line">
            {current.passageKn}
          </p>
        </div>

        {/* Transliteration & English Parallel */}
        <div className="space-y-3 pt-2 text-sm">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Pronunciation / Transliteration
            </h4>
            <p className="text-gray-600 italic leading-relaxed whitespace-pre-line">
              {current.transliteration}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              English Translation
            </h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {current.englishTranslation}
            </p>
          </div>
        </div>

        {/* Key Vocabulary Highlights */}
        {current.vocabulary?.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Key Vocabulary from this Passage
            </h4>
            <div className="flex flex-wrap gap-2">
              {current.vocabulary.map((v: any, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-xs font-semibold text-gray-800"
                >
                  <span className="font-kannada font-bold text-maroon-800">
                    {v.kannada}
                  </span>
                  : {v.english}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comprehension Questions */}
        {current.questions?.length > 0 && (
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Comprehension Check
            </h4>
            {current.questions.map((q: any, qIdx: number) => (
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
                              : 'border-gray-200 opacity-60'
                            : isSelected
                            ? 'border-maroon-700 bg-maroon-50 text-maroon-900'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {opt}
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
