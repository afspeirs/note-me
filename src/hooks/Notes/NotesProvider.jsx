import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import NotesContext from './NotesContext';
import { useAuth } from '../Auth';
import { db } from '../../firebase';
import { getTitle } from '../../utils';

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
		db.collection(user.uid).doc(note.id).delete();
		history.replace('/');
	};

	const favouriteNote = (note = currentNote) => {
		db.collection(user.uid).doc(note.id).update({
			favourite: !note.favourite,
		});
	};

	const updateLabels = (newLabels, note = currentNote) => {
		db.collection(user.uid).doc(note.id).update({
			labels: newLabels,
		});
	};

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
