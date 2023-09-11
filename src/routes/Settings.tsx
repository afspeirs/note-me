import { AppVersion } from '@/components/AppVersion';
import { AuthUserInformation } from '@/components/AuthUserInformation';
import { ChangeTheme } from '@/components/ChangeTheme';
import { CheckForUpdate } from '@/components/CheckForUpdate';
import { NotesExport } from '@/components/NotesExport';
import { NotesImport } from '@/components/NotesImport';
import { NotesReSync } from '@/components/NotesReSync';
import { Page } from '@/components/Page';

export function Settings() {
  return (
    <Page
      title="Settings"
      icons={(
        <AuthUserInformation />
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
