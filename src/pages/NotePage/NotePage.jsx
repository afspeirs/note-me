import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Prompt } from 'react-router-dom';
import Markdown from 'react-markdown';

import useStyles from './NotePage.styled';

const defaultProps = {
	note: null,
};

const propTypes = {
	edit: PropTypes.bool.isRequired,
	handleNoteUpdate: PropTypes.func.isRequired,
	match: PropTypes.instanceOf(Object).isRequired,
	note: PropTypes.instanceOf(Object),
	setEdit: PropTypes.func.isRequired,
};

const NotePage = ({
	edit,
	handleNoteUpdate,
	match,
	note,
	setEdit,
}) => {
	const classes = useStyles();
	const [localNote, setLocalNote] = useState(undefined);
	const { id } = match.params;

	useEffect(() => {
		if (note !== null) {
			setLocalNote(note.text);
			setEdit(note.text === '');
		}
	}, [note]); // eslint-disable-line

	useEffect(() => {
		const compare = localNote !== undefined && !edit;

		if (compare && id && localNote !== note.text) {
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
					onChange={event => setLocalNote(event.target.value)}
				/>
			) : (
				<Markdown
					className={classes.page}
					escapeHtml
					source={localNote}
				/>
			)}

			{note && (
				<Prompt
					when={localNote !== note.text}
					message="Are you sure you want to leave without saving?"
				/>
			)}
		</>
	);
};

NotePage.defaultProps = defaultProps;
NotePage.propTypes = propTypes;

export default NotePage;
