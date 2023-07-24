import type { Session } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { SetStateAction } from 'jotai';
import type { RxJsonSchema } from 'rxdb';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { SupabaseReplication } from 'rxdb-supabase';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import type {
  MyDatabase,
  MyDatabaseCollections,
  NoteDocType,
} from './types';

if (!import.meta.env.PROD) {
  await import('rxdb/plugins/dev-mode')
    .then((module) => addRxPlugin(module.RxDBDevModePlugin as any));
}

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export async function initialise(setAuth: (session: SetStateAction<Session | null>) => void) {
  const db: MyDatabase = await createRxDatabase<MyDatabaseCollections>({
    name: 'notemedb', // the name of the database
    storage: getRxStorageDexie(),
    ignoreDuplicate: import.meta.env.DEV,
  });

  const noteSchema: RxJsonSchema<NoteDocType> = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
      dateCreated: {
        type: 'date-time',
      },
      dateModified: {
        type: 'date-time',
      },
      favourite: {
        type: 'boolean',
      },
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      text: {
        type: 'string',
      },
    },
    required: ['id', 'dateCreated'],
  } as const;

  await db.addCollections({
    notes: {
      schema: noteSchema,
    },
  });

  // db.notes.postInsert(
  //   function myPostInsertHook(
  //     this: NoteCollection, // own collection is bound to the scope
  //     docData: NoteDocType, // documents data
  //     doc: NoteDocument, // RxDocument
  //   ) {
  //     console.log(`insert to ${this.name}-collection: ${doc.id}`);
  //   },
  //   false, // not async
  // );

  const replication = new SupabaseReplication({
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

  return db;
}
