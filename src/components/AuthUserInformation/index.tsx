import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { supabase } from '@/api';
import { Button } from '@/components/Button';
import { authAtom } from '@/context/auth';
import { Modal } from '../Modal';

export function AuthUserInformation() {
  const auth = useAtomValue(authAtom);
  const [open, setOpen] = useState(false);

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
    <li className="flex m-2">
      {auth ? (
        <>
          <div className="relative flex items-center gap-x-4 p-3 w-full text-gray-700 dark:text-white select-none">
            <UserIcon className="h-6 w-6" aria-hidden="true" />
            <div>
              <p>{auth?.user.email}</p>
            </div>
          </div>
          <Button
            Icon={ArrowRightOnRectangleIcon}
            iconOnly
            onClick={signOut}
          >
            Sign out
          </Button>
        </>
      ) : (
        <Button
          Icon={UserIcon}
          onClick={() => setOpen(true)}
        >
          Login
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
    </li>
  );
}
