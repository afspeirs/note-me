import { useAtomValue } from 'jotai';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { atomCurrentFolder } from '@/context/folders';

export function Footer() {
  const currentFolder = useAtomValue(atomCurrentFolder);

  return (
    <Card
      as="nav"
      aria-label="sidebar notes footer"
    >
      <ul role="list" className="flex flex-col p-card-gap">
        <li>
          <Button
            href={{
              pathname: '/note',
              search: currentFolder ? `folder=${window.encodeURIComponent(currentFolder)}` : undefined,
            }}
            Icon={PlusIcon}
          >
            {`Create Note${currentFolder ? ` in "${currentFolder}"` : ''}`}
          </Button>
        </li>
      </ul>
    </Card>
  );
}
