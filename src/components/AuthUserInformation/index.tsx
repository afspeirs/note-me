import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { supabase } from '@/api';
import { AvatarIcon } from '@/components/AvatarIcon';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ModalConfirm } from '@/components/ModalConfirm';
import { Tooltip } from '@/components/Tooltip';
import { authAtom } from '@/context/auth';

export function AuthUserInformation() {
  const auth = useAtomValue(authAtom);
  const [open, setOpen] = useState(false);
  const [openSignOutConfirmation, setOpenSignOutConfirmation] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error); // eslint-disable-line no-console
  };

  useEffect(() => {
    if (auth?.user) {
      setOpen(false);
    }
  }, [auth?.user]);

  return (
    <>
      {auth ? (
        <>
          <Tooltip
            label="Sign out"
            position="top"
          >
            <Button
              active={openSignOutConfirmation}
              iconOnly
              onClick={() => setOpenSignOutConfirmation(true)}
            >
              <AvatarIcon name={auth.user.email} />
              <span className="sr-only">{auth.user.email || 'Signed in'}</span>
            </Button>
          </Tooltip>

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
        <Tooltip
          label="Sign in"
          position="top"
        >
          <Button
            active={open}
            iconOnly
            Icon={UserIcon}
            onClick={() => setOpen(true)}
          >
            Sign in
          </Button>
        </Tooltip>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        theme="dark"
      >
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
      </Modal>
    </>
  );
}
