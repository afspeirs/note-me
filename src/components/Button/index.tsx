import { forwardRef } from 'react';
import type { Ref } from 'react';
import { NavLink } from 'react-router-dom';

import { classNames } from '@/utils/classNames';
import type { ButtonProps } from './types';

export const style = {
  root: 'p-3 rounded-lg select-none disabled:opacity-40 disabled:pointer-events-none focus-visible',
  iconOnly: '',
  withText: 'flex items-center gap-4 w-full',
  colour: 'text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700',
  colourActive: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700/60 dark:hover:bg-neutral-700',
} as const;

export const Button = forwardRef(({
  active,
  children,
  className,
  disabled,
  href,
  Icon,
  IconClassName,
  iconOnly,
  onClick,
  secondaryAction,
  target = '_self',
}: ButtonProps, ref) => {
  return href ? (
    <NavLink
      className={({ isActive }) => classNames(
        iconOnly ? style.iconOnly : style.withText,
        isActive ? style.colourActive : style.colour,
        style.root,
        className,
      )}
      end // This is essentially the same as the old exact prop
      ref={ref as Ref<HTMLAnchorElement>}
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
        iconOnly ? style.iconOnly : style.withText,
        active ? style.colourActive : style.colour,
        style.root,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      ref={ref as Ref<HTMLButtonElement>}
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
});
