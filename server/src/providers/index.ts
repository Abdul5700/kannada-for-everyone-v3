import { config, isGeminiConfigured } from '../config';
import type { AIProvider } from './aiProvider';
import { MockAIProvider } from './mockProvider';
import { GeminiProvider } from './geminiProvider';

let _provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (_provider) return _provider;
  if (isGeminiConfigured()) {
    _provider = new GeminiProvider();
    console.log('[AI] Using Gemini provider:', config.geminiModel);
  } else {
    _provider = new MockAIProvider();
    console.log('[AI] Using Mock provider (set AI_PROVIDER=gemini + GEMINI_API_KEY to enable live AI)');
  }
  return _provider;
}

export function resetProvider(): void {
  _provider = null;
}
