import type { Dispatch, SetStateAction } from 'react';

import { NoteDocument } from '../../api/types';

export type NotesMoreInformationProps = {
  note: NoteDocument,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
};
