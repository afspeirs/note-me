import { type RxDocument } from 'rxdb';

import type { NoteDocType, NoteDocument } from '@/api/types';

export type NotesProps = {
  note: NoteDocument,
};
export type NotesListProps = {
  notes?: RxDocument<NoteDocType>[],
  isFetching: boolean,
  padding?: boolean,
};
