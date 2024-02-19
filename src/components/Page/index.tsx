import { useAtom } from 'jotai';
import { ChevronLeftIcon, MenuIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/Button';
import { drawerOpenAtom } from '@/context/navigation';
import type { PageProps } from './types';

export function Page({
  children,
  icons,
  title,
}: PageProps) {
  const [open, setOpen] = useAtom(drawerOpenAtom);
  const toggleOpen = () => setOpen((prevState) => !prevState);

  useHotkeys('ctrl+b, meta+b', toggleOpen, {
    enableOnFormTags: true,
  });

  return (
    <>
      <Helmet>
        <title>{`${title ? `${title} | ` : ''}NoteMe`}</title>
      </Helmet>

      <header className="flex gap-2 p-2">
        <Button
          Icon={open ? ChevronLeftIcon : MenuIcon}
          iconOnly
          onClick={toggleOpen}
        >
          {`${open ? 'Close' : 'Open'} Sidebar`}
        </Button>

        <div className="ml-auto" />

        {icons}
      </header>

      <main className="grid flex-1 overflow-auto">
        {children}
      </main>
    </>
  );
}
