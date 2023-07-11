import { HomeIcon } from '@heroicons/react/24/outline';
import type { MouseEvent, ReactNode } from 'react';

interface BaseProps {
  children: ReactNode,
  className?: string,
  Icon?: typeof HomeIcon;
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
