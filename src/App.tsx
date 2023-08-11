import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster, toast } from 'react-hot-toast';
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
      replicationSetup.start();
      setReplication(replicationSetup);
      console.log('Signed in'); // eslint-disable-line no-console
      toast('Signed in', {
        id: 'signed-in',
      });
    } else {
      replication?.cancel();
      console.log('Not signed in'); // eslint-disable-line no-console
      toast('Not signed in', {
        id: 'signed-out',
      });
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
        position="bottom-right"
        containerClassName="!select-none"
        toastOptions={{
          className: '!bg-dark !text-light dark:!bg-light dark:!text-dark !max-w-none',
        }}
      />
    </>
  );
}
