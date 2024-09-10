import type { ReactNode } from 'react';

export interface PageProps {
  children: ReactNode,
  iconsLeft?: ReactNode | null,
  iconsRight?: ReactNode | null,
  title?: string | null,
  titleHide?: boolean | null,
}
