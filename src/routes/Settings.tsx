import { AppVersion } from '@/components/AppVersion';
import { ChangeTheme } from '@/components/ChangeTheme';
import { CheckForUpdate } from '@/components/CheckForUpdate';
import { NotesExport } from '@/components/NotesExport';
import { NotesImport } from '@/components/NotesImport';
import { Page } from '@/components/Page';

export function Settings() {
  return (
    <Page title="Settings">
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
      </ul>
    </Page>
  );
}
