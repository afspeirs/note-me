import { XMarkIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { formatDate } from '@/utils/formatDate';
import type { NotesMoreInformationProps } from './types';

export function NotesMoreInformation({
  note,
  open,
  setOpen,
}: NotesMoreInformationProps) {
  if (!note) return null;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="More Information"
    >
      <Button
        className="absolute top-2 right-2"
        Icon={XMarkIcon}
        iconOnly
        onClick={() => setOpen(false)}
      >
        Close
      </Button>

      <p className="mb-2">
        <span className="font-medium">Date Created: </span>
        {formatDate(note.dateCreated)}
      </p>
      <p className="mb-2">
        <span className="font-medium">Date Modified: </span>
        {note.dateModified ? formatDate(note.dateModified) : 'Never'}
      </p>
      <p>
        <span className="font-medium">Favourite: </span>
        {note.favourite ? 'Yes' : 'No'}
      </p>
    </Modal>
  );
}
