import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Card } from '@/components/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { NotesList } from '@/components/NotesList';
import { NotesSearch } from '@/components/NotesSearch';
import { NotesSort } from '@/components/NotesSort';
import { atomCurrentFolder } from '@/context/folders';
import { atomNotesSearch } from '@/context/notesSearch';
import { atomNotesSort, notesSortOptions } from '@/context/notesSort';

export function Content() {
  const [currentFolder, setCurrentFolder] = useAtom(atomCurrentFolder);
  const search = useAtomValue(atomNotesSearch);
  const sort = useAtomValue(atomNotesSort);
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
    <Card
      as="nav"
      className="flex flex-col h-[calc(100%-64px-theme(spacing[sidebar-gap]))] sm:h-[calc(100%-48px-theme(spacing[sidebar-gap]))]"
      aria-label="sidebar notes"
    >
      <CardHeader
        onBack={() => setCurrentFolder(null)}
        title={currentFolder || 'All Notes'}
      >
        <NotesSort />
        <NotesSearch />
      </CardHeader>

      <NotesList
        isFetching={isFetching}
        fullHeight
        notes={notes}
      />
    </Card>
  );
}
