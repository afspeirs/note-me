import { useEffect } from 'react';

import { useAuth } from '../hooks/AuthContext';
import { useNotes } from '../hooks/NotesContext';

const NotePage = () => {
	const { isSignedIn } = useAuth();
	const { addNote } = useNotes();

	useEffect(() => {
		if (isSignedIn) addNote();
	}, [isSignedIn]); // eslint-disable-line

	return null;
};

export default NotePage;
