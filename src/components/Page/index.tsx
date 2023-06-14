import {
  Bars2Icon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { Helmet } from 'react-helmet-async';
import { useHotkeys } from 'react-hotkeys-hook';

import { drawerOpenAtom } from '../../context/navigation';
import { ButtonIcon } from '../ButtonIcon';
import type { PageProps } from './types';

export function Page({
  children,
  icons,
  title,
}: PageProps) {
  const [open, setOpen] = useAtom(drawerOpenAtom);
  const toggleOpen = () => setOpen((prevState) => !prevState);

  useHotkeys('ctrl+b', toggleOpen);

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
          onClick={toggleOpen}
        />
        {icons}
      </header>
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}
