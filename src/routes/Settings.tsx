import { AppVersion } from '../components/AppVersion';
import { CheckForUpdate } from '../components/CheckForUpdate';
import { Page } from '../components/Page';

export function Settings() {
  return (
    <Page title="Settings">
      Settings

      <ul role="list">
        <AppVersion />
        <CheckForUpdate />
        {/* <li>Theme</li> */}
      </ul>
    </Page>
  );
}
