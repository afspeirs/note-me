import { useAtom } from 'jotai';
import { FolderIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { currentFolderAtom } from '@/context/folders';
import type { FolderListItemProps } from './types';

export function FolderListItem({
  folder,
}: FolderListItemProps) {
  const [currentFolder, setCurrentFolder] = useAtom(currentFolderAtom);

  return (
    <li
      key={folder}
      className="group/folder-context-menu relative flex"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Button
        onClick={() => setCurrentFolder(folder)}
        active={folder === currentFolder}
        Icon={FolderIcon}
      >
        {folder || 'All Notes'}
      </Button>
      <Button
        className="hidden group-hover/folder-context-menu:block"
        Icon={PlusIcon}
        iconOnly
        href={{
          pathname: '/note/',
          search: folder ? `folder=${folder}` : undefined,
        }}
      >
        Create Note in folder
      </Button>
    </li>
  );
}
