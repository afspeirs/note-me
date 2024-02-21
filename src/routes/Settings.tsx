import { GithubIcon } from 'lucide-react';

import { AppVersion } from '@/components/AppVersion';
import { Button } from '@/components/Button';
import { ChangeTheme } from '@/components/ChangeTheme';
import { CheckForUpdate } from '@/components/CheckForUpdate';
import { NotesExport } from '@/components/NotesExport';
import { NotesImport } from '@/components/NotesImport';
import { NotesReSync } from '@/components/NotesReSync';
import { Page } from '@/components/Page';
import { Tooltip } from '@/components/Tooltip';

export function Settings() {
  return (
    <Page
      title="Settings"
      icons={(
        <>
          {/* <Tooltip content="Visit speirs.dev">
            <Button
              Icon={AIcon}
              iconOnly
              href="https://speirs.dev"
              target="_blank"
            >
              Visit speirs.dev
            </Button>
          </Tooltip> */}
          <Tooltip content="Visit github.com/afspeirs/note-me">
            <Button
              Icon={GithubIcon}
              iconOnly
              href="https://github.com/afspeirs/note-me"
              target="_blank"
            >
              Visit github.com/afspeirs/note-me
            </Button>
          </Tooltip>
        </>
      )}
    >
      <ul role="list">
        <li>
          <AppVersion />
          <CheckForUpdate />
        </li>
        <li aria-hidden="true"><hr className="mx-4 border-gray-300 dark:border-gray-400" /></li>
        <li>
          <ChangeTheme />
        </li>
        <li aria-hidden="true"><hr className="mx-4 border-gray-300 dark:border-gray-400" /></li>
        <li>
          <NotesImport />
          <NotesExport />
        </li>
        <li aria-hidden="true"><hr className="mx-4 border-gray-300 dark:border-gray-400" /></li>
        <li>
          <NotesReSync />
        </li>
      </ul>
    </Page>
  );
}
