import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { generateConversation } from '../../utils/api';
import { MessageCircle, Sparkles } from 'lucide-react';

export const Conversations: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState('self-introduction');
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<any>(null);

  const scenarios = [
    { id: 'self-introduction', label: 'Self Introduction (ಪರಿಚಯ)' },
    { id: 'shopping', label: 'Vegetable Market (ಮಾರುಕಟ್ಟೆ)' },
    { id: 'directions', label: 'Auto & Travel (ಆಟೋ ಮತ್ತು ಪ್ರಯಾಣ)' },
    { id: 'restaurant', label: 'Hotel & Ordering Food (ಊಟ)' },
    { id: 'hospital', label: 'Doctor & Clinic (ಆಸ್ಪತ್ರೆ)' },
  ];

  const staticDialogues: Record<string, any[]> = {
    'self-introduction': [
      { speaker: 'A', label: 'Rahul', kn: 'ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ರಾಹುಲ್.', tr: 'Namaskara! Nanna hesaru Rahul.', en: 'Hello! My name is Rahul.' },
      { speaker: 'B', label: 'Priya', kn: 'ನಮಸ್ಕಾರ ರಾಹುಲ್! ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿದ್ದೀರಿ?', tr: 'Namaskara Rahul! Neevu ellinda bandiddeeri?', en: 'Hello Rahul! Where are you from?' },
      { speaker: 'A', label: 'Rahul', kn: 'ನಾನು ಮುಂಬೈನಿಂದ ಬಂದಿದ್ದೇನೆ. ಈಗ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ.', tr: 'Naanu Mumbaininda bandiddene. Eega Bengalurinalli kelasa maaduttiddene.', en: 'I am from Mumbai. Now I am working in Bengaluru.' },
      { speaker: 'B', label: 'Priya', kn: 'ತುಂಬಾ ಸಂತೋಷ! ಕನ್ನಡ ಕಲಿಯಲು ನಿಮಗೆ ಸ್ವಾಗತ.', tr: 'Tumba santosha! Kannada kaliyalu nimage svaagata.', en: 'Very glad! Welcome to learning Kannada.' },
    ],
    shopping: [
      { speaker: 'A', label: 'Customer', kn: 'ಅಣ್ಣ, ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು?', tr: 'Anna, tomato bele eshtu?', en: 'Brother, how much are the tomatoes?' },
      { speaker: 'B', label: 'Vendor', kn: 'ಒಂದು ಕೆಜಿಗೆ ಮೂವತ್ತು ರೂಪಾಯಿ ಸರ್.', tr: 'Ondu kg-ge moovattu ruupaayi sir.', en: 'Thirty rupees per kilo, sir.' },
      { speaker: 'A', label: 'Customer', kn: 'ಸರಿ, ಎರಡು ಕೆಜಿ ಕೊಡಿ. ತಾಜಾ ಇದೆಯಾ?', tr: 'Sari, eradu kg kodi. Taaja ideya?', en: 'Okay, give two kilos. Are they fresh?' },
      { speaker: 'B', label: 'Vendor', kn: 'ಹೌದು ಸರ್, ಇಂದೇ ತೋಟದಿಂದ ತಂದಿದ್ದು.', tr: 'Haudu sir, inde tootadinda tandaddu.', en: 'Yes sir, brought from the farm today.' },
    ],
    directions: [
      { speaker: 'A', label: 'Passenger', kn: 'ಆಟೋ, ಮೆಜೆಸ್ಟಿಕ್ ಮೆಟ್ರೋಗೆ ಹೋಗುತ್ತೀರಾ?', tr: 'Auto, Majestic Metro-ge hoogutteera?', en: 'Auto, will you go to Majestic Metro?' },
      { speaker: 'B', label: 'Driver', kn: 'ಹೌದು, ಬನ್ನಿ ಸರ್. ಮೀಟರ್ ಹಾಕ್ತೀನಿ.', tr: 'Haudu, banni sir. Meter haakteeni.', en: 'Yes, please come sir. I will turn on the meter.' },
      { speaker: 'A', label: 'Passenger', kn: 'ಧನ್ಯವಾದ. ಸ್ವಲ್ಪ ಬೇಗ ಹೋಗಿ, ರೈಲು ಇದೆ.', tr: 'Dhanyavaada. Svalpa beega hoogi, railu ide.', en: 'Thank you. Please go a little fast, I have a train.' },
    ],
  };

  const handleGenerateAI = async () => {
    setLoading(true);
    try {
      const data = await generateConversation(selectedScenario, 'beginner');
      setAiData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const activeDialogue = aiData?.dialogue || staticDialogues[selectedScenario] || staticDialogues['self-introduction'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Everyday Kannada Conversations
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Real dialogues used in Bengaluru autos, grocery shops, and office intros.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          loading={loading}
          onClick={handleGenerateAI}
          className="gap-2 shrink-0"
        >
          <Sparkles size={16} /> Generate New AI Dialogue
        </Button>
      </div>

      {/* Scenario Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSelectedScenario(s.id);
              setAiData(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedScenario === s.id
                ? 'bg-maroon-700 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Dialogue Thread */}
      <Card className="p-6 space-y-4 shadow-sm border-gold-200">
        <div className="space-y-4">
          {activeDialogue.map((line: any, idx: number) => {
            const isSpeakerA = line.speaker === 'A';

            return (
              <div
                key={idx}
                className={`flex gap-3 ${
                  isSpeakerA ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-lg p-4 rounded-2xl shadow-xs space-y-1 ${
                    isSpeakerA
                      ? 'bg-gray-50 border border-gray-200/80 rounded-tl-none'
                      : 'bg-maroon-50 border border-maroon-200/80 rounded-tr-none text-right'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isSpeakerA ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-maroon-800 uppercase tracking-wider">
                      {line.label || (isSpeakerA ? 'Speaker A' : 'Speaker B')}
                    </span>
                    <AudioButton text={line.kn || line.kannada} size={16} />
                  </div>

                  <p className="font-kannada font-bold text-lg text-gray-900 leading-snug">
                    {line.kn || line.kannada}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    {line.tr || line.transliteration}
                  </p>
                  <p className="text-xs text-gray-500 italic pt-0.5">
                    {line.en || line.english}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
