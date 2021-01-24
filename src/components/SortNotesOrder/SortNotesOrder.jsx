import { useRef, useState } from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';

import useStyles from './SortNotesOrder.styled';
import { useAuth } from '../../hooks/Auth';
import { useGlobalState } from '../../hooks/GlobalState';

const options = [
	{ text: 'Date Created (Newest First)', value: 'date-created-asc' },
	{ text: 'Date Created (Oldest First)', value: 'date-created-dsc' },
	{ text: 'Date Modified (Newest First)', value: 'date-modified-asc' },
	{ text: 'Date Modified (Oldest First)', value: 'date-modified-dsc' },
	{ text: 'Title (A-Z)', value: 'title-asc' },
	{ text: 'Title (Z-A)', value: 'title-dsc' },
];

const SortNotesOrder = () => {
	const { isSignedIn } = useAuth();
	const [{ settings: { sortNotesOrder } }, dispatch] = useGlobalState();
	const [anchorEl, setAnchorEl] = useState(null);
	const anchorRef = useRef(null);
	const classes = useStyles();
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = useState(options.findIndex((item) => item.value === sortNotesOrder));

	const handleClose = () => setAnchorEl(null);

	const handleClickListItem = () => setAnchorEl(anchorRef.current);

	const handleClickMenuItem = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);

		dispatch({
			type: 'settings-sortNotesOrder',
			value: options[index].value,
		});
	};

	return (
		<>
			<ListItem
				button
				aria-haspopup="true"
				aria-controls="sort-menu"
				aria-label="sort notes"
				disabled={!isSignedIn}
				onClick={handleClickListItem}
			>
				<ListItemText primary="Sort Notes" />
				<ListItemSecondaryAction className={classes.secondaryText} ref={anchorRef}>
					<Typography variant="body2" color={isSignedIn ? 'initial' : 'textSecondary'}>
						{options[selectedIndex].text}
					</Typography>
				</ListItemSecondaryAction>
			</ListItem>
			<Menu
				id="sort-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem
						key={option.text}
						selected={index === selectedIndex}
						value={option.value}
						onClick={(event) => handleClickMenuItem(event, index)}
					>
						{option.text}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default SortNotesOrder;
