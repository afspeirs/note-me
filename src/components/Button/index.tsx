import { forwardRef } from 'react';
import type { Ref } from 'react';
import { NavLink } from 'react-router-dom';

import { classNames } from '@/utils/classNames';
import type { ButtonProps } from './types';

export const style = {
  base: 'peer/button p-3 rounded-lg select-none disabled:opacity-40 disabled:pointer-events-none focus-visible',
  iconOnly: 'block',
  withText: 'flex items-center gap-4 min-w-0 w-full',
} as const;

export const colours = {
  base: 'text-dark dark:text-light hover:bg-gray-300 dark:hover:bg-neutral-700',
  primary: 'text-light bg-primary hover:bg-primary/90',
  danger: 'text-light bg-red-600 hover:bg-red-600/90',
} as const;
export const coloursActive = {
  ...colours,
  base: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700/60 dark:hover:bg-neutral-700',
} as const;

export const Button = forwardRef(({
  active,
  children,
  className,
  colour = 'base',
  colourActive = 'base',
  disabled,
  href,
  Icon,
  IconClassName,
  iconOnly,
  onClick,
  secondaryAction,
  target = '_self',
}: ButtonProps, ref) => (href ? (
  <NavLink
    className={({ isActive }) => classNames(
      iconOnly ? style.iconOnly : style.withText,
      isActive ? coloursActive[colourActive] : colours[colour],
      style.base,
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

    <span
      className={classNames(
        iconOnly ? '' : 'truncate',
        iconOnly && Icon ? 'sr-only' : '',
      )}
    >
      {children}
    </span>

    {secondaryAction && (
      <div className="ml-auto flex gap-2">
        {secondaryAction}
      </div>
    )}
  </NavLink>
) : (
  <button
    type="button"
    className={classNames(
      iconOnly ? style.iconOnly : style.withText,
      active ? coloursActive[colourActive] : colours[colour],
      style.base,
      className,
    )}
    disabled={disabled}
    onClick={onClick}
    ref={ref as Ref<HTMLButtonElement>}
  >
    {Icon && (
      <Icon className={classNames('h-6 w-6 flex-shrink-0', IconClassName)} aria-hidden="true" />
    )}

    <span
      className={classNames(
        iconOnly ? '' : 'truncate',
        iconOnly && Icon ? 'sr-only' : '',
      )}
    >
      {children}
    </span>

    {secondaryAction && (
      <div className="ml-auto flex gap-2">
        {secondaryAction}
      </div>
    )}
  </button>
)));
