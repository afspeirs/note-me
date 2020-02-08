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
	Settings as SettingsIcon,
	MoreVert as MoreIcon,
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
	const { handleNoteAdd, handleNoteDelete } = useNotes();
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleNoteAddClick = () => {
		handleNoteAdd();
		handleClose();
	};
	const handleNoteDeleteOptions = {
		// TODO - Get current not name
		title: 'Are you sure you want to delete this note?',
		confirmationText: 'Delete',
		dialogProps: {
			onEnter: handleClose,
		},
	};
	const handleNoteDeleteClick = () => {
		confirm(handleNoteDeleteOptions)
			.then(() => handleNoteDelete(location.pathname.replace(/^(.*[/])/, '')));
	};

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
						<MenuItem onClick={handleNoteAddClick}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Create Note" />
						</MenuItem>

						{(
							// If SettingsPage is open and the previousLocation is NotePage
							// Or if the page is NotePage
							(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
							|| location.pathname.startsWith('/note/')
						) && (
							<MenuItem onClick={handleNoteDelete}>
								<ListItemIcon>
									<DeleteIcon />
								</ListItemIcon>
								<ListItemText primary="Delete Note" />
							</MenuItem>
						)}

						{location.pathname !== '/' && (
							<MenuItem
								onClick={handleClose}
								component={AdapterLink}
								to="/"
							>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</MenuItem>
						)}

						<MenuItem
							onClick={handleClose}
							component={AdapterLink}
							to={{
								pathname: '/settings/',
								state: { modal: true },
							}}
						>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</MenuItem>
					</Menu>
				</>
			) : (
				<>
					{isSignedIn && (
						<Tooltip title="Create Note">
							<IconButton
								color="inherit"
								aria-label="Create Note"
								onClick={handleNoteAddClick}
							>
								<AddIcon />
							</IconButton>
						</Tooltip>
					)}

					{(
						// If SettingsPage is open and the previousLocation is NotePage
						// Or if the page is NotePage
						(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
						|| location.pathname.startsWith('/note/')
					) && (
						<Tooltip title="Delete">
							<IconButton
								color="inherit"
								aria-label="Delete"
								onClick={handleNoteDeleteClick}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					)}

					{(
						// If SettingsPage is open and the previousLocation is HomePage
						// Or if the page is not HomePage
						!(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname === '/')
						&& location.pathname !== '/'
					) && (
						<Tooltip title="Home">
							<IconButton
								color="inherit"
								aria-label="Home"
								onClick={handleClose}
								component={AdapterLink}
								to="/"
							>
								<HomeIcon />
							</IconButton>
						</Tooltip>
					)}

					<Tooltip title="Settings">
						<IconButton
							aria-label="setting"
							color="inherit"
							edge="end"
							onClick={handleClose}
							component={AdapterLink}
							to={{
								pathname: '/settings/',
								state: { modal: true },
							}}
						>
							<SettingsIcon />
						</IconButton>
					</Tooltip>
				</>
			)}
		</>
	);
};

HeaderContent.propTypes = propTypes;

export default HeaderContent;
