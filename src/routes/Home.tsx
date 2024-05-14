import { useAtomValue } from 'jotai';

import { SignInButton } from '@/components/AuthUserInformation/SignInButton';
import { Page } from '@/components/Page';
import { authAtom } from '@/context/auth';

export function Home() {
  const auth = useAtomValue(authAtom);

  return (
    <Page
      title="NoteMe"
      // icons={(
      //   // TODO: add something
      // )}
    >
      <div className="flex flex-col gap-3 p-4">
        <p>Hello and welcome to NoteMe</p>

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
        )}
      </div>
    </Page>
  );
}
