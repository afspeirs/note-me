import { useSetAtom } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRxCollection } from 'rxdb-hooks';

import { createNote } from '@/api/notes';
import type { NoteDocType } from '@/api/types';
import { atomCurrentFolder } from '@/context/folders';

export function NoteCreate() {
  const collection = useRxCollection<NoteDocType>('notes');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsFolder = searchParams.get('folder');
  const setCurrentFolder = useSetAtom(atomCurrentFolder);

  if (collection) {
    createNote(collection, { folder: searchParamsFolder })
      .then((note) => {
        // Show All Notes if there is not folder set in the note
        if (!note?.folder) setCurrentFolder('');

        navigate({
          pathname: `/note/${note.id}`,
          search: note?.folder ? `folder=${window.encodeURIComponent(note?.folder)}` : undefined,
        }, { replace: true });
      });
  }

  return null;
}
