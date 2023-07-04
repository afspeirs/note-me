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
      setOpen={setOpen}
      title="More Information"
    >
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
