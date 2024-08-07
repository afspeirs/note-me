import { Listbox, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { ArrowDownAZIcon, ArrowUpAZIcon, CheckIcon } from 'lucide-react';
import { Fragment, useMemo } from 'react';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { atomNotesSort, notesSortOptions } from '@/context/notesSort';

export function NotesSort() {
  const [sort, setSort] = useAtom(atomNotesSort);
  const direction = useMemo(() => sort.includes('-asc'), [sort]);

  return (
    <Listbox value={sort} onChange={setSort}>
      {({ open }) => (
        <>
          <Tooltip content={`Sort by ${notesSortOptions[sort].label}`}>
            <Listbox.Button
              active={open}
              as={Button}
              Icon={direction ? ArrowDownAZIcon : ArrowUpAZIcon}
              iconOnly
            >
              <Listbox.Label>Sort:</Listbox.Label>
              <span>{notesSortOptions[sort].label}</span>
            </Listbox.Button>
          </Tooltip>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute right-0 mt-1 p-1 w-72 z-10 rounded-lg bg-gray-200 dark:bg-neutral-700 text-dark dark:text-light shadow-lg focus-visible">
              {Object.entries(notesSortOptions).map(([value, option]) => (
                <Listbox.Option
                  key={value}
                  className="relative pl-10 p-2 rounded-md select-none ui-active:text-light ui-active:bg-primary"
                  value={value}
                >
                  <span className="absolute inset-y-0 left-0 items-center px-2 hidden ui-selected:flex">
                    <CheckIcon className="size-5" aria-hidden="true" />
                  </span>

                  <span className="truncate ui-selected:font-semibold">
                    {option.label}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
