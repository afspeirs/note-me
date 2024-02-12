import * as ContextMenu from '@radix-ui/react-context-menu';

import type { NotesContextMenuItemProps } from './types';

export function NotesContextMenuItem({
  children,
  disabled = false,
  onClick,
}: NotesContextMenuItemProps) {
  if (onClick) {
    return (
      <ContextMenu.Item
        asChild
        disabled={disabled}
      >
        <button
          type="button"
          className="data-[highlighted]:bg-primary data-[highlighted]:text-light flex gap-2 w-full items-center rounded-md p-2 text-sm select-none"
          onClick={onClick}
        >
          {children}
        </button>
      </ContextMenu.Item>
    );
  }
  return (
    <ContextMenu.Item
      className="flex gap-2 w-full items-center rounded-md p-2 text-sm select-none"
      disabled
    >
      {children}
    </ContextMenu.Item>
  );
}
