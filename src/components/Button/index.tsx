import { NavLink } from 'react-router-dom';

import { classNames } from '../../utils/classNames';
import { ButtonProps } from './types';

export const classes = {
  base: 'relative group flex items-center gap-x-4 rounded-md p-2 w-full select-none',
  hover: 'text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-600/60',
  isActiveHover: 'bg-gray-200 dark:bg-neutral-700/60 dark:hover:bg-neutral-600/60 hover:bg-gray-300 font-semibold',
} as const;

export function Button({
  children,
  disabled,
  href,
  IconEnd,
  IconEndClassName,
  IconStart,
  IconStartClassName,
  onClick,
  target = '_self',
}: ButtonProps) {
  return href ? (
    <NavLink
      className={({ isActive }) => classNames(
        isActive ? classes.isActiveHover : classes.hover,
        classes.base,
      )}
      end // This is essentially the same as the old exact prop
      rel={target === '_blank' ? 'noreferrer' : undefined}
      target={target}
      to={href}
    >
      {IconStart && (
        <IconStart className={classNames('h-6 w-6 flex-shrink-0', IconStartClassName)} aria-hidden="true" />
      )}

      <span className="truncate">
        {children}
      </span>

      {IconEnd && (
        <IconEnd className={classNames('h-6 w-6 flex-shrink-0 ml-auto', IconEndClassName)} aria-hidden="true" />
      )}
    </NavLink>
  ) : (
    <button
      type="button"
      className={classNames(
        classes.hover,
        classes.base,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {IconStart && (
        <IconStart className={classNames('h-6 w-6 flex-shrink-0', IconStartClassName)} aria-hidden="true" />
      )}

      <span className="truncate">
        {children}
      </span>

      {IconEnd && (
        <IconEnd className={classNames('h-6 w-6 flex-shrink-0 ml-auto', IconEndClassName)} aria-hidden="true" />
      )}
    </button>
  );
}
