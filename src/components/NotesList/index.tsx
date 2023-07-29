import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { getTitle } from '@/utils/getTitle';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useAtomValue } from 'jotai';
import { useRxData } from 'rxdb-hooks';
import { NotesContextMenu } from './NotesContextMenu';

export function NotesList() {
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
    <ul role="list" className="flex flex-col p-2 gap-1 overflow-y-auto h-full">
      {isFetching && (
        <li className="block p-3">Loading...</li>
      )}
      {!isFetching && notes.length === 0 && (
        <li className="block p-3">No notes found</li>
      )}
      {notes.map((note) => (
        <li key={note.id} className="group relative flex">
          <Button
            href={`/note/${note.id}`}
            secondaryAction={note.favourite && (
              <StarSolidIcon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
            )}
          >
            {getTitle(note.text)}
          </Button>
          <NotesContextMenu note={note} />
        </li>
      ))}
    </ul>
  );
}
