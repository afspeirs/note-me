import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { getTitle } from '@/utils/getTitle';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useAtomValue } from 'jotai';
import { useRxData } from 'rxdb-hooks';
import { NotesContextMenu } from '../NotesList/NotesContextMenu';

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
              className="group-hover:pr-14"
              href={`/note/${note.id}`}
              secondaryAction={note.favourite && (
                <StarSolidIcon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
              )}
            >
              {getTitle(note.text)}
            </Button>
            {/* TODO: Have this styled like CheckForInstallPrompt */}
            <div className="absolute right-0">
              <NotesContextMenu note={note} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
