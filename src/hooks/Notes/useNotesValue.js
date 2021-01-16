import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../Auth';
import { useSnackbar } from '../Snackbar';
import { firestore } from '../../firebase';
import { getTitle } from '../../utils';

const useNotesValue = () => {
	const { user } = useAuth();
	const history = useHistory();
	const snackbar = useSnackbar();
	const [labels, setLabels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState(null);

	const returnNoteObject = ({
		created,
		date,
		favourite,
		id,
		text,
		title,
	}) => {
		if (!id) {
			// eslint-disable-next-line no-console
			console.error(`An id needs to be provided. "${id}" is not valid`);
			return null;
		}

		const newNote = {
			created: created || +new Date(),
			date: date || +new Date(),
			favourite: favourite || false,
			id,
			text: text || '',
			title: title || getTitle(text),
		};

		return newNote;
	};

	/**
	 * Create a note based on the text provided, and navigate to the new note.
	 * If an Untitled note already exists, navigate to that note
	 * @param {string} [text] - Initial text to use for the note
	 */
	const createNote = (text = '') => {
		const untitledNote = notes.find((note) => note.text === '');

		if (untitledNote) {
			history.push({
				pathname: `/note/${untitledNote.id}`,
				state: { modal: true },
			});
		} else {
			const newNote = firestore.collection(user.uid).doc();
			const value = returnNoteObject({
				id: newNote.id,
				text,
			});

			newNote.set(value).then(() => history.push({
				pathname: `/note/${value.id}`,
				state: { modal: true },
			}));
		}
	};

	/**
	 * Delete a note and navigate back to Home
	 * @param {object} [note=currentNote]
	 */
	const deleteNote = (note = currentNote) => {
		firestore.collection(user.uid).doc(note.id)
			.delete()
			.then(() => snackbar.showMessage({
				actionFunction() {
					firestore.collection(user.uid).doc(note.id).set(note);
				},
				actionText: 'Undo',
				message: `"${note.title}" has been deleted`,
			}));

		history.replace('/');
	};

	/**
	 * Toggle favourite on a note
	 * @param {object} [note=currentNote]
	 */
	const favouriteNote = (note = currentNote) => {
		firestore.collection(user.uid).doc(note.id)
			.update({
				favourite: !note.favourite,
			})
			.then(() => snackbar.showMessage({
				actionFunction() {
					firestore.collection(user.uid).doc(note.id).set(note);
				},
				actionText: 'Undo',
				message: `"${note.title}" has been ${note.favourite ? 'removed' : 'added'} as a favourite`,
			}));
	};

	/**
	 * Creates notes from an array
	 * @param {array} [listOfNotes]
	 */
	const importNotes = (listOfNotes) => {
		const batch = firestore.batch();

		listOfNotes.forEach((note) => {
			const newNote = firestore.collection(user.uid).doc();
			const value = returnNoteObject({
				...note,
				id: newNote.id,
			});

			batch.set(newNote, value);
		});

		batch.commit().then(() => snackbar.showMessage({
			message: `${listOfNotes.length} note${listOfNotes.length === 1 ? ' has' : 's have'} been imported`,
		}));
	};

	/**
	 * Update the labels on a note
	 * @param {array} newLabels
	 * @param {object} [note=currentNote]
	 */
	const updateLabels = (newLabels, note = currentNote) => {
		firestore.collection(user.uid).doc(note.id).update({
			labels: newLabels,
		});
	};

	/**
	 * Update the text on a note
	 * @param {string} text
	 * @param {object} [note=currentNote]
	 */
	const updateNote = (text, note = currentNote) => {
		firestore.collection(user.uid).doc(note.id).update({
			date: +new Date(),
			text,
			title: getTitle(text),
		});
	};

	useEffect(() => {
		if (user) {
			firestore.collection(user.uid)
				.onSnapshot((snapshot) => {
					const authNotes = snapshot.docs.map((doc) => doc.data());
					const authLabels = authNotes.map((note) => note.labels).filter(Boolean).flat();
					setLoading(false);
					setNotes(authNotes);
					setLabels([...new Set(authLabels)].sort());
				});
		} else if (user !== null) {
			setLoading(false);
			setLabels([]);
			setNotes([]);
		}
	}, [user]); // eslint-disable-line

	return {
		createNote,
		currentNote,
		deleteNote,
		favouriteNote,
		importNotes,
		labels,
		loading,
		notes,
		setCurrentNote,
		updateLabels,
		updateNote,
	};
};

export default useNotesValue;
