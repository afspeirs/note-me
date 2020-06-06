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

import NotesSearch from './NotesSearch';
import { useAuth } from '../hooks/AuthContext';
import { useNotes } from '../hooks/NotesContext';

const DrawerContent = () => {
	const { isSignedIn } = useAuth();
	const { addNote } = useNotes();

	return (
		<>
			<NotesSearch />

			{isSignedIn && (
				<>
					<Divider />

					<List disablePadding>
						<ListItem button onClick={() => addNote('')}>
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
