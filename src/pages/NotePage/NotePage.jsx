import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import { db } from '../../firebase';
import { MarkdownWrapper, Textarea } from './NotePage.styled';

const defaultProps = {
	user: null,
};

const propTypes = {
	edit: PropTypes.bool.isRequired,
	match: PropTypes.instanceOf(Object).isRequired,
	user: PropTypes.instanceOf(Object),
};

const NotePage = ({ edit, match, user }) => {
	const [note, setNote] = useState('Loading...');
	const { id } = match.params;

	useEffect(() => {
		if (user && id) {
			db.collection(user.uid)
				.doc(id)
				.get()
				.then((doc) => {
					if (doc.exists) {
						setNote(doc.data().text);
					} else {
						setNote('Note does not exist :(');
					}
				});
		}
	}, [user, id]);

	return (
		<>
			{edit ? (
				<Textarea
					type="text"
					className="textarea"
					value={note}
					onChange={event => setNote(event.target.value)}
				/>
			) : (
				<MarkdownWrapper>
					<Markdown
						escapeHtml
						source={note}
					/>
				</MarkdownWrapper>
			)}
		</>
	);
};

NotePage.defaultProps = defaultProps;
NotePage.propTypes = propTypes;

export default NotePage;
