import type { ReactElement } from 'react';

export type FolderListProps = {
  children?: ReactElement,
  folders: string[],
  isFetching: boolean,
  padding?: boolean,
};

export type FolderListItemProps = {
  folder: string,
};
