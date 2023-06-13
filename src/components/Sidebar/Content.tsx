import { NavLink } from 'react-router-dom';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '../../api/types';
import { classNames } from '../../utils/classNames';

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
    <ul>
      {isFetching && (
        <li className="block px-4 py-2">Loading</li>
      )}
      {notes.length === 0 && (
        <li className="block px-4 py-2">No notes found</li>
      )}
      {notes.map((note) => (
        <li key={note.id}>
          <NavLink
            className={({ isActive }) => classNames(
              'block px-4 py-2',
              isActive ? 'bg-gray-400 bg-opacity-30' : '',
            )}
            to={`/note/${note.id}`}
          >
            {/* TODO: make a getTitle util function? */}
            {note.text?.substring(0, 80) || 'Untitled'}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
