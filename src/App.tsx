import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'rxdb-hooks';
import { useEventListener } from 'usehooks-ts';

import { enableReplication, initialise, supabase } from '@/api';
import { ServiceWorkerEvents } from '@/components/ServiceWorkerEvents';
import { atomAuth } from '@/context/auth';
import { atomDb, atomReplication } from '@/context/db';
import { router } from '@/routes';
import { openToast } from './components/Toast';

export function App() {
  const [auth, setAuth] = useAtom(atomAuth);
  const [db, setDb] = useAtom(atomDb);
  const [replication, setReplication] = useAtom(atomReplication);

  useEffect(() => {
    initialise().then(setDb);

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setAuth(session);
      if (error) {
        openToast({
          message: error.message,
        }, {
          id: 'get-session-error',
        });
        throw new Error(error.message);
      }
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
    } else {
      replication?.cancel();
      console.log('Not signed in'); // eslint-disable-line no-console
    }
  }, [auth, db]); // eslint-disable-line react-hooks/exhaustive-deps

  useEventListener('online', () => {
    if (!replication) return;
    replication.reSync();
    console.log('replication resync'); // eslint-disable-line no-console
  });

  return (
    <>
      <HelmetProvider>
        <TooltipPrimitive.Provider>
          <Provider db={db!}>
            <RouterProvider router={router} />
          </Provider>
        </TooltipPrimitive.Provider>
      </HelmetProvider>

      <ServiceWorkerEvents />

      <Toaster
        position="bottom-right"
        containerClassName="select-none"
      />
    </>
  );
}
