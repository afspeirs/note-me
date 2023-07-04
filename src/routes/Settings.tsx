import { AppVersion } from '@/components/AppVersion';
import { ChangeTheme } from '@/components/ChangeTheme';
import { CheckForUpdate } from '@/components/CheckForUpdate';
import { Page } from '@/components/Page';

export function Settings() {
  return (
    <Page title="Settings">
      <ul role="list">
        <AppVersion />
        <CheckForUpdate />
        <ChangeTheme />
      </ul>
    </Page>
  );
}
