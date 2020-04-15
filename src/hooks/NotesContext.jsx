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
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [folders, setFolders] = useState([]);
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

			notes.unshift(value);
			newNote.set(value).then(() => history.push(`/note/${value.id}`));
		}
	};

	const deleteNote = (note = currentNote) => {
		const index = notes.indexOf(note);

		db.collection(user.uid)
			.doc(note.id)
			.delete();

		notes.splice(index, 1);
		history.replace('/');
	};

	const favouriteNote = (note = currentNote) => {
		const index = notes.indexOf(note);
		const value = {
			...note,
			favourite: !note.favourite,
		};

		db.collection(user.uid)
			.doc(note.id)
			.set(value);

		notes[index] = value;
	};

	const updateNote = (text, note = currentNote) => {
		const index = notes.indexOf(note);
		const value = {
			...note,
			date: +new Date(),
			text,
			title: getTitle(text),
		};

		db.collection(user.uid)
			.doc(note.id)
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

	// Update folder name when notes change
	useEffect(() => {
		setFolders([...new Set(notes.map((note) => note.folder))]);
	}, [notes]); // eslint-disable-line

	return {
		addNote,
		currentNote,
		deleteNote,
		favouriteNote,
		loading,
		notes,
		folders,
		setCurrentNote,
		updateNote,
	};
}

// Provider component that wraps your app and makes notes object ...
// ... available to any child component that calls useNotes().
export function NotesProvider({ children }) { // eslint-disable-line react/prop-types
	const value = useNotesProvider();
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
