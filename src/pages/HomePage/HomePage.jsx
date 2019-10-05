import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './HomePage.styled';
import NotesSearch from '../../components/NotesSearch';
import NotSignedIn from '../../components/NotSignedIn';

const propTypes = {
	handleNoteDelete: PropTypes.func.isRequired,
	isSignedIn: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
	signIn: PropTypes.func.isRequired,
};

const HomePage = ({
	handleNoteDelete,
	isSignedIn,
	loading,
	notes,
	signIn,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.page}>
			{isSignedIn ? (
				<NotesSearch
					handleNoteDelete={handleNoteDelete}
					loading={loading}
					notes={notes}
				/>
			) : (
				<NotSignedIn signIn={signIn} />
			)}
		</div>
	);
};

HomePage.propTypes = propTypes;

export default HomePage;
