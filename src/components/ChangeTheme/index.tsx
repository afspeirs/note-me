import { Listbox } from '@headlessui/react';
import { CheckIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
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
            classes.baseText,
            classes.hover,
          )}
        >
          <PaintBrushIcon className="h-6 w-6" aria-hidden="true" />

          <div className="flex flex-col items-start">
            <Listbox.Label className="cursor-pointer">Theme</Listbox.Label>
            <span className="text-gray-500 dark:text-gray-400">{themeOptions[theme]}</span>
          </div>
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 dark:bg-neutral-700 text-base shadow-lg focus-visible">
          {Object.entries(themeOptions).map(([value, label]) => (
            <Listbox.Option
              key={value}
              className="relative cursor-default select-none pl-12 py-2 text-gray-900 dark:text-white ui-active:text-white ui-active:bg-primary"
              value={value}
            >
              <span className="block truncate ui-selected:font-semibold">
                {label}
              </span>

              <span className="absolute inset-y-0 left-0 items-center pl-3 hidden ui-selected:flex">
                <CheckIcon className="h-6 w-6 text-gray-900 dark:text-white ui-active:text-white" aria-hidden="true" />
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </li>
  );
}
