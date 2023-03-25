import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';

export function Layout() {
  return (
    <div className="absolute inset-0 flex box-border">
      <aside className="flex flex-col ml-2 mb-2 mt-2 gap-2 w-80">
        <Sidebar />
      </aside>
      <main className="flex-1 mx-2 mt-2 bg-white dark:bg-black dark:text-white rounded-t-xl">
        <Outlet />
      </main>
    </div>
  );
}
