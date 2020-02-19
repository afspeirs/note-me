import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './ImportExport.styled';
import { useNotes } from '../../hooks/NotesContext';

const ImportExport = () => {
	const confirm = useConfirm();
	const { addNote, notes } = useNotes();
	const classes = useStyles();

	// Read each file and create a note for it
	const onChangeImport = (event) => [...event.target.files].forEach((file) => {
		const reader = new FileReader();
		reader.onload = () => addNote(reader.result);
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

	const onClickExport = () => {
		confirm({
			title: `Do you want to export all ${notes.length} Notes as Markdown files?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
			dialogProps: {
				classes: {
					root: classes.confirm,
				},
			},
		}).then(() => notes.forEach((note) => {
			const { text, title } = note;
			exportMarkdownFile(title, text);
		}));
	};

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
