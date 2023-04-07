import { Helmet } from 'react-helmet-async';
import { useAtom } from 'jotai';
import {
  Bars2Icon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid';

import { ButtonIcon } from '../ButtonIcon';
import { drawerOpenAtom } from '../../context/navigation';
import type { PageProps } from './types';

export function Page({
  children,
  icons,
  title,
}: PageProps) {
  const [open, setOpen] = useAtom(drawerOpenAtom);

  return (
    <>
      <Helmet>
        <title>{`${title ? `${title} | ` : ''}NoteMe`}</title>
      </Helmet>

      <header className="flex gap-2 p-2">
        <ButtonIcon
          className="mr-auto"
          Icon={open ? ChevronLeftIcon : Bars2Icon}
          label={`${open ? 'Close' : 'Open'} Sidebar`}
          onClick={() => setOpen((prevState) => !prevState)}
        />
        {icons}
      </header>
      <main className="flex-1 px-4 pt-1 overflow-y-auto">
        {children}
      </main>
    </>
  );
}
