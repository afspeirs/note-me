import { HomeIcon } from '@heroicons/react/24/outline';

export interface ButtonIconProps {
  className?: string;
  Icon: typeof HomeIcon,
  label: string;
  onClick: () => void;
}
