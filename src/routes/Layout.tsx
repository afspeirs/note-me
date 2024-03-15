import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { XIcon } from 'lucide-react';
import { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { drawerOpenAtom } from '@/context/navigation';
import { useTheme } from '@/hooks/theme';
import { classNames } from '@/utils/classNames';

export function Layout() {
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const mobile = useMediaQuery('(max-width:640px)');
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

        <Transition.Root show={mobile && drawerOpen} as={Fragment}>
          <Dialog as="div" className="relative sm:hidden" onClose={setDrawerOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-primary/70 dark:bg-black/70" />
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
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute flex justify-center top-16 left-full m-1 pt-titlebar-area-height">
                      <Button
                        className="m-2"
                        Icon={XIcon}
                        iconOnly
                        onClick={() => setDrawerOpen(false)}
                      >
                        Close sidebar
                      </Button>
                    </div>
                  </Transition.Child>

                  <div className="absolute flex flex-col w-full max-w-sidebar h-full p-sidebar-gap pb-safe-offset-sidebar-gap gap-1">
                    <div className="h-titlebar-area-height w-full" aria-hidden="true" />
                    <Sidebar name="mobile" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition appear show={drawerOpen} className="hidden sm:block">
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
            <Sidebar name="desktop" />
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
            drawerOpen && !mobile ? 'ml-0 m-sidebar-gap' : '',
          )}
        >
          <Card className="flex flex-col h-full overflow-hidden" fullscreen={!drawerOpen || mobile}>
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  );
}
