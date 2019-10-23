import React from 'react';
import PropTypes from 'prop-types';
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

import NotesSearch from '../NotesSearch';

const propTypes = {
	handleNoteAdd: PropTypes.func.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	history: PropTypes.instanceOf(Object).isRequired,
	isSignedIn: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const DrawerContent = ({
	handleNoteAdd,
	handleNoteDelete,
	history,
	isSignedIn,
	loading,
	notes,
}) => (
	<>
		<NotesSearch
			handleNoteDelete={handleNoteDelete}
			loading={loading}
			notes={notes}
		/>

		{isSignedIn && (
			<>
				<Divider />

				<List disablePadding>
					<ListItem button onClick={() => handleNoteAdd(history)}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary="Create Note" />
					</ListItem>
				</List>
			</>
		)}
	</>
);

DrawerContent.propTypes = propTypes;

export default DrawerContent;
