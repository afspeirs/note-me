import { atom } from 'jotai';

import type { BeforeInstallPromptEvent } from '@/components/ServiceWorkerEvents/types';

export const atomBeforeInstallPrompt = atom<BeforeInstallPromptEvent | null>(null);
export const atomUpdateAvailable = atom(false);
