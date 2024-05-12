import { atom } from 'jotai';

export const foldersAtom = atom<string[]>([]);
export const currentFolderAtom = atom<string | null>(null);
