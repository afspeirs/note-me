import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';

const CreateNote = () => {
	const { isSignedIn } = useAuth();
	const history = useHistory();
	const { addNote } = useNotes();

	useEffect(() => {
		if (isSignedIn) {
			history.replace('/');
			addNote('');
		}
	}, [isSignedIn]);

	return null;
};

export default CreateNote;
