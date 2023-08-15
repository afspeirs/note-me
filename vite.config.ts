import { readFileSync } from 'fs';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const appVersion = readFileSync('./.version', { encoding: 'utf8' }).replace('\n', '') || 'N/A';

// https://vitejs.dev/config/
export default defineConfig({ // eslint-disable-line import/no-default-export
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(appVersion),
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
