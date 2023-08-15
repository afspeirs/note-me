import { FolderIcon, PlusIcon, MinusSmallIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { useRxCollection, useRxData } from 'rxdb-hooks';

import { createFolder } from '@/api/folders';
import { moveNote } from '@/api/notes';
import type { NoteCollection, NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { getTitle } from '@/utils/getTitle';
import type { NotesMoveModalProps } from './types';

export function NotesMoveModal({
  onClose,
  note,
}: NotesMoveModalProps) {
  const collection = useRxCollection<NoteDocType>('notes')!;
  const queryConstructor = useCallback(
    (queryCollection: NoteCollection) => queryCollection.find({
      selector: {
        isFolder: {
          $eq: true,
        },
      },
      sort: [
        { text: 'asc' },
      ],
    }),
    [],
  );
  const { result: folders } = useRxData<NoteDocType>('notes', queryConstructor);

  return (
    <Modal
      open={Boolean(note)}
      onClose={onClose}
      title="Move Note"
    >
      <div className="mb-4">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            Icon={FolderIcon}
            onClick={() => note && moveNote(note, folder)}
          >
            {getTitle(folder.text)}
          </Button>
        ))}
      </div>
      <Button
        Icon={PlusIcon}
        onClick={() => createFolder(collection)}
      >
        Create Folder
      </Button>
      <Button
        disabled={note && !note.relatedFolder}
        Icon={MinusSmallIcon}
        onClick={() => note && moveNote(note, null)}
      >
        Remove from Folder
      </Button>
    </Modal>
  );
}
