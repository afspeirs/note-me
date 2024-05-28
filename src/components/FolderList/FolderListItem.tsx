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
      key={folder.name}
      className="group/folder-context-menu relative flex"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Button
        onClick={() => setCurrentFolder(folder.name)}
        active={folder.name === currentFolder}
        Icon={FolderIcon}
        secondaryAction={(
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white bg-dark dark:text-dark text-xs font-medium leading-none">
            {folder.count <= 99 ? folder.count : '99+'}
          </span>
        )}
      >
        {folder.name || 'All Notes'}
      </Button>
      <Button
        className="hidden group-hover/folder-context-menu:block"
        Icon={PlusIcon}
        iconOnly
        href={{
          pathname: '/note/',
          search: folder.name ? `folder=${folder.name}` : undefined,
        }}
      >
        Create Note in folder
      </Button>
    </li>
  );
}
