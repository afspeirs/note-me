import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Add as AddIcon,
} from '@material-ui/icons';

import NotesList from '../NotesList';
import SortNotes from '../SortNotes';

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

		<Divider />

		<List disablePadding>
			<SortNotes />
			<ListItem
				button
				component={AdapterLink}
				to="/note/"
				onClick={handleDrawerToggle}
			>
				<ListItemIcon>
					<AddIcon />
				</ListItemIcon>
				<ListItemText primary="New Note" />
			</ListItem>
		</List>
	</>
);

DrawerContent.propTypes = propTypes;

export default DrawerContent;
