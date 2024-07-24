import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useAtomValue } from 'jotai';
import { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Card } from '@/components/Card';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { drawerOpenAtom, useMobileDrawerAtom } from '@/context/navigation';
import { useTheme } from '@/hooks/theme';
import { classNames } from '@/utils/classNames';

export function Layout() {
  const { pathname, search } = useLocation();
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const useMobileDrawer = useAtomValue(useMobileDrawerAtom);
  const mobile = useMediaQuery('(max-width:640px)');
  const theme = useTheme();

  /**
   * Close the Drawer if using the mobile nav.
   * Deliberately not run the code when mobile or useMobileDrawer updates
  */
  useEffect(() => {
    if (mobile || useMobileDrawer) setDrawerOpen(false);
  }, [pathname, search, setDrawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme === 'light' ? '#ee6e00' : '#000000'} />
        <body className={`${theme} ${theme === 'light' ? 'bg-primary' : 'bg-black'}`} />
      </Helmet>

      <div className="fixed inset-0 px-safe flex overflow-hidden mt-titlebar-area-height bg-primary dark:bg-black">
        <TopBar />

        <Transition.Root show={(mobile || useMobileDrawer) && drawerOpen} as={Fragment}>
          <Dialog as="div" className="relative" onClose={setDrawerOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-sidebar flex-1">
                  <div className="absolute flex flex-col w-full max-w-sidebar h-full p-sidebar-gap pb-safe-offset-sidebar-gap gap-1">
                    <div className="hidden [@media(display-mode:window-controls-overlay)]:block -mt-sidebar-gap h-titlebar-area-height w-full" aria-hidden="true" />
                    <Sidebar />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition appear show={(!useMobileDrawer && !mobile) && drawerOpen}>
          <Transition.Child
            as="aside"
            unmount={false}
            enter="transition-transform duration-400"
            enterFrom="-translate-x-sidebar"
            enterTo="translate-x-0"
            leave="transition-transform duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-sidebar"
            className="absolute flex flex-col w-sidebar h-full p-sidebar-gap pb-safe-offset-sidebar-gap gap-1"
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
            'relative flex-1 min-w-full sm:min-w-[initial] transition-[margin] duration-400',
            drawerOpen && (!mobile && !useMobileDrawer) ? 'ml-0 m-sidebar-gap' : '',
          )}
        >
          <Card className="flex flex-col h-full overflow-hidden" fullscreen={!drawerOpen || mobile || useMobileDrawer}>
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  );
}
