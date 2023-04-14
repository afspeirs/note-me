import { NavLink } from 'react-router-dom';

import { classNames } from '../../utils/classNames';
import type { ButtonIconProps } from './types';

export function ButtonIcon({
  className,
  href,
  Icon,
  label,
  onClick,
}: ButtonIconProps) {
  return href ? (
    <NavLink
      className={({ isActive }) => classNames(
        'block px-4 py-2',
        isActive ? 'text-neutral-500' : 'text-primary',
      )}
      to={href}
    >
      <Icon className="h-6 w-6 " />
    </NavLink>
  ) : (
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
