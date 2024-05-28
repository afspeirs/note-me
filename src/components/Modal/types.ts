import type { ReactNode } from 'react';

export type ModalProps = {
  children: ReactNode,
  className?: string,
  onClose: () => void,
  open: boolean,
  showCloseButton?: boolean,
  theme?: 'light' | 'dark',
  title?: string,
};
