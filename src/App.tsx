import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'rxdb-hooks';

import { ServiceWorkerEvents } from './components/ServiceWorkerEvents';
import { router } from './routes';
import { initialise } from './api';
import type { MyDatabase } from './api/types';

export function App() {
  const [db, setDb] = useState<MyDatabase | null>(null);

  useEffect(() => {
    initialise().then(setDb);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Provider db={db!}>
          <RouterProvider router={router} />
        </Provider>
      </HelmetProvider>

      <ServiceWorkerEvents />
      <Toaster position="bottom-center" />
    </>
  );
}
