import toast from 'react-hot-toast';

import { getTitle } from '@/utils/getTitle';
import type { NoteCollection, NoteDocument } from './types';

export async function createNote(collection: NoteCollection) {
  const newNote = {
    id: window.crypto.randomUUID(),
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    text: '',
  };

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
    dateModified: new Date().toISOString(),
    favourite: !prevState.favourite,
  }))
    .then((note2) => toast(`"${getTitle(note)}" ${note2?.favourite ? 'added to favourites' : 'removed from favourites'}`, {
      id: 'favourite',
    }));
}

export async function updateNote(note: NoteDocument, text: string) {
  await note?.patch({
    dateModified: new Date().toISOString(),
    text,
  });
}
