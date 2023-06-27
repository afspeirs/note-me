import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '../../api/types';
import { getTitle } from '../../utils/getTitle';
import { Button } from '../Button';
import { Card } from '../Card';

export function Content() {
  const { result: notes, isFetching } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.find({
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
              IconEnd={note.favourite ? StarSolidIcon : undefined}
              IconEndClassName="text-primary"
              href={`/note/${note.id}`}
            >
              {getTitle(note)}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}