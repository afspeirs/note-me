import { useRef } from 'react';
import { ViewportList } from 'react-viewport-list';

import { classNames } from '@/utils/classNames';
import { NotesListItem } from './NotesListItem';
import type { NotesListProps } from './types';

export function NotesList({
  fullHeight,
  isFetching,
  notes,
}: NotesListProps) {
  const ref = useRef<HTMLUListElement | null>(null);

  return (
    <ul
      role="list"
      className={classNames(
        'flex flex-col px-card-gap overflow-y-auto overflow-x-hidden',
        fullHeight ? ' h-full' : '',
      )}
      ref={ref}
    >
      {isFetching && (
        <li className="block p-3 sm:py-2">Loading...</li>
      )}
      {!isFetching && notes?.length === 0 && (
        <li className="block p-3 sm:py-2">No notes found</li>
      )}
      <ViewportList
        viewportRef={ref}
        items={notes}
      >
        {(note) => (
          <NotesListItem key={note.id} note={note} />
        )}
      </ViewportList>
    </ul>
  );
}
