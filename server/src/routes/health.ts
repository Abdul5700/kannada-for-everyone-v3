import { Router } from 'express';
import { config, isGeminiConfigured } from '../config';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'Kannada for Everyone API v3.0',
      aiProvider: config.aiProvider,
      geminiConfigured: isGeminiConfigured(),
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
