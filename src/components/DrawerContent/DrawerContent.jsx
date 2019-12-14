import React from 'react';
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

import { useAuth } from '../AuthContext';
import { useNotes } from '../NotesContext';
import NotesSearch from '../NotesSearch';

const DrawerContent = () => {
	const history = useHistory();
	const { isSignedIn } = useAuth();
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

export default DrawerContent;
