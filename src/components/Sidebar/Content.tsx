import { NavLink } from 'react-router-dom';
import { useRxData } from 'rxdb-hooks';
import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';

import type { NoteDocType } from '../../api/types';
import { classNames } from '../../utils/classNames';
import { getTitle } from '../../utils/getTitle';

export function Content() {
  const { result: notes, isFetching } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.find({
      sort: [
        { dateCreated: 'asc' },
      ],
    }),
  );

  return (
    <nav className="h-full" aria-label="Sidebar">
      <ul role="list" className="flex flex-col gap-1 p-2 overflow-y-auto h-full">
        {isFetching && (
          <li className="block px-4 py-2">Loading</li>
        )}
        {notes.length === 0 && (
          <li className="block px-4 py-2">No notes found</li>
        )}
        {notes.map((note) => (
          <li key={note.id}>
            <NavLink
              to={`/note/${note.id}`}
              className={({ isActive }) => classNames(
                isActive ? 'bg-gray-200 hover:bg-gray-300 font-semibold' : 'text-gray-700 hover:bg-gray-100',
                'group flex items-center gap-x-3 rounded-md p-2',
              )}
            >
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {getTitle(note)}
              </span>

              {note.favourite && (
                <StarSolidIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
