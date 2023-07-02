import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { useAtomValue } from 'jotai';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '../../api/types';
import { notesSearchAtom } from '../../context/notesSearch';
import { getTitle } from '../../utils/getTitle';
import { Button } from '../Button';
import { Card } from '../Card';

export function Content() {
  const search = useAtomValue(notesSearchAtom);
  const { result: notes, isFetching } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.find({
      selector: {
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: [
        { dateModified: 'desc' },
      ],
    }),
  );

  return (
    <Card as="nav" className="flex-1 h-full" aria-label="Sidebar">
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
              {getTitle(note)}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
