import { HomeIcon } from '@heroicons/react/24/outline';

// TODO: Split these type out into Link and Button
export interface ButtonIconProps {
  className?: string;
  disabled?: boolean,
  href?: string,
  Icon: typeof HomeIcon,
  label: string;
  onClick?: () => void;
}
