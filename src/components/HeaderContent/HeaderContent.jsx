import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
} from '@material-ui/core';
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Home as HomeIcon,
	MoreVert as MoreIcon,
	Settings as SettingsIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './HeaderContent.styled';
import AdapterLink from '../AdapterLink';
import { useAuth } from '../../hooks/AuthContext';
import { useNotes } from '../../hooks/NotesContext';

const propTypes = {
	mobile: PropTypes.bool.isRequired,
};

const HeaderContent = ({ mobile }) => {
	const classes = useStyles();
	const confirm = useConfirm();
	const { isSignedIn } = useAuth();
	const {
		addNote,
		currentNote,
		favouriteNote,
		deleteNote,
	} = useNotes();
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	const handleAddNote = () => {
		addNote();
		handleClose();
	};

	const handleDeleteNote = () => {
		confirm({
			title: `Are you sure you want to delete "${currentNote.title}"?`,
			confirmationText: 'Delete',
			dialogProps: {
				onEnter: handleClose,
			},
		})
			.then(() => deleteNote(currentNote.id));
	};

	const handleFavouriteNote = () => {
		favouriteNote(currentNote.id);
		handleClose();
	};

	const headerItems = [
		{
			icon: <AddIcon />,
			onClick: handleAddNote,
			text: 'Create Note',
			hidden: isSignedIn,
		},
		{
			icon: currentNote?.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
			onClick: handleFavouriteNote,
			text: currentNote?.favourite ? 'Unfavourite' : 'Favourite',
			hidden: currentNote,
		},
		{
			icon: <DeleteIcon />,
			onClick: handleDeleteNote,
			text: 'Delete Note',
			hidden: currentNote,
		},
		{
			component: AdapterLink,
			icon: <HomeIcon />,
			onClick: handleClose,
			text: 'Home',
			to: '/',
			hidden: (
				// If SettingsPage is open and the previousLocation is HomePage
				// Or if the page is not HomePage
				!(location.pathname === '/settings/' && window.previousLocation?.pathname === '/')
				&& location.pathname !== '/'
			),
		},
		{
			component: AdapterLink,
			icon: <SettingsIcon />,
			onClick: handleClose,
			text: 'Settings',
			to: {
				pathname: '/settings/',
				state: { modal: true },
			},
		},
	];

	return (
		<>
			{(isSignedIn && mobile && location.pathname !== '/') ? (
				<>
					<IconButton
						color="inherit"
						aria-label="Show more"
						aria-controls="more-menu"
						aria-haspopup="true"
						onClick={handleClick}
						edge="end"
					>
						<MoreIcon />
					</IconButton>

					<Menu
						id="more-menu"
						className={classes.menu}
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{headerItems.map((item) => (
							<MenuItem
								component={item.component}
								key={item.text}
								onClick={item.onClick}
								to={item.to}
								hidden={Boolean(item.hidden)}
								display={item.hidden ? 'block' : 'none'}
							>
								<ListItemIcon>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.text}
								/>
							</MenuItem>
						))}
					</Menu>
				</>
			) : (
				<>
					{headerItems.map((item, index) => (
						<Tooltip
							key={item.text}
							title={item.text}
							hidden={Boolean(item.hidden)}
							display={item.hidden ? 'block' : 'none'}
						>
							<IconButton
								aria-label={item.text}
								color="inherit"
								component={item.component}
								edge={index === headerItems.length - 1 && 'end'}
								onClick={item.onClick}
								to={item.to}
							>
								{item.icon}
							</IconButton>
						</Tooltip>
					))}
				</>
			)}
		</>
	);
};

HeaderContent.propTypes = propTypes;

export default HeaderContent;
