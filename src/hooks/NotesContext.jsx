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
			const docRef = db.collection('notes').doc();
			const newDoc = {
				created: +new Date(),
				date: +new Date(),
				favourite: false,
				id: docRef.id,
				text,
				title: getTitle(text),
				users: [
					user.uid,
				],
			};

			docRef.set(newDoc).then(() => history.push(`/note/${newDoc.id}`));
		}
	};

	const deleteNote = (note = currentNote) => {
		db.collection('notes').doc(note.id).delete();
		history.replace('/');
	};

	const favouriteNote = (note = currentNote) => {
		db.collection('notes').doc(note.id).update({
			favourite: !note.favourite,
		});
	};

	const updateLabels = (newLabels, note = currentNote) => {
		db.collection('notes').doc(note.id).update({
			labels: newLabels,
		});
	};

	const updateNote = (text, note = currentNote) => {
		db.collection('notes').doc(note.id).update({
			date: +new Date(),
			text,
			title: getTitle(text),
		});
	};

	const updateDatabase = () => {
		if (user) {
			db.collection(user.uid).get()
				.then((collection) => {
					if (!collection.empty) {
						const collectionArray = collection.docs.map((doc) => doc.data());

						const batch = db.batch();
						collectionArray.forEach((doc) => {
							const docRef = db.collection('notes').doc();
							const newDoc = {
								...doc,
								id: docRef.id,
								users: [
									user.uid,
								],
							};

							batch.set(docRef, newDoc);
						});
						batch.commit();

						return 'success';
					}
					return 'no notes';
				}).catch((error) => {
					console.log('ERROR:', error); // eslint-disable-line no-console
				});
		}
	};

	// Subscribe to user on mount
	useEffect(() => {
		if (user) {
			db.collection('notes')
				.where('users', 'array-contains', user.uid)
				.onSnapshot((snapshot) => {
					const authNotes = snapshot.docs.map((doc) => doc.data());
					const authLabels = authNotes.map((note) => note.labels).filter(Boolean).flat();
					setLoading(false);
					setNotes(authNotes);
					setLabels([...new Set(authLabels)].sort());
				});

			// db.collection('users').doc(user.uid)
			// 	.onSnapshot((doc) => {
			// 		const authSettings = doc.data();
			// 		console.log(authSettings);
			// 	});
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
		updateDatabase,
		updateLabels,
		updateNote,
	};
}

// Provider component that wraps your app and makes notes object ...
// ... available to any child component that calls useNotes().
export function NotesProvider({ children }) { // eslint-disable-line react/prop-types
	const value = useNotesProvider();
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
