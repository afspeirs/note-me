import { useRef } from 'react';
import { ViewportList } from 'react-viewport-list';

import { classNames } from '@/utils/classNames';
import { FolderListItem } from './FolderListItem';
import type { FolderListProps } from './types';

export function FolderList({
  children,
  folders,
  isFetching,
  padding,
}: FolderListProps) {
  const ref = useRef<HTMLUListElement | null>(null);

  return (
    <>
      {children}
      <ul
        role="list"
        className={classNames(
          'flex flex-col h-full overflow-y-auto overflow-x-hidden',
          padding ? 'px-2' : '',
        )}
        ref={ref}
      >
        {isFetching && (
          <li className="block p-3 sm:py-2">Loading...</li>
        )}
        {!isFetching && folders?.length === 0 && folders.length === 0 && (
          <li className="block p-3 sm:py-2">No folders found</li>
        )}
        <ViewportList
          viewportRef={ref}
          items={folders}
        >
          {(folder) => (
            <FolderListItem key={folder.name} folder={folder} />
          )}
        </ViewportList>
      </ul>
    </>
  );
}
