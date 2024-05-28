import type { ReactElement } from 'react';

import type { FolderDocType } from '@/api/types';

export type FolderListProps = {
  children?: ReactElement,
  folders: FolderDocType[],
  isFetching: boolean,
  padding?: boolean,
};

export type FolderListItemProps = {
  folder: FolderDocType,
};
