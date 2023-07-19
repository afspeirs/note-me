import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import type { RxJsonSchema } from 'rxdb';

import type {
  MyDatabase,
  MyDatabaseCollections,
  // NoteCollection,
  NoteDocType,
  // NoteDocument,
} from './types';

export async function initialise() {
  if (!import.meta.env.PROD) {
    await import('rxdb/plugins/dev-mode')
      .then((module) => addRxPlugin(module.RxDBDevModePlugin as any));
  }

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

  return db;
}
