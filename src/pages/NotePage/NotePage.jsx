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
	const { notes, setCurrentNote, updateNote } = useNotes();
	const [localNote, setLocalNote] = useState(undefined);
	const [selection, setSelection] = useState(null);
	const [{ edit }, dispatch] = useStateValue();
	const classes = useStyles();
	const currentNote = notes.find((note) => note.id === id);

	const splitAt = (index) => [localNote.slice(0, index), localNote.slice(index)];

	const formatSelection = (format) => {
		let array = [];

		if (selection?.end !== selection?.start) {
			// Insert the format around the cursor selection
			const string = localNote.substring(selection.start, selection.end);
			array = localNote.split(string);
			// console.log(string);
			array.splice(1, 0, format);
			array.splice(2, 0, string);
			array.splice(3, 0, format);
		} else {
			// Insert the format at the cursor position
			array = splitAt(selection.start);
			array.splice(1, 0, format);
			array.splice(2, 0, format);
		}

		return array.join('');
	};

	const prefixLine = (prefix) => {
		const lines = localNote.substring(0, selection?.start).split('\n');
		const lastLine = lines[lines.length - 1];

		// TODO: check if the prefix as at the start of the line
		// If it is remove it
		// If it isnt add it

		lines[lines.length - 1] = `${prefix} ${lastLine}`;
		// console.log(lines);

		return [...lines, ...localNote.substring(selection?.start).split('\n')];
	};

	const updateSelection = (target) => {
		const { selectionEnd, selectionStart } = target;

		setSelection({
			end: selectionEnd,
			start: selectionStart,
		});
	};

	// TODO: force blur when saving a not via shortcuts
	const handleBlur = () => {
		console.log('blur');
		setSelection(null);
	};

	const handleChange = (event) => {
		updateSelection(event.target);
		setLocalNote(event.target.value);
	};

	const handleFocus = () => {
		console.log('focus');
	};

	const handleSelect = (event) => {
		updateSelection(event.target);
	};

	useEffect(() => {
		if (currentNote) {
			setCurrentNote(currentNote);
			setLocalNote(currentNote.text);
			dispatch({
				type: 'app-edit',
				value: currentNote.text === '',
			});
		}
		return () => setCurrentNote(null);
	}, [currentNote]); // eslint-disable-line

	useEffect(() => {
		const compare = localNote !== undefined && !edit;

		if (compare && id && localNote !== currentNote.text) {
			updateNote(localNote);
		}
	}, [edit]); // eslint-disable-line

	console.log(selection);

	if (selection?.end !== selection?.start) {
		console.log(formatSelection('__'));
	}
	if (localNote && selection && selection?.end === selection?.start) {
		console.log(prefixLine('-'));
	}

	return (
		<>
			{edit ? (
				<textarea
					className={clsx(classes.page, classes.textarea)}
					type="text"
					value={localNote}
					onBlur={handleBlur}
					onChange={handleChange}
					onFocus={handleFocus}
					onSelect={handleSelect}
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
