import { atom } from 'jotai';
import type { SupabaseReplication } from 'rxdb-supabase';

import type { MyDatabase, NoteDocType } from '@/api/types';

export const dbAtom = atom<MyDatabase | null>(null);
export const replicationAtom = atom<SupabaseReplication<NoteDocType> | null>(null);
