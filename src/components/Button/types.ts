import { HomeIcon } from '@heroicons/react/24/solid';
import type { MouseEvent, ReactNode } from 'react';

interface BaseProps {
  children: string,
  Icon?: typeof HomeIcon;
  IconClassName?: string,
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
  href: string,
  onClick?: never,
  target?: '_self' | '_blank',
}

export type ButtonProps = ButtonOptions | LinkOptions;
