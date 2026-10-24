import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  size?: number;
  className?: string;
  label?: string;
}

// A small in-memory spoken audio cache so we don't re-request the same text
const audioCache: Record<string, string> = {};

/**
 * Attempts to play Kannada audio via the backend TTS endpoint.
 * Falls back automatically to browser SpeechSynthesis if the backend call fails.
 */
async function playKannada(text: string): Promise<void> {
  const cleanText = text.trim();
  if (!cleanText) return;

  // Check if this is non-Kannada text – don't bother calling TTS with it
  const hasKannada = /[\u0C80-\u0CFF]/.test(cleanText);

  if (hasKannada) {
    // Try backend TTS first
    const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
    const url = `${base}/api/tts?text=${encodeURIComponent(cleanText)}&lang=kn`;
    try {
      const audio = new Audio(url);
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => audio.play().then(resolve).catch(reject);
        audio.onerror = reject;
        // 3-second timeout; if it doesn't start, fall through
        setTimeout(reject, 3000);
      });
      return; // success
    } catch {
      // fall through to Web Speech
    }
  }

  // Browser SpeechSynthesis fallback
  await fallbackSpeech(cleanText);
}

function fallbackSpeech(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'kn-IN';
      utt.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const best = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('kn') ||
          v.name.toLowerCase().includes('kannada') ||
          v.lang.toLowerCase() === 'hi-in' ||
          v.lang.toLowerCase() === 'en-in'
      );
      if (best) utt.voice = best;

      utt.onend = () => resolve();
      utt.onerror = () => resolve();
      setTimeout(() => window.speechSynthesis.speak(utt), 80);
    } catch {
      resolve();
    }
  });
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 18,
  className = '',
  label,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Guard: no text or already playing
    if (!text?.trim() || isPlaying) return;

    setIsPlaying(true);
    setFailed(false);
    try {
      await playKannada(text);
    } catch {
      setFailed(true);
      // Final attempt: just fire browser speech directly
      try {
        await fallbackSpeech(text);
        setFailed(false);
      } catch {
        // nothing more we can do
      }
    } finally {
      setIsPlaying(false);
    }
  };

  const hasKannada = /[\u0C80-\u0CFF]/.test(text || '');

  // Don't render if there is literally no text to speak
  if (!text?.trim()) return null;

  return (
    <button
      type="button"
      onClick={handlePlay}
      disabled={isPlaying}
      title={hasKannada ? `ಕೇಳಿ: "${text}"` : `Listen: "${text}"`}
      aria-label={`Play audio for ${text}`}
      className={`inline-flex items-center gap-1.5 p-1.5 rounded-xl border border-[#E9DFD7] bg-white transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#F5C400]/60 active:scale-95 ${
        failed
          ? 'text-rose-400 hover:bg-rose-50 border-rose-200'
          : isPlaying
          ? 'animate-pulse text-[#8B1538] bg-[#FFF9C7] border-[#F5C400]'
          : 'text-[#71656A] hover:text-[#8B1538] hover:bg-[#FFF9E8] hover:border-[#F5C400]'
      } disabled:opacity-60 ${className}`}
    >
      {failed ? <VolumeX size={size} /> : <Volume2 size={size} />}
      {label && <span className="text-xs font-semibold text-[#282126]">{label}</span>}
    </button>
  );
};
