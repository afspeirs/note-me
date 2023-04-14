import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';

import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { drawerOpenAtom } from '../context/navigation';
import { themeAtom } from '../context/theme';
import { classNames } from '../utils/classNames';

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const [theme] = useAtom(themeAtom);
  const appTheme = useMemo(() => {
    if (theme !== 'default') return theme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }, [theme]);

  return (
    <div
      className={classNames(
        'absolute inset-0 flex overflow-hidden mt-[env(titlebar-area-height)]',
        appTheme,
      )}
    >
      <Topbar />
      <Transition show={drawerOpen}>
        <Transition.Child
          as="aside"
          unmount={false}
          enter="transition-transform duration-400"
          enterFrom="-translate-x-[19.75rem]"
          enterTo="translate-x-0"
          leave="transition-transform duration-400"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-[19.75rem]"
          className="absolute w-80 p-1 h-full flex flex-col gap-1"
        >
          <Sidebar />
        </Transition.Child>
        <Transition.Child
          role="presentation"
          enter="transition-[margin-left] duration-400"
          enterFrom="ml-0"
          enterTo="ml-[19.75rem]"
          leave="transition-[margin-left] duration-400"
          leaveFrom="ml-[19.75rem]"
          leaveTo="scale-x-100"
        />
      </Transition>
      <div className="relative flex-1 px-1 pt-1 min-w-full sm:min-w-[initial]">
        <button
          type="button"
          className="absolute inset-0 mx-1 mt-1 disabled:hidden sm:hidden rounded-t-xl z-10"
          disabled={!drawerOpen}
          onClick={() => setDrawerOpen((prevState) => !prevState)}
        >
          <span className="sr-only">Hide Sidebar</span>
        </button>
        <div className="flex flex-col h-full bg-white dark:bg-black dark:text-white rounded-t-xl overflow-hidden shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
