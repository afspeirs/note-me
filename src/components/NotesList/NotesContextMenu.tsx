import { Menu, Transition } from '@headlessui/react';
import {
  ChevronRightIcon,
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
import { formatDate } from '@/utils/formatDate';
import { getTitle } from '@/utils/getTitle';
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
    <Menu as="div" className="inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            active={open}
            as={Button}
            className="hidden group-hover/context-menu:block group-focus-within/context-menu:block"
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
            <Menu.Items className="absolute right-0 top-12 mt-1 w-72 z-10 origin-top-right divide-y divide-gray-300 rounded-lg bg-gray-200 dark:bg-neutral-700 text-dark dark:text-light shadow-lg focus-visible">
              <div className="p-1">
                <Menu.Item disabled>
                  <div className="flex gap-2 w-full items-center rounded-md p-2 select-none">
                    <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    <div className="text-left">
                      <span className="font-medium">Created: </span>
                      {formatDate({ date: note.dateCreated })}
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item disabled>
                  <div className="flex gap-2 w-full items-center rounded-md p-2 select-none">
                    <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <span className="font-medium">Modified: </span>
                      {note.dateModified ? formatDate({ date: note.dateModified }) : 'Never'}
                    </span>
                  </div>
                </Menu.Item>
              </div>
              <div className="p-1">
                <Menu.Item>
                  <button
                    type="button"
                    className="ui-active:bg-primary ui-active:text-light flex gap-2 w-full items-center rounded-md p-2 select-none"
                    onClick={() => setShowMoveNoteModal(note)}
                  >
                    <FolderIcon className="h-5 w-5" aria-hidden="true" />
                    Move Note
                    <ChevronRightIcon className="ml-auto h-5 w-5" aria-hidden="true" />
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    type="button"
                    className="ui-active:bg-primary ui-active:text-light flex gap-2 w-full items-center rounded-md p-2 select-none"
                    onClick={() => favouriteNote(note)}
                  >
                    {note.favourite ? (
                      <StarSolidIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <StarOutlineIcon className="h-5 w-5" aria-hidden="true" />
                    )}

                    {`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    type="button"
                    className="ui-active:bg-primary ui-active:text-light flex gap-2 w-full items-center rounded-md p-2 select-none"
                    onClick={() => setShowDeleteNoteModal(true)}
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    Delete Note
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

          <NotesMoveModal
            note={showMoveNoteModal}
            onClose={() => setShowMoveNoteModal(false)}
          />

          <ModalConfirm
            message={note && `Are you sure you want to delete "${getTitle(note.text)}"?`}
            onClose={() => setShowDeleteNoteModal(false)}
            onConfirm={handleDeleteNote}
            open={showDeleteNoteModal}
          />
        </>
      )}
    </Menu>
  );
});
