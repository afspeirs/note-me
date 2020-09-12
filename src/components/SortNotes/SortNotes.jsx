import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import {
	Sort as SortIcon,
} from '@material-ui/icons';

import useStyles from './SortNotes.styled';
import { useGlobalState } from '../../hooks/GlobalState';

const options = [
	{ text: 'Modified Date (Newest First)', value: 'date-asc' },
	{ text: 'Modified Date (Oldest First)', value: 'date-dsc' },
	{ text: 'Title (A-Z)', value: 'title-asc' },
	{ text: 'Title (Z-A)', value: 'title-dsc' },
];

const defaultProps = {
	icon: false,
};

const propTypes = {
	icon: PropTypes.bool,
};

const SortNotes = ({ icon }) => {
	const [{ settings: { sortNotes } }, dispatch] = useGlobalState();
	const [anchorEl, setAnchorEl] = useState(null);
	const anchorRef = useRef(null);
	const classes = useStyles();
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = useState(options.findIndex((item) => item.value === sortNotes));

	const handleClose = () => setAnchorEl(null);

	const handleClickListItem = () => setAnchorEl(anchorRef.current);

	const handleClickMenuItem = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);

		dispatch({
			type: 'settings-sortNotes',
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
				onClick={handleClickListItem}
			>
				{icon && (
					<ListItemIcon>
						<SortIcon />
					</ListItemIcon>
				)}
				<ListItemText primary="Sort Notes" />
				<ListItemSecondaryAction className={classes.secondaryText} ref={anchorRef}>
					<Typography variant="body2" color="textSecondary">
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

SortNotes.defaultProps = defaultProps;
SortNotes.propTypes = propTypes;

export default SortNotes;
