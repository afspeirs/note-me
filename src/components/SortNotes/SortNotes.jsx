import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@material-ui/core';
import {
	Sort as SortIcon,
} from '@material-ui/icons';

import useStyles from './SortNotes.styled';
import { useStateValue } from '../../hooks/StateContext';

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
	const classes = useStyles();
	const [{ settings }, dispatch] = useStateValue();
	const { sort } = settings;
	const [value, setValue] = useState(sort);
	const [anchorEl, setAnchorEl] = useState(null);
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = useState(options.findIndex((item) => item.value === value));

	const handleClose = () => setAnchorEl(null);

	const handleClickListItem = (event) => setAnchorEl(event.currentTarget);

	const handleClickMenuItem = (event, index) => {
		setValue(options[index].value);
		setSelectedIndex(index);
		setAnchorEl(null);

		dispatch({
			type: 'settingsSort',
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
				<ListItemText
					primary="Sort Notes"
					secondary={options[selectedIndex].text}
				/>
			</ListItem>
			<Menu
				id="sort-menu"
				className={classes.menu}
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
