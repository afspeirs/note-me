import { FolderIcon, PlusIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import type { FolderListItemProps } from './types';

export function FolderListItem({
  folder,
}: FolderListItemProps) {
  const [searchParams] = useSearchParams();
  const searchParamsFolder = searchParams.get('folder');

  return (
    <li
      key={folder}
      className="group/folder-context-menu relative flex"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Button
        active={folder === searchParamsFolder}
        href={{
          pathname: '/',
          search: `folder=${folder}`,
        }}
        Icon={FolderIcon}
      >
        {folder}
      </Button>
      <Button
        className="hidden group-hover/folder-context-menu:block"
        Icon={PlusIcon}
        iconOnly
        href={{
          pathname: '/note/',
          search: `folder=${folder}`,
        }}
      >
        Create Note in folder
      </Button>
    </li>
  );
}
