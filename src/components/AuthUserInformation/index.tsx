import { useAtomValue } from 'jotai';
import { UserIcon } from 'lucide-react';
import { useState } from 'react';

import { AvatarIcon } from '@/components/AvatarIcon';
import { Button } from '@/components/Button';
import { atomAuth } from '@/context/auth';
import { UserInformationModal } from './UserInformationModal';

export function AuthUserInformation() {
  const auth = useAtomValue(atomAuth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        active={open}
        Icon={auth ? undefined : UserIcon}
        onClick={() => setOpen(true)}
      >
        {auth ? (
          <div className="flex gap-3">
            <AvatarIcon label={auth.user.email} size="icon" />
            <span>View account</span>
          </div>
        ) : 'Sign in'}
      </Button>

      <UserInformationModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
