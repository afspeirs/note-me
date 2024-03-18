import { useAtom } from 'jotai';
import { ArrowLeftIcon, ChevronLeftIcon, MenuIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { drawerOpenAtom } from '@/context/navigation';
import type { PageProps } from './types';

export function Page({
  children,
  icons,
  title,
}: PageProps) {
  const [open, setOpen] = useAtom(drawerOpenAtom);
  const toggleOpen = () => setOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useHotkeys('ctrl+b, meta+b', toggleOpen, {
    enableOnFormTags: true,
  });

  useHotkeys('ctrl+n, meta+n', () => navigate('/note/'), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <>
      <Helmet>
        <title>{`${title ? `${title} | ` : ''}NoteMe`}</title>
      </Helmet>

      <header className="flex gap-2 p-2">
        <Tooltip content={`${open ? 'Close' : 'Open'} Sidebar`}>
          <Button
            Icon={open ? ChevronLeftIcon : MenuIcon}
            iconOnly
            onClick={toggleOpen}
          >
            {`${open ? 'Close' : 'Open'} Sidebar`}
          </Button>
        </Tooltip>

        {pathname !== '/' && (
          <Tooltip content="Go back">
            <Button
              Icon={ArrowLeftIcon}
              iconOnly
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Tooltip>
        )}

        <div className="ml-auto" />

        {icons}
      </header>

      <main className="grid flex-1 overflow-auto">
        {children}
      </main>
    </>
  );
}
