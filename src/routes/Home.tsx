import { useAtomValue } from 'jotai';
import { PlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Button } from '@/components/Button';
import { NotesList } from '@/components/NotesList';
import { NotesSearch } from '@/components/NotesSearch';
import { NotesSort } from '@/components/NotesSort';
import { Page } from '@/components/Page';
import { Tooltip } from '@/components/Tooltip';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';

export function Home() {
  const [searchParams] = useSearchParams();
  const searchParamsFolder = searchParams.get('folder');
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const notesQuery: NoteQuery = useCallback(
    (collection) => collection.find(searchParamsFolder ? {
      selector: {
        folder: {
          $eq: searchParamsFolder,
        },
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: [notesSortOptions[sort].value],
    } : {
      selector: {
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: [notesSortOptions[sort].value],
    }),
    [searchParamsFolder, search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  return (
    <Page
      title={searchParamsFolder || 'All Notes'}
      icons={(
        <>
          <Tooltip content="Create Note">
            <Button
              href={{
                pathname: '/note',
                search: searchParamsFolder ? `folder=${searchParamsFolder}` : undefined,
              }}
              Icon={PlusIcon}
              iconOnly
            >
              Create Note
            </Button>
          </Tooltip>
          <NotesSearch />
          <NotesSort />
        </>
      )}
    >
      {/* <div className="flex flex-col gap-3 p-4"> */}
      {/* <p>Hello and welcome to NoteMe</p>

      {!auth?.user ? (
        <>
          <p>Store and edit your notes as Markdown formatted text</p>
          <p>
            Once signed in you can access your notes from any device,
            and changes will be reflected across other devices seamlessly.
          </p>

          <SignInButton />
        </>
      ) : (
        <p>Select a note from the sidebar to get started</p>
      )} */}

      <NotesList
        isFetching={isFetching}
        notes={notes}
        padding
      />
      {/* </div> */}
    </Page>
  );
}
