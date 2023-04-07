export function AppVersion() {
  return (
    <li>
      {`App version: ${import.meta.env.PACKAGE_VERSION}`}
    </li>
  );
}
