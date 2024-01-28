import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useRef } from 'react';
import { ViewportList } from 'react-viewport-list';
import { useRxData, type QueryConstructor } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { FolderListItem } from './FolderListItem';

export function FolderList() {
  const ref = useRef<HTMLUListElement | null>(null);
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const notesQuery: QueryConstructor<NoteDocType> = useCallback(
    (collection) => collection.find({
      selector: {
        folder: {
          $exists: true,
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
    const allFolders = notes.map((note) => note.folder ?? '').filter(Boolean);
    return [...new Set(allFolders)];
  }, [notes]);

  console.log(folders);

  return (
    <ul
      role="list"
      className="flex flex-col overflow-y-auto overflow-x-hidden mb-1"
      ref={ref}
    >
      {isFetching && (
        <li className="block p-3">Loading...</li>
      )}
      <ViewportList
        viewportRef={ref}
        items={folders}
      >
        {/* TODO: Maybe I should be passing this through to query the database less? */}
        {/* // folderNotes={notes.filter((note) => note.folder === folder)} */}
        {(folder) => <FolderListItem key={folder} folder={folder} />}
      </ViewportList>
    </ul>
  );
}
