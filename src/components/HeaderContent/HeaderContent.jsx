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
			.then(deleteNote);
	};

	const handleFavouriteNote = () => {
		favouriteNote(currentNote.id);
		handleClose();
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
						<MenuItem onClick={handleAddNote}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Create Note" />
						</MenuItem>

						{currentNote && (
							<MenuItem onClick={handleFavouriteNote}>
								<ListItemIcon>
									{currentNote.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />}
								</ListItemIcon>
								<ListItemText
									primary={currentNote.favourite ? 'Unfavourite' : 'Favourite'}
								/>
							</MenuItem>
						)}

						{currentNote && (
							<MenuItem onClick={handleDeleteNote}>
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
								onClick={handleAddNote}
							>
								<AddIcon />
							</IconButton>
						</Tooltip>
					)}

					{currentNote && (
						<Tooltip title={currentNote.favourite ? 'Unfavourite' : 'Favourite'}>
							<IconButton
								color="inherit"
								aria-label={currentNote.favourite ? 'Unfavourite' : 'Favourite'}
								onClick={handleFavouriteNote}
							>
								{currentNote.favourite ? <StarIcon /> : <StarBorderIcon />}
							</IconButton>
						</Tooltip>
					)}

					{currentNote && (
						<Tooltip title="Delete">
							<IconButton
								color="inherit"
								aria-label="Delete"
								onClick={handleDeleteNote}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					)}

					{(
						// If SettingsPage is open and the previousLocation is HomePage
						// Or if the page is not HomePage
						!(location.pathname === '/settings/' && window.previousLocation?.pathname === '/')
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
