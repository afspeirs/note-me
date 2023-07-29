import type { TooltipProps } from './types';

export function Tooltip({
  children,
  disabled = false,
  label,
}: TooltipProps) {
  return (
    <div className="group/tooltip relative flex z-10">
      {children}

      {!disabled && (
        <span
          className="absolute top-12 left-1/2 -translate-x-1/2 p-2 transition-transform scale-0 group-hover/tooltip:scale-100 group-hover/tooltip:delay-200 peer-focus-visible/button:scale-100 rounded-lg whitespace-nowrap text-xs bg-black text-white dark:bg-white dark:!text-black"
          aria-hidden="true"
        >
          {label}
        </span>
      )}
    </div>
  );
}
