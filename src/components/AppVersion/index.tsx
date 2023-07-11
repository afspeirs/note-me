import { WrenchIcon } from '@heroicons/react/24/outline';

export function AppVersion() {
  return (
    <li className="flex items-center gap-x-4 m-2 p-3 text-gray-700 dark:text-white select-none">
      <WrenchIcon className="h-6 w-6" aria-hidden="true" />
      <div className="flex gap-x-4">
        <div>
          <p>App version</p>
          <p className="text-gray-500 dark:text-gray-400">{import.meta.env.PACKAGE_VERSION}</p>
        </div>
      </div>
    </li>
  );
}
