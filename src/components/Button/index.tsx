import { NavLink } from 'react-router-dom';

import { classNames } from '../../utils/classNames';
import { ButtonProps } from './types';

export function Button({
  IconEnd,
  IconEndClassName,
  IconStart,
  IconStartClassName,
  label,
  to,
}: ButtonProps) {
  return (
    <NavLink
      className={({ isActive }) => classNames(
        isActive ? 'bg-gray-200 dark:bg-neutral-700/60 dark:hover:bg-neutral-600/60 hover:bg-gray-300 font-semibold' : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-600/60',
        'group flex items-center gap-x-3 rounded-md p-2',
      )}
      end // This is essentially the same as the old exact prop
      to={to}
    >
      {IconStart && (
        <IconStart className={classNames('h-6 w-6 flex-shrink-0', IconStartClassName)} aria-hidden="true" />
      )}

      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>

      {IconEnd && (
        <IconEnd className={classNames('h-6 w-6 flex-shrink-0 ml-auto', IconEndClassName)} aria-hidden="true" />
      )}
    </NavLink>
  );
}
