import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, FolderIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import { useRxData } from 'rxdb-hooks';

import { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { getTitle } from '@/utils/getTitle';
import { FolderContextMenu } from './FolderContextMenu';
import { NotesListItem } from './NotesListItem';
import { NotesProps } from './types';

export type OpenFolders = {
  [id: string]: boolean,
};

function updateSessionStorage(id: string) {
  const openFolders: OpenFolders = JSON.parse(sessionStorage.getItem('open-folders') || '{}');

  if (openFolders[id]) {
    delete openFolders[id];
  } else {
    openFolders[id] = true;
  }

  sessionStorage.setItem('open-folders', JSON.stringify(openFolders));
}

export function FolderListItem({
  note,
}: NotesProps) {
  const contextButton = useRef<HTMLButtonElement>(null);
  const openFolders: OpenFolders = JSON.parse(sessionStorage.getItem('open-folders') || '{}');
  const sort = useAtomValue(notesSortAtom);
  const { result: notes, isFetching } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.find({
      selector: {
        id: {
          $in: note.relatedNotes || [],
        },
      },
      sort: [
        notesSortOptions[sort].value,
      ],
    }),
  );

  if (!note.isFolder) throw new Error('not a folder');
  return (
    <li>
      <Disclosure defaultOpen={openFolders?.[note.id]}>
        <div
          className="group/context-menu relative flex"
          onContextMenu={(event) => {
            event.preventDefault();
            contextButton?.current?.click();
          }}
        >
          <Disclosure.Button
            as={Button}
            onClick={() => updateSessionStorage(note.id)}
            // disabled={isFetching || notes.length === 0}
            Icon={FolderIcon}
            secondaryAction={(
              <ChevronRightIcon
                className="ui-open:rotate-90 ui-open:transform h-6 w-6"
                aria-hidden="true"
              />
            )}
          >
            {getTitle(note.text)}
          </Disclosure.Button>
          <FolderContextMenu
            note={note}
            ref={contextButton}
          />
        </div>
        <Disclosure.Panel as="ul" role="list" className="pl-4">
          {isFetching && (
            <li className="block p-3">Loading...</li>
          )}
          {!isFetching && notes.length === 0 && (
            <li className="block p-3">No notes</li>
          )}
          {notes.map((folderNote) => <NotesListItem key={folderNote.id} note={folderNote} />)}
        </Disclosure.Panel>
      </Disclosure>
    </li>
  );
}
