import type { NoteDocument } from '@/api/types';

export type NotesMoveModalProps = {
  onClose: () => void,
  note: NoteDocument | false,
};
