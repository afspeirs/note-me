import { useEffect, useState } from 'react';

import { auth, provider } from '../../firebase';

const AuthValue = () => {
	const [user, setUser] = useState(null);

	const signIn = () => auth
		.signInWithPopup(provider)
		.then(({ user: authUser }) => setUser(authUser));

	const signOut = () => auth
		.signOut()
		.then(() => setUser(false));

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
