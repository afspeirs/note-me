import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/App';
import { registerServiceWorker } from '@/registerServiceWorker';
import '@/index.css';
import '@/webmanifest-apple';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker();