import type { NoteCollection, NoteDocument } from './types';

export const favouriteNote = async (note: NoteDocument) => {
  await note?.modify((prevState) => ({
    ...prevState,
    favourite: !prevState.favourite,
  }));
};

export const updateNote = async (note: NoteDocument, text: string) => {
  await note?.patch({
    text,
  });
};

export function createNote(collection: NoteCollection) {
  const newNote = {
    id: window.crypto.randomUUID(),
    dateCreated: new Date().toISOString(),
    text: '',
  };

  collection.insert(newNote);
}
