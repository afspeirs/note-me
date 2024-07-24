import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Card } from '@/components/Card';
import { NotesList } from '@/components/NotesList';
import { NotesSearch } from '@/components/NotesSearch';
import { NotesSort } from '@/components/NotesSort';
import { currentFolderAtom } from '@/context/folders';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { ContentHeader } from './ContentHeader';

export function ContentNested() {
  const [currentFolder, setCurrentFolder] = useAtom(currentFolderAtom);
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const notesQuery: NoteQuery = useCallback(
    (collection) => collection.find(currentFolder ? {
      selector: {
        folder: {
          $eq: currentFolder,
        },
        text: {
          $regex: RegExp(search, 'i').source,
        },
      },
      sort: [notesSortOptions[sort].value],
    } : {
      selector: {
        text: {
          $regex: RegExp(search, 'i').source,
        },
      },
      sort: [notesSortOptions[sort].value],
    }),
    [currentFolder, search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  return (
    <Card className="flex flex-col h-full">
      <ContentHeader
        onBack={() => setCurrentFolder(null)}
        title={currentFolder || 'All Notes'}
      >
        <NotesSort />
        <NotesSearch />
      </ContentHeader>

      <NotesList
        isFetching={isFetching}
        fullHeight
        notes={notes}
      />
    </Card>
  );
}
