import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useAtomValue } from 'jotai';
import { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Card } from '@/components/Card';
import { Sidebar } from '@/components/Sidebar';
import { SidebarNotes } from '@/components/SidebarNotes';
import { TopBar } from '@/components/TopBar';
import { atomCurrentFolder } from '@/context/folders';
import { atomDrawerOpen, mobileWidth, atomUseMobileDrawer } from '@/context/navigation';
import { useTheme } from '@/hooks/theme';
import { classNames } from '@/utils/classNames';

export function Layout() {
  const { pathname, search } = useLocation();
  const [currentFolder, setCurrentFolder] = useAtom(atomCurrentFolder);
  const [drawerOpen, setDrawerOpen] = useAtom(atomDrawerOpen);
  const useMobileDrawer = useAtomValue(atomUseMobileDrawer);
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);
  const theme = useTheme();

  /**
   * Close the Drawer if using the mobile nav.
   * Deliberately not run the code when mobile or useMobileDrawer updates
  */
  useEffect(() => {
    if (isMobile || useMobileDrawer) setDrawerOpen(false);
  }, [pathname, search, setDrawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme === 'light' ? '#ee6e00' : '#000000'} />
        <body className={`${theme} ${theme === 'light' ? 'bg-primary' : 'bg-black'}`} />
      </Helmet>

      <div className="fixed inset-0 px-safe flex gap-sidebar-gap overflow-hidden mt-titlebar-area-height bg-primary dark:bg-black">
        <TopBar />

        <Transition.Root show={(isMobile || useMobileDrawer) && drawerOpen} as={Fragment}>
          <Dialog className="relative" onClose={setDrawerOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-in-out duration-400"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out duration-400"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-400 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-400 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-wrap gap-sidebar-gap [@media(display-mode:window-controls-overlay)]:mt-titlebar-area-height">
                  <div className="relative flex flex-col w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap">
                    <Sidebar />
                  </div>

                  <Transition.Root
                    className="contents"
                    show={(isMobile || useMobileDrawer) && drawerOpen && currentFolder !== null}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-in-out duration-400"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-in-out duration-400"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <button
                        type="button"
                        className="sm:hidden fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm"
                        onClick={() => setCurrentFolder(null)}
                      >
                        <span className="sr-only">Close Secondary Panel</span>
                      </button>
                    </Transition.Child>
                    <Transition.Child
                      unmount={false}
                      enter="transition-[margin-left,opacity] ease-in-out duration-400"
                      enterFrom="-ml-sidebar opacity-0"
                      enterTo="ml-0 opacity-100"
                      leave="transition-[margin-left,opacity] ease-in-out duration-400"
                      leaveFrom="ml-0 opacity-100"
                      leaveTo="-ml-sidebar opacity-0"
                      className="flex flex-col relative top-0 w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap max-sm:absolute max-sm:left-[calc(100vw-theme(spacing[sidebar]))]"
                    >
                      <SidebarNotes />
                    </Transition.Child>
                  </Transition.Root>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition
          appear
          show={(!useMobileDrawer && !isMobile) && drawerOpen}
          as="aside"
          unmount={false}
          enter="transition-[margin-left,opacity] ease-in-out duration-400"
          enterFrom="-ml-sidebar opacity-0"
          enterTo="ml-0 opacity-100"
          leave="transition-[margin-left,opacity] ease-in-out duration-400"
          leaveFrom="ml-0 opacity-100"
          leaveTo="-ml-sidebar opacity-0"
          className="relative flex flex-col w-sidebar h-full pl-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap"
        >
          <Sidebar />
        </Transition>

        <Transition
          show={(!useMobileDrawer && !isMobile) && drawerOpen && currentFolder !== null}
          as="aside"
          unmount={false}
          enter="transition-[margin-left,opacity] ease-in-out duration-400"
          enterFrom="-ml-sidebar opacity-0"
          enterTo="ml-0 opacity-100"
          leave="transition-[margin-left,opacity] ease-in-out duration-400"
          leaveFrom="ml-0 opacity-100"
          leaveTo="-ml-sidebar opacity-0"
          className="relative flex flex-col w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap"
        >
          <SidebarNotes />
        </Transition>

        <div
          className={classNames(
            'relative flex-1 min-w-full sm:min-w-[initial] transition-[margin] duration-400',
            drawerOpen && (!isMobile && !useMobileDrawer) ? 'ml-0 m-sidebar-gap' : '',
          )}
        >
          <Card className="flex flex-col h-full overflow-hidden" fullscreen={!drawerOpen || isMobile || useMobileDrawer}>
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  );
}
