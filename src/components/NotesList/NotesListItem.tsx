import * as ContextMenu from '@radix-ui/react-context-menu';
import { useAtomValue } from 'jotai';
import { MoreHorizontalIcon, StarIcon, StickyNoteIcon } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/Button';
import { currentFolderAtom } from '@/context/folders';
import { getTitle } from '@/utils/getTitle';
import { NotesContextMenu } from './NotesContextMenu';
import type { NotesProps } from './types';

export function NotesListItem({
  note,
}: NotesProps) {
  const currentFolder = useAtomValue(currentFolderAtom);
  const contextTriggerRef = useRef<HTMLLIElement>(null);
  const contextButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <ContextMenu.Root key={note.id}>
      <ContextMenu.Trigger asChild ref={contextTriggerRef}>
        <li className="group/note-context-menu relative flex">
          <Button
            href={{
              pathname: `/note/${note.id}`,
              search: note.folder ? `folder=${window.encodeURIComponent(note.folder)}` : undefined,
            }}
            Icon={StickyNoteIcon}
            secondaryAction={(
              <>
                {note.folder && !currentFolder && (
                  <span className="max-md:hidden text-light bg-dark dark:text-dark dark:bg-light px-3 py-1 -my-1 truncate max-w-32 rounded-full">{note.folder}</span>
                )}
                {note.favourite && (
                  <StarIcon className="size-6 flex-shrink-0 text-primary fill-primary" aria-hidden="true" />
                )}
              </>
            )}
          >
            {getTitle(note.text)}
          </Button>
          <Button
            className="hidden group-hover/note-context-menu:block"
            Icon={MoreHorizontalIcon}
            iconOnly
            ref={contextButtonRef}
            onClick={() => {
              if (!contextTriggerRef.current || !contextButtonRef.current) return;
              const {
                height,
                width,
                x,
                y,
              } = contextButtonRef.current.getBoundingClientRect();

              contextTriggerRef.current.dispatchEvent(
                new MouseEvent('contextmenu', {
                  bubbles: true,
                  clientX: x + width,
                  clientY: y + (height / 2),
                }),
              );
            }}
          >
            Open Note context menu
          </Button>
        </li>
      </ContextMenu.Trigger>

      <NotesContextMenu
        note={note}
      />
    </ContextMenu.Root>
  );
}
