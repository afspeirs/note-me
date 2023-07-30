import {
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

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
          <Tooltip label="Home" position="top">
            <Button
              Icon={HomeIcon}
              iconOnly
              href="/"
            >
              Home
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip label="Settings" position="top">
            <Button
              Icon={Cog6ToothIcon}
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
