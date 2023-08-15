import { returnNoteObject } from './notes';
import { NoteCollection, NoteDocument } from './types';

export async function createFolder(collection: NoteCollection) {
  const newFolder = {
    ...returnNoteObject(),
    isFolder: true,
    relatedNotes: [],
  };

  await collection.insert(newFolder);
  return newFolder.id;
}

export async function renameFolder(folder: NoteDocument, text: string) {
  await folder.patch({
    text,
  });
}
