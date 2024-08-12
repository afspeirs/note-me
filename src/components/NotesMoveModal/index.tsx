import { RadioGroup } from '@headlessui/react';
import { useAtomValue } from 'jotai';
import { FolderInputIcon, FolderPlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { moveNote } from '@/api/notes';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { atomFolderNames } from '@/context/folders';
import { classNames } from '@/utils/classNames';
import { getTitle } from '@/utils/getTitle';
import type { NotesMoveModalProps } from './types';

export function NotesMoveModal({
  setShowMoveNoteModal,
  showMoveNoteModal: note,
}: NotesMoveModalProps) {
  const folders = useAtomValue(atomFolderNames);
  const [selected, setSelected] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');

  const onClose = () => {
    setShowMoveNoteModal(false);
    setNewFolderName('');
  };

  const handleMoveNote = async () => {
    if (!note || selected === null) return;
    await moveNote(note, selected);
    onClose();
  };

  return (
    <Modal
      title={`Move "${getTitle(note ? note.text : 'Note')}"`}
      onClose={() => onClose()}
      open={!!note}
    >
      <label htmlFor="folder-create" className="relative block">
        <span className="sr-only">Search Notes</span>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <FolderPlusIcon className="size-6 text-gray-400" aria-hidden="true" />
        </div>
        <input
          name="folder-create"
          id="folder-create"
          value={newFolderName}
          onChange={(event) => setNewFolderName(event.target.value)}
          className="block w-full rounded-md bg-white dark:bg-dark border border-gray-200 py-3 sm:py-2 pl-10 pr-12 bg-inherit outline-offset-1 placeholder:text-gray-400 placeholder:select-none focus-visible"
          placeholder="Create a name for a new folder"
        />
        <div className="absolute inset-y-0 right-0">
          {newFolderName.length > 0 && (
            <Button
              Icon={XIcon}
              iconOnly
              disabled={!newFolderName.length}
              onClick={() => setNewFolderName('')}
            >
              Clear
            </Button>
          )}
        </div>
      </label>

      {note && (
        <>
          <RadioGroup
            className="my-4"
            value={selected}
            onChange={setSelected}
          >
            <RadioGroup.Label className="sr-only">Folder Names</RadioGroup.Label>
            <div className="relative rounded-md">
              {[...folders.filter((folder) => folder !== ''), newFolderName].map((folder) => (
                <RadioGroup.Option
                  key={folder}
                  value={folder}
                  disabled={(
                    (folder === '' && !note.folder)
                    || folder === note.folder
                  )}
                  className={({ checked }) => classNames(
                    'relative flex items-center gap-3 pl-2 py-3 sm:py-2 font-medium cursor-pointer rounded-md focus:outline-none aria-disabled:opacity-40 aria-disabled:cursor-not-allowed overflow-hidden select-none',
                    'last:underline underline-offset-4 decoration-dashed',
                    checked ? 'text-primary' : 'text-dark dark:text-light',
                  )}
                >
                  {({ active, checked }) => (
                    <>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          checked ? 'bg-primary border-transparent' : 'bg-white dark:bg-dark border-gray-300',
                          active ? 'ring-2 ring-offset-2 ring-primary dark:ring-offset-dark' : '',
                          'size-4 rounded-full border flex items-center justify-center flex-shrink-0',
                        )}
                      >
                        <span className="size-1.5 rounded-full bg-white dark:bg-dark" />
                      </span>
                      <RadioGroup.Label as="span">
                        {folder || (note.folder ? `Remove from "${note.folder}"` : '<Please enter a new folder name above>')}
                      </RadioGroup.Label>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <Button
            colour="primary"
            disabled={selected === null}
            Icon={FolderInputIcon}
            onClick={() => handleMoveNote()}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {selected ? `Move to "${getTitle(selected)}"` : (note.folder ? `Remove from "${note.folder}"` : 'Move note')}
          </Button>
        </>
      )}
    </Modal>
  );
}
