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
        'p-2 rounded-full hover:bg-neutral-300/50 active:bg-neutral-400/50 dark:hover:bg-neutral-500/50 dark:active:bg-neutral-600/50',
        className || '',
        isActive ? 'text-neutral-700 dark:text-neutral-200' : 'text-primary',
      )}
      to={href}
    >
      <span className="sr-only">{label}</span>
      <Icon className="h-6 w-6" role="presentation" />
    </NavLink>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'p-2 rounded-full hover:bg-neutral-300/50 active:bg-neutral-400/50 dark:hover:bg-neutral-500/50 dark:active:bg-neutral-600/50',
        className || '',
      )}
    >
      <span className="sr-only">{label}</span>
      <Icon className="h-6 w-6 text-primary" role="presentation" />
    </button>
  );
}
