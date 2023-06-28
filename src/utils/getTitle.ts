import type { NoteDocument } from '../api/types';

const maxCharacters = 35;

export function getTitle(note: NoteDocument) {
  const title = note.text
    .trim()
    .split('\n')[0]
    .replace(/#+ /g, '');

  if (title.length > 0) {
    if (title.length > maxCharacters) {
      return title
        .substring(0, maxCharacters - 3)
        .padEnd(maxCharacters, '.');
    }
    return title;
  }
  return 'Untitled';
}
