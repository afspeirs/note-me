import { RadioGroup } from '@headlessui/react';
import { FolderIcon, FolderPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

import { moveNote } from '@/api/notes';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { foldersAtom } from '@/context/folders';
import { classNames } from '@/utils/classNames';
import { getTitle } from '@/utils/getTitle';
import { NotesMoveModalProps } from './types';

export function NotesMoveModal({
  setShowMoveNoteModal,
  showMoveNoteModal: note,
}: NotesMoveModalProps) {
  const folders = useAtomValue(foldersAtom);
  const [selected, setSelected] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');

  const onClose = () => {
    setShowMoveNoteModal(false);
    setNewFolderName('');
  };

  const handleMoveNote = () => {
    if (!note || selected === null) return;
    moveNote(note, selected);
  };

  return (
    <Modal
      title={`Move "${getTitle(note ? note.text : 'Note')}"`}
      onClose={() => onClose()}
      open={!!note}
    >
      <label htmlFor="folder-create" className="relative block mb-4">
        <span className="sr-only">Search Notes</span>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <FolderPlusIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <input
          name="folder-create"
          id="folder-create"
          value={newFolderName}
          onChange={(event) => setNewFolderName(event.target.value)}
          className="block w-full rounded-lg bg-white border border-gray-200 py-3 pl-10 pr-20 bg-inherit outline-offset-1 placeholder:text-gray-400 placeholder:select-none focus-visible"
          placeholder="Create a name for a new folder"
        />
        <div className="absolute inset-y-0 right-0">
          {newFolderName.length > 0 && (
            <Button
              Icon={XMarkIcon}
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
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
            <div className="relative -space-y-px rounded-lg bg-white">
              {[...folders, newFolderName].map((folder, folderIdx) => (
                <RadioGroup.Option
                  key={folder}
                  value={folder}
                  disabled={(
                    (folder === '' && !note.folder)
                    || folder === note.folder
                  )}
                  className={({ checked }) => classNames(
                    folderIdx === 0 ? 'rounded-tl-lg rounded-tr-lg' : '',
                    folderIdx === folders.length ? 'rounded-bl-lg rounded-br-lg' : '',
                    checked ? 'z-10 border-primary' : 'border-gray-200',
                    'relative flex cursor-pointer bg- flex-col border p-4 focus:outline-none md:pl-4 md:pr-6 aria-disabled:opacity-40 aria-disabled:bg-dark/5 overflow-hidden select-none',
                  )}
                >
                  {({ active, checked }) => (
                    <span className="flex items-center text-sm">
                      <span
                        className={classNames(
                          checked ? 'bg-primary border-transparent' : 'bg-white border-gray-300',
                          active ? 'ring-2 ring-offset-2 ring-primary' : '',
                          'h-4 w-4 rounded-full border flex items-center justify-center flex-shrink-0',
                        )}
                        aria-hidden="true"
                      >
                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                      </span>
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? 'text-primary' : 'text-gray-900',
                          'ml-8 font-medium',
                        )}
                      >
                        {folder || (note.folder ? `Remove from "${note.folder}"` : '<Please enter a new folder name above>')}
                      </RadioGroup.Label>
                    </span>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <Button
            colour="primary"
            className="mt-4"
            disabled={selected === null}
            Icon={FolderIcon}
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
