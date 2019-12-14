import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
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
	Edit as EditIcon,
	Delete as DeleteIcon,
	Home as HomeIcon,
	Save as SaveIcon,
	Settings as SettingsIcon,
	MoreVert as MoreIcon,
} from '@material-ui/icons';
import withConfirm from 'material-ui-confirm';

import useStyles from './HeaderContent.styled';
import AdapterLink from '../AdapterLink';
import { useAuth } from '../AuthContext';
import { useNotes } from '../NotesContext';

const propTypes = {
	confirm: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
	mobile: PropTypes.bool.isRequired,
	setEdit: PropTypes.func.isRequired,
};

const HeaderContent = ({
	confirm,
	edit,
	mobile,
	setEdit,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const { isSignedIn } = useAuth();
	const { handleNoteAdd, handleNoteDelete } = useNotes();
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleNoteAddClick = () => {
		handleNoteAdd(history);
		handleClose();
	};
	const handleNoteDeleteOptions = {
		title: 'Are you sure you want to delete this note?',
		confirmationText: 'Delete',
		dialogProps: {
			onEnter: handleClose,
		},
	};

	return (
		<>
			{(
				// If SettingsPage is open and the previousLocation is NotePage
				// Or if the page is NotePage
				(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
				|| location.pathname.startsWith('/note/')
			) && (
				<Tooltip title={edit ? 'Save' : 'Edit'}>
					<IconButton
						color="inherit"
						aria-label={edit ? 'Save' : 'Edit'}
						onClick={() => setEdit(!edit)}
					>
						{edit ? <SaveIcon /> : <EditIcon />}
					</IconButton>
				</Tooltip>
			)}

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
							<MenuItem
								onClick={confirm(
									() => handleNoteDelete(location.pathname.replace(/^(.*[/])/, ''), history),
									handleNoteDeleteOptions,
								)}
							>
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
								onClick={confirm(
									() => handleNoteDelete(location.pathname.replace(/^(.*[/])/, ''), history),
									handleNoteDeleteOptions,
								)}
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

export default withConfirm(HeaderContent);
