import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Prompt, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	Save as SaveIcon,
} from '@material-ui/icons';

import useStyles from './NotePage.styled';
import LinkRenderer from '../../components/LinkRenderer';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const NotePage = () => {
	const { id } = useParams();
	const { handleNoteUpdate, notes } = useNotes();
	const [localNote, setLocalNote] = useState(undefined);
	const [{ edit }, dispatch] = useStateValue();
	const classes = useStyles();
	const currentNote = notes.find((note) => note.id === id);

	useEffect(() => {
		if (currentNote) {
			setLocalNote(currentNote.text);
			dispatch({
				type: 'app-edit',
				value: currentNote.text === '',
			});
		}
	}, [currentNote]); // eslint-disable-line

	useEffect(() => {
		const compare = localNote !== undefined && !edit;

		if (compare && id && localNote !== currentNote.text) {
			handleNoteUpdate(id, localNote);
		}
	}, [edit]); // eslint-disable-line

	return (
		<>
			{edit ? (
				<textarea
					className={clsx(classes.page, classes.textarea)}
					type="text"
					value={localNote}
					onChange={(event) => setLocalNote(event.target.value)}
				/>
			) : (
				<Markdown
					className={classes.page}
					escapeHtml
					renderers={{ link: LinkRenderer }}
					source={localNote}
				/>
			)}

			{currentNote && (
				<Prompt
					when={localNote !== currentNote.text}
					message="Are you sure you want to leave without saving?"
				/>
			)}

			<Tooltip title={edit ? 'Save' : 'Edit'}>
				<Fab
					color="primary"
					aria-label={edit ? 'Save' : 'Edit'}
					className={classes.fab}
					onClick={() => dispatch({ type: 'app-edit' })}
				>
					{edit ? <SaveIcon /> : <EditIcon />}
				</Fab>
			</Tooltip>
		</>
	);
};

export default NotePage;
