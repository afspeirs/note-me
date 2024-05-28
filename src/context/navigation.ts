import { atomWithStorage } from 'jotai/utils';

export const drawerOpenAtom = atomWithStorage('drawerOpen', false);
export const useMobileDrawerAtom = atomWithStorage('drawerUseMobile', false);
