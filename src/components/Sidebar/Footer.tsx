import { HomeIcon, PlusIcon, SettingsIcon } from 'lucide-react';

import { AuthUserInformation } from '@/components/AuthUserInformation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { currentFolderAtom } from '@/context/folders';
import { useAtomValue } from 'jotai';

export function Footer() {
  const currentFolder = useAtomValue(currentFolderAtom);

  return (
    <Card
      as="nav"
      aria-label="sidebar footer"
    >
      <ul role="list" className="flex flex-col p-2">
        <li>
          <Button
            href={{
              pathname: '/note',
              search: currentFolder ? `folder=${window.encodeURIComponent(currentFolder)}` : undefined,
            }}
            Icon={PlusIcon}
          >
            {`Create Note${currentFolder ? ` in "${currentFolder}"` : ''}`}
          </Button>
        </li>
        <li>
          <Button
            href="/"
            Icon={HomeIcon}
          >
            Home
          </Button>
        </li>
        <li>
          <AuthUserInformation />
        </li>
        <li>
          <Button
            href="/settings/"
            Icon={SettingsIcon}
          >
            Settings
          </Button>
        </li>
      </ul>
    </Card>
  );
}
