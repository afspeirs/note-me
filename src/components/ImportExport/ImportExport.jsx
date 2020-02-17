import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import useStyles from './ImportExport.styled';
import { useNotes } from '../../hooks/NotesContext';

const ImportExport = () => {
	const classes = useStyles();
	const { handleNoteAdd } = useNotes();

	// Read each file and create a note for it
	const onChangeImport = (event) => [...event.target.files].forEach((file) => {
		const reader = new FileReader();
		reader.onload = () => handleNoteAdd(reader.result);
		reader.readAsText(file);
	});

	return (
		<ListItem>
			<ListItemText primary="Import Notes:" />
			<ListItemSecondaryAction>
				<input
					accept="text/*"
					className={classes.input}
					id="import-note"
					multiple
					onChange={onChangeImport}
					type="file"
				/>
				<label htmlFor="import-note">
					<Button color="primary" component="span" variant="contained">
						Import
					</Button>
				</label>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default ImportExport;
