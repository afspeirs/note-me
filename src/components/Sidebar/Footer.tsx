import {
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import { Button } from '../Button';
import { Card } from '../Card';

export function Footer() {
  return (
    <Card as="nav" aria-label="sidebar footer">
      <ul role="list" className="flex flex-col gap-1 p-2">
        <li>
          <Button
            IconStart={PlusIcon}
            href="/note"
          >
            Create Note
          </Button>
        </li>
        <li>
          <Button
            IconStart={HomeIcon}
            href="/"
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            IconStart={Cog6ToothIcon}
            href="/settings/"
          >
            Settings
          </Button>
        </li>
      </ul>
    </Card>
  );
}
