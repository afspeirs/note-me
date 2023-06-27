import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Card } from '../components/Card';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { drawerOpenAtom } from '../context/navigation';
import { themeAtom } from '../context/theme';

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const [theme] = useAtom(themeAtom);
  const matches = useMediaQuery('(prefers-color-scheme: dark)');
  const appTheme = useMemo(() => {
    if (theme !== 'default') return theme;
    if (matches) return 'dark';
    return 'light';
  }, [matches, theme]);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={appTheme === 'light' ? '#ee6e00' : '#000000'} />
        <body className={`${appTheme} ${appTheme === 'light' ? 'bg-primary' : 'bg-black'}`} />
      </Helmet>

      <div
        className="absolute inset-0 flex overflow-hidden mt-[env(titlebar-area-height)] bg-primary dark:bg-black"
      >
        <Topbar />
        <Transition appear={drawerOpen} show={drawerOpen}>
          <Transition.Child
            as="aside"
            unmount={false}
            enter="transition-transform duration-400"
            enterFrom="-translate-x-sidebarAdjusted"
            enterTo="translate-x-0"
            leave="transition-transform duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-sidebarAdjusted"
            className="absolute w-sidebar p-sidebarGap [@media(display-mode:window-controls-overlay)]:pt-0 h-full flex flex-col gap-1"
          >
            <Sidebar />
          </Transition.Child>
          <Transition.Child
            role="presentation"
            enter="transition-[margin-left] duration-400"
            enterFrom="ml-0"
            enterTo="ml-sidebarAdjusted"
            leave="transition-[margin-left] duration-400"
            leaveFrom="ml-sidebarAdjusted"
            leaveTo="scale-x-100"
          />
        </Transition>
        <div className="relative flex-1 px-sidebarGap pt-sidebarGap [@media(display-mode:window-controls-overlay)]:pt-0 min-w-full sm:min-w-[initial]">
          <button
            type="button"
            className="absolute inset-0 mx-sidebarGap mt-sidebarGap [@media(display-mode:window-controls-overlay)]:mt-0 disabled:hidden sm:hidden rounded-t-xl z-10"
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
