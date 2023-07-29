import { WrenchIcon } from '@heroicons/react/24/outline';

export function AppVersion() {
  return (
    <div className="relative flex items-center gap-x-4 p-3 m-2 w-full text-gray-700 dark:text-white select-none">
      <WrenchIcon className="h-6 w-6" aria-hidden="true" />
      <div>
        <p>App version</p>
        <p className="text-gray-500 dark:text-gray-400">{import.meta.env.PACKAGE_VERSION}</p>
      </div>
    </div>
  );
}
