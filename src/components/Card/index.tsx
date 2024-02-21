import { classNames } from '@/utils/classNames';
import type { CardProps } from './types';

export function Card({
  as: Component = 'div',
  children,
  className = '',
  fullscreen,
  ...props
}: CardProps) {
  return (
    <Component
      className={classNames(
        'bg-light dark:bg-dark dark:text-light shadow',
        fullscreen ? '[@media(display-mode:window-controls-overlay)]:rounded-t-xl' : 'rounded-xl',
        className,
      )}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </Component>
  );
}
