import { Listbox, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { CheckIcon, PaletteIcon } from 'lucide-react';
import { Fragment } from 'react';

import { Button } from '@/components/Button';
import { atomTheme, themeOptions } from '@/context/theme';

export function ChangeTheme() {
  const [theme, setTheme] = useAtom(atomTheme);

  return (
    <div className="relative m-card-gap">
      <Listbox value={theme} onChange={setTheme}>
        {({ open }) => (
          <>
            <Listbox.Button
              active={open}
              as={Button}
              Icon={PaletteIcon}
            >
              <div className="flex flex-col items-start">
                <Listbox.Label className="cursor-pointer">Theme</Listbox.Label>
                <span className="text-gray-500 dark:text-gray-400">{themeOptions[theme]}</span>
              </div>
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute left-0 mt-1 p-1 w-full z-10 rounded-lg bg-gray-200 dark:bg-neutral-700 text-dark dark:text-light shadow-lg focus-visible">
                {Object.entries(themeOptions).map(([value, label]) => (
                  <Listbox.Option
                    key={value}
                    className="relative pl-10 p-2 rounded-md select-none ui-active:text-light ui-active:bg-primary"
                    value={value}
                  >
                    <span className="absolute inset-y-0 left-0 items-center px-2 hidden ui-selected:flex">
                      <CheckIcon className="size-5" aria-hidden="true" />
                    </span>

                    <span className="truncate ui-selected:font-semibold">
                      {label}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
