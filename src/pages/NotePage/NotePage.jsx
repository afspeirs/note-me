import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import Markdown from 'react-markdown';

import { MarkdownWrapper, Textarea } from './NotePage.styled';

const defaultProps = {
	note: null,
	newNote: false,
	handleNoteAdd: () => {},
	handleNoteUpdate: () => {},
};

const propTypes = {
	edit: PropTypes.bool.isRequired,
	handleNoteAdd: PropTypes.func,
	handleNoteUpdate: PropTypes.func,
	match: PropTypes.instanceOf(Object).isRequired,
	history: PropTypes.instanceOf(Object).isRequired,
	newNote: PropTypes.bool,
	note: PropTypes.instanceOf(Object),
	setEdit: PropTypes.func.isRequired,
};

const NotePage = ({
	edit,
	handleNoteAdd,
	handleNoteUpdate,
	match,
	history,
	newNote,
	note,
	setEdit,
}) => {
	const [localNote, setLocalNote] = useState(null);
	const { id } = match.params;

	useEffect(() => {
		if (note !== null) {
			setLocalNote(note.text);
			setEdit(false);
		}
		if (newNote) {
			setLocalNote('');
			setEdit(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [note]);

	useEffect(() => {
		const compare = localNote !== null && !edit;

		if (compare && id && localNote !== note.text) {
			handleNoteUpdate(id, localNote);
		} else if (compare) {
			handleNoteAdd(localNote, history);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [edit]);

	return (
		<>
			{edit ? (
				<Textarea
					autoFocus
					type="text"
					value={localNote}
					onChange={event => setLocalNote(event.target.value)}
				/>
			) : (
				<MarkdownWrapper>
					<Markdown
						escapeHtml
						source={localNote}
					/>
				</MarkdownWrapper>
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
