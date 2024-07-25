import { useAtomValue } from 'jotai';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { currentFolderAtom } from '@/context/folders';

export function Footer() {
  const currentFolder = useAtomValue(currentFolderAtom);

  if (!currentFolder) return null;
  return (
    <Card
      as="nav"
      aria-label="sidebar notes footer"
    >
      <ul role="list" className="flex flex-col p-2">
        <li>
          <Button
            href={{
              pathname: '/note',
              search: `folder=${window.encodeURIComponent(currentFolder)}`,
            }}
            Icon={PlusIcon}
          >
            {`Create Note in "${currentFolder}"`}
          </Button>
        </li>
      </ul>
    </Card>
  );
}
