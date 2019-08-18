import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import NotesList from '../NotesList';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const propTypes = {
	handleDrawerToggle: PropTypes.func.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const DrawerContent = ({
	handleDrawerToggle,
	handleNoteDelete,
	loading,
	notes,
}) => (
	<>
		<NotesList
			handleDrawerToggle={handleDrawerToggle}
			handleNoteDelete={handleNoteDelete}
			loading={loading}
			notes={notes}
		/>

		<Button
			component={AdapterLink}
			to="/note/"
			onClick={handleDrawerToggle}
		>
			{/* eslint-disable-next-line react/jsx-one-expression-per-line */}
			<AddIcon />&nbsp;&nbsp;Create Note
		</Button>
	</>
);

DrawerContent.propTypes = propTypes;

export default DrawerContent;
