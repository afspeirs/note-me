import { GithubIcon } from 'lucide-react';

import { AIcon } from '@/components/AIcon';
import { AppVersion } from '@/components/AppVersion';
import { Button } from '@/components/Button';
import { ChangeTheme } from '@/components/ChangeTheme';
import { CheckForUpdate } from '@/components/CheckForUpdate';
import { NotesExport } from '@/components/NotesExport';
import { NotesImport } from '@/components/NotesImport';
import { Page } from '@/components/Page';
import { Tooltip } from '@/components/Tooltip';

export function Settings() {
  return (
    <Page
      title="Settings"
      iconsRight={(
        <>
          <Tooltip content="Visit speirs.dev">
            <Button
              Icon={AIcon}
              iconOnly
              href="https://speirs.dev"
              target="_blank"
            >
              Visit speirs.dev
            </Button>
          </Tooltip>
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
        <li aria-hidden="true"><hr className="mx-3 border-gray-300 dark:border-gray-400" /></li>
        <li>
          <ChangeTheme />
        </li>
        <li aria-hidden="true"><hr className="mx-3 border-gray-300 dark:border-gray-400" /></li>
        <li>
          <NotesImport />
          <NotesExport />
        </li>
      </ul>
    </Page>
  );
}
