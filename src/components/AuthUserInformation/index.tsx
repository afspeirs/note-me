import { UserIcon } from '@heroicons/react/24/solid';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { supabase } from '@/api/supabase';
import { Button } from '@/components/Button';
import { authAtom } from '@/context/auth';
import { Modal } from '../Modal';

export function AuthUserInformation() {
  const auth = useAtomValue(authAtom);
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.error(error);
  }

  useEffect(() => {
    if (auth?.user) {
      setOpen(false);
    }
  }, [auth?.user]);

  return (
    <li className="m-2">
      {auth ? (
        <Button
          Icon={UserIcon}
          onClick={signOut}
        >
          Sign out
        </Button>
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
