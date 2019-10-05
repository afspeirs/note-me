import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './HomePage.styled';
import NotesSearch from '../../components/NotesSearch';

const propTypes = {
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const HomePage = ({
	handleNoteDelete,
	loading,
	notes,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.page}>
			<NotesSearch
				handleNoteDelete={handleNoteDelete}
				loading={loading}
				notes={notes}
			/>
		</div>
	);
};


HomePage.propTypes = propTypes;

export default HomePage;
