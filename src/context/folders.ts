import { atom } from 'jotai';

import type { FolderDocType } from '@/api/types';

export const foldersAtom = atom<FolderDocType[]>([]);
export const folderNamesAtom = atom((get) => get(foldersAtom).map((folder) => folder.name));
export const currentFolderAtom = atom<string | null>(null);
