import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { getTitle } from '../ultils';

const NotesContext = createContext();

// Hook for child components to get the notes object and re-render when it changes.
export const useNotes = () => useContext(NotesContext);

// Provider hook that creates notes object and handles state
function useNotesProvider() {
	const { user } = useAuth();
	const history = useHistory();
	const [labels, setLabels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState(null);

	const addNote = (text = '') => {
		const untitledNotes = notes.filter((note) => note.text === '');

		if (untitledNotes.length !== 0) {
			history.push(`/note/${untitledNotes[0].id}`);
		} else {
			const newNote = db.collection(user.uid).doc();
			const value = {
				created: +new Date(),
				date: +new Date(),
				favourite: false,
				id: newNote.id,
				text,
				title: getTitle(text),
			};

			newNote.set(value).then(() => history.push(`/note/${value.id}`));
		}
	};

	const deleteNote = (note = currentNote) => {
		db.collection(user.uid)
			.doc(note.id)
			.delete();

		history.replace('/');
	};

	const favouriteNote = (note = currentNote) => {
		const value = {
			...note,
			favourite: !note.favourite,
		};

		db.collection(user.uid)
			.doc(note.id)
			.set(value);
	};

	const updateLabels = (newLabels, note = currentNote) => {
		const value = {
			...note,
			labels: newLabels,
		};

		db.collection(user.uid)
			.doc(note.id)
			.set(value);
	};

	const updateNote = (text, note = currentNote) => {
		const value = {
			...note,
			date: +new Date(),
			text,
			title: getTitle(text),
		};

		db.collection(user.uid)
			.doc(note.id)
			.set(value);
	};

	// Subscribe to user on mount
	useEffect(() => {
		if (user) {
			db.collection(user.uid)
				.onSnapshot((snapshot) => {
					const authNotes = snapshot.docs.map((doc) => doc.data());
					const authLabels = authNotes.map((note) => note.labels).filter(Boolean).flat();
					setLoading(false);
					setNotes(authNotes);
					setLabels([...new Set(authLabels)].sort());
				});
		} else if (user !== null) {
			setLoading(false);
			setNotes([]);
		}
	}, [user]); // eslint-disable-line

	return {
		addNote,
		currentNote,
		deleteNote,
		favouriteNote,
		labels,
		loading,
		notes,
		setCurrentNote,
		updateNote,
		updateLabels,
	};
}

// Provider component that wraps your app and makes notes object ...
// ... available to any child component that calls useNotes().
export function NotesProvider({ children }) { // eslint-disable-line react/prop-types
	const value = useNotesProvider();
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
