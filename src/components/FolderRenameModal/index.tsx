import { useRef } from 'react';

import { renameFolder } from '@/api/folders';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import type { FolderRenameModalProps } from './types';

export function FolderRenameModal({
  onClose,
  folder,
}: FolderRenameModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleRenameFolder = () => {
    if (!folder || !inputRef?.current) return;

    renameFolder(folder, inputRef.current.value || '');
    onClose();
  };

  return (
    <Modal
      open={Boolean(folder)}
      onClose={onClose}
      title="Rename Folder"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRenameFolder();
        }}
      >
        <label htmlFor="rename-folder" className="block mb-4">
          <span className="sr-only">Rename Folder</span>
          <input
            ref={inputRef}
            type="text"
            name="rename-folder"
            id="rename-folder"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible"
            placeholder="Rename folder to..."
            defaultValue={folder ? folder.text : ''}
          />
        </label>
        <Button
          colour="primary"
          disabled={!folder}
          onClick={handleRenameFolder}
        >
          Rename
        </Button>
      </form>
    </Modal>
  );
}
