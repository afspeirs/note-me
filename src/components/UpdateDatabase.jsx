import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';

import { useNotes } from '../hooks/NotesContext';

const UpdateDatabase = () => {
	const confirm = useConfirm();
	const { updateDatabase } = useNotes();

	const handleButtonClick = () => {
		confirm({
			title: 'Are you sure you want to update the database?',
			description: 'This will move any notes from the old database to the new location. This can be done multiple times and create multiple notes',
			cancellationText: 'Cancel',
			confirmationText: 'Yes',
		}).then(() => {
			updateDatabase();
		});
	};

	return (
		<ListItem>
			<ListItemText primary="Update database to new structure" />
			<ListItemSecondaryAction>
				<Button
					variant="contained"
					color="primary"
					onClick={handleButtonClick}
				>
					Update
				</Button>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default UpdateDatabase;
