import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  StarIcon as StarOutlineIcon,
  TrashIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteNote, favouriteNote } from '@/api/notes';
import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { formatDate } from '@/utils/formatDate';
import { getTitle } from '@/utils/getTitle';
import type { NotesContextMenuProps } from './types';

export function NotesContextMenu({
  note,
}: NotesContextMenuProps) {
  const navigate = useNavigate();
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);

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
            Icon={EllipsisHorizontalIcon}
            iconOnly
            className="hidden group-hover:block"
          >
            Options
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
            <Menu.Items className="absolute right-0 top-12 mt-1 w-72 z-10 origin-top-right divide-y divide-gray-300 rounded-md bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item disabled>
                  <div className="flex w-full items-center rounded-md px-2 py-2 text-sm select-none">
                    <ClockIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <div className="text-left">
                      <span className="font-medium">Created: </span>
                      {formatDate({ date: note.dateCreated })}
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item disabled>
                  <div className="flex w-full items-center rounded-md px-2 py-2 text-sm select-none">
                    <ClockIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="">
                      <span className="font-medium">Modified: </span>
                      {note.dateModified ? formatDate({ date: note.dateModified }) : 'Never'}
                    </span>
                  </div>
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  <button
                    type="button"
                    className="ui-active:bg-primary ui-active:text-white flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => favouriteNote(note)}
                  >
                    {note.favourite ? (
                      <StarSolidIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <StarOutlineIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    {`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    type="button"
                    className="ui-active:bg-primary ui-active:text-white flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => setShowDeleteNoteModal(true)}
                  >
                    <TrashIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Delete Note
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

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
}
