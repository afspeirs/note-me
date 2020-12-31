import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import useStyles from './NotesImport.styled';
import { useNotes } from '../../hooks/Notes';

const ImportExport = () => {
	const { addNote } = useNotes();
	const classes = useStyles();

	// Read each file and create a note for it
	const onChangeImport = (event) => [...event.target.files].forEach((file) => {
		const reader = new FileReader();
		reader.onload = () => addNote(reader.result);
		reader.readAsText(file);
	});

	return (
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
	);
};

export default ImportExport;
