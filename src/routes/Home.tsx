import { useAtomValue } from 'jotai';
import { useSearchParams } from 'react-router-dom';
// import { SignInButton } from '@/components/AuthUserInformation/SignInButton';
import { Page } from '@/components/Page';
// import { authAtom } from '@/context/auth';
import { AuthUserInformation } from '@/components/AuthUserInformation';
import { NotesList } from '@/components/NotesList';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import type { NoteDocType, NoteQuery } from '@/api/types';
import { useCallback } from 'react';
import { useRxData } from 'rxdb-hooks';
import { NotesSort } from '@/components/NotesSort';

export function Home() {
  // const auth = useAtomValue(authAtom);
  const [searchParams] = useSearchParams();
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const searchParamsFolder = searchParams.get('folder');
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
      sort: notesSortOptions[sort].value,
    } : {
      selector: {
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: notesSortOptions[sort].value,
    }),
    [searchParamsFolder, search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  return (
    <Page
      title={searchParamsFolder}
      titleShow
      icons={(
        <>
          <NotesSort />
          <AuthUserInformation />
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
