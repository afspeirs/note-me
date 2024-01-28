import type { NoteDocument } from '@/api/types';

export type NotesMoveModalProps = {
  setShowMoveNoteModal: React.Dispatch<React.SetStateAction<NoteDocument | false>>,
  showMoveNoteModal: NoteDocument | false,
};
