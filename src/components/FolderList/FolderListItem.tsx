import { FolderClosedIcon } from 'lucide-react';
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
      className="group/folder-context-menu relative flex flex-col"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Button
        active={folder === searchParamsFolder}
        href={{
          pathname: '/',
          search: `folder=${folder}`,
        }}
        Icon={FolderClosedIcon}
      >
        {folder}
      </Button>
    </li>
  );
}
