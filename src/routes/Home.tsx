export function Home() {
  const user: boolean | null = true; // TODO: Implement user logic

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid gap-2 text-center max-w-md">
        <p>Hello and welcome to NoteMe</p>

        <p>
          Store and edit your notes as Markdown formatted text (using
          {' '}
          <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener noreferrer">Github flavoured markdown</a>
          {' '}
          to support more features)
        </p>

        {!user ? (
          <>
            {/* eslint-disable-next-line max-len */}
            <p>Once signed in you can access your notes from any device, and changes will be reflected across other devices seamlessly.</p>

            {/* <Button variant="contained" color="primary" onClick={signIn}>
              Sign in with Google
            </Button> */}
          </>
        ) : (
          <p>Select a note from the left side to get started</p>
        )}
      </div>
    </div>
  );
}
