import toast from 'react-hot-toast';

import { getTitle } from '@/utils/getTitle';
import type { NoteCollection, NoteDocType, NoteDocument } from './types';

export const returnNoteObject = ({
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
  // TODO: Remove note.id from any folders relatedNotes field
  await note.remove()
    .then(() => toast(`"${getTitle(note.text)}" has been deleted`, {
      id: `delete-${note.id}`,
    }));
}

export async function favouriteNote(note: NoteDocument) {
  await note?.modify((prevState) => ({
    ...prevState,
    // dateModified: new Date().toISOString(),
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

export async function removeNoteFromFolder(note: NoteDocument) {
  const oldFolder: NoteDocument = await note.populate('relatedFolder');

  oldFolder.modify((oldData) => {
    // eslint-disable-next-line no-param-reassign
    oldData.relatedNotes = oldData.relatedNotes?.filter((item) => item !== note.id);
    return oldData;
  });
}

export async function moveNote(note: NoteDocument, folder: NoteDocument | null) {
  if (folder) {
    const folderNotes = folder.relatedNotes || [];

    folder.patch({
      relatedNotes: [
        ...folderNotes,
        note.id,
      ],
    });

    note.patch({
      relatedFolder: folder.id,
    });
  } else {
    removeNoteFromFolder(note);

    note.patch({
      relatedFolder: undefined,
    });
  }
}

export async function updateNote(note: NoteDocument, text: string) {
  await note?.patch({
    dateModified: new Date().toISOString(),
    text,
  });
}
