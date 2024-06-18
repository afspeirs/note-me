import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useRxData } from 'rxdb-hooks';

import { NoteDocType, NoteQuery } from '@/api/types';
import { SignInButton } from '@/components/AuthUserInformation/SignInButton';
import { NotesList } from '@/components/NotesList';
import { Page } from '@/components/Page';
import { authAtom } from '@/context/auth';
import { notesSortOptions } from '@/context/notesSort';

export function Home() {
  const auth = useAtomValue(authAtom);
  const notesQuery: NoteQuery = useCallback(
    (collection) => collection.find({
      sort: [notesSortOptions['date_modified-desc'].value],
      limit: 10,
    }),
    [],
  );
  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);

  return (
    <Page
      title="NoteMe"
      icons={!auth?.user && (
        <SignInButton />
      )}
    >
      <div className="flex flex-col gap-3 p-4">
        <p>Hello and welcome to NoteMe.</p>

        <p>
          Select a note from the sidebar to get started,
          or select a recently edited note below:
        </p>
      </div>

      <NotesList
        isFetching={isFetching}
        notes={notes}
      />
    </Page>
  );
}
