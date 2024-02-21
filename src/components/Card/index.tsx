import { classNames } from '@/utils/classNames';
import type { CardProps } from './types';

export function Card({
  as: Component = 'div',
  children,
  className = '',
  rounded = true,
  ...props
}: CardProps) {
  return (
    <Component
      className={classNames(
        'bg-light dark:bg-dark dark:text-light shadow',
        rounded ? 'rounded-xl' : '',
        className,
      )}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </Component>
  );
}
