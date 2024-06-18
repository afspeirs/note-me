import { openToast } from '@/components/Toast';
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

export async function deleteNote(collection: NoteCollection, note: NoteDocument) {
  const previousNote = window.structuredClone(note.toJSON());

  await note.remove()
    .then(() => {
      openToast({
        action: {
          text: 'Undo',
          function: async () => {
            await createNote(collection, previousNote);
          },
        },
        message: `"${getTitle(note.text)}" has been deleted`,
      }, {
        id: `delete-${note.id}`,
      });
    });
}

export async function favouriteNote(note: NoteDocument) {
  const previousFavourite = note.favourite;

  await note?.patch({
    favourite: !previousFavourite,
  })
    .then((note2) => {
      openToast({
        action: {
          text: 'Undo',
          function: async () => {
            await note2?.patch({
              favourite: previousFavourite,
            });
          },
        },
        message: `"${getTitle(note2.text)}" ${note2?.favourite ? 'added to favourites' : 'removed from favourites'}`,
      }, {
        id: `favourite-${note2.id}`,
      });
    });
}

export async function importNotes(collection: NoteCollection, files: Partial<NoteDocType>[]) {
  const notes = files.map((note) => returnNoteObject(note));

  await collection.bulkInsert(notes);
}

export async function moveNote(note: NoteDocument, newFolder: string) {
  const oldFolder = note.folder;

  await note?.patch({
    folder: newFolder,
  })
    .then((note2) => {
      openToast({
        action: {
          text: 'Undo',
          function: async () => {
            await note2?.patch({
              folder: oldFolder,
            });
          },
        },
        message: `"${getTitle(note2.text)}" ${note2?.folder ? `moved to "${note2.folder}"` : 'removed from folder'}`,
      }, {
        id: `move-${note2.id}`,
      });
    });
}

export async function updateNote(note: NoteDocument, text: string) {
  await note?.patch({
    date_modified: new Date().toISOString(),
    text,
  });
}
