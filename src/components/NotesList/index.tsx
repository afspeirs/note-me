import { useRef } from 'react';
import { ViewportList } from 'react-viewport-list';

import { classNames } from '@/utils/classNames';
import { NotesListItem } from './NotesListItem';
import { NotesListProps } from './types';

export function NotesList({
  notes,
  isFetching,
  padding = false,
}: NotesListProps) {
  const ref = useRef<HTMLUListElement | null>(null);

  return (
    <ul
      role="list"
      className={classNames(
        'flex flex-col h-full overflow-y-auto overflow-x-hidden',
        padding ? 'p-2' : '',
      )}
      ref={ref}
    >
      {isFetching && (
        <li className="block p-3">Loading...</li>
      )}
      {!isFetching && notes?.length === 0 && (
        <li className="block p-3">No notes found</li>
      )}
      <ViewportList
        viewportRef={ref}
        items={notes}
      >
        {(note) => <NotesListItem key={note.id} note={note} />}
      </ViewportList>
    </ul>
  );
}
