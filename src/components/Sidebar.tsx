import { NavLink } from 'react-router-dom';

import { classNames } from '../utils/classNames';

export function Sidebar() {
  return (
    <>
      <div className="bg-white dark:bg-black dark:text-white p-4 rounded-xl shadow">
        ICONS
      </div>
      <div className="flex-1 bg-white dark:bg-black dark:text-white rounded-xl overflow-hidden shadow">
        <NavLink
          className={({ isActive }) => classNames(
            'block px-4 py-2',
            isActive ? 'bg-gray-400 bg-opacity-30' : '',
          )}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => classNames(
            'block px-4 py-2',
            isActive ? 'bg-gray-400 bg-opacity-30' : '',
          )}
          to="/note/"
        >
          Note
        </NavLink>
      </div>
    </>
  );
}
