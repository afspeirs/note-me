import type { TooltipProps } from './types';

export function Tooltip({
  children,
  label,
}: TooltipProps) {
  return (
    <div className="group relative flex">
      {children}

      <span
        className="absolute top-12 left-1/2 -translate-x-1/2 p-2 transition-transform scale-0 group-hover:scale-100 group-hover:delay-200 peer-focus-visible/button:scale-100 rounded-lg whitespace-nowrap text-xs bg-black text-white dark:bg-white dark:!text-black"
        aria-hidden="true"
      >
        {label}
      </span>
    </div>
  );
}
