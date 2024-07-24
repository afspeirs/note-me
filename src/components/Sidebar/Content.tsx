import { useAtom } from 'jotai';
import { PinIcon, PinOffIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { FolderList } from '@/components/FolderList';
import { Tooltip } from '@/components/Tooltip';
import { foldersAtom } from '@/context/folders';
import { useMobileDrawerAtom } from '@/context/navigation';

export function Content() {
  const [useMobileDrawer, setUseMobileDrawer] = useAtom(useMobileDrawerAtom);
  const [folders, setFolders] = useAtom(foldersAtom);
  const notesQuery: NoteQuery = useCallback((collection) => collection.find(), []);

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  useEffect(() => {
    const allFolders = notes.map((note) => note.folder ?? '').filter(Boolean);
    const newFolders = [...new Set(['', ...allFolders])]
      .sort()
      .map((folder) => {
        const numberOfNotesInFolder = allFolders.filter((item) => item === folder).length;

        return {
          name: folder,
          count: folder === '' ? notes.length : numberOfNotesInFolder,
        };
      });

    // console.log(newFolders);
    setFolders(newFolders);
  }, [notes, setFolders]);

  return (
    <Card
      as="nav"
      className="relative flex flex-col flex-1 overflow-hidden"
      aria-label="sidebar folders"
    >
      <CardHeader title="Folders">
        {/* TODO: Hide this when in mobile */}
        <Tooltip content={`${useMobileDrawer ? 'Pin' : 'Un-pin'} Sidebar`} side="left">
          <Button
            className="hidden sm:block"
            Icon={useMobileDrawer ? PinIcon : PinOffIcon}
            iconOnly
            onClick={() => setUseMobileDrawer((prevState) => !prevState)}
          >
            {`${useMobileDrawer ? 'pin' : 'un-pin'} sidebar`}
          </Button>
        </Tooltip>
      </CardHeader>

      <FolderList
        folders={folders}
        fullHeight
        isFetching={isFetching}
      />
    </Card>
  );
}
