import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initDb } from './database/init';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

import healthRouter from './routes/health';
import curriculumRouter from './routes/curriculum';
import dictionaryRouter from './routes/dictionary';
import translationRouter from './routes/translation';
import vocabularyRouter from './routes/vocabulary';
import quizRouter from './routes/quiz';
import progressRouter from './routes/progress';
import conversationsRouter from './routes/conversations';
import homeworkRouter from './routes/homework';
import learnerRouter from './routes/learner';
import readingRouter from './routes/reading';
import grammarRouter from './routes/grammar';
import ttsRouter from './routes/tts';
import foundationsRouter from './routes/foundations';

export function createApp() {
  initDb();

  const app = express();

  // Allow localhost or production Vercel/Netlify frontend domains
  const allowedOrigins = [
    config.clientOrigin,
    'http://localhost:5173',
    'http://localhost:3000',
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
  ].filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // If deployed with wildcard or matched
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive CORS for deployed frontend
    },
    credentials: true
  }));
  app.use(express.json({ limit: '50kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(apiLimiter);

  app.use('/api', healthRouter);
  app.use('/api/learner', learnerRouter);
  app.use('/api/curriculum', curriculumRouter);
  app.use('/api/dictionary', dictionaryRouter);
  app.use('/api/translate', translationRouter);
  app.use('/api/vocabulary', vocabularyRouter);
  app.use('/api/quiz', quizRouter);
  app.use('/api/progress', progressRouter);
  app.use('/api/conversations', conversationsRouter);
  app.use('/api/homework', homeworkRouter);
  app.use('/api/reading', readingRouter);
  app.use('/api/grammar', grammarRouter);
  app.use('/api/tts', ttsRouter);
  app.use('/api/foundations', foundationsRouter);

  app.use(errorHandler);

  return app;
}
