import type { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const atomAuth = atom<Session | null>(null);
