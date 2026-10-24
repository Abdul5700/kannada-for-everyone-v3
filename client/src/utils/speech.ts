let currentAudio: HTMLAudioElement | null = null;

export const isSpeechSupported = (): boolean => {
  return true;
};

export const stopSpeech = (): void => {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
};

/**
 * Play high-fidelity Kannada audio via backend TTS endpoint (Google Kannada Voice).
 * Falls back to browser Web Speech API if offline or unavailable.
 */
export const speak = (text: string, lang = 'kn-IN', rate = 0.85): Promise<void> => {
  if (!text?.trim()) return Promise.resolve();

  // Stop any currently active audio
  stopSpeech();

  return new Promise((resolve) => {
    try {
      const cleanText = text.trim();
      const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=kn`;
      const audio = new Audio(audioUrl);
      currentAudio = audio;

      let settled = false;
      const done = () => {
        if (!settled) {
          settled = true;
          if (currentAudio === audio) {
            currentAudio = null;
          }
          resolve();
        }
      };

      audio.onended = done;

      audio.onerror = () => {
        // Fallback to browser SpeechSynthesis if network or TTS failed
        speakFallback(cleanText, lang, rate).then(done).catch(done);
      };

      audio.play().catch(() => {
        // Autoplay restrictions or error: fallback to synthesis
        speakFallback(cleanText, lang, rate).then(done).catch(done);
      });
    } catch (err) {
      speakFallback(text.trim(), lang, rate).then(resolve).catch(resolve);
    }
  });
};

/**
 * Browser SpeechSynthesis fallback
 */
function speakFallback(text: string, lang: string, rate: number): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;

      // Try to find any Indian or Kannada voice
      const voices = window.speechSynthesis.getVoices();
      const best = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('kn') ||
          v.name.toLowerCase().includes('kannada') ||
          v.lang.toLowerCase() === 'hi-in' ||
          v.lang.toLowerCase() === 'en-in'
      );
      if (best) {
        utterance.voice = best;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 80);
    } catch {
      resolve();
    }
  });
}
