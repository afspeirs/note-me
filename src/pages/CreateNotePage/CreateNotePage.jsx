import { useEffect } from 'react';

import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';

const CreateNotePage = () => {
	const { isSignedIn } = useAuth();
	const { addNote } = useNotes();

	console.log(isSignedIn);

	useEffect(() => {
		if (isSignedIn) addNote();
	}, [isSignedIn]); // eslint-disable-line

	return null;
};

export default CreateNotePage;
