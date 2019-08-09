import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { db } from '../firebase';

const defaultProps = {
	user: null,
};

const propTypes = {
	match: PropTypes.instanceOf(Object).isRequired,
	user: PropTypes.instanceOf(Object),
};

const NotePage = ({ match, user }) => {
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
		<div>
			<textarea
				type="text"
				className="textarea"
				value={note}
				onChange={event => setNote(event.target.value)}
			/>
		</div>
	);
};

NotePage.defaultProps = defaultProps;
NotePage.propTypes = propTypes;

export default NotePage;
