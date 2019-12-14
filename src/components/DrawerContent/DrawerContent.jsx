import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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

import { useNotes } from '../NotesContext';
import NotesSearch from '../NotesSearch';

const propTypes = {
	isSignedIn: PropTypes.bool.isRequired,
};

const DrawerContent = ({ isSignedIn }) => {
	const history = useHistory();
	const { handleNoteAdd } = useNotes();

	return (
		<>
			<NotesSearch />

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
};

DrawerContent.propTypes = propTypes;

export default DrawerContent;
