import { useAtom } from 'jotai';
import { MenuIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { atomDrawerOpen } from '@/context/navigation';
import type { PageProps } from './types';

export function Page({
  children,
  icons,
  title,
  titleHide = false,
}: PageProps) {
  const [open, setOpen] = useAtom(atomDrawerOpen);
  const toggleOpen = () => setOpen((prevState) => !prevState);
  const navigate = useNavigate();

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

      <header className="relative flex gap-2 p-2">
        <Tooltip content={`${open ? 'Close' : 'Open'} Sidebar`}>
          <Button
            Icon={MenuIcon}
            iconOnly
            onClick={toggleOpen}
          >
            {`${open ? 'Close' : 'Open'} Sidebar`}
          </Button>
        </Tooltip>

        {!titleHide && (
          <div className="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>
        )}

        <div className="ml-auto" />

        {icons}
      </header>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </>
  );
}
