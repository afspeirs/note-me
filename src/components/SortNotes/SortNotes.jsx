import React, { useState } from 'react';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
} from '@material-ui/core';
import {
	Sort as SortIcon,
} from '@material-ui/icons';

import { useStateValue } from '../StateContext';
import { MenuStyled } from './SortNotes.styled';

const options = [
	{ text: 'Date: Last Updated', value: 'date-asc' },
	{ text: 'Date: Oldest', value: 'date-dsc' },
	{ text: 'Title: A-Z', value: 'title-asc' },
	{ text: 'Title: Z-A', value: 'title-dsc' },
];

const SortNotes = () => {
	const [{ sort }, dispatch] = useStateValue();
	const [value, setValue] = useState(sort);
	const [anchorEl, setAnchorEl] = React.useState(null);
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = React.useState(options.findIndex(item => item.value === value));

	const handleClose = () => setAnchorEl(null);

	const handleClickListItem = event => setAnchorEl(event.currentTarget);

	const handleClickMenuItem = (event, index) => {
		setValue(options[index].value);
		setSelectedIndex(index);
		setAnchorEl(null);

		dispatch({
			type: 'changeSort',
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
				<ListItemIcon>
					<SortIcon />
				</ListItemIcon>
				<ListItemText
					primary="Sort Notes"
					secondary={options[selectedIndex].text}
				/>
			</ListItem>
			<MenuStyled
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
						onClick={event => handleClickMenuItem(event, index)}
					>
						{option.text}
					</MenuItem>
				))}
			</MenuStyled>
		</>
	);
};

export default SortNotes;
