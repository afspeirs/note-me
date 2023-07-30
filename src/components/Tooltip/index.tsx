import { classNames } from '@/utils/classNames';
import type { TooltipProps } from './types';

export const styles = {
  top: 'bottom-12 left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-12 left-1/2 -translate-x-1/2 mt-1',
  left: 'top-1/2 right-12 -translate-y-1/2 mr-1',
  right: 'top-1/2 left-12 -translate-y-1/2 ml-1',
};

export function Tooltip({
  children,
  disabled = false,
  label,
  position = 'bottom',
}: TooltipProps) {
  return (
    <div className="group/tooltip relative flex z-10">
      {children}

      {!disabled && (
        <span
          className={classNames(
            'absolute p-2 transition-transform scale-0 group-hover/tooltip:scale-100 group-hover/tooltip:delay-200 peer-focus-visible/button:scale-100 rounded-lg whitespace-nowrap text-xs bg-black text-white dark:text-black dark:bg-white',
            styles[position],
          )}
          aria-hidden="true"
        >
          {label}
        </span>
      )}
    </div>
  );
}
