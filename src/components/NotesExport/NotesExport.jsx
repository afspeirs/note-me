import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
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
import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';
import { useSnackbar } from '../../hooks/Snackbar';

const NotesExport = () => {
	const classes = useStyles();
	const { isSignedIn } = useAuth();
	const confirm = useConfirm();
	const { notes } = useNotes();
	const snackbar = useSnackbar();
	const [checkedNotes, setCheckedNotes] = useState([]);
	const [open, setOpen] = useState(false);
	const isEveryNoteSelected = checkedNotes.every((note) => note === true);
	const isEveryNoteUnSelected = checkedNotes.every((note) => note === false);
	const selectedNotes = notes.filter((note, index) => checkedNotes[index]);

	const resetSelectedNotes = () => setCheckedNotes([...Array(notes.length)].map(() => false));
	const toggleSelectedNotes = () => setCheckedNotes([...Array(notes.length)]
		.map(() => !isEveryNoteSelected));

	const handleClose = () => {
		resetSelectedNotes();
		setOpen(false);
	};

	const handleOpen = () => setOpen(true);

	const handleSelectedNotesToggle = (index) => {
		const local = [...checkedNotes];
		const value = checkedNotes[index];

		local[index] = !value;
		setCheckedNotes(local);
	};

	const exportMarkdownFile = (exportedNotes) => {
		const element = document.createElement('a');
		const currentDate = dayjs().format('YYYY-MM-DD');
		const stringOfNotes = JSON.stringify(exportedNotes);

		element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(stringOfNotes)}`);
		element.setAttribute('download', `NoteMe-${currentDate}.json`);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handleExportClick = () => {
		const notesToExport = isEveryNoteUnSelected ? notes : selectedNotes;
		// console.log(notesToExport);

		confirm({
			title: `Are you sure you want to export ${notesToExport.length === 1 ? 'this note' : `${notesToExport.length} notes`}?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
		}).then(() => {
			handleClose();
			exportMarkdownFile(notesToExport);

			snackbar.showMessage({
				message: `${notesToExport.length} note${notesToExport.length === 1 ? ' has' : 's have'} been exported`,
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
						disabled={!isSignedIn}
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
						Select which notes you would like to export. They will be saved as a JSON file
					</Typography>
					<Typography>
						{selectedNotes.length} note(s) selected
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
					<Button
						color="inherit"
						onClick={toggleSelectedNotes}
					>
						Select All
					</Button>
					<Button
						autoFocus
						color="primary"
						onClick={handleExportClick}
					>
						Export {isEveryNoteUnSelected ? 'All' : 'Selected'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NotesExport;
