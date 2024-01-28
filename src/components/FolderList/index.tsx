import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import { ViewportList } from 'react-viewport-list';
import { useRxData, type QueryConstructor } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { foldersAtom } from '@/context/folders';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { FolderListItem } from './FolderListItem';

export function FolderList() {
  const ref = useRef<HTMLUListElement | null>(null);
  // const setFolders = useSetAtom(foldersAtom);
  const [folders, setFolders] = useAtom(foldersAtom);
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

  useEffect(() => {
    const allFolders = notes.map((note) => note.folder ?? '').filter(Boolean);
    const newFolders = [...new Set(allFolders)];
    // console.log(newFolders);
    setFolders(newFolders);
  }, [notes, setFolders]);

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
