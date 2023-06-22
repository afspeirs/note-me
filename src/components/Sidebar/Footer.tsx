import {
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import { Button } from '../Button';

export function Footer() {
  return (
    <nav aria-label="sidebar footer">
      <ul role="list" className="flex flex-col gap-1 p-2">
        <li>
          <Button
            IconStart={PlusIcon}
            label="Create Note"
            to="/note"
          />
        </li>
        <li>
          <Button
            IconStart={HomeIcon}
            label="Home"
            to="/"
          />
        </li>
        <li>
          <Button
            label="Settings"
            IconStart={Cog6ToothIcon}
            to="/settings/"
          />
        </li>
      </ul>
    </nav>
  );
}
