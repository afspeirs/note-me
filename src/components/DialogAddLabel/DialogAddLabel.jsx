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
	InputAdornment,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@material-ui/core';
import {
	Add as AddIcon,
	Close as CloseIcon,
} from '@material-ui/icons';

import useStyles from './DialogAddLabel.styled';
import { useNotes } from '../../hooks/Notes';

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
	const [localAddLabel, setLocalAddLabel] = useState('');

	const handleAddLabelChange = (event) => setLocalAddLabel(event.target.value);

	const handleAddLabel = (event) => {
		event.preventDefault();

		if (localAddLabel.length !== 0) {
			const prevControlledLabels = {
				...controlledLabels,
				[localAddLabel]: true,
			};

			setControlledLabels(prevControlledLabels);
			setLocalAddLabel('');
		}
	};

	const handleClose = () => {
		if (note) {
			const newFilterNames = Object.keys(controlledLabels)
				.filter((label) => controlledLabels[label] !== false)
				.sort();
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
				<Typography
					className={classes.title}
					variant="h6"
				>
					{`Add labels to "${note?.title}"`}
				</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<form
					autoComplete="off"
					className={classes.form}
					noValidate
					onSubmit={handleAddLabel}
				>
					<TextField
						fullWidth
						id="local-add-labels"
						label="Add Label"
						onChange={handleAddLabelChange}
						value={localAddLabel}
						variant="outlined"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Button
										className={classes.button}
										color="primary"
										disabled={localAddLabel.length <= 0}
										onClick={handleAddLabel}
										startIcon={<AddIcon />}
										variant="contained"
									>
										Add
									</Button>
								</InputAdornment>
							),
						}}
					/>
				</form>

				<List>
					{Object.keys(controlledLabels).length === 0 && (
						<ListItem>
							<ListItemText primary="No labels found" />
						</ListItem>
					)}
					{Object.keys(controlledLabels).map((label) => (
						<ListItem dense key={label}>
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
						</ListItem>
					))}
				</List>
			</DialogContent>

			<DialogActions>
				<Button color="inherit" onClick={handleClose}>Done</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogAddLabel.defaultProps = defaultProps;
DialogAddLabel.propTypes = propTypes;

export default DialogAddLabel;
