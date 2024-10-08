import { HomeIcon, SettingsIcon } from 'lucide-react';

import { AuthUserInformation } from '@/components/AuthUserInformation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export function Footer() {
  return (
    <Card
      as="nav"
      aria-label="sidebar footer"
    >
      <ul role="list" className="flex flex-col p-card-gap">
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
