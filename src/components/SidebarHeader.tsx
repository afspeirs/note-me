import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export function SidebarHeader() {
  return (
    <nav className="flex p-2">
      <button type="button" aria-label="Search Notes" className="p-2 rounded-full">
        <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
      </button>
      <button type="button" aria-label="Filter Notes" className="p-2 rounded-full">
        <AdjustmentsHorizontalIcon className="h-6 w-6 text-primary" />
      </button>
      <button type="button" aria-label="View Setting" className="p-2 rounded-full">
        <WrenchScrewdriverIcon className="h-6 w-6 text-primary" />
      </button>
    </nav>
  );
}
