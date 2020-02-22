import React, { useEffect, useState } from 'react';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@material-ui/core';
import {
	Close as CloseIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotesExport.styled';
import { useNotes } from '../../hooks/NotesContext';

const NotesExport = () => {
	const classes = useStyles();
	const confirm = useConfirm();
	const { notes } = useNotes();
	const [checkedNotes, setCheckedNotes] = useState([]);
	const [open, setOpen] = useState(false);

	// Update / Reset checkedNotes if notes update
	useEffect(() => setCheckedNotes([...Array(notes.length)].map(() => false)), [notes]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSelectedNotesToggle = (index) => {
		const local = [...checkedNotes];
		const value = checkedNotes[index];
		local[index] = !value;
		setCheckedNotes(local);
	};

	const exportMarkdownFile = (name, text) => {
		const element = document.createElement('a');

		element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
		element.setAttribute('download', `${name}.md`);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handleExportClick = () => {
		const selectedNotes = notes.filter((note, index) => checkedNotes[index]);
		confirm({
			title: `Do you want to export ${selectedNotes.length === 1 ? 'this note as a' : `these ${selectedNotes.length} notes as`} Markdown file${selectedNotes.length === 1 ? 's' : ''}?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
			dialogProps: {
				classes: {
					root: classes.dialog,
				},
			},
		}).then(() => {
			handleClose();
			selectedNotes.forEach((note) => {
				const { text, title } = note;
				exportMarkdownFile(title.substring(0, 100), text);
			});
		});
	};

	return (
		<>
			<ListItem>
				<ListItemText primary="Export Notes:" />
				<ListItemSecondaryAction>
					<Button
						color="primary"
						variant="contained"
						onClick={handleOpen}
					>
						Export
					</Button>
				</ListItemSecondaryAction>
			</ListItem>

			<Dialog
				aria-labelledby="export-dialog-title"
				className={classes.dialog}
				onClose={handleClose}
				open={open}
			>
				<DialogTitle
					className={classes.root}
					disableTypography
					id="export-dialog-title"
				>
					<Typography variant="h6">Export Notes</Typography>
					{handleClose ? (
						<IconButton
							aria-label="close"
							className={classes.closeButton}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					) : null}
				</DialogTitle>

				<DialogContent dividers>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
						in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
					</Typography>

					<List className={classes.list} dense>
						{checkedNotes.map((note, index) => {
							const labelId = `checkbox-list-label-${note.id}`;
							const currentNote = notes[index];

							return (
								<ListItem
									key={currentNote.id}
									role={undefined}
									dense
									button
									onClick={() => handleSelectedNotesToggle(index)}
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											color="primary"
											checked={checkedNotes[index]}
											tabIndex={-1}
											disableRipple
											inputProps={{ 'aria-labelledby': labelId }}
										/>
									</ListItemIcon>
									<ListItemText
										className={classes.listItemText}
										id={labelId}
										primary={currentNote.title}
									/>
								</ListItem>
							);
						})}
					</List>
				</DialogContent>

				<DialogActions>
					<Button
						color="inherit"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						autoFocus
						color="primary"
						disabled={checkedNotes.every((note) => note === false)}
						onClick={handleExportClick}
					>
						Export
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NotesExport;
