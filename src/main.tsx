import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ServiceWorkerEvents } from './components/ServiceWorkerEvents';
import { registerServiceWorker } from './registerServiceWorker';
import { router } from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ServiceWorkerEvents />
    <ToastContainer position="bottom-right" />
  </StrictMode>,
);

registerServiceWorker();
