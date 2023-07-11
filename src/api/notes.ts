import toast from 'react-hot-toast';

import { getTitle } from '@/utils/getTitle';
import type { NoteCollection, NoteDocType, NoteDocument } from './types';

const returnNoteObject = ({
  dateCreated,
  dateModified,
  favourite,
  text,
}: Partial<NoteDocType> = {}) => ({
  id: window.crypto.randomUUID(),
  dateCreated: dateCreated ? new Date(dateCreated).toISOString() : new Date().toISOString(),
  dateModified: dateModified ? new Date(dateModified).toISOString() : new Date().toISOString(),
  favourite: favourite || false,
  text: text || '',
});

export async function createNote(collection: NoteCollection) {
  const newNote = returnNoteObject();

  const existingNote = await collection.findOne({
    selector: {
      text: '',
    },
  }).exec();

  if (existingNote?.id) {
    return existingNote.id;
  }

  await collection.insert(newNote);
  return newNote.id;
}

export async function deleteNote(note: NoteDocument) {
  await note.remove()
    .then(() => toast('Deleted Note', {
      id: 'delete',
    }));
}

export async function favouriteNote(note: NoteDocument) {
  await note?.modify((prevState) => ({
    ...prevState,
    // dateModified: new Date().toISOString(),
    favourite: !prevState.favourite,
  }))
    .then((note2) => toast(`"${getTitle(note.text)}" ${note2?.favourite ? 'added to favourites' : 'removed from favourites'}`, {
      id: 'favourite',
    }));
}

export async function importNotes(collection: NoteCollection, files: Partial<NoteDocType>[]) {
  const notes = files.map((note) => returnNoteObject(note));

  await collection.bulkInsert(notes);
}

export async function updateNote(note: NoteDocument, text: string) {
  await note?.patch({
    dateModified: new Date().toISOString(),
    text,
  });
}
