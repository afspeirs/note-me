import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

import { ButtonIcon } from './ButtonIcon';

export function SidebarHeader() {
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
        label="View Setting"
        Icon={WrenchScrewdriverIcon}
        onClick={() => console.log('View Setting')} // eslint-disable-line no-console
      />
    </nav>
  );
}
