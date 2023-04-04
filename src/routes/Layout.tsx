import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useAtom } from 'jotai';

import { Sidebar } from '../components/Sidebar';
import { drawerOpen } from '../context/navigation';

export function Layout() {
  const [open, setOpen] = useAtom(drawerOpen);

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <Transition show={open}>
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
          disabled={!open}
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <span className="sr-only">Hide Sidebar</span>
        </button>
        <div className="flex flex-col h-full bg-white dark:bg-black dark:text-white rounded-t-xl overflow-y-hidden shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
