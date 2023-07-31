import { WrenchIcon } from '@heroicons/react/24/outline';

export function AppVersion() {
  return (
    <div className="m-2">
      <div className="relative flex items-center gap-x-4 p-3 min-w-0 w-full text-dark dark:text-light select-none">
        <WrenchIcon className="h-6 w-6" aria-hidden="true" />
        <div>
          <p>App version</p>
          <p className="text-gray-500 dark:text-gray-400">{import.meta.env.PACKAGE_VERSION}</p>
        </div>
      </div>
    </div>
  );
}
