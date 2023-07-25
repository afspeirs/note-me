import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'rxdb-hooks';

import { initialise } from '@/api';
import { ServiceWorkerEvents } from '@/components/ServiceWorkerEvents';
import { authAtom } from '@/context/auth';
import { router } from '@/routes';
import { MyDatabase } from './api/types';

export function App() {
  const [db, setDb] = useState<MyDatabase | null>(null);
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    initialise(setAuth).then(setDb);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HelmetProvider>
        <Provider db={db!}>
          <RouterProvider router={router} />
        </Provider>
      </HelmetProvider>

      <ServiceWorkerEvents />

      {/* TODO: Remove the need for !important styles */}
      <Toaster
        position="bottom-center"
        containerClassName="!select-none"
        toastOptions={{
          className: '!bg-neutral-800 !text-white dark:!bg-white dark:!text-black !max-w-none',
        }}
      />
    </>
  );
}
