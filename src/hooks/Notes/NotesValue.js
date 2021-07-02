import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';

import { useAuth } from '@/hooks/Auth';
import { useSnackbar } from '@/hooks//Snackbar';
import { firestore } from '@/firebase';

const getTitle = (text) => {
	const title = text.split('\n')[0].replace(/#+ /g, '');
	return title.length > 0 ? title : 'Untitled';
};

const NotesValue = () => {
	const { user } = useAuth();
	const confirm = useConfirm();
	const history = useHistory();
	const snackbar = useSnackbar();
	const [labels, setLabels] = useState([]);
	const [notes, setNotes] = useState();

	const returnNoteObject = ({
		dateCreated,
		dateModified,
		favourite,
		id,
		labels: newNoteLabels,
		text,
		title,
	}) => {
		if (!id) {
			// eslint-disable-next-line no-console
			console.error(`An id needs to be provided. "${id}" is not valid`);
			return null;
		}

		const newNote = {
			dateCreated: dateCreated || +new Date(),
			dateModified: dateModified || +new Date(),
			favourite: favourite || false,
			id,
			labels: newNoteLabels || [],
			text: text || '',
			title: title || getTitle(text || ''),
		};

		return newNote;
	};

	/**
	 * Create a note based on the text provided, and navigate to the new note.
	 * If an Untitled note already exists, navigate to that note
	 * @param {string} [text] - Initial text to use for the note
	 */
	const addNote = async (text = '') => {
		const untitledNote = notes.find((note) => note.text === '');

		if (untitledNote) {
			history.push(`/note/${untitledNote.id}`);
		} else {
			const newNote = await firestore.collection(user.uid).doc();
			const value = returnNoteObject({
				id: newNote.id,
				text,
			});

			await newNote
				.set(value)
				.then(() => history.push(`/note/${value.id}`));
		}
	};

	/**
	 * Delete a note and navigate back to Home
	 * @param {object} [note]
	 */
	const deleteNote = (note) => {
		confirm({
			title: `Are you sure you want to delete "${note.title}"?`,
			confirmationText: 'Delete',
		})
			.then(async () => {
				await firestore.collection(user.uid).doc(note.id)
					.delete()
					.then(() => snackbar.showMessage({
						actionFunction: () => firestore.collection(user.uid).doc(note.id).set(note),
						actionText: 'Undo',
						message: `"${note.title}" has been deleted`,
					}));

				// TODO: Check if pathname is the /note/:id, and only if it is change the location
				history.replace('/');
			});
	};

	/**
	 * Toggle favourite on a note
	 * @param {object} [note]
	 */
	const favouriteNote = async (note) => {
		await firestore.collection(user.uid).doc(note.id)
			.update({
				favourite: !note.favourite,
			})
			.then(() => snackbar.showMessage({
				actionFunction: () => firestore.collection(user.uid).doc(note.id).set(note),
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
			// TODO: Check if the note already exists before making a new document
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
	 * @param {string} id
	 * @param {array} newLabels
	 */
	const updateLabels = async (id, newLabels) => {
		await firestore.collection(user.uid).doc(id)
			.update({
				labels: newLabels,
			});
	};

	/**
	 * Update the text on a note
	 * @param {string} id
	 * @param {string} text
	 */
	const updateNote = async (id, text) => {
		await firestore.collection(user.uid).doc(id)
			.update({
				dateModified: +new Date(),
				text,
				title: getTitle(text),
			});
	};

	/**
	 * Adds a function to the window object to show the notes
	 * @param {bool} prettyPrint - Log out a prettified version of notes to the console
	 * @returns {array} notes
	 */
	window.returnNotes = (prettyPrint = false) => {
		if (prettyPrint) console.log(JSON.stringify(notes, null, 2)); // eslint-disable-line
		return notes;
	};

	useEffect(() => {
		if (user) {
			firestore.collection(user.uid)
				.onSnapshot((snapshot) => {
					const authNotes = snapshot.docs.map((doc) => doc.data());
					const authLabels = authNotes.map((note) => note.labels).filter(Boolean).flat();
					setNotes(authNotes);
					setLabels([...new Set(authLabels)].sort());
				});
		} else if (user !== undefined) {
			setNotes([]);
			setLabels([]);
		}
	}, [user]); // eslint-disable-line

	return {
		addNote,
		deleteNote,
		favouriteNote,
		importNotes,
		labels,
		loading: notes === undefined,
		notes,
		updateLabels,
		updateNote,
	};
};

export default NotesValue;
