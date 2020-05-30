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

import { useStateValue } from '../../hooks/StateContext';

const options = [
	{ text: 'Name (A-Z)', value: 'name-asc' },
	{ text: 'Name (Z-A)', value: 'name-dsc' },
];

const defaultProps = {
	icon: false,
};

const propTypes = {
	icon: PropTypes.bool,
};

const SortFolders = ({ icon }) => {
	const [{ settings }, dispatch] = useStateValue();
	const { sortFolders } = settings;
	const [anchorEl, setAnchorEl] = useState(null);
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = useState(options.findIndex((item) => item.value === sortFolders));

	const handleClose = () => setAnchorEl(null);

	const handleClickListItem = (event) => setAnchorEl(event.currentTarget);

	const handleClickMenuItem = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);

		dispatch({
			type: 'settings-sortFolders',
			value: options[index].value,
		});
	};

	return (
		<>
			<ListItem
				button
				aria-haspopup="true"
				aria-controls="sort-menu"
				aria-label="sort folders"
				onClick={handleClickListItem}
			>
				{icon && (
					<ListItemIcon>
						<SortIcon />
					</ListItemIcon>
				)}
				<ListItemText
					primary="Sort Folders"
					secondary={options[selectedIndex].text}
				/>
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

SortFolders.defaultProps = defaultProps;
SortFolders.propTypes = propTypes;

export default SortFolders;
