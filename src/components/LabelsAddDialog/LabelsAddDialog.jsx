import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	ListItemIcon,
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

import useStyles from './LabelsAddDialog.styled';
import { useNotes } from '../../hooks/Notes';

const defaultProps = {
	note: null,
};

const propTypes = {
	note: PropTypes.instanceOf(Object),
	setOpen: PropTypes.func.isRequired,
};

const LabelsAddDialog = ({ note, setOpen }) => {
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

	const handleCheckboxChange = (label) => setControlledLabels((prevState) => ({
		...prevState,
		[label]: !prevState[label],
	}));

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
			fullWidth
			maxWidth="xs"
			onClose={handleClose}
			open={Boolean(note)}
			scroll="body"
		>
			<DialogTitle
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
					{Object.keys(controlledLabels).map((label) => {
						const labelId = `label-${label}`;

						return (
							<ListItem
								button
								dense
								key={labelId}
								onClick={() => handleCheckboxChange(label)}
							>
								<ListItemIcon>
									<Checkbox
										checked={controlledLabels[label]}
										color="primary"
										disableRipple
										edge="start"
										inputProps={{ 'aria-labelledby': labelId }}
										tabIndex={-1}
									/>
								</ListItemIcon>
								<ListItemText
									id={labelId}
									primary={label}
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
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

LabelsAddDialog.defaultProps = defaultProps;
LabelsAddDialog.propTypes = propTypes;

export default LabelsAddDialog;
