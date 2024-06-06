import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRxCollection } from 'rxdb-hooks';

import { createNote } from '@/api/notes';
import type { NoteDocType } from '@/api/types';

export function NoteCreate() {
  const collection = useRxCollection<NoteDocType>('notes');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsFolder = searchParams.get('folder');

  if (collection) {
    createNote(collection, { folder: searchParamsFolder })
      .then((note) => navigate({
        pathname: `/note/${note.id}`,
        search: note?.folder ? `folder=${window.encodeURIComponent(note?.folder)}` : undefined,
      }, { replace: true }));
  }

  return null;
}
