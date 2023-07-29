import { Listbox } from '@headlessui/react';
import { CheckIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

import { Button } from '@/components/Button';
import { themeAtom, themeOptions } from '@/context/theme';

export function ChangeTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div className="relative m-2">
      <Listbox value={theme} onChange={setTheme}>
        {({ open }) => (
          <>
            <Listbox.Button
              active={open}
              as={Button}
              Icon={PaintBrushIcon}
            >
              <div className="flex flex-col items-start">
                <Listbox.Label className="cursor-pointer">Theme</Listbox.Label>
                <span className="text-gray-500 dark:text-gray-400">{themeOptions[theme]}</span>
              </div>
            </Listbox.Button>

            <Listbox.Options className="absolute left-0 mt-1 p-1 w-full z-10 rounded-lg bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-white shadow-lg focus-visible">
              {Object.entries(themeOptions).map(([value, label]) => (
                <Listbox.Option
                  key={value}
                  className="relative pl-10 p-2 rounded-md select-none ui-active:text-white ui-active:bg-primary"
                  value={value}
                >
                  <span className="absolute inset-y-0 left-0 items-center px-2 hidden ui-selected:flex">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span className="truncate ui-selected:font-semibold">
                    {label}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}
