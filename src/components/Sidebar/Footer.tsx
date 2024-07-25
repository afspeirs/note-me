import { HomeIcon, PlusIcon, SettingsIcon } from 'lucide-react';

import { AuthUserInformation } from '@/components/AuthUserInformation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export function Footer() {
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
            }}
            Icon={PlusIcon}
          >
            Create Note
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
