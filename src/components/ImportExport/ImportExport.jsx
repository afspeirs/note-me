import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import useStyles from './ImportExport.styled';
import { getTitle } from '../../ultils';
import { useNotes } from '../../hooks/NotesContext';

const ImportExport = () => {
	const classes = useStyles();
	const { handleNoteAdd, notes } = useNotes();

	// Read each file and create a note for it
	const onChangeImport = (event) => [...event.target.files].forEach((file) => {
		const reader = new FileReader();
		reader.onload = () => handleNoteAdd(reader.result);
		reader.readAsText(file);
	});

	const exportMarkdownFile = (name, text) => {
		const element = document.createElement('a');

		element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
		element.setAttribute('download', `${name}.md`);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const onClickExport = () => notes.forEach((note) => {
		const title = getTitle(note.text);
		const { text } = note;
		exportMarkdownFile(title, text);
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
						onClick={onClickExport}
					>
						Export
					</Button>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default ImportExport;
