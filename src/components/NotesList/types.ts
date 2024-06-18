import type { ReactElement, ReactNode } from 'react';

import type { NoteDocument } from '@/api/types';

export type NotesProps = {
  note: NoteDocument,
};

export type NotesListProps = {
  children?: ReactElement
  fullHeight?: boolean,
  isFetching: boolean,
  notes: NoteDocument[],
};

export type NotesContextMenuItemProps = {
  children: ReactNode,
  disabled?: boolean,
  onClick?: () => void,
};
