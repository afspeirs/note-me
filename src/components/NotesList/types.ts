import type { ReactElement, ReactNode } from 'react';

import type { NoteDocument } from '@/api/types';

export type NotesProps = {
  note: NoteDocument,
};

export type NotesListProps = {
  children?: ReactElement
  isFetching: boolean,
  notes: NoteDocument[],
  padding?: boolean,
};

export type NotesContextMenuItemProps = {
  children: ReactNode,
  disabled?: boolean,
  onClick?: () => void,
};
