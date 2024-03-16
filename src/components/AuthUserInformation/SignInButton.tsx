import { UserIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { UserInformationModal } from './UserInformationModal';

export function SignInButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        active={open}
        Icon={UserIcon}
        onClick={() => setOpen(true)}
      >
        Sign in
      </Button>

      <UserInformationModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
