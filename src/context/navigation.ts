import { atomWithStorage } from 'jotai/utils';

export const atomDrawerOpen = atomWithStorage('drawerOpen', false);
export const atomUseMobileDrawer = atomWithStorage('drawerUseMobile', false);

export const mobileWidth = 1024;
