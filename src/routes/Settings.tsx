import { Page } from '../components/Page';

export function Settings() {
  return (
    <Page title="Settings">
      Settings

      <ul role="list">
        <li>{`App version: ${import.meta.env.PACKAGE_VERSION}`}</li>
        {/* <li>Check for update</li> */}
        {/* <li>Theme</li> */}
      </ul>
    </Page>
  );
}
