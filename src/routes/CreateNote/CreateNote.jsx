import { useEffect } from 'react';

import { useAuth } from '@/hooks/Auth';
import { useNotes } from '@/hooks/Notes';

function CreateNote() {
  const { isSignedIn } = useAuth();
  const { createNote, loading } = useNotes();

  useEffect(() => {
    if (!loading && isSignedIn) {
      createNote('', true);
    }
  }, [isSignedIn, loading]);

  return null;
}

export default CreateNote;
