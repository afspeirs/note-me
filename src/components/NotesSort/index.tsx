import { Listbox } from '@headlessui/react';
import { CheckIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

import { Button } from '@/components/Button';
import { notesSortAtom, notesSortOptions } from '@/context/notesSort';

export function NotesSort() {
  const [sort, setSort] = useAtom(notesSortAtom);

  return (
    <Listbox value={sort} onChange={setSort}>
      <Listbox.Button
        as={Button}
        Icon={FunnelIcon}
        iconOnly
      >
        <Listbox.Label>Sort:</Listbox.Label>
        <span>{notesSortOptions[sort].label}</span>
      </Listbox.Button>

      <Listbox.Options className="absolute right-0 mt-1 w-72 max-h-80 z-10 overflow-auto rounded-lg bg-gray-200 dark:bg-neutral-700 text-base shadow-lg focus-visible">
        {Object.entries(notesSortOptions).map(([value, option]) => (
          <Listbox.Option
            key={value}
            className="relative cursor-default select-none pl-12 py-3 text-gray-900 dark:text-white ui-active:text-white ui-active:bg-primary"
            value={value}
          >
            <span className="block truncate ui-selected:font-semibold">
              {option.label}
            </span>

            <span className="absolute inset-y-0 left-0 items-center pl-3 hidden ui-selected:flex">
              <CheckIcon className="h-6 w-6 text-gray-900 dark:text-white ui-active:text-white" aria-hidden="true" />
            </span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
