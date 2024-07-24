import type { FolderDocType } from '@/api/types';

export type FolderListProps = {
  folders: FolderDocType[],
  fullHeight?: boolean,
  isFetching: boolean,
};

export type FolderListItemProps = {
  folder: FolderDocType,
};
