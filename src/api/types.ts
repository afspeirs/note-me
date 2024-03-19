import type { RxCollection, RxDatabase, RxDocument } from 'rxdb';
import type { QueryConstructor } from 'rxdb-hooks';

export type NoteDocType = {
  date_created: string,
  date_modified: string,
  favourite: boolean,
  folder?: string | null,
  id: `${string}-${string}-${string}-${string}-${string}`,
  text: string,
};

export type NoteDocument = RxDocument<NoteDocType>;
export type NoteCollection = RxCollection<NoteDocType>;
export type NoteQuery = QueryConstructor<NoteDocType>;

export type MyDatabaseCollections = {
  notes: NoteCollection,
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;
