import toast from 'react-hot-toast';

import { getTitle } from '@/utils/getTitle';
import type { NoteCollection, NoteDocType, NoteDocument } from './types';

const returnNoteObject = ({
  date_created,
  date_modified,
  favourite,
  folder,
  text,
}: Partial<NoteDocType> = {}) => ({
  date_created: date_created ? new Date(date_created).toISOString() : new Date().toISOString(),
  date_modified: date_modified ? new Date(date_modified).toISOString() : new Date().toISOString(),
  favourite: favourite || false,
  folder: folder || null,
  id: window.crypto.randomUUID(),
  text: text || '',
});

export async function createNote(collection: NoteCollection, input: Partial<NoteDocType>) {
  const newNote = returnNoteObject(input);

  const existingNote = await collection.findOne({
    selector: {
      text: '',
    },
  }).exec();

  if (existingNote) {
    return existingNote;
  }

  await collection.insert(newNote);
  return newNote;
}

export async function deleteNote(note: NoteDocument) {
  await note.remove()
    .then(() => toast(`"${getTitle(note.text)}" has been deleted`, {
      id: `delete-${note.id}`,
    }));
}

export async function favouriteNote(note: NoteDocument) {
  await note?.modify((prevState) => ({
    ...prevState,
    // date_modified: new Date().toISOString(),
    favourite: !prevState.favourite,
  }))
    .then((note2) => toast(`"${getTitle(note.text)}" ${note2?.favourite ? 'added to favourites' : 'removed from favourites'}`, {
      id: `favourite-${note2.id}`,
    }));
}

export async function importNotes(collection: NoteCollection, files: Partial<NoteDocType>[]) {
  const notes = files.map((note) => returnNoteObject(note));

  await collection.bulkInsert(notes);
}

export async function moveNote(note: NoteDocument, newFolder: string) {
  await note?.patch({
    folder: newFolder,
  })
    .then((note2) => toast(`"${getTitle(note.text)}" ${note2?.folder ? `moved to "${note2.folder}"` : 'removed from folder'}`, {
      id: `move-${note2.id}`,
    }));
}

export async function updateNote(note: NoteDocument, text: string) {
  await note?.patch({
    date_modified: new Date().toISOString(),
    text,
  });
}
