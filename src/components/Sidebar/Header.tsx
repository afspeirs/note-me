import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import { ButtonIcon } from '../ButtonIcon';

export function Header() {
  return (
    <nav className="flex justify-between p-2">
      <ButtonIcon
        label="Search Notes"
        Icon={MagnifyingGlassIcon}
        onClick={() => console.log('Search Notes')} // eslint-disable-line no-console
      />
      <ButtonIcon
        label="Filter Notes"
        Icon={AdjustmentsHorizontalIcon}
        onClick={() => console.log('Filter Notes')} // eslint-disable-line no-console
      />
      <ButtonIcon
        label="Create Note"
        Icon={PlusIcon}
        href="/note"
      />
      <ButtonIcon
        label="Home"
        Icon={HomeIcon}
        href="/"
      />
      <ButtonIcon
        label="View Settings"
        Icon={Cog6ToothIcon}
        href="/settings/"
      />
    </nav>
  );
}
