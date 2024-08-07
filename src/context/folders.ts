import { atom } from 'jotai';

import type { FolderDocType } from '@/api/types';

export const atomFolders = atom<FolderDocType[]>([]);
export const atomFolderNames = atom((get) => get(atomFolders).map((folder) => folder.name));
export const atomCurrentFolder = atom<string | null>(null);
