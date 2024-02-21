import type { LucideIcon } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';

import { colours, coloursActive } from '.';

interface BaseProps {
  children: ReactNode,
  className?: string,
  colour?: keyof typeof colours;
  colourActive?: keyof typeof coloursActive;
  Icon?: LucideIcon;
  IconClassName?: string,
  iconOnly?: boolean,
  secondaryAction?: ReactNode,
}

interface ButtonOptions extends BaseProps {
  active?: boolean,
  disabled?: boolean,
  href?: never,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  target?: never,
}

interface LinkOptions extends BaseProps {
  active?: never,
  disabled?: never,
  href: string,
  onClick?: never,
  target?: '_self' | '_blank',
}

export type ButtonProps = ButtonOptions | LinkOptions;
