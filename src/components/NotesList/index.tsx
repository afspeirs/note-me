import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useRef } from 'react';
import { ViewportList } from 'react-viewport-list';
import { useRxData, type QueryConstructor } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { NotesListItem } from './NotesListItem';

export function NotesList() {
  const ref = useRef<HTMLUListElement | null>(null);
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const notesQuery: QueryConstructor<NoteDocType> = useCallback(
    (collection) => collection.find({
      selector: {
        folder: {
          $exists: false,
        },
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: notesSortOptions[sort].value,
    }),
    [search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  const folders = useMemo(() => {
    const allFolders = notes.map((note) => note.folder).filter(Boolean);
    return [...new Set(allFolders)];
  }, [notes]);

  // console.log(notes.map((folder) => folder.toJSON()));
  console.log(folders);

  return (
    <ul
      role="list"
      className="flex flex-col h-full p-2 overflow-y-auto overflow-x-hidden"
      ref={ref}
    >
      {isFetching && (
        <li className="block p-3">Loading...</li>
      )}
      {!isFetching && notes.length === 0 && (
        <li className="block p-3">No notes found</li>
      )}
      <ViewportList
        viewportRef={ref}
        items={notes}
      >
        {(note) => <NotesListItem key={note.id} note={note} />}
      </ViewportList>
    </ul>
  );
}
