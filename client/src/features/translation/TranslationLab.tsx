import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { Badge } from '../../components/ui/Badge';
import { translate } from '../../utils/api';
import { TranslationResult } from '../../types';
import { ArrowLeftRight, Copy, Check, Sparkles } from 'lucide-react';

export const TranslationLab: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [direction, setDirection] = useState<'en-kn' | 'kn-en'>('en-kn');
  const [context, setContext] = useState('general');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contexts = [
    { id: 'general', label: 'General / Daily' },
    { id: 'conversation', label: 'Spoken / Colloquial' },
    { id: 'education', label: 'School / Academic' },
    { id: 'travel', label: 'Travel & Commute' },
    { id: 'shopping', label: 'Market & Shopping' },
    { id: 'healthcare', label: 'Doctor & Hospital' },
    { id: 'government', label: 'Official / Civic' },
  ];

  const handleTranslate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!sourceText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await translate(sourceText.trim(), direction, context);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || err?.message || 'Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setDirection((prev) => (prev === 'en-kn' ? 'kn-en' : 'en-kn'));
    if (result) {
      setSourceText(result.translated);
      setResult(null);
    }
  };

  const handleCopy = () => {
    if (!result?.translated) return;
    navigator.clipboard.writeText(result.translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          AI Translation Workspace
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Translate sentences between English and Kannada with context awareness.
        </p>
      </div>

      <Card className="p-6 space-y-4 shadow-sm border-gold-200">
        {/* Language Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-maroon-800">
              {direction === 'en-kn' ? 'English' : 'ಕನ್ನಡ (Kannada)'}
            </span>
            <button
              type="button"
              onClick={handleSwap}
              title="Swap languages"
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gold-50 text-gray-600"
            >
              <ArrowLeftRight size={16} />
            </button>
            <span className="font-bold text-sm text-maroon-800">
              {direction === 'en-kn' ? 'ಕನ್ನಡ (Kannada)' : 'English'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Context:</span>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="text-xs font-medium border border-gray-200 rounded-lg p-1.5 bg-white focus:outline-none"
            >
              {contexts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Translation Boxes */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <textarea
              rows={5}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={
                direction === 'en-kn'
                  ? 'Type an English sentence (e.g. "Where is the bus stop?")...'
                  : 'ಕನ್ನಡ ವಾಕ್ಯವನ್ನು ಬರೆಯಿರಿ (e.g. "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?")...'
              }
              className="w-full p-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon-500 text-sm"
            />
            <Button
              variant="primary"
              onClick={handleTranslate}
              loading={loading}
              className="w-full"
            >
              Translate Text
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Translation Output
                </span>
                {result?.translated && (
                  <div className="flex items-center gap-1">
                    <AudioButton text={result.translated} size={18} />
                    <button
                      type="button"
                      onClick={handleCopy}
                      title="Copy to clipboard"
                      className="p-1.5 text-gray-500 hover:text-gray-800 rounded-md"
                    >
                      {copied ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {result ? (
                <div className="space-y-2">
                  <p className="font-kannada font-bold text-xl text-maroon-900 leading-relaxed">
                    {result.translated}
                  </p>
                  {result.transliteration && (
                    <p className="text-xs text-gray-600 font-medium">
                      [{result.transliteration}]
                    </p>
                  )}
                  {result.warning && (
                    <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg mt-2">
                      {result.warning}
                    </p>
                  )}
                </div>
              ) : error ? (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-medium">
                  {error}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Translation will appear here...
                </p>
              )}
            </div>

            {result?.source && (
              <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-500">
                <span>Source Engine:</span>
                <Badge variant={result.source === 'gemini' ? 'green' : 'gray'}>
                  {result.source.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
