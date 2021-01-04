import { useRef, useState } from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
} from '@material-ui/core';

import useStyles from './ChangeTheme.styled';
import { useGlobalState } from '../../hooks/GlobalState';

const options = [
	{ text: 'Dark', value: 'dark' },
	{ text: 'Light', value: 'light' },
	{ text: 'System Default', value: 'default' },
];

const ChangeTheme = () => {
	const [{ settings: { appTheme } }, dispatch] = useGlobalState();
	const [anchorEl, setAnchorEl] = useState(null);
	const anchorRef = useRef(null);
	const classes = useStyles();
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = useState(options.findIndex((item) => item.value === appTheme));

	const handleClose = () => setAnchorEl(null);

	const handleClickListItem = () => setAnchorEl(anchorRef.current);

	const handleClickMenuItem = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);

		dispatch({
			type: 'settings-appTheme',
			value: options[index].value,
		});
	};

	return (
		<>
			<ListItem
				button
				aria-haspopup="true"
				aria-controls="change-theme"
				aria-label="Theme"
				onClick={handleClickListItem}
			>
				<ListItemText primary="Theme" />
				<ListItemSecondaryAction className={classes.secondaryText} ref={anchorRef}>
					{options[selectedIndex].text}
				</ListItemSecondaryAction>
			</ListItem>
			<Menu
				id="change-theme"
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

export default ChangeTheme;
