import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import type { TooltipProps } from './types';

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = 'bottom',
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        collisionPadding={8}
        className="p-2 text-xs bg-dark text-light dark:text-dark dark:bg-light rounded-lg pointer-events-none z-10"
        side={side}
        align="center"
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      >
        {content}
        <TooltipPrimitive.Arrow
          className="fill-dark dark:fill-light"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}
