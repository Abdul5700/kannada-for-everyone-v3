import path from 'path';
import dotenv from 'dotenv';

// Resolve .env relative to server root to ensure it is always loaded correctly
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback to cwd

export const config = {
  port: parseInt(process.env.PORT || '5050', 10),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || './data/kannada.db',
  aiProvider: (process.env.AI_PROVIDER || 'mock') as 'gemini' | 'mock',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export const isGeminiConfigured = () =>
  config.aiProvider === 'gemini' && config.geminiApiKey.length > 10;
