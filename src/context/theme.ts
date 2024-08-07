import { atomWithStorage } from 'jotai/utils';

export const themeOptions = {
  default: 'System Default',
  light: 'Light',
  dark: 'Dark',
} as const;

export const atomTheme = atomWithStorage<keyof typeof themeOptions>('theme', 'default');
