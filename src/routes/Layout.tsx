import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';
import { classNames } from '../utils/classNames';

export function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <aside className="absolute flex flex-col mx-2 mb-2 mt-2 gap-2 w-80 -z-10">
        <Sidebar />
      </aside>
      <div
        className={classNames(
          'pointer-events-none transition-[margin-left,margin-right,min-width]',
          open ? 'min-w-80 mx-2' : 'min-w-0 mx-1',
        )}
      />
      <main
        className={classNames(
          'flex-1 mt-2 min-w-full sm:min-w-[initial] bg-white dark:bg-black dark:text-white rounded-t-xl',
          open ? 'mr-0 sm:mr-2' : 'mx-0 sm:mr-2',
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
