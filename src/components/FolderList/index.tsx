import { useRef } from 'react';
import { ViewportList } from 'react-viewport-list';

import { FolderListItem } from './FolderListItem';
import { FolderListProps } from './types';

export function FolderList({
  folders,
  isFetching,
}: FolderListProps) {
  const ref = useRef<HTMLUListElement | null>(null);

  return (
    <ul
      role="list"
      className="flex flex-col overflow-y-auto overflow-x-hidden"
      ref={ref}
    >
      {isFetching && (
        <li className="block p-3">Loading...</li>
      )}
      <ViewportList
        viewportRef={ref}
        items={folders}
      >
        {(folder) => <FolderListItem key={folder} folder={folder} />}
      </ViewportList>
    </ul>
  );
}
