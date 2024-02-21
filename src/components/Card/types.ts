import type { ElementType, ReactNode } from 'react';

export interface CardProps {
  as?: ElementType,
  children: ReactNode,
  className?: string,
  fullscreen?: boolean,
}
