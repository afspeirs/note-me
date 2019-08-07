import React from 'react';
import PropTypes from 'prop-types';

import NotesList from '../components/NotesList';

const propTypes = {
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const HomePage = ({
	loading,
	notes,
}) => (
	<div>
		<NotesList
			loading={loading}
			notes={notes}
		/>
	</div>
);

HomePage.propTypes = propTypes;

export default HomePage;
