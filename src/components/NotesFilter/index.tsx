import { FunnelIcon } from '@heroicons/react/24/outline';

import { Button } from '../Button';

export function NotesFilter() {
  return (
    <Button
      Icon={FunnelIcon}
      iconOnly
      onClick={() => console.log('Filter Notes')} // eslint-disable-line no-console
    >
      Filter Notes
    </Button>
  );
}
