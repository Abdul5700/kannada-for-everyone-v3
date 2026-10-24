import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { Badge } from '../../components/ui/Badge';
import { searchDictionary, explainWord, saveWord } from '../../utils/api';
import { DictionaryEntry } from '../../types';
import { Search, Sparkles, Bookmark, BookOpen } from 'lucide-react';

export const Dictionary: React.FC = () => {
  const [query, setQuery] = useState('');
  const [direction, setDirection] = useState<'both' | 'en-kn' | 'kn-en'>('both');
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [explaining, setExplaining] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchDictionary(query.trim(), { direction });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExplainAI = async (word: string, lang: 'english' | 'kannada') => {
    setExplaining(true);
    setAiExplanation(null);
    try {
      const data = await explainWord(word, lang);
      setAiExplanation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setExplaining(false);
    }
  };

  const handleSave = async (entry: DictionaryEntry) => {
    try {
      await saveWord({
        wordId: entry.id,
        english: entry.english,
        kannada: entry.kannada,
        transliteration: entry.transliteration,
        meaning: entry.meaning,
        topic: entry.topic,
      });
      alert(`Saved "${entry.english}" to your vocabulary!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Bilingual Kannada Dictionary
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Search over curated English and Kannada words with audio pronunciation and AI explanations.
        </p>
      </div>

      {/* Search Header Form */}
      <Card className="p-4 sm:p-6 shadow-sm border-gold-200">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-3.5 text-gray-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search English word, Kannada script (ನೀರು), or transliteration (neeru)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon-500 text-sm"
              />
            </div>
            <Button type="submit" variant="primary" loading={loading} className="shrink-0">
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-gray-500">Direction:</span>
            {[
              { id: 'both', label: 'All (Both)' },
              { id: 'en-kn', label: 'English → Kannada' },
              { id: 'kn-en', label: 'Kannada → English' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDirection(d.id as any)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  direction === d.id
                    ? 'bg-maroon-700 text-white border-maroon-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </form>
      </Card>

      {/* Search Results */}
      <div className="grid sm:grid-cols-2 gap-4">
        {results.map((entry) => (
          <Card
            key={entry.id}
            hover
            onClick={() => {
              setSelectedEntry(entry);
              setAiExplanation(null);
            }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Badge variant="maroon">{entry.partOfSpeech}</Badge>
                  {entry.source === 'ai-generated' && (
                    <Badge variant="gold" className="gap-1">
                      <Sparkles size={11} /> AI Defined
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <AudioButton text={entry.kannada} size={18} />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(entry);
                    }}
                    title="Bookmark word"
                    className="p-1.5 text-gray-400 hover:text-gold-600 rounded-full"
                  >
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-kannada font-bold text-2xl text-maroon-900">
                  {entry.kannada}
                </h3>
                <p className="text-sm font-semibold text-gray-800">
                  {entry.english}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  [{entry.transliteration}]
                </p>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {entry.meaning}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Topic: {entry.topic}</span>
              <span className="text-maroon-700 font-semibold">View Details →</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Word Details Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <Card className="max-w-xl w-full p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl border-gold-300">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  Dictionary Entry
                </span>
                <h3 className="font-kannada font-bold text-3xl text-maroon-900">
                  {selectedEntry.kannada}
                </h3>
                <p className="text-lg font-bold text-gray-800">
                  {selectedEntry.english}
                </p>
                <p className="text-xs text-gray-500">
                  [{selectedEntry.transliteration}] • {selectedEntry.partOfSpeech}
                </p>
              </div>
              <AudioButton text={selectedEntry.kannada} size={28} />
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase">Meaning</h4>
                <p className="text-sm text-gray-800">{selectedEntry.meaning}</p>
                <p className="font-kannada text-sm text-gray-600 mt-0.5">
                  {selectedEntry.meaningKn}
                </p>
              </div>

              {selectedEntry.examples?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                    Examples
                  </h4>
                  <div className="space-y-2">
                    {selectedEntry.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start justify-between"
                      >
                        <div>
                          <p className="font-kannada font-bold text-maroon-900">
                            {ex.kannada}
                          </p>
                          <p className="text-xs text-gray-600">{ex.transliteration}</p>
                          <p className="text-xs text-gray-500 italic">{ex.english}</p>
                        </div>
                        <AudioButton text={ex.kannada} size={18} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Deep Explainer Trigger */}
              <div className="pt-2">
                <Button
                  variant="gold"
                  size="sm"
                  loading={explaining}
                  onClick={() =>
                    handleExplainAI(selectedEntry.kannada, 'kannada')
                  }
                  className="w-full gap-2"
                >
                  <Sparkles size={16} /> Explain with AI (Deep Nuance & Memory Tips)
                </Button>
              </div>

              {/* AI Explanation Result */}
              {aiExplanation && (
                <div className="p-4 rounded-xl bg-gold-50/70 border border-gold-200 text-xs space-y-2">
                  <p className="font-bold text-maroon-900">
                    💡 AI Explanation:
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {aiExplanation.simpleExplanation}
                  </p>
                  <p className="text-gray-600">
                    <strong>Context:</strong> {aiExplanation.usageContext}
                  </p>
                  <p className="text-gray-600">
                    <strong>Memory Tip:</strong> {aiExplanation.memoryTip}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-between border-t border-gray-100">
              <Button variant="secondary" onClick={() => setSelectedEntry(null)}>
                Close
              </Button>
              <Button onClick={() => handleSave(selectedEntry)}>
                Bookmark Word
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
