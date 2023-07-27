import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'rxdb-hooks';
import type { SupabaseReplication } from 'rxdb-supabase';

import { enableReplication, initialise, supabase } from '@/api';
import type { MyDatabase, NoteDocType } from '@/api/types';
import { ServiceWorkerEvents } from '@/components/ServiceWorkerEvents';
import { authAtom } from '@/context/auth';
import { router } from '@/routes';

export function App() {
  const [auth, setAuth] = useAtom(authAtom);
  const [db, setDb] = useState<MyDatabase | null>(null);
  const [replication, setReplication] = useState<SupabaseReplication<NoteDocType> | null>(null);

  useEffect(() => {
    initialise().then(setDb);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: Fix double running of this code
  useEffect(() => {
    if (auth?.user?.id && db) {
      // TODO: lazy load this code
      const replicationSetup = enableReplication(db, auth.user);
      console.log('replication start'); // eslint-disable-line no-console
      replicationSetup.start();
      setReplication(replicationSetup);
    } else {
      console.log('replication stop'); // eslint-disable-line no-console
      replication?.cancel();
    }
  }, [auth, db]); // eslint-disable-line react-hooks/exhaustive-deps

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
