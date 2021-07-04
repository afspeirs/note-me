import { useEffect } from 'react';

import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';

const CreateNote = () => {
	const { isSignedIn } = useAuth();
	const { createNote, loading } = useNotes();

	useEffect(() => {
		if (!loading && isSignedIn) {
			createNote('', true);
		}
	}, [isSignedIn, loading]);

	return null;
};

export default CreateNote;
