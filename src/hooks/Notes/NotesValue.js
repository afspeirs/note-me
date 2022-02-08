import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	deleteField,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
	writeBatch,
} from 'firebase/firestore';
import { useConfirm } from 'material-ui-confirm';

import { useAuth } from '@/hooks/Auth';
import { useSnackbar } from '@/hooks/Snackbar';
import { db } from '@/firebase';

const getTitle = (text) => {
	const title = text.split('\n')[0].replace(/#+ /g, '');
	return title.length > 0 ? title : 'Untitled';
};

const NotesValue = () => {
	const { user } = useAuth();
	const confirm = useConfirm();
	const history = useHistory();
	const location = useLocation();
	const snackbar = useSnackbar();
	const [notes, setNotes] = useState();
	const [loading, setLoading] = useState(true);

	const returnFolderObject = ({
		favourite,
		notes: folderNotes,
		title,
	}) => ({
		favourite: favourite || false,
		isFolder: true,
		notes: folderNotes,
		title,
	});

	const returnNoteObject = ({
		dateCreated,
		dateModified,
		favourite,
		inFolder,
		text,
		title,
	}) => ({
		dateCreated: dateCreated || +new Date(),
		dateModified: dateModified || +new Date(),
		favourite: favourite || false,
		...(inFolder) && { inFolder },
		text: text || '',
		title: title || getTitle(text || ''),
	});

	/**
	 * Create a note based on the text provided, and navigate to the new note.
	 * If an Untitled note already exists, navigate to that note
	 * @param {string} [text] - Initial text to use for the note
	 */
	const createNote = async (text = '', replace = false) => {
		const untitledNote = notes.find((note) => note.text === '');

		if (untitledNote) {
			const path = `/note/${untitledNote.id}`;

			if (replace) {
				history.replace(path);
			} else {
				history.push(path);
			}
		} else {
			const noteRef = await doc(collection(db, user.uid));
			const value = returnNoteObject({
				text,
			});

			await setDoc(noteRef, value)
				.then(() => {
					const path = `/note/${noteRef.id}`;

					if (replace) {
						history.replace(path);
					} else {
						history.push(path);
					}
				});
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
				const noteRef = doc(db, user.uid, note.id);

				await deleteDoc(noteRef)
					.then(() => snackbar.showMessage({
						actionFunction: () => setDoc(noteRef, note),
						actionText: 'Undo',
						message: `"${note.title}" has been deleted`,
					}));

				// Change the location only if you are the current note that is being deleted
				if (location.pathname.includes(note.id)) {
					history.replace('/');
				}
			});
	};

	/**
	 * Toggle favourite on a note
	 * @param {object} [note]
	 */
	const favouriteNote = async (note) => {
		const noteRef = doc(db, user.uid, note.id);

		await updateDoc(noteRef, {
			favourite: !note.favourite,
		})
			.then(() => snackbar.showMessage({
				actionFunction: () => setDoc(noteRef, note),
				actionText: 'Undo',
				message: `"${note.title}" has been ${note.favourite ? 'removed' : 'added'} as a favourite`,
			}));
	};

	/**
	 * Creates notes from an array
	 * @param {array} [listOfNotes]
	 */
	const importNotes = async (listOfNotes) => {
		const batch = writeBatch(db);

		listOfNotes.forEach((note) => {
			// TODO: Check if the note already exists before making a new document
			const noteRef = doc(db, user.uid, note.id);

			if (note.isFolder) {
				const value = returnFolderObject(note);

				batch.set(noteRef, value);
			} else {
				const value = returnNoteObject(note);

				batch.set(noteRef, value);
			}
		});

		await batch.commit().then(() => snackbar.showMessage({
			message: `${listOfNotes.length} note${listOfNotes.length === 1 ? ' has' : 's have'} been imported`,
		}));
	};

	/**
	 * Moves Note to a folder if one is provided, otherwise it removes the folder
	 * @param {object} note
	 * @param {object} [folder]
	 */
	const moveNote = async (note, folder) => {
		const batch = writeBatch(db);
		let folderRef;

		// If we pass a title for a folder but no id, make a new folder
		if (folder?.title && !folder?.id) {
			// A folder with just a title has been included as a parameter
			folderRef = await doc(collection(db, user.uid));

			const folderValue = {
				...folder,
				isFolder: true,
				notes: [
					note.id,
				],
			};

			batch.set(folderRef, folderValue);
		} else if (folder) {
			// A folder has been included as a parameter
			folderRef = doc(db, user.uid, folder.id);
			const folderValue = {
				notes: arrayUnion(note.id),
			};

			batch.update(folderRef, folderValue);
		}

		if (note) {
			const noteRef = doc(db, user.uid, note.id);
			const previousFolderRef = note.inFolder && doc(db, user.uid, note.inFolder);

			const noteValue = {
				inFolder: folderRef?.id || deleteField(),
			};
			const previousFolderValue = {
				notes: arrayRemove(note.id),
			};

			batch.update(noteRef, noteValue);
			if (previousFolderRef) {
				batch.update(previousFolderRef, previousFolderValue);
			}
		}

		await batch.commit().then(() => snackbar.showMessage({
			message: `"${note.title}" has been moved to "${folder?.title}"`,
		}));
	};

	/**
	 * Update the text on a note
	 * @param {string} id
	 * @param {string} text
	 */
	const updateNote = async (id, text) => {
		const noteRef = doc(db, user.uid, id);

		await updateDoc(noteRef, {
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
		let unSubscribe;
		if (user) {
			unSubscribe = onSnapshot(collection(db, user.uid), (snapshot) => {
				const authNotes = snapshot.docs.map((document) => ({
					...document.data(),
					id: document.id,
				}));

				setNotes(authNotes);
				setLoading(false);
			});
		} else {
			setNotes([]);
			setLoading(false);
		}
		return unSubscribe;
	}, [user]);

	return {
		createNote,
		deleteNote,
		favouriteNote,
		importNotes,
		loading,
		moveNote,
		notes,
		updateNote,
	};
};

export default NotesValue;
