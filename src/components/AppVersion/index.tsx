import { WrenchIcon } from 'lucide-react';

import { style } from '@/components/Button';
import { classNames } from '@/utils/classNames';

export function AppVersion() {
  return (
    <div className="m-card-gap">
      <div className={classNames(style.withText, 'relative p-3 text-dark dark:text-light select-none')}>
        <WrenchIcon className="size-6" aria-hidden="true" />
        <div>
          <p>App version</p>
          <p className="text-gray-500 dark:text-gray-400">{import.meta.env.APP_VERSION}</p>
        </div>
      </div>
    </div>
  );
}
