import { HomeIcon } from '@heroicons/react/24/solid';
import type { MouseEvent } from 'react';

interface BaseProps {
  children: string,
  IconEnd?: typeof HomeIcon;
  IconEndClassName?: string,
  IconStart?: typeof HomeIcon;
  IconStartClassName?: string,
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
