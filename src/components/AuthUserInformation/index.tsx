import { useAtomValue } from 'jotai';
import { UserIcon } from 'lucide-react';
import { useState } from 'react';

import { AvatarIcon } from '@/components/AvatarIcon';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { authAtom } from '@/context/auth';
import { UserInformationModal } from './UserInformationModal';

export function AuthUserInformation() {
  const auth = useAtomValue(authAtom);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip content={auth ? 'View account' : 'Sign in'}>
        <Button
          active={open}
          iconOnly
          Icon={auth ? undefined : UserIcon}
          onClick={() => setOpen(true)}
        >
          {auth ? (
            <>
              <AvatarIcon label={auth.user.email} size="icon" />
              <span className="sr-only">View account</span>
            </>
          ) : 'Sign in'}
        </Button>
      </Tooltip>

      <UserInformationModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
