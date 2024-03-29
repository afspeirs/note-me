import type { ReactNode } from 'react';

export interface PageProps {
  children: ReactNode,
  icons?: ReactNode | null,
  title?: string | null,
  titleHide?: boolean | null,
}
