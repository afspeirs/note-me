import { useAtomValue } from 'jotai';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { NotesListItem } from './NotesListItem';

export function NotesList() {
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const { result: notes, isFetching } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.find({
      selector: {
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: notesSortOptions[sort].value,
    }),
  );

  return (
    <ul role="list" className="flex flex-col p-2 gap-1 overflow-y-auto h-full">
      {isFetching && (
        <li className="block p-3">Loading...</li>
      )}
      {!isFetching && notes.length === 0 && (
        <li className="block p-3">No notes found</li>
      )}
      {notes.map((note) => <NotesListItem note={note} />)}
    </ul>
  );
}
