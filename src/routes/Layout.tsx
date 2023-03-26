import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';
import { classNames } from '../utils/classNames';

export function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <aside
        aria-hidden={!open}
        className={classNames(
          'flex flex-col mx-2 mb-2 mt-2 gap-2 min-w-80 transition-transform',
          open ? '' : '-translate-x-[21rem] sm:-translate-x-[20.5rem]',
        )}
      >
        <Sidebar />
      </aside>
      <main
        className={classNames(
          'flex-1 mt-2 min-w-full sm:min-w-[initial] bg-white dark:bg-black dark:text-white rounded-t-xl transition-[margin-left] mr-0 sm:mr-2 overflow-y-auto shadow',
          open ? 'ml-0' : '-ml-[21rem] sm:-ml-[20.5rem]',
        )}
      >
        <nav className="p-4">
          <button type="button" onClick={() => setOpen((prevState) => !prevState)}>{open ? 'CLOSE' : 'OPEN'}</button>
        </nav>
        <Outlet />
      </main>
    </div>
  );
}
