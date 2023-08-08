import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const appVersion = readFileSync('./.version', { encoding: 'utf8' }).replace('\n', '');

// https://vitejs.dev/config/
export default defineConfig({ // eslint-disable-line import/no-default-export
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
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
