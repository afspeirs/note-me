import { HomeIcon } from '@heroicons/react/24/outline';

export interface ButtonIconProps {
  className?: string;
  Icon: typeof HomeIcon,
  label: string;
  onClick: () => void;
}

export function ButtonIcon({
  className,
  Icon,
  label,
  onClick,
}: ButtonIconProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`p-2 rounded-full ${className || ''}`}
    >
      <Icon className="h-6 w-6 text-primary" />
    </button>
  );
}
