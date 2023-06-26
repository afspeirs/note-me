import { Listbox } from '@headlessui/react';
import { PaintBrushIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

import { themeAtom, themeOptions } from '../../context/theme';
import { classNames } from '../../utils/classNames';
import { classes } from '../Button';

export function ChangeTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <li className="relative m-2">
      <Listbox value={theme} onChange={setTheme}>
        <Listbox.Button
          className={classNames(
            classes.base,
            classes.hover,
          )}
        >
          <PaintBrushIcon className="h-6 w-6" aria-hidden="true" />

          <div className="flex flex-col items-start">
            <Listbox.Label className="cursor-pointer">Theme</Listbox.Label>
            <span className="text-gray-500 dark:text-gray-400">{themeOptions[theme]}</span>
          </div>
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 ml-1 max-h-60 overflow-auto rounded-md bg-gray-200 dark:bg-neutral-700 text-base shadow-lg">
          {Object.entries(themeOptions).map(([value, label]) => (
            <Listbox.Option
              key={value}
              className={({ active }) => classNames(
                'relative cursor-default select-none pl-4 pr-8 py-2',
                active ? 'bg-primary text-white' : 'text-gray-900 dark:text-white',
              )}
              value={value}
            >
              {label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </li>
  );
}
