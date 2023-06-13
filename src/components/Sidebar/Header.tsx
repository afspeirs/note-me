import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useRxCollection } from 'rxdb-hooks';

import { createNote } from '../../api/notes';
import type { NoteDocType } from '../../api/types';
import { ButtonIcon } from '../ButtonIcon';

export function Header() {
  const collection = useRxCollection<NoteDocType>('notes');

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
        disabled={!collection}
        onClick={() => createNote(collection!)}
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
