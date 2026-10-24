import { createApp } from './app';
import { config } from './config';

const app = createApp();

app.listen(config.port, () => {
  console.log('═══════════════════════════════════════════════════');
  console.log(' Kannada for Everyone v3.0 — Backend Server');
  console.log(`  Port:        http://localhost:${config.port}`);
  console.log(`  AI Provider: ${config.aiProvider.toUpperCase()}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log('═══════════════════════════════════════════════════');
});
