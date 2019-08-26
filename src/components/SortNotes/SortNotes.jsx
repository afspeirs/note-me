// import React, { useState } from 'react';
// import {
// 	ListItem,
// 	ListItemSecondaryAction,
// 	ListItemText,
// 	FormControl,
// 	Select,
// 	MenuItem,
// } from '@material-ui/core';

// import { useStateValue } from '../StateContext';

// const SortNotes = () => {
// 	const [{ sort }, dispatch] = useStateValue();
// 	const [value, setValue] = useState(sort);

// 	const handleChange = (event) => {
// 		dispatch({
// 			type: 'changeSort',
// 			value: event.target.value,
// 		});
// 		setValue(event.target.value);
// 	};

// 	const values = [
// 		{ text: 'Date: Last Updated', value: 'date-asc' },
// 		{ text: 'Date: Oldest', value: 'date-dsc' },
// 		{ text: 'Title: A-Z', value: 'title-asc' },
// 		{ text: 'Title: Z-A', value: 'title-dsc' },
// 	];

// 	return (
// 		<ListItem>
// 			<ListItemText primary="Sort Notes by:" />
// 			<ListItemSecondaryAction>
// 				<form autoComplete="off">
// 					<FormControl>
// 						<Select
// 							value={value}
// 							onChange={handleChange}
// 							inputProps={{
// 								name: 'sort-note',
// 								id: 'select-sort-note',
// 							}}
// 						>
// 							{values.map(item => (
// 								<MenuItem key={item.value} value={item.value}>
// 									{item.text}
// 								</MenuItem>
// 							))}
// 						</Select>
// 					</FormControl>
// 				</form>
// 			</ListItemSecondaryAction>
// 		</ListItem>
// 	);
// };


import React from 'react';
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

const options = [
	{ text: 'Date: Last Updated', value: 'date-asc' },
	{ text: 'Date: Oldest', value: 'date-dsc' },
	{ text: 'Title: A-Z', value: 'title-asc' },
	{ text: 'Title: Z-A', value: 'title-dsc' },
];

const SortNotes = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleClickListItem = event => setAnchorEl(event.currentTarget);

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<ListItem
				button
				aria-haspopup="true"
				aria-controls="sort-menu"
				aria-label="when device is sorted"
				onClick={handleClickListItem}
			>
				<ListItemIcon>
					<SortIcon />
				</ListItemIcon>
				<ListItemText primary="Sort" secondary={options[selectedIndex].text} />
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
						onClick={event => handleMenuItemClick(event, index)}
					>
						{option.text}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default SortNotes;
