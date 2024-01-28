import type { ReactNode } from 'react';

import type { NoteDocument } from '@/api/types';

export type NotesProps = {
  note: NoteDocument,
};
export type NotesListProps = {
  includeFolders?: boolean,
  isFetching: boolean,
  notes: NoteDocument[],
  padding?: boolean,
};
export type NotesContextMenuItemProps = {
  children: ReactNode,
  disabled?: boolean,
  onClick?: () => void,
};
