import { useAtomValue } from 'jotai';
import { useMemo, useRef } from 'react';
import { ViewportList } from 'react-viewport-list';

import { FolderListItem } from '@/components/FolderList/FolderListItem';
import { foldersAtom } from '@/context/folders';
import { classNames } from '@/utils/classNames';
import { NotesListItem } from './NotesListItem';
import { NotesListProps } from './types';

export function NotesList({
  includeFolders,
  isFetching,
  notes,
  padding,
}: NotesListProps) {
  const ref = useRef<HTMLUListElement | null>(null);
  const folders = useAtomValue(foldersAtom);

  const items = useMemo(() => [
    ...(includeFolders ? folders : []),
    ...notes.filter((note) => (includeFolders ? !note.folder : true)),
  ], [folders, includeFolders, notes]);

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
        <li className="block p-3 sm:py-2">Loading...</li>
      )}
      {!isFetching && notes?.length === 0 && folders.length === 0 && (
        <li className="block p-3 sm:py-2">No notes found</li>
      )}
      <ViewportList
        viewportRef={ref}
        items={items}
      >
        {(note) => {
          if (typeof note === 'string') {
            return (
              <FolderListItem key={note} folder={note} />
            );
          }
          return (
            <NotesListItem key={note.id} note={note} />
          );
        }}
      </ViewportList>
    </ul>
  );
}
