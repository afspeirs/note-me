import type { LucideIcon } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';
import type { To } from 'react-router-dom';

import { colours, coloursActive } from '.';

interface BaseProps {
  active?: boolean,
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
  disabled?: boolean,
  href?: never,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  target?: never,
}

interface LinkOptions extends BaseProps {
  disabled?: never,
  href: To,
  onClick?: never,
  target?: '_self' | '_blank',
}

export type ButtonProps = ButtonOptions | LinkOptions;
