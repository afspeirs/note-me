import React, { useState } from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import useStyles from './ImportExport.styled';
import ExportDialog from '../../dialogs/ExportDialog';
import { useNotes } from '../../hooks/NotesContext';

const ImportExport = () => {
	const { addNote } = useNotes();
	const classes = useStyles();
	const [openExportDialog, setOpenExportDialog] = useState(false);

	// Read each file and create a note for it
	const onChangeImport = (event) => [...event.target.files].forEach((file) => {
		const reader = new FileReader();
		reader.onload = () => addNote(reader.result);
		reader.readAsText(file);
	});

	return (
		<>
			<ListItem>
				<ListItemText primary="Import Notes:" />
				<ListItemSecondaryAction>
					<label htmlFor="import-note">
						<input
							accept="text/*"
							className={classes.input}
							id="import-note"
							multiple
							onChange={onChangeImport}
							type="file"
						/>
						<Button color="primary" component="span" variant="contained">
							Import
						</Button>
					</label>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText primary="Export Notes:" />
				<ListItemSecondaryAction>
					<Button
						color="primary"
						variant="contained"
						onClick={() => setOpenExportDialog(true)}
					>
						Export
					</Button>
				</ListItemSecondaryAction>
			</ListItem>

			<ExportDialog
				open={openExportDialog}
				onClose={() => setOpenExportDialog(false)}
			/>
		</>
	);
};

export default ImportExport;
