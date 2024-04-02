import { useAtom, useAtomValue } from 'jotai';
import { ChevronLeftIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType, NoteQuery } from '@/api/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FolderList } from '@/components/FolderList';
import { Tooltip } from '@/components/Tooltip';
import { foldersAtom } from '@/context/folders';
import { drawerOpenAtom } from '@/context/navigation';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';

export function Content() {
  const [open, setOpen] = useAtom(drawerOpenAtom);
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const [folders, setFolders] = useAtom(foldersAtom);
  const notesQuery: NoteQuery = useCallback(
    (collection) => collection.find({
      selector: {
        text: {
          $regex: RegExp(search, 'i').source,
        },
      },
      sort: [notesSortOptions[sort].value],
    }),
    [search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  // console.log(notes.map((folder) => folder.toJSON()));

  const toggleOpen = () => setOpen((prevState) => !prevState);

  useEffect(() => {
    const allFolders = notes.map((note) => note.folder ?? '').filter(Boolean);
    const newFolders = [...new Set(allFolders)].sort();
    // console.log(newFolders);
    setFolders(newFolders);
  }, [notes, setFolders]);

  return (
    <Card
      as="nav"
      className="flex-1 h-full overflow-hidden"
      aria-label="Sidebar"
    >
      <div className="flex gap-2 p-2">
        <div className="ml-2 self-center font-bold text-xl truncate select-none">Folders</div>

        <div className="ml-auto" />

        <Tooltip content={`${open ? 'Close' : 'Open'} Sidebar`} side="left">
          <Button
            Icon={ChevronLeftIcon}
            iconOnly
            onClick={toggleOpen}
          >
            {`${open ? 'Close' : 'Open'} Sidebar`}
          </Button>
        </Tooltip>
      </div>
      <FolderList
        folders={folders}
        isFetching={isFetching}
        padding
      />
    </Card>
  );
}
