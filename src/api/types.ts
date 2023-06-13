import type { RxCollection, RxDatabase, RxDocument } from 'rxdb';

export interface NoteDocType {
  dateCreated: string
  dateModified?: string,
  favourite?: boolean,
  id: string,
  text: string,
  // title?: string,
}

export type NoteDocument = RxDocument<NoteDocType>;
export type NoteCollection = RxCollection<NoteDocType>;

export type MyDatabaseCollections = {
  notes: NoteCollection,
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;
