import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { auth, provider } from '../../firebase';

const AuthContext = createContext();

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => useContext(AuthContext);

// Provider hook that creates auth object and handles state
function useAuthProvider() {
	const [user, setUser] = useState(null);

	const signIn = () => auth
		.signInWithPopup(provider)
		.then(({ user: authUser }) => setUser(authUser));

	const signOut = () => auth
		.signOut()
		.then(() => setUser(false));

	// Subscribe to user on mount
	useEffect(() => {
		const unsubscribe = auth
			.onAuthStateChanged((authUser) => {
				if (authUser) {
					setUser(authUser);
				} else {
					setUser(false);
				}
			});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	// Return the user object and auth methods
	return {
		isSignedIn: Boolean(user),
		signIn,
		signOut,
		user,
	};
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) { // eslint-disable-line react/prop-types
	const value = useAuthProvider();
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
