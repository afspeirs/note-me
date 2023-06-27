import { classNames } from '../../utils/classNames';
import type { CardProps } from './types';

export function Card({
  as: Component = 'div',
  children,
  className = '',
  roundedTop,
  ...props
}: CardProps) {
  return (
    <Component
      className={classNames(
        'bg-white dark:bg-neutral-800 dark:text-white shadow overflow-hidden',
        roundedTop ? 'rounded-t-xl' : 'rounded-xl',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
