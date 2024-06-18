import { UserIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { UserInformationModal } from './UserInformationModal';

export function SignInButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip content="Sign in">
        <Button
          active={open}
          Icon={UserIcon}
          iconOnly
          onClick={() => setOpen(true)}
        >
          Sign in
        </Button>
      </Tooltip>

      <UserInformationModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
