import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { db } from '../firebase';
import { useAuth } from './AuthContext';

const NotesContext = createContext();

// Hook for child components to get the notes object and re-render when it changes.
export const useNotes = () => useContext(NotesContext);

// Provider hook that creates notes object and handles state
function useNotesProvider() {
	const { user } = useAuth();
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);

	const handleNoteAdd = () => {
		const emptyNotes = notes.filter((note) => note.text === '');

		if (emptyNotes.length !== 0) {
			history.push(`/note/${emptyNotes[0].id}`);
		} else {
			const newNote = db.collection(user.uid).doc();
			const value = {
				text: '',
				date: +new Date(),
				id: newNote.id,
				created: +new Date(),
			};

			notes.unshift(value);
			newNote.set(value).then(() => history.push(`/note/${value.id}`));
		}
	};

	const handleNoteDelete = (id) => {
		const note = notes.find((item) => item.id === id);

		db.collection(user.uid)
			.doc(id)
			.delete();

		if (note) {
			const indexOfNote = notes.indexOf(note);
			notes.splice(indexOfNote, 1);
			history.replace('/');
		}
	};

	const handleNoteUpdate = (id, text) => {
		const index = notes.findIndex((note) => note.id === id);
		const value = {
			...notes[index],
			text,
			date: +new Date(),
		};

		db.collection(user.uid)
			.doc(id)
			.set(value);

		notes[index] = value;
	};

	// Subscribe to user on mount
	useEffect(() => {
		if (user) {
			db.collection(user.uid)
				.onSnapshot((snapshot) => {
					const authNotes = snapshot.docs.map((doc) => doc.data());
					setLoading(false);
					setNotes(authNotes);
				});
		} else if (user !== null) {
			setLoading(false);
			setNotes([]);
		}
	}, [user]); // eslint-disable-line

	// Return the user object and notes methods
	return {
		handleNoteAdd,
		handleNoteDelete,
		handleNoteUpdate,
		loading,
		notes,
	};
}

// Provider component that wraps your app and makes notes object ...
// ... available to any child component that calls useNotes().
export function NotesProvider({ children }) { // eslint-disable-line react/prop-types
	const value = useNotesProvider();
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
