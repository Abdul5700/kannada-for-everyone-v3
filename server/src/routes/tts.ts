import { Router, Request, Response } from 'express';

const router = Router();

// Cache audio buffers in memory to avoid repeated external requests
const audioCache = new Map<string, Buffer>();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const text = (req.query.text as string || '').trim();
    const lang = (req.query.lang as string || 'kn').trim();

    if (!text) {
      res.status(400).json({ success: false, error: 'Text query parameter is required' });
      return;
    }

    // Limit length to avoid abuse (Google TTS limit per chunk is ~200 characters)
    const truncatedText = text.slice(0, 200);
    const cacheKey = `${lang}:${truncatedText}`;

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': cached.length,
        'Cache-Control': 'public, max-age=86400',
      });
      res.send(cached);
      return;
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(
      lang
    )}&client=tw-ob&q=${encodeURIComponent(truncatedText)}`;

    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      res.status(502).json({ success: false, error: 'Failed to synthesize speech' });
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Keep cache size bounded
    if (audioCache.size > 1000) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, buffer);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=86400',
    });
    res.send(buffer);
  } catch (error) {
    console.error('TTS endpoint error:', error);
    res.status(500).json({ success: false, error: 'Internal speech synthesis error' });
  }
});

export default router;
