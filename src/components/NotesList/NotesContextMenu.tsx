import { Float } from '@headlessui-float/react';
import { Menu, Transition } from '@headlessui/react';
import {
  ClockIcon,
  EllipsisHorizontalIcon,
  FolderIcon,
  StarIcon as StarOutlineIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import type { Ref } from 'react';
import { Fragment, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteNote, favouriteNote } from '@/api/notes';
import type { NoteDocument } from '@/api/types';
import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { NotesMoveModal } from '@/components/NotesMoveModal';
import { classNames } from '@/utils/classNames';
import { formatDate } from '@/utils/formatDate';
import { getTitle } from '@/utils/getTitle';
import { NotesContextMenuItem } from './NotesContextMenuItem';
import type { NotesProps } from './types';

export const NotesContextMenu = forwardRef(({
  note,
}: NotesProps, ref: Ref<HTMLButtonElement>) => {
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
      <Menu as="div" className="inline-block text-left">
        {({ open }) => (
          <Float placement="bottom-end" offset={4} portal>
            <Menu.Button
              active={open}
              as={Button}
              className={classNames(
                'group-hover/note-context-menu:block',
                open ? 'block' : 'hidden',
              )}
              Icon={EllipsisHorizontalIcon}
              iconOnly
              ref={ref}
            >
              Open Note context menu
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="w-72 z-10 origin-top-right divide-y divide-gray-300 rounded-lg bg-gray-200 dark:bg-neutral-700 text-dark dark:text-light shadow-lg focus-visible">
                <div className="p-1">
                  <NotesContextMenuItem disabled>
                    <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <span className="font-medium">Created: </span>
                      {formatDate({ date: note.date_created })}
                    </span>
                  </NotesContextMenuItem>
                  <NotesContextMenuItem disabled>
                    <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <span className="font-medium">Modified: </span>
                      {note.date_modified ? formatDate({ date: note.date_modified }) : 'Never'}
                    </span>
                  </NotesContextMenuItem>
                </div>
                <div className="p-1">
                  <NotesContextMenuItem onClick={() => setShowMoveNoteModal(note)}>
                    <FolderIcon className="h-5 w-5" aria-hidden="true" />
                    Move Note
                  </NotesContextMenuItem>
                  <NotesContextMenuItem onClick={() => favouriteNote(note)}>
                    {note.favourite ? (
                      <StarSolidIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <StarOutlineIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                    {`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
                  </NotesContextMenuItem>
                  <NotesContextMenuItem onClick={() => setShowDeleteNoteModal(true)}>
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    Delete Note
                  </NotesContextMenuItem>
                </div>
              </Menu.Items>
            </Transition>

          </Float>
        )}
      </Menu>

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
});
