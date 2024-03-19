import { useNavigate } from 'react-router-dom';
import { useRxCollection } from 'rxdb-hooks';

import { createNote } from '@/api/notes';
import type { NoteDocType } from '@/api/types';

export function NoteCreate() {
  const collection = useRxCollection<NoteDocType>('notes');
  const navigate = useNavigate();

  if (collection) {
    createNote(collection)
      .then((id) => navigate(`/note/${id}`, { replace: true }));
  }

  return null;
}
