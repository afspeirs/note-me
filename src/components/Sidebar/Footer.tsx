import { PlusIcon, SettingsIcon } from 'lucide-react';

import { AuthUserInformation } from '@/components/AuthUserInformation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Tooltip } from '@/components/Tooltip';

export function Footer() {
  return (
    <Card as="nav" aria-label="sidebar footer">
      <ul role="list" className="flex gap-1 p-2">
        <li className="flex-1">
          <Button
            Icon={PlusIcon}
            href="/note"
          >
            Create Note
          </Button>
        </li>
        <li>
          <AuthUserInformation tooltipPosition="top" />
        </li>
        <li>
          <Tooltip label="Settings" position="top">
            <Button
              Icon={SettingsIcon}
              iconOnly
              href="/settings/"
            >
              Settings
            </Button>
          </Tooltip>
        </li>
      </ul>
    </Card>
  );
}
