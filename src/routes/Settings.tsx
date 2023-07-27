import { AppVersion } from '@/components/AppVersion';
import { AuthUserInformation } from '@/components/AuthUserInformation';
import { ChangeTheme } from '@/components/ChangeTheme';
import { CheckForUpdate } from '@/components/CheckForUpdate';
import { NotesExport } from '@/components/NotesExport';
import { NotesImport } from '@/components/NotesImport';
import { Page } from '@/components/Page';

export function Settings() {
  return (
    <Page title="Settings">
      <ul role="list">
        <AuthUserInformation />
        <li aria-hidden="true"><hr className="mx-4 border-gray-400" /></li>
        <AppVersion />
        <CheckForUpdate />
        <li aria-hidden="true"><hr className="mx-4 border-gray-400" /></li>
        <ChangeTheme />
        <li aria-hidden="true"><hr className="mx-4 border-gray-400" /></li>
        <NotesImport />
        <NotesExport />
      </ul>
    </Page>
  );
}
