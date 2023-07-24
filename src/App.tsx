import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'rxdb-hooks';

import { db } from '@/api';
import { setReplication } from '@/api/supabase';
import { ServiceWorkerEvents } from '@/components/ServiceWorkerEvents';
import { authAtom } from '@/context/auth';
import { router } from '@/routes';

export function App() {
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    setReplication(setAuth);
  }, []);

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
