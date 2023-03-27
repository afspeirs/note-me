import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';

import { Sidebar } from '../components/Sidebar';
import { classNames } from '../utils/classNames';
import { PageHeader } from '../components/PageHeader';

export function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <Transition
        as="aside"
        show={open}
        unmount={false}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute w-80 p-2 h-full flex flex-col gap-2"
      >
        <Sidebar />
      </Transition>
      <div
        className={classNames(
          'relative flex-1 px-2 pt-2 min-w-full sm:min-w-[initial] transition-[margin-left] duration-200',
          open ? 'ml-[19.5rem]' : '',
        )}
      >
        <button
          type="button"
          className="absolute inset-0 mx-2 mt-2 disabled:hidden sm:hidden rounded-t-xl z-10"
          disabled={!open}
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <span className="sr-only">Hide Sidebar</span>
        </button>
        <main className="h-full bg-white dark:bg-black dark:text-white rounded-t-xl overflow-y-auto shadow">
          <PageHeader open={open} toggleOpen={() => setOpen((prevState) => !prevState)} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
