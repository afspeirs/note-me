import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { themeAtom } from '@/context/theme';

export function useTheme() {
  const theme = useAtomValue(themeAtom);
  const matches = useMediaQuery('(prefers-color-scheme: dark)');
  const appTheme = useMemo(() => {
    if (theme !== 'default') return theme;
    if (matches) return 'dark';
    return 'light';
  }, [matches, theme]);

  return appTheme;
}
