import { HomeIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { AuthUserInformation } from '@/components/AuthUserInformation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export function Footer() {
  const { pathname, search } = useLocation();

  return (
    <Card as="nav" aria-label="sidebar footer">
      <ul role="list" className="flex flex-col p-2">
        <li>
          <Button
            href="/note"
            Icon={PlusIcon}
          >
            Create Note
          </Button>
        </li>
        <li>
          <Button
            active={pathname === '/' && search === ''}
            href="/"
            Icon={HomeIcon}
          >
            Home
          </Button>
        </li>
        <li className="flex">
          <Button
            active={pathname.startsWith('/settings')}
            href="/settings/"
            Icon={SettingsIcon}
          >
            Settings
          </Button>
          <AuthUserInformation />
        </li>
      </ul>
    </Card>
  );
}
