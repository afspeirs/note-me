import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	Typography,
} from '@material-ui/core';
import {
	Close as CloseIcon,
} from '@material-ui/icons';

import useStyles from './DialogAddLabel.styled';
import { useNotes } from '../hooks/NotesContext';

const defaultProps = {
	note: null,
};

const propTypes = {
	note: PropTypes.instanceOf(Object),
	setOpen: PropTypes.func.isRequired,
};

const DialogAddLabel = ({ note, setOpen }) => {
	const classes = useStyles();
	const { labels, updateLabels } = useNotes();
	const [controlledLabels, setControlledLabels] = useState({});

	const handleClose = () => {
		if (note) {
			const newFilterNames = Object.keys(controlledLabels)
				.filter((label) => controlledLabels[label] !== false);
			updateLabels(newFilterNames, note);
		}
		setOpen(null);
	};

	const handleCheckboxChange = (event) => {
		const prevControlledLabels = {
			...controlledLabels,
			[event.target.name]: event.target.checked,
		};

		setControlledLabels(prevControlledLabels);
	};

	useEffect(() => {
		setControlledLabels(
			Object.assign({}, ...[...labels].map((label) => ({
				[label]: Boolean(note?.labels?.includes(label)),
			}))),
		);
	}, [labels, note]); // eslint-disable-line

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
				<Typography variant="h6">{`Add labels to "${note?.title}"`}</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				{labels.map((label) => (
					<FormControlLabel
						control={(
							<Checkbox
								checked={controlledLabels[label]}
								color="primary"
								name={label}
								onChange={handleCheckboxChange}
							/>
						)}
						key={label}
						label={label}
					/>
				))}
				{/* TODO: add checkbox with input to allow you to add a new label */}
			</DialogContent>

			<DialogActions>
				<Button color="inherit" onClick={handleClose}>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogAddLabel.defaultProps = defaultProps;
DialogAddLabel.propTypes = propTypes;

export default DialogAddLabel;
