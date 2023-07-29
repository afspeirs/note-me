import type { ReactNode } from 'react';
import { styles } from '.';

export type TooltipProps = {
  children: ReactNode,
  disabled?: boolean,
  label: string,
  position?: keyof typeof styles,
};
