import type { NoteDocument } from '@/api/types';

export type FolderRenameModalProps = {
  onClose: () => void,
  folder: NoteDocument | false,
};
