import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';

import { Sidebar } from '../components/Sidebar';
import { classNames } from '../utils/classNames';

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
          'flex-1 px-2 pt-2 min-w-full sm:min-w-[initial] transition-[margin-left] duration-200',
          open ? 'ml-[19.5rem]' : '',
        )}
      >
        <main className="h-full bg-white dark:bg-black dark:text-white rounded-t-xl overflow-y-auto shadow">
          <nav className="p-4">
            <button type="button" onClick={() => setOpen((prevState) => !prevState)}>{open ? 'CLOSE' : 'OPEN'}</button>
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
