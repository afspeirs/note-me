import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';

const CreateNotePage = () => {
	const { isSignedIn } = useAuth();
	const history = useHistory();
	const { createNote } = useNotes();

	useEffect(() => {
		if (isSignedIn) {
			history.replace('/');
			createNote('');
		}
	}, [isSignedIn]); // eslint-disable-line

	return null;
};

export default CreateNotePage;
