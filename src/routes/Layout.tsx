import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Card } from '@/components/Card';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { drawerOpenAtom } from '@/context/navigation';
import { classNames } from '@/utils/classNames';
import { useTheme } from '@/hooks/theme';

export function Layout() {
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const mobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  useEffect(() => {
    if (mobile && pathname !== '/') setDrawerOpen(false);
  }, [pathname, mobile, setDrawerOpen]);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme === 'light' ? '#ee6e00' : '#000000'} />
        <body className={`${theme} ${theme === 'light' ? 'bg-primary' : 'bg-black'}`} />
      </Helmet>

      <div className="fixed inset-0 px-safe flex overflow-hidden mt-titlebar-area-height bg-primary dark:bg-black">
        <TopBar />
        <Transition appear show={drawerOpen}>
          <Transition.Child
            as="aside"
            unmount={false}
            enter="transition-transform duration-400"
            enterFrom="-translate-x-sidebar"
            enterTo="translate-x-0"
            leave="transition-transform duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-sidebar"
            className="absolute w-sidebar p-sidebar-gap pb-safe-offset-sidebar-gap h-full flex flex-col gap-1"
          >
            <Sidebar />
          </Transition.Child>
          <Transition.Child
            role="presentation"
            enter="transition-[margin-left] duration-400"
            enterFrom="ml-0"
            enterTo="ml-sidebar"
            leave="transition-[margin-left] duration-400"
            leaveFrom="ml-sidebar"
            leaveTo="scale-x-100"
          />
        </Transition>
        <div
          className={classNames(
            'relative flex-1 pt-sidebar-gap min-w-full sm:min-w-[initial] transition-[margin-right] duration-400',
            drawerOpen ? 'mr-sidebar-gap' : '',
          )}
        >
          <button
            type="button"
            className="absolute inset-0 mx-sidebar-gap mt-sidebar-gap [@media(display-mode:window-controls-overlay)]:mt-0 disabled:hidden sm:hidden rounded-t-xl z-10"
            disabled={!drawerOpen}
            onClick={() => setDrawerOpen((prevState) => !prevState)}
          >
            <span className="sr-only">Hide Sidebar</span>
          </button>
          <Card className="flex flex-col h-full" roundedTop>
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  );
}
