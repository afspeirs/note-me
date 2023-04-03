import { ComponentType, SVGProps } from 'react';

export interface ButtonIconProps {
  className?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>,
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
