import type { NoteDocument } from '../api/types';

export function getTitle(note: NoteDocument) {
  const title = note.text.split('\n')[0].replace(/#+ /g, '');
  return title.length > 0 ? title : 'Untitled';
}
