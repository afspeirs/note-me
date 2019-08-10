import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import Markdown from 'react-markdown';

import { MarkdownWrapper, Textarea } from './NotePage.styled';

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
	const [localNote, setLocalNote] = useState(null);
	const { id } = match.params;

	useEffect(() => {
		if (note !== null) {
			setLocalNote(note.text);
		}
		setEdit(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [note]);

	useEffect(() => {
		// console.log(edit);

		if (localNote !== null && !edit && id) {
			handleNoteUpdate(id, localNote);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [edit]);

	return (
		<>
			{edit ? (
				<Textarea
					type="text"
					className="textarea"
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