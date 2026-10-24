import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { getAIProvider } from '../providers';
import { aiLimiter } from '../middleware/rateLimiter';
import { DICTIONARY_DATA, searchDictionary } from '../data/dictionaryData';

const router = Router();

router.get('/search', asyncHandler(async (req: Request, res: Response) => {
  const query = String(req.query.q || '').trim();
  const topic = String(req.query.topic || '');
  const direction = String(req.query.direction || 'both') as 'en-kn' | 'kn-en' | 'both';
  if (!query) { res.json({ success: true, data: [] }); return; }

  let results = searchDictionary(query, { topic, direction });

  // If no curated match found, automatically ask Gemini to define and translate the word
  if (results.length === 0) {
    try {
      const provider = getAIProvider();
      const aiResult = await provider.lookupDictionary({ query, direction });
      if (aiResult?.entry) {
        results = [aiResult.entry];
      }
    } catch (err: any) {
      console.warn('[Dictionary AI Lookup Notice]:', err.message);
    }
  }

  res.json({ success: true, data: results });
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const entry = DICTIONARY_DATA.find(e => e.id === req.params.id);
  if (!entry) { res.status(404).json({ success: false, error: 'Word not found.' }); return; }
  res.json({ success: true, data: entry });
}));

const ExplainSchema = z.object({
  word: z.string().min(1).max(200),
  language: z.enum(['english', 'kannada']),
  context: z.string().optional(),
});

router.post('/explain', aiLimiter, asyncHandler(async (req: Request, res: Response) => {
  const parsed = ExplainSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error.errors[0].message });
    return;
  }
  const provider = getAIProvider();
  const result = await provider.explainWord(parsed.data as any);
  res.json({ success: true, data: result, source: provider.name });
}));

export default router;
