import React from 'react';
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
	const { isSignedIn } = useAuth();
	const { handleNoteAdd } = useNotes();

	return (
		<>
			<NotesSearch />

			{isSignedIn && (
				<>
					<Divider />

					<List disablePadding>
						<ListItem button onClick={handleNoteAdd}>
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
