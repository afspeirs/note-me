import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

import { Button } from '@/components/Button';
import { getTitle } from '@/utils/getTitle';
import { NotesContextMenu } from './NotesContextMenu';
import type { NotesProps } from './types';

export function NotesListItem({
  note,
}: NotesProps) {
  const contextButton = useRef<HTMLButtonElement>(null);

  return (
    <li
      key={note.id}
      className="group/note-context-menu relative flex [&+&]:mt-1"
      onContextMenu={(event) => {
        event.preventDefault();
        contextButton?.current?.click();
      }}
    >
      <Button
        href={`/note/${note.id}`}
        secondaryAction={note.favourite && (
          <StarSolidIcon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
        )}
      >
        {getTitle(note.text)}
      </Button>
      <NotesContextMenu
        note={note}
        ref={contextButton}
      />
    </li>
  );
}
