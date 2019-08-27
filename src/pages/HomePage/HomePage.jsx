import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './HomePage.styled';
import NotesList from '../../components/NotesList';

const propTypes = {
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const HomePage = ({
	handleNoteDelete,
	loading,
	notes,
}) => (
	<Page>
		<NotesList
			handleNoteDelete={handleNoteDelete}
			loading={loading}
			notes={notes}
		/>
	</Page>
);

HomePage.propTypes = propTypes;

export default HomePage;
