import { useAtomValue } from 'jotai';
import { PlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { SignInButton } from '@/components/AuthUserInformation/SignInButton';
import { Button } from '@/components/Button';
import { NotesList } from '@/components/NotesList';
import { Page } from '@/components/Page';
import { Tooltip } from '@/components/Tooltip';
import { atomAuth } from '@/context/auth';
import { notesSortOptions } from '@/context/notesSort';

export function Home() {
  const auth = useAtomValue(atomAuth);
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
      <div className="flex flex-col gap-3 p-3">
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

      <Tooltip content="Create Note" side="left">
        <Button
          className="absolute bottom-2 right-2"
          colour="primary"
          href="/note"
          Icon={PlusIcon}
          iconOnly
        >
          Create Note
        </Button>
      </Tooltip>
    </Page>
  );
}
