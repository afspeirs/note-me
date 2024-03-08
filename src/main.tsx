import { registerServiceWorker } from '@afspeirs/service-worker';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import '@/index.css';
import '@/webmanifest-apple';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker({
  register: import.meta.env.PROD,
});
