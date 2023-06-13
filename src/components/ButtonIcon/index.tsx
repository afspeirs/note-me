import { NavLink } from 'react-router-dom';

import { classNames } from '../../utils/classNames';
import type { ButtonIconProps } from './types';

export function ButtonIcon({
  className,
  disabled,
  href,
  Icon,
  label,
  onClick,
}: ButtonIconProps) {
  return href ? (
    <NavLink
      className={({ isActive }) => classNames(
        'p-2 rounded-full',
        className || '',
        isActive ? 'bg-primary text-white dark:text-black hover:bg-neutral-600/60 dark:hover:bg-neutral-100/60' : 'text-primary hover:bg-neutral-300/60 dark:hover:bg-neutral-600/60',
      )}
      title={label}
      to={href}
    >
      <span className="sr-only">{label}</span>
      <Icon className="h-6 w-6" role="presentation" />
    </NavLink>
  ) : (
    <button
      type="button"
      className={classNames(
        'p-2 rounded-full disabled:opacity-40',
        className || '',
        'hover:enabled:bg-neutral-300/60 dark:hover:enabled:bg-neutral-600/60',
      )}
      disabled={disabled}
      onClick={onClick}
      title={label}
    >
      <span className="sr-only">{label}</span>
      <Icon className="h-6 w-6 text-primary" role="presentation" />
    </button>
  );
}
