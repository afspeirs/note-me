import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/Button';

export function NotesExport() {
  return (
    <li className="m-2">
      <Button
        disabled
        Icon={ArrowDownCircleIcon}
      >
        Export Notes
      </Button>
    </li>
  );
}
