import { atom } from 'jotai';
import type { SupabaseReplication } from 'rxdb-supabase';

import type { MyDatabase, NoteDocType } from '@/api/types';

export const atomDb = atom<MyDatabase | null>(null);
export const atomReplication = atom<SupabaseReplication<NoteDocType> | null>(null);
