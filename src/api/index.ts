import type { User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { RxJsonSchema } from 'rxdb';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { SupabaseReplication } from 'rxdb-supabase';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { openToast } from '@/components/Toast';
import type { MyDatabase, MyDatabaseCollections, NoteDocType } from './types';

if (!import.meta.env.PROD) {
  await import('rxdb/plugins/dev-mode')
    .then((module) => addRxPlugin(module.RxDBDevModePlugin as any));
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

export async function initialise() {
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
      date_created: {
        type: 'date-time',
      },
      date_modified: {
        type: 'date-time',
      },
      favourite: {
        type: 'boolean',
      },
      folder: {
        type: 'string',
      },
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      text: {
        type: 'string',
      },
    },
    required: ['id', 'date_created'],
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

  return db;
}

export function enableReplication(db: MyDatabase, user: User) {
  const userId = user.id.replaceAll('-', '_');
  const replication = new SupabaseReplication<NoteDocType>({
    supabaseClient: supabase,
    collection: db.notes,
    table: `notes_${userId}`,
    replicationIdentifier: `notes_${import.meta.env.VITE_SUPABASE_URL}_${userId}`,
    pull: {}, // If absent, no data is pulled from Supabase
    push: {}, // If absent, no changes are pushed to Supabase
  });

  replication.error$.subscribe((error) => {
    const message = error.parameters.errors?.[0].message;
    console.log(message); // eslint-disable-line no-console

    openToast({
      message: `An error has occurred: "${message}"`,
    }, {
      id: 'replication-error',
    });
  });

  return replication;
}
