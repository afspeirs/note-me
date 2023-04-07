import { Listbox } from '@headlessui/react';
import { useAtom } from 'jotai';

import { themeAtom, themeOptions } from '../../context/theme';

export function ChangeTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <li>
      <Listbox value={theme} onChange={setTheme}>
        <Listbox.Label>Theme: </Listbox.Label>
        <Listbox.Button>{themeOptions[theme]}</Listbox.Button>
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
