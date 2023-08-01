import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { supabase } from '@/api';
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
    <div className="flex m-2">
      {auth ? (
        <>
          <div className="relative flex items-center gap-x-4 p-3 min-w-0 w-full text-dark dark:text-light select-none">
            <UserIcon className="h-6 w-6" aria-hidden="true" />
            <div>
              <p>{auth?.user.email}</p>
            </div>
          </div>
          <Tooltip
            label="Sign Out"
            position="left"
          >
            <Button
              active={openSignOutConfirmation}
              Icon={ArrowRightOnRectangleIcon}
              iconOnly
              onClick={() => setOpenSignOutConfirmation(true)}
            >
              Sign out
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
        <Button
          active={open}
          Icon={UserIcon}
          onClick={() => setOpen(true)}
        >
          Sign in
        </Button>
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
    </div>
  );
}
