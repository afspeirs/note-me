import type { ReactNode } from 'react';
import type { RxDocument } from 'rxdb';

import type { NoteDocType, NoteDocument } from '@/api/types';

export type NotesProps = {
  note: NoteDocument,
};
export type NotesListProps = {
  notes?: RxDocument<NoteDocType>[],
  isFetching: boolean,
  padding?: boolean,
};
export type NotesContextMenuItemProps = {
  children: ReactNode,
  disabled?: boolean,
  onClick?: () => void,
};
