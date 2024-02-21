import type { ReactNode } from 'react';

export type TooltipProps = {
  children: ReactNode,
  content: string,
  open?: boolean,
  defaultOpen?: boolean,
  onOpenChange?: ((open: boolean) => void),
  side?: 'top' | 'right' | 'bottom' | 'left',
};
