import { ChevronUpIcon, FolderClosedIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import type { FolderListItemProps } from './types';

export function FolderListItem({
  folder,
}: FolderListItemProps) {
  return (
    <li
      key={folder}
      className="group/folder-context-menu relative flex flex-col"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Button
        Icon={FolderClosedIcon}
        secondaryAction={(
          <ChevronUpIcon className="size-6 rotate-90" aria-hidden="true" />
        )}
        href={folder ? `/?folder=${folder}` : '/'}
      >
        {folder || 'All Notes'}
      </Button>
    </li>
  );
}
