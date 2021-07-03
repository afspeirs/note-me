import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	ListItemIcon,
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
	Clear as ClearIcon,
	Close as CloseIcon,
} from '@material-ui/icons';

import { useNotes } from '@/hooks/Notes';
import useStyles from './LabelsAddDialog.styled';

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
	const [searchLabelsText, setSearchLabelsText] = useState('');

	const handleSearchLabelsTextChange = (event) => setSearchLabelsText(event.target.value);
	const doesLabelExist = !Object.keys(controlledLabels)
		.find((label) => label.toLowerCase() === searchLabelsText.toLowerCase());
	const filteredLabels = searchLabelsText.length !== 0
		? Object.keys(controlledLabels)
			.filter((label) => label.toLowerCase().search(searchLabelsText.toLowerCase()) !== -1)
		: Object.keys(controlledLabels);

	const handleAddLabel = () => {
		if (searchLabelsText.length !== 0) {
			setControlledLabels((prevState) => ({
				...prevState,
				[searchLabelsText]: true,
			}));
			// setSearchLabelsText('');
		}
	};

	const handleClose = () => {
		if (note) {
			const newFilterNames = Object.keys(controlledLabels)
				.filter((label) => controlledLabels[label] !== false)
				.sort();

			updateLabels(note.id, newFilterNames);
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
	}, [labels, note]);

	return (
		<Dialog
			aria-labelledby="add-dialog-dialog-title"
			fullWidth
			maxWidth="xs"
			onClose={handleClose}
			open={Boolean(note)}
			PaperProps={{
				className: classes.dialog,
			}}
		>
			<DialogTitle
				disableTypography
				id="add-dialog-dialog-title"
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
				<TextField
					fullWidth
					label="Search Labels"
					onChange={handleSearchLabelsTextChange}
					value={searchLabelsText}
					variant="outlined"
					InputProps={{
						endAdornment: searchLabelsText.length !== 0 && (
							<InputAdornment position="end">
								<IconButton
									aria-label="Clear Search"
									edge="end"
									color="inherit"
									onClick={() => setSearchLabelsText('')}
								>
									<ClearIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<List>
					{Object.keys(controlledLabels).length === 0 && (
						<ListItem>
							<ListItemText primary="No labels found" />
						</ListItem>
					)}
					{filteredLabels.map((label) => {
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
					{searchLabelsText.length !== 0 && doesLabelExist && (
						<ListItem
							button
							dense
							onClick={handleAddLabel}
						>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary={`Add "${searchLabelsText}" as a new label`} />
						</ListItem>
					)}
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
