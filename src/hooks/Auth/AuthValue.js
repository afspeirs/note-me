import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '@/firebase';

const AuthValue = () => {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();

  const signIn = () => signInWithPopup(auth, provider)
    .catch((error) => console.error(error)); // eslint-disable-line no-console

  const signOut = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(false);
        }
      });

    return () => unsubscribe();
  }, []);

  return {
    isSignedIn: Boolean(user),
    signIn,
    signOut,
    user,
  };
};

export default AuthValue;
