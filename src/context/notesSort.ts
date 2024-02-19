import { atomWithStorage } from 'jotai/utils';
import type { MangoQuerySortPart } from 'rxdb';

import type { NoteDocType } from '@/api/types';

export type NotesSortOptions = {
  [key: string]: {
    label: string,
    value: MangoQuerySortPart<NoteDocType>[],
  },
};

export const notesSortOptions: NotesSortOptions = {
  'date_modified-asc': {
    label: 'Date Modified (Oldest First)',
    value: [{ date_modified: 'asc' }],
  },
  'date_modified-desc': {
    label: 'Date Modified (Newest First)',
    value: [{ date_modified: 'desc' }],
  },
  'date_created-asc': {
    label: 'Date Created (Oldest First)',
    value: [{ date_created: 'asc' }],
  },
  'date_created-desc': {
    label: 'Date Created (Newest First)',
    value: [{ date_created: 'desc' }],
  },
  'title-asc': {
    label: 'Title (A-Z)',
    value: [{ text: 'asc' }],
  },
  'title-desc': {
    label: 'Title (Z-A)',
    value: [{ text: 'desc' }],
  },
};

export const notesSortAtom = atomWithStorage<keyof typeof notesSortOptions & string>('notes-sort', 'date_modified-desc');
