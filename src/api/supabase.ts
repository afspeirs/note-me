import type { Session } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { SetStateAction } from 'jotai';
import { SupabaseReplication } from 'rxdb-supabase';

import { db } from '.';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export const replication = new SupabaseReplication({
  supabaseClient: supabase,
  collection: db.notes,
  /**
   * An ID for the replication, so that RxDB is able to resume the replication
   * on app reload. It is recommended to add the supabase URL to make sure you're
   * not mixing up replications against different databases.
   *
   * If you're using row-level security, you might also want to append the user ID
   * in case the logged in user changes, although depending on your application you
   * might want to re-create the entire RxDB from scratch in that case or have one
   * RxDB per user ID (you could add the user ID to the RxDB name).
   */
  replicationIdentifier: `notes_${import.meta.env.VITE_SUPABASE_URL}`,
  // TODO: update this to only pull down users notes instead of them all
  pull: {}, // If absent, no data is pulled from Supabase
  push: {}, // If absent, no changes are pushed to Supabase
  autoStart: false,
});

export const setReplication = (setAuth: (session: SetStateAction<Session | null>) => void) => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log({event, session});
    if (event == 'SIGNED_IN') {
      setAuth(session);
      console.log('replication start');
      replication.start();
    }
    if (event == 'SIGNED_OUT') {
      setAuth(session);
      console.log('replication stop');
      replication.cancel();
    }
  });
};
