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
      className="space-y-2"
      open={open}
      onClose={() => setOpen(false)}
      title="More Information"
    >
      <p>
        <span className="font-medium">Date Created: </span>
        {formatDate({ date: note.date_created })}
      </p>
      <p>
        <span className="font-medium">Date Modified: </span>
        {note.date_modified ? formatDate({ date: note.date_modified }) : 'Never'}
      </p>
      <p>
        <span className="font-medium">Favourite: </span>
        {note.favourite ? 'Yes' : 'No'}
      </p>
      <p>
        <span className="font-medium">Folder: </span>
        {note.folder ?? 'None'}
      </p>
    </Modal>
  );
}
