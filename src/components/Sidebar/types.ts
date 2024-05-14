import type { ReactNode } from 'react';

export type ContentHeaderProps = {
  children?: ReactNode,
  onBack?: () => void,
  title: string,
};
