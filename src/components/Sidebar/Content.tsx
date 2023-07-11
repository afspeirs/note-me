import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { useAtomValue } from 'jotai';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { getTitle } from '@/utils/getTitle';

export function Content() {
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
    <Card as="nav" className="flex-1 h-full overflow-hidden" aria-label="Sidebar">
      <ul role="list" className="flex flex-col gap-1 p-2 overflow-y-auto h-full">
        {isFetching && (
          <li className="block px-4 py-2">Loading...</li>
        )}
        {!isFetching && notes.length === 0 && (
          <li className="block px-4 py-2">No notes found</li>
        )}
        {notes.map((note) => (
          <li key={note.id}>
            <Button
              href={`/note/${note.id}`}
              secondaryAction={note.favourite && (
                <StarSolidIcon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
              )}
            >
              {getTitle(note.text)}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
