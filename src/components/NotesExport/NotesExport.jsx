import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
	const [maxSelectable] = useState(10);
	const isCheckedNotesSelected = checkedNotes.every((note) => note === false);
	const numberOfCheckedNotes = checkedNotes.filter((note) => note === true).length;

	const resetSelectedNotes = () => setCheckedNotes([...Array(notes.length)].map(() => false));

	const handleClose = () => {
		resetSelectedNotes();
		setOpen(false);
	};

	const handleOpen = () => setOpen(true);

	const handleSelectedNotesToggle = (index) => {
		const local = [...checkedNotes];
		const value = checkedNotes[index];

		// Limit the number of selectable notes to maxSelectable
		if (!(numberOfCheckedNotes === maxSelectable && !value)) {
			local[index] = !value;
			setCheckedNotes(local);
		}
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
			title: `Do you want to export ${selectedNotes.length === 1 ? 'this note' : `these ${selectedNotes.length} notes`}?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
		}).then(() => {
			handleClose();
			selectedNotes.forEach((note) => {
				const { text, title } = note;
				exportMarkdownFile(title.substring(0, 100), text);
			});
		});
	};

	// Update / Reset checkedNotes if notes update
	useEffect(resetSelectedNotes, [notes]);

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
						Select which notes you would like to export. They will be saved as Markdown files
					</Typography>
					<Typography>
						<span
							className={clsx({
								[classes.maxSelected]: numberOfCheckedNotes === maxSelectable,
							})}
						>
							{`${numberOfCheckedNotes}/${maxSelectable}`}
						</span>
						&nbsp;notes selected for export
					</Typography>

					<List className={classes.list} dense>
						{checkedNotes.map((note, index) => {
							const currentNote = notes[index];
							const labelId = `checkbox-list-label-${currentNote.id}`;

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
					<Typography
						className={clsx(classes.numberSelected, {
							[classes.maxSelected]: numberOfCheckedNotes === maxSelectable,
						})}
					>
						{`${numberOfCheckedNotes}/${maxSelectable}`}
					</Typography>

					<Button
						color="inherit"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						color="inherit"
						disabled={isCheckedNotesSelected}
						onClick={resetSelectedNotes}
					>
						Reset
					</Button>
					<Button
						autoFocus
						color="primary"
						disabled={isCheckedNotesSelected}
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