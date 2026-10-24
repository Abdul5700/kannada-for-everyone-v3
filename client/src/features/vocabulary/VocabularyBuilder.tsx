import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { Badge } from '../../components/ui/Badge';
import { getVocabulary, generateVocabulary, saveWord } from '../../utils/api';
import { VocabularyItem } from '../../types';
import { Sparkles, Bookmark, RotateCw, Plus } from 'lucide-react';

export const VocabularyBuilder: React.FC = () => {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [seenWords, setSeenWords] = useState<string[]>([]);
  const [batchCount, setBatchCount] = useState(1);
  const [topic, setTopic] = useState('vegetables and spices');
  const [customTopic, setCustomTopic] = useState('');
  const [classLevel, setClassLevel] = useState('beginner');
  const [count, setCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'flashcards'>('cards');

  const presetTopics = [
    { id: 'fruits and vegetables', label: 'Fruits & Vegetables (ಹಣ್ಣು ತರಕಾರಿ)' },
    { id: 'household items', label: 'House & Kitchen (ಮನೆ ಮತ್ತು ಅಡುಗೆ)' },
    { id: 'feelings and emotions', label: 'Emotions (ಭಾವನೆಗಳು)' },
    { id: 'travel and directions', label: 'Travel & Metro (ಪ್ರಯಾಣ)' },
    { id: 'weather and nature', label: 'Weather & Seasons (ಹವಾಮಾನ)' },
    { id: 'modern technology', label: 'Computers & Tech (ತಂತ್ರಜ್ಞಾನ)' },
    { id: 'professions and jobs', label: 'Careers (ಉದ್ಯೋಗಗಳು)' },
  ];

  const fetchAIVocabulary = async (targetTopic: string, isNextBatch = false) => {
    if (isNextBatch) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setFlashcardIndex(0);
      setShowAnswer(false);
    }

    try {
      const nextBatchNum = isNextBatch ? batchCount + 1 : 1;
      const currentExcluded = isNextBatch ? seenWords : [];
      const res = await generateVocabulary(classLevel, targetTopic, count, {
        excludeWords: currentExcluded,
        batchNumber: nextBatchNum,
      });

      if (res?.items?.length) {
        const newItems: VocabularyItem[] = res.items;
        const newEnglishWords = newItems.map((w) => w.english.toLowerCase());

        if (isNextBatch) {
          // Append new words without duplicates
          setVocabList((prev) => {
            const existingIds = new Set(prev.map((p) => p.english.toLowerCase()));
            const filteredNew = newItems.filter((w) => !existingIds.has(w.english.toLowerCase()));
            return [...prev, ...filteredNew];
          });
          setSeenWords((prev) => Array.from(new Set([...prev, ...newEnglishWords])));
          setBatchCount(nextBatchNum);
        } else {
          setVocabList(newItems);
          setSeenWords(newEnglishWords);
          setBatchCount(1);
        }
      } else {
        const local = await getVocabulary({ topic: targetTopic });
        setVocabList(local);
      }
    } catch (err) {
      console.error(err);
      if (!isNextBatch) {
        const local = await getVocabulary({ topic: targetTopic });
        setVocabList(local);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setSeenWords([]);
    setBatchCount(1);
    fetchAIVocabulary(topic, false);
  }, [topic, classLevel, count]);

  const handleCustomGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;
    setTopic(customTopic.trim());
  };

  const handleSave = async (v: VocabularyItem) => {
    try {
      await saveWord({
        wordId: v.id,
        english: v.english,
        kannada: v.kannada,
        transliteration: v.transliteration,
        meaning: v.meaning,
        topic: v.topic,
      });
      alert(`Bookmarked "${v.english}"!`);
    } catch (err) {
      console.error(err);
    }
  };

  const currentFlashcard = vocabList[flashcardIndex];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            AI Vocabulary Studio (ಶಬ್ದಕೋಶ ರಚನೆ)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Every vocabulary list and flashcard set is generated on-demand by Google Gemini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'cards' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Grid Cards
          </Button>
          <Button
            variant={viewMode === 'flashcards' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('flashcards')}
          >
            Flashcard Drills
          </Button>
        </div>
      </div>

      {/* Custom AI Topic Prompt Bar */}
      <Card className="p-5 border-gold-200 shadow-sm space-y-3">
        <form onSubmit={handleCustomGenerate} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Generate vocabulary on any topic (e.g. Wildlife, Bank terms, Airport, Cricket, Food)..."
              className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
            />
          </div>

          <Button
            type="submit"
            variant="gold"
            loading={loading}
            className="gap-2 shrink-0"
          >
            <Sparkles size={16} /> Generate with Gemini
          </Button>
        </form>

        {/* Preset Topic Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-gray-400 font-semibold mr-1">
            Themes:
          </span>
          {presetTopics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTopic(t.id);
                setCustomTopic('');
              }}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                topic === t.id
                  ? 'bg-maroon-700 text-white border-maroon-700 shadow-2xs'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gold-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Showing AI batch for: <strong className="text-gray-900 capitalize">{topic}</strong> ({vocabList.length} items loaded{batchCount > 1 ? ` • Batch ${batchCount}` : ''})
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fetchAIVocabulary(topic, false)}
            loading={loading && !loadingMore}
            className="gap-1.5 text-xs py-1"
          >
            <RotateCw size={13} /> Reset Fresh Batch
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => fetchAIVocabulary(topic, true)}
            loading={loadingMore}
            className="gap-1.5 text-xs py-1"
          >
            <Plus size={13} /> Load More Words (Unlimited)
          </Button>
        </div>
      </div>

      {/* Flashcards View */}
      {viewMode === 'flashcards' && currentFlashcard && (
        <div className="max-w-md mx-auto space-y-4">
          <Card
            onClick={() => setShowAnswer(!showAnswer)}
            className="h-64 flex flex-col items-center justify-center text-center p-8 border-gold-300 shadow-md cursor-pointer hover:border-gold-400 transition-all select-none"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {showAnswer ? 'KANNADA SCRIPT & MEANING' : 'ENGLISH TERM (TAP TO REVEAL)'}
            </span>

            {showAnswer ? (
              <div className="space-y-2">
                <h3 className="font-kannada font-bold text-4xl text-maroon-900">
                  {currentFlashcard.kannada}
                </h3>
                <p className="text-sm font-semibold text-gray-700">
                  [{currentFlashcard.transliteration}]
                </p>
                <p className="text-xs text-gray-500 italic max-w-xs">
                  {currentFlashcard.meaning}
                </p>
                <div className="pt-2">
                  <AudioButton text={currentFlashcard.kannada} size={24} />
                </div>
              </div>
            ) : (
              <h3 className="text-3xl font-bold text-gray-900">
                {currentFlashcard.english}
              </h3>
            )}
          </Card>

          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              disabled={flashcardIndex === 0}
              onClick={() => {
                setFlashcardIndex((prev) => Math.max(0, prev - 1));
                setShowAnswer(false);
              }}
            >
              ← Previous
            </Button>
            <span className="text-xs text-gray-500 font-medium">
              {flashcardIndex + 1} of {vocabList.length}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={flashcardIndex >= vocabList.length - 1}
              onClick={() => {
                setFlashcardIndex((prev) => Math.min(vocabList.length - 1, prev + 1));
                setShowAnswer(false);
              }}
            >
              Next →
            </Button>
          </div>
        </div>
      )}

      {/* Grid Cards View */}
      {viewMode === 'cards' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocabList.map((item) => (
              <Card key={item.id} className="p-4 flex flex-col justify-between shadow-2xs border-gold-200/80">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="maroon">{item.partOfSpeech || 'word'}</Badge>
                      <Badge variant="gold" className="gap-1 text-[10px]">
                        <Sparkles size={10} /> Gemini
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <AudioButton text={item.kannada} size={18} />
                      <button
                        type="button"
                        onClick={() => handleSave(item)}
                        title="Bookmark word"
                        className="p-1 text-gray-400 hover:text-gold-600 rounded-full"
                      >
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-kannada font-bold text-2xl text-maroon-900">
                    {item.kannada}
                  </h3>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.english}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    [{item.transliteration}]
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {item.meaning}
                  </p>

                  {item.example && (
                    <div className="mt-3 p-2.5 rounded-lg bg-gold-50/40 border border-gold-200/50 text-xs">
                      <p className="font-kannada font-bold text-maroon-900">
                        {item.example.kannada}
                      </p>
                      <p className="text-[11px] text-gray-500 italic mt-0.5">
                        {item.example.english}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Button
              variant="gold"
              onClick={() => fetchAIVocabulary(topic, true)}
              loading={loadingMore}
              className="gap-2 px-6 shadow-sm"
            >
              <Sparkles size={16} /> Generate More Unique Words with Gemini
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
