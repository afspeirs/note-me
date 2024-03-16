import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtomValue } from 'jotai';
import { LogOutIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { supabase } from '@/api';
import { AvatarIcon } from '@/components/AvatarIcon';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ModalConfirm } from '@/components/ModalConfirm';
import { authAtom } from '@/context/auth';
import { dbAtom } from '@/context/db';
import { UserInformationModalProps } from './types';

export function UserInformationModal({
  open,
  setOpen,
}: UserInformationModalProps) {
  const db = useAtomValue(dbAtom);
  const auth = useAtomValue(authAtom);
  const [openSignOutConfirmation, setOpenSignOutConfirmation] = useState(false);

  const signOut = async () => {
    setOpen(false);

    const { error } = await supabase.auth.signOut();
    if (error) console.error(error); // eslint-disable-line no-console

    db?.remove()
      .then(() => window.location.reload()); // TODO: Remove the need for the page reload
  };

  useEffect(() => {
    if (auth?.user) {
      setOpen(false);
    }
  }, [auth?.user, setOpen]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      theme={auth ? undefined : 'dark'}
    >
      {auth ? (
        <>
          <div className="flex justify-center">
            <AvatarIcon label={auth.user.email} size="large" />
          </div>

          <div className="relative flex items-center m-4 py-4 select-none">
            <p className="flex pl-24">
              <strong className="absolute left-0">Email:</strong>
              {auth.user.email || 'Signed in'}
            </p>
          </div>

          <Button
            active={openSignOutConfirmation}
            colour="primary"
            Icon={LogOutIcon}
            onClick={() => setOpenSignOutConfirmation(true)}
          >
            Sign out
          </Button>

          <ModalConfirm
            open={openSignOutConfirmation}
            message="Are you sure you want to sign out?"
            onClose={() => setOpenSignOutConfirmation(false)}
            onConfirm={() => {
              setOpenSignOutConfirmation(false);
              signOut();
            }}
          />
        </>
      ) : (
        <Auth
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#ee6e00',
                  brandAccent: '#ee6e00',
                },
              },
            },
          }}
          // providers={['google', 'github']}
          providers={[]}
          supabaseClient={supabase}
          theme="dark"
        />
      )}
    </Modal>
  );
}
