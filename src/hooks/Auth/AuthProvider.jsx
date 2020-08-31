import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import { auth, provider } from '../../firebase';

const useAuthProvider = () => {
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

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const AuthProvider = ({ children }) => {
	const value = useAuthProvider();
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = propTypes;

export default AuthProvider;
