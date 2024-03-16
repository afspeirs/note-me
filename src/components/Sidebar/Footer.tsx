import { HomeIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

import { AuthUserInformation } from '@/components/AuthUserInformation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Tooltip } from '@/components/Tooltip';

export function Footer() {
  const minWidth = useMediaQuery('(min-width:355px)');

  return (
    <Card as="nav" aria-label="sidebar footer">
      <ul role="list" className="flex justify-between gap-2 p-2">
        <li className="min-[355px]:flex-1">
          <Tooltip content="Create Note" open={minWidth ? false : undefined}>
            <Button
              Icon={PlusIcon}
              href="/note"
              iconOnly={!minWidth}
            >
              Create Note
            </Button>
          </Tooltip>
        </li>
        <li>
          <AuthUserInformation />
        </li>
        <li className="max-sm:hidden">
          <Tooltip content="Home">
            <Button
              Icon={HomeIcon}
              iconOnly
              href="/"
            >
              Home
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="Settings">
            <Button
              Icon={SettingsIcon}
              iconOnly
              href="/settings/"
            >
              Settings
            </Button>
          </Tooltip>
        </li>
      </ul>
    </Card>
  );
}
