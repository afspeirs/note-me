import { NavLink } from 'react-router-dom';

import { classNames } from '../../utils/classNames';
import { ButtonProps } from './types';

export const classes = {
  base: 'relative group gap-4 rounded-md p-2 select-none disabled:opacity-40 disabled:pointer-events-none',
  baseIcon: '',
  baseText: 'flex items-center w-full',
  hover: 'text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-600/60',
  isActiveHover: 'bg-gray-200 dark:bg-neutral-700/60 dark:hover:bg-neutral-600/60 hover:bg-gray-300 font-semibold',
} as const;

export function Button({
  children,
  disabled,
  href,
  Icon,
  IconClassName,
  iconOnly,
  onClick,
  secondaryAction,
  target = '_self',
}: ButtonProps) {
  return href ? (
    <NavLink
      className={({ isActive }) => classNames(
        isActive ? classes.isActiveHover : classes.hover,
        iconOnly ? classes.baseIcon : classes.baseText,
        classes.base,
      )}
      end // This is essentially the same as the old exact prop
      rel={target === '_blank' ? 'noreferrer' : undefined}
      target={target}
      to={href}
    >
      {Icon && (
        <Icon className={classNames('h-6 w-6 flex-shrink-0', IconClassName)} aria-hidden="true" />
      )}

      <span className={classNames('truncate', (iconOnly && Icon) ? 'sr-only' : '')}>
        {children}
      </span>

      {secondaryAction && (
        <div className="ml-auto">
          {secondaryAction}
        </div>
      )}
    </NavLink>
  ) : (
    <button
      type="button"
      className={classNames(
        classes.hover,
        iconOnly ? classes.baseIcon : classes.baseText,
        classes.base,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && (
        <Icon className={classNames('h-6 w-6 flex-shrink-0', IconClassName)} aria-hidden="true" />
      )}

      <span className={classNames('truncate', (iconOnly && Icon) ? 'sr-only' : '')}>
        {children}
      </span>

      {secondaryAction && (
        <div className="ml-auto">
          {secondaryAction}
        </div>
      )}
    </button>
  );
}
