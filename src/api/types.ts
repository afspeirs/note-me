import type { RxCollection, RxDatabase, RxDocument } from 'rxdb';

export type NoteDocType = {
  date_created: string,
  date_modified: string,
  favourite?: boolean,
  folder?: string,
  id: string,
  text: string,
};

export type NoteDocument = RxDocument<NoteDocType>;
export type NoteCollection = RxCollection<NoteDocType>;

export type MyDatabaseCollections = {
  notes: NoteCollection,
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;
