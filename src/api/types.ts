import type { RxCollection, RxDatabase, RxDocument } from 'rxdb';

export type NoteDocType = {
  dateCreated: string,
  dateModified: string,
  favourite?: boolean,
  id: string,
  isFolder?: boolean,
  relatedFolder?: string,
  relatedNotes?: string[],
  text: string,
};

export type NoteDocument = RxDocument<NoteDocType>;
export type NoteCollection = RxCollection<NoteDocType>;

export type MyDatabaseCollections = {
  notes: NoteCollection,
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;
