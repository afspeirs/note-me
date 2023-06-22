import { HomeIcon } from '@heroicons/react/24/solid';

export type ButtonProps = {
  IconEnd?: typeof HomeIcon;
  IconEndClassName?: string,
  IconStart?: typeof HomeIcon;
  IconStartClassName?: string,
  label: string,
  to: string,
};
