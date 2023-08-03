import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Card } from '@/components/Card';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { drawerOpenAtom } from '@/context/navigation';
import { themeAtom } from '@/context/theme';
import { classNames } from '@/utils/classNames';

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

      <div className="absolute inset-0 flex overflow-hidden mt-[env(titlebar-area-height)] bg-primary dark:bg-black">
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
            className="absolute w-sidebar p-sidebarGap [@media(display-mode:window-controls-overlay)]:pt-0 h-full flex flex-col gap-1"
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
            'relative flex-1 pt-sidebarGap [@media(display-mode:window-controls-overlay)]:pt-0 min-w-full sm:min-w-[initial] transition-[margin-right] duration-400',
            drawerOpen ? 'mr-sidebarGap' : '',
          )}
        >
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
