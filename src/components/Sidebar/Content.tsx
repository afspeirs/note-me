import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useRxData, type QueryConstructor } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { Card } from '@/components/Card';
import { FolderList } from '@/components/FolderList';
import { NotesList } from '@/components/NotesList';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';

export function Content() {
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const notesQuery: QueryConstructor<NoteDocType> = useCallback(
    (collection) => collection.find({
      selector: {
        $or: [
          {
            folder: { $exists: false },
          },
          {
            folder: { $eq: '' },
          },
        ],
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: notesSortOptions[sort].value,
    }),
    [search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  return (
    <Card
      as="nav"
      className="flex-1 h-full overflow-hidden p-2"
      aria-label="Sidebar"
    >
      <FolderList />
      <NotesList
        notes={notes}
        isFetching={isFetching}
      />
    </Card>
  );
}
