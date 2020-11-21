import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import NotesContext from './NotesContext';
import { useAuth } from '../Auth';
import { useSnackbar } from '../Snackbar';
import { db } from '../../firebase';
import { getTitle } from '../../utils';

function useNotesProvider() {
	const { user } = useAuth();
	const history = useHistory();
	const snackbar = useSnackbar();
	const [labels, setLabels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState(null);

	/**
	 * Create a note based on the text provided, and navigate to the new note.
	 * If an Untitled note already exists, navigate to that note
	 * @param {string} [text] - Initial text to use for the note
	 */
	const addNote = (text = '') => {
		const untitledNote = notes.find((note) => note.text === '');

		if (untitledNote) {
			history.push({
				pathname: `/note/${untitledNote.id}`,
				state: { modal: true },
			});
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
		db.collection(user.uid).doc(note.id).delete();
		history.replace('/');

		snackbar.showMessage({
			message: `"${note.title}" has been deleted`,
			actionText: 'Undo',
			actionFunction() {
				db.collection(user.uid).doc(note.id).set(note);
			},
		});
	};

	/**
	 * Toggle favourite on a note
	 * @param {object} [note=currentNote]
	 */
	const favouriteNote = (note = currentNote) => {
		db.collection(user.uid).doc(note.id).update({
			favourite: !note.favourite,
		});
	};

	/**
	 * Update the labels on a note
	 * @param {array} newLabels
	 * @param {object} [note=currentNote]
	 */
	const updateLabels = (newLabels, note = currentNote) => {
		db.collection(user.uid).doc(note.id).update({
			labels: newLabels,
		});
	};

	/**
	 * Update the text on a note
	 * @param {string} text
	 * @param {object} [note=currentNote]
	 */
	const updateNote = (text, note = currentNote) => {
		db.collection(user.uid).doc(note.id).update({
			date: +new Date(),
			text,
			title: getTitle(text),
		});
	};

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

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const NotesProvider = ({ children }) => {
	const value = useNotesProvider();
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

NotesProvider.propTypes = propTypes;

export default NotesProvider;
