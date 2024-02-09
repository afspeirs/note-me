import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/Button';
import { notesSearchAtom } from '@/context/notesSearch';

export function NotesSearch({
  children,
}: PropsWithChildren) {
  const [search, setSearch] = useAtom(notesSearchAtom);

  return (
    <label htmlFor="notes-search" className="relative block flex-1">
      <span className="sr-only">Search Notes</span>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <MagnifyingGlassIcon className="size-6 text-gray-400" aria-hidden="true" />
      </div>
      <input
        name="notes-search"
        id="notes-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="block w-full rounded-lg border-0 py-3 pl-10 pr-20 bg-inherit outline-offset-1 placeholder:text-gray-400 placeholder:select-none focus-visible"
        placeholder="Search Notes"
      />
      <div className="absolute inset-y-0 right-0">
        {search.length > 0 ? (
          <Button
            Icon={XMarkIcon}
            // IconClassName="text-gray-400"
            iconOnly
            disabled={!search.length}
            onClick={() => setSearch('')}
          >
            Clear
          </Button>
        ) : children}
      </div>
    </label>
  );
}
