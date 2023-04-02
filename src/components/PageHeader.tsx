import {
  Bars2Icon,
  ChevronLeftIcon,
  // StarIcon,
} from '@heroicons/react/24/solid';
// import {
//   InformationCircleIcon,
//   PencilIcon,
//   StarIcon as StarOutlineIcon,
//   TrashIcon,
// } from '@heroicons/react/24/outline';

import { ButtonIcon } from './ButtonIcon';

interface PageHeaderProps {
  open: boolean,
  toggleOpen: () => void,
}

export function PageHeader({
  open = false,
  toggleOpen,
}: PageHeaderProps) {
  return (
    <nav className="flex p-2">
      <ButtonIcon
        className="mr-auto"
        Icon={open ? ChevronLeftIcon : Bars2Icon}
        label={`${open ? 'Close' : 'Open'} Sidebar`}
        onClick={toggleOpen}
      />

      {/* <button type="button" aria-label="Edit Note" className="p-2 rounded-full">
        <PencilIcon className="h-6 w-6 text-primary" />
      </button>
      <button type="button" aria-label="Favourite Note" className="p-2 rounded-full">
        <StarOutlineIcon className="h-6 w-6 text-primary" />
      </button>
      <button type="button" aria-label="View note information" className="p-2 rounded-full">
        <InformationCircleIcon className="h-6 w-6 text-primary" />
      </button>
      <button type="button" aria-label="Delete Note" className="p-2 rounded-full">
        <TrashIcon className="h-6 w-6 text-red-500" />
      </button> */}
    </nav>
  );
}
