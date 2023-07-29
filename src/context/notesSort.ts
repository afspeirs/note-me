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
  'dateModified-desc': {
    label: 'Date Modified (Newest First)',
    value: [{ dateModified: 'desc' }],
  },
  'dateModified-asc': {
    label: 'Date Modified (Oldest First)',
    value: [{ dateModified: 'asc' }],
  },
  'dateCreated-desc': {
    label: 'Date Created (Newest First)',
    value: [{ dateCreated: 'desc' }],
  },
  'dateCreated-asc': {
    label: 'Date Created (Oldest First)',
    value: [{ dateCreated: 'asc' }],
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

export const notesSortAtom = atomWithStorage<keyof typeof notesSortOptions & string>('notes-sort', 'dateModified-desc');
