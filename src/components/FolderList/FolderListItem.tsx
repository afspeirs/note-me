import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useRxData, type QueryConstructor } from 'rxdb-hooks';

import { type NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
// import { FolderContextMenu } from './FolderContextMenu';
import { NotesList } from '@/components/NotesList';
import { notesSearchAtom } from '@/context/notesSearch';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';
import { classNames } from '@/utils/classNames';
import type { FolderListItemProps } from './types';

export function FolderListItem({
  folder,
}: FolderListItemProps) {
  const search = useAtomValue(notesSearchAtom);
  const sort = useAtomValue(notesSortAtom);
  const notesQuery: QueryConstructor<NoteDocType> = useCallback(
    (collection) => collection.find({
      selector: {
        folder: {
          $eq: folder,
        },
        text: {
          $regex: RegExp(search, 'i'),
        },
      },
      sort: notesSortOptions[sort].value,
    }),
    [folder, search, sort],
  );

  const { result: notes, isFetching } = useRxData<NoteDocType>('notes', notesQuery);
  return (
    <li
      key={folder}
      className="group/folder-context-menu relative flex flex-col"
      onContextMenu={(event) => event.preventDefault()}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as={Button}
              secondaryAction={(
                <ChevronUpIcon
                  className={classNames(
                    'h-6 w-6 transform transition-transform',
                    open ? 'rotate-180' : 'rotate-90',
                  )}
                  aria-hidden="true"
                />
              )}
            >
              {folder}
            </Disclosure.Button>
            <Disclosure.Panel
              className="w-full pl-8"
            >
              <NotesList
                notes={notes}
                isFetching={isFetching}
                padding={false}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  );
}
