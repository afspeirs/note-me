import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	Checkbox,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@material-ui/core';
import {
	Close as CloseIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './ExportDialog.styled';
import { useNotes } from '../../hooks/NotesContext';

const propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

const ExportDialog = ({ open, onClose }) => {
	const classes = useStyles();
	const confirm = useConfirm();
	const { notes } = useNotes();
	const [checkedNotes, setCheckedNotes] = useState([...Array(notes.length)].map(() => false));

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
			// TODO - Update copy to match how many you have selected e.g. note(s)
			title: `Do you want to export all ${selectedNotes.length} Notes as Markdown files?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
			dialogProps: {
				onExit: onClose,
				classes: {
					root: classes.dialog,
				},
			},
		}).then(() => selectedNotes.forEach((note) => {
			const { text, title } = note;
			exportMarkdownFile(title.substring(0, 100), text);
		}));
	};

	return (
		<Dialog
			aria-labelledby="export-dialog-title"
			className={classes.dialog}
			onClose={onClose}
			open={open}
		>
			<DialogTitle
				className={classes.root}
				disableTypography
				id="export-dialog-title"
			>
				<Typography variant="h6">Export Notes</Typography>
				{onClose ? (
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={onClose}
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
					onClick={onClose}
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
	);
};

ExportDialog.propTypes = propTypes;

export default ExportDialog;
