import { Menu, Transition } from '@headlessui/react';
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { Ref } from 'react';
import { Fragment, forwardRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import type { NoteDocument } from '@/api/types';
import { Button } from '@/components/Button';
import { FolderRenameModal } from '@/components/FolderRenameModal';
import { ModalConfirm } from '@/components/ModalConfirm';
import { getTitle } from '@/utils/getTitle';
import type { NotesProps } from './types';

export const FolderContextMenu = forwardRef(({
  note: folder,
}: NotesProps, ref: Ref<HTMLButtonElement>) => {
  // const navigate = useNavigate();
  const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState<NoteDocument | false>(false);

  const handleDeleteNote = () => {
    setShowDeleteFolderModal(false);
    // deleteFolder(note)
    //   .then(() => navigate('/', { replace: true }));
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
            Open Folder context menu
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
                <Menu.Item>
                  <button
                    type="button"
                    className="ui-active:bg-primary ui-active:text-light flex gap-2 w-full items-center rounded-md p-2 select-none"
                    onClick={() => setShowRenameFolderModal(folder)}
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    Rename Folder
                    <ChevronRightIcon className="ml-auto h-5 w-5" aria-hidden="true" />
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    type="button"
                    disabled
                    className="ui-active:bg-primary ui-active:text-light flex gap-2 w-full items-center rounded-md p-2 select-none disabled:opacity-40 disabled:pointer-events-none"
                    onClick={() => setShowDeleteFolderModal(true)}
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    Delete Folder
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>

          <FolderRenameModal
            folder={showRenameFolderModal}
            onClose={() => setShowRenameFolderModal(false)}
          />

          <ModalConfirm
            message={folder && `Are you sure you want to delete "${getTitle(folder.text)}"?`}
            onClose={() => setShowDeleteFolderModal(false)}
            onConfirm={handleDeleteNote}
            open={showDeleteFolderModal}
          />
        </>
      )}
    </Menu>
  );
});
