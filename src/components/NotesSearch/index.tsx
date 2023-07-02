import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

import { notesSearchAtom } from '../../context/notesSearch';
import { Button } from '../Button';

export function NotesSearch() {
  const [search, setSearch] = useAtom(notesSearchAtom);

  return (
    <label htmlFor="notes-search" className="relative block flex-1 text-gray-900">
      <span className="sr-only">Search Notes</span>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </div>
      <input
        name="notes-search"
        id="notes-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="block w-full rounded-md border-0 py-2 pl-10 pr-10 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400"
        placeholder="Search Notes"
      />
      {search.length > 0 && (
        <div className="absolute inset-y-0 right-0">
          <Button
            Icon={XMarkIcon}
            IconClassName="text-gray-400"
            iconOnly
            disabled={!search.length}
            onClick={() => setSearch('')}
          >
            Clear
          </Button>
        </div>
      )}
    </label>
  );
}
