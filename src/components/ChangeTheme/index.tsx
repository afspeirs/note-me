import { Listbox } from '@headlessui/react';
import { PaintBrushIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

import { themeAtom, themeOptions } from '../../context/theme';
import { classNames } from '../../utils/classNames';
import { classes } from '../Button';

export function ChangeTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <li className="m-2">
      <Listbox value={theme} onChange={setTheme}>
        <Listbox.Button
          className={classNames(
            classes.base,
            classes.hover,
          )}
        >
          <PaintBrushIcon className="h-6 w-6" aria-hidden="true" />

          <div className="flex flex-col">
            <Listbox.Label className="cursor-pointer">Theme: </Listbox.Label>
            <span className="text-gray-500">{themeOptions[theme]}</span>
          </div>
        </Listbox.Button>

        <Listbox.Options className="absolute">
          {Object.entries(themeOptions).map(([value, label]) => (
            <Listbox.Option
              key={value}
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
