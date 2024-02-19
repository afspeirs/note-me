import * as ContextMenu from '@radix-ui/react-context-menu';

import {
  ClockIcon,
  FolderInputIcon as FolderIcon,
  StarIcon,
  Trash2Icon as TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteNote, favouriteNote } from '@/api/notes';
import type { NoteDocument } from '@/api/types';
import { ModalConfirm } from '@/components/ModalConfirm';
import { NotesMoveModal } from '@/components/NotesMoveModal';
import { classNames } from '@/utils/classNames';
import { formatDate } from '@/utils/formatDate';
import { getTitle } from '@/utils/getTitle';
import { NotesContextMenuItem } from './NotesContextMenuItem';
import type { NotesProps } from './types';

export function NotesContextMenu({
  note,
}: NotesProps) {
  const navigate = useNavigate();
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [showMoveNoteModal, setShowMoveNoteModal] = useState<NoteDocument | false>(false);

  const handleDeleteNote = () => {
    setShowDeleteNoteModal(false);
    deleteNote(note)
      .then(() => navigate('/', { replace: true }));
  };

  return (
    <>
      <ContextMenu.Portal>
        <ContextMenu.Content className="w-72 p-1 rounded-lg bg-gray-200 dark:bg-neutral-700 text-dark dark:text-light shadow-lg focus-visible">
          <NotesContextMenuItem disabled>
            <ClockIcon className="size-5" aria-hidden="true" />
            <span>
              <span className="font-medium">Created: </span>
              {formatDate({ date: note.date_created })}
            </span>
          </NotesContextMenuItem>
          <NotesContextMenuItem disabled>
            <ClockIcon className="size-5" aria-hidden="true" />
            <span>
              <span className="font-medium">Modified: </span>
              {note.date_modified ? formatDate({ date: note.date_modified }) : 'Never'}
            </span>
          </NotesContextMenuItem>

          <ContextMenu.Separator className="m-1 h-px bg-gray-300" />

          <NotesContextMenuItem onClick={() => setShowMoveNoteModal(note)}>
            <FolderIcon className="size-5" aria-hidden="true" />
            Move Note
          </NotesContextMenuItem>
          <NotesContextMenuItem onClick={() => favouriteNote(note)}>
            <StarIcon className={classNames(note?.favourite ? 'fill-current' : '', 'size-5')} aria-hidden="true" />
            {`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
          </NotesContextMenuItem>
          <NotesContextMenuItem onClick={() => setShowDeleteNoteModal(true)}>
            <TrashIcon className="size-5" aria-hidden="true" />
            Delete Note
          </NotesContextMenuItem>
        </ContextMenu.Content>
      </ContextMenu.Portal>

      <ModalConfirm
        message={note && `Are you sure you want to delete "${getTitle(note.text)}"?`}
        onClose={() => setShowDeleteNoteModal(false)}
        onConfirm={handleDeleteNote}
        open={showDeleteNoteModal}
      />
      <NotesMoveModal
        setShowMoveNoteModal={setShowMoveNoteModal}
        showMoveNoteModal={showMoveNoteModal}
      />
    </>
  );
}
