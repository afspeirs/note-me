import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import { Button } from '../Button';
import { Card } from '../Card';

export function Header() {
  return (
    <Card as="nav" className="flex justify-between p-2">
      <Button
        Icon={MagnifyingGlassIcon}
        iconOnly
        onClick={() => console.log('Search Notes')} // eslint-disable-line no-console
      >
        Search Notes
      </Button>
      <Button
        Icon={AdjustmentsHorizontalIcon}
        iconOnly
        onClick={() => console.log('Filter Notes')} // eslint-disable-line no-console
      >
        Filter Notes
      </Button>
      <Button
        Icon={PlusIcon}
        iconOnly
        href="/note"
      >
        Create Note
      </Button>
      <Button
        Icon={HomeIcon}
        iconOnly
        href="/"
      >
        Home
      </Button>
      <Button
        Icon={Cog6ToothIcon}
        iconOnly
        href="/settings/"
      >
        View Settings
      </Button>
    </Card>
  );
}
