import { atom } from 'jotai';

import type { BeforeInstallPromptEvent } from '@/components/ServiceWorkerEvents/types';

export const beforeInstallPromptAtom = atom<BeforeInstallPromptEvent | null>(null);
export const updateAvailableAtom = atom(false);
