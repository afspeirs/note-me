import { atomWithStorage } from 'jotai/utils';

export const themeOptions = {
  default: 'Default',
  light: 'Light',
  dark: 'Dark',
};

export const themeAtom = atomWithStorage<keyof typeof themeOptions>('theme', 'default');
