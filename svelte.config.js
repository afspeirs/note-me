import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
  ],
  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false,
    },
  },
};

export default config;
