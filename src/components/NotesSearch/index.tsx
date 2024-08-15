import { useAtom } from 'jotai';
import { ArrowLeftIcon, SearchIcon, XIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { atomNotesSearch } from '@/context/notesSearch';
import { Transition } from '@headlessui/react';
import { useHotkeys } from 'react-hotkeys-hook';

export function NotesSearch() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useAtom(atomNotesSearch);

  useHotkeys('esc', () => setShow(false), {
    enableOnFormTags: true,
  });

  return (
    <>
      <Tooltip content="Show Search">
        <Button
          Icon={SearchIcon}
          iconOnly
          onClick={() => setShow(true)}
        >
          Show Search
        </Button>
      </Tooltip>

      <Transition
        show={show}
        as={Fragment}
        enter="transition-[opacity,transform] ease-linear duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition-[opacity,transform] ease-linear duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        <label htmlFor="notes-search" className="absolute block inset-0 m-card-gap bg-light dark:bg-dark z-50">
          <span className="sr-only">Search Notes</span>
          <div className="absolute flex items-center gap-3">
            <Tooltip content="Hide Search" side="right">
              <Button
                Icon={ArrowLeftIcon}
                iconOnly
                onClick={() => {
                  setShow(false);
                  setSearch('');
                }}
              >
                Hide Search
              </Button>
            </Tooltip>
            <SearchIcon className="size-6 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            name="notes-search"
            id="notes-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="block w-full rounded-lg border-0 py-3 sm:py-2 pl-24 pr-4 bg-inherit placeholder:text-gray-400 placeholder:select-none focus-visible"
            placeholder="Search Notes"
          />
          <div className="absolute inset-y-0 right-0">
            {search.length > 0 && (
              <Button
                Icon={XIcon}
                iconOnly
                disabled={!search.length}
                onClick={() => setSearch('')}
              >
                Clear
              </Button>
            )}
          </div>
        </label>
      </Transition>
    </>
  );
}
