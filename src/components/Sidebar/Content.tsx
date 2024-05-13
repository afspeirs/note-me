import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Card } from '@/components/Card';
import { FolderList } from '@/components/FolderList';
import { ContentHeader } from '@/components/Sidebar/ContentHeader';
import { foldersAtom } from '@/context/folders';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { ContentNested } from './ContentNested';

export function Content() {
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const [folders, setFolders] = useAtom(foldersAtom);
  const notesQuery: NoteQuery = useCallback(
    (collection) => collection.find({
      selector: {
        text: {
          $regex: RegExp(search, 'i').source,
        },
      },
      sort: [notesSortOptions[sort].value],
    }),
    [search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  useEffect(() => {
    const allFolders = notes.map((note) => note.folder ?? '').filter(Boolean);
    const newFolders = [...new Set(['', ...allFolders])].sort();
    // console.log(newFolders);
    setFolders(newFolders);
  }, [notes, setFolders]);

  return (
    <Card
      as="nav"
      className="flex flex-col flex-1 overflow-hidden relative"
      aria-label="Sidebar"
    >
      <FolderList
        folders={folders}
        isFetching={isFetching}
        padding
      >
        <ContentHeader title="Folders" />
      </FolderList>

      <ContentNested />
    </Card>
  );
}
