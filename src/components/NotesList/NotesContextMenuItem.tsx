import { Menu } from '@headlessui/react';

import type { NotesContextMenuItemProps } from './types';

export function NotesContextMenuItem({
  children,
  disabled = false,
  onClick,
}: NotesContextMenuItemProps) {
  if (onClick) {
    return (
      <Menu.Item disabled={disabled}>
        <button
          type="button"
          className="ui-active:bg-primary ui-active:text-light flex gap-2 w-full items-center rounded-md p-2"
          onClick={onClick}
        >
          {children}
        </button>
      </Menu.Item>
    );
  }
  return (
    <Menu.Item disabled>
      <div className="flex gap-2 w-full items-center rounded-md p-2 select-none">
        {children}
      </div>
    </Menu.Item>
  );
}
