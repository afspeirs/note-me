import { useAtom } from 'jotai';
import { PinIcon, PinOffIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FolderList } from '@/components/FolderList';
import { ContentHeader } from '@/components/Sidebar/ContentHeader';
import { Tooltip } from '@/components/Tooltip';
import { foldersAtom } from '@/context/folders';
import { useMobileDrawerAtom } from '@/context/navigation';
import { ContentNested } from './ContentNested';

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
      className="flex flex-col flex-1 overflow-hidden relative"
      aria-label="Sidebar"
    >
      <FolderList
        folders={folders}
        isFetching={isFetching}
        padding
      >
        <ContentHeader title="Folders">
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
        </ContentHeader>
      </FolderList>

      <ContentNested />
    </Card>
  );
}
