import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@material-ui/core';
import {
	Close as CloseIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './DialogMoveNote.styled';
import { useNotes } from '../../hooks/NotesContext';

const filter = createFilterOptions();

const defaultProps = {
	note: null,
};

const propTypes = {
	note: PropTypes.instanceOf(Object),
	setOpen: PropTypes.func.isRequired,
};

const DialogMoveFolder = ({ note, setOpen }) => {
	const classes = useStyles();
	const confirm = useConfirm();
	const { folders, moveNote } = useNotes();
	const [value, setValue] = useState(null);

	const handleClose = () => setOpen(null);

	const handleMove = () => {
		const title = (typeof value === 'string') ? value : value.title;

		confirm({
			title: `Are you sure you want to move "${note.title}" to "${title}"`,
			cancellationText: 'No',
			confirmationText: 'Yes',
		}).then(() => {
			handleClose();
			moveNote(note, title);
		});
	};

	return (
		<Dialog
			aria-labelledby="export-dialog-title"
			maxWidth="xs"
			fullWidth
			className={classes.dialog}
			onClose={handleClose}
			open={Boolean(note)}
		>
			<DialogTitle
				className={classes.root}
				disableTypography
				id="export-dialog-title"
			>
				<Typography variant="h6">{`Move "${note?.title}"`}</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent className={classes.dialogContent} dividers>
				<Autocomplete
					value={value}
					onChange={(event, newValue) => {
						if (newValue && newValue.inputValue) {
							setValue({ title: newValue.inputValue });
							return;
						}

						setValue(newValue);
					}}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);

						if (params.inputValue !== '') {
							filtered.push({
								inputValue: params.inputValue,
								title: `Add "${params.inputValue}"`,
							});
						}

						return filtered;
					}}
					id="free-solo-with-text-demo"
					options={folders.filter(Boolean).map((folder) => ({ title: folder }))}
					getOptionLabel={(option) => {
						// e.g value selected with enter, right from the input
						if (typeof option === 'string') {
							return option;
						}
						if (option.inputValue) {
							return option.inputValue;
						}
						return option.title;
					}}
					renderOption={(option) => option.title}
					freeSolo
					renderInput={(params) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<TextField {...params} label="Choose the folder" variant="outlined" />
					)}
				/>
			</DialogContent>

			<DialogActions>
				<Button color="inherit" onClick={handleClose}>
					Cancel
				</Button>
				<Button color="primary" disabled={!value} onClick={handleMove}>
					Move
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogMoveFolder.defaultProps = defaultProps;
DialogMoveFolder.propTypes = propTypes;

export default DialogMoveFolder;
