import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import {
	IconButton,
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

import useStyles from './HeaderContent.styled';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const propTypes = {
	edit: PropTypes.bool.isRequired,
	isSignedIn: PropTypes.bool.isRequired,
	handleNoteAdd: PropTypes.func.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	history: PropTypes.instanceOf(Object).isRequired,
	mobile: PropTypes.bool.isRequired,
	setEdit: PropTypes.func.isRequired,
};

const HeaderContent = ({
	edit,
	isSignedIn,
	handleNoteAdd,
	handleNoteDelete,
	history,
	mobile,
	setEdit,
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleNoteAddClick = () => {
		handleNoteAdd(history);
		handleClose();
	};
	const handleNoteDeleteClick = (location, history) => {
		handleNoteDelete(location.pathname.replace(/^(.*[/])/, ''), history)
		handleClose();
	};

	return (
		<>
			<Route
				render={({ location }) => (
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
			/>

			{(isSignedIn && mobile) ? (
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
							<IconButton
								color="inherit"
								aria-label="Create Note"
								edge="start"
							>
								<AddIcon />
							</IconButton>
							<span>Create Note</span>
						</MenuItem>

						<Route
							render={({ location }) => location.pathname !== '/' && (
								<MenuItem
									onClick={handleClose}
									component={AdapterLink}
									to="/"
								>
									<IconButton
										color="inherit"
										aria-label="Home"
										edge="start"
									>
										<HomeIcon />
									</IconButton>
									<span>Home</span>
								</MenuItem>
							)}
						/>

						<Route
							render={({ location }) => (
								// If SettingsPage is open and the previousLocation is NotePage
								// Or if the page is NotePage
								(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
								|| location.pathname.startsWith('/note/')
							) && (
								<MenuItem onClick={() => handleNoteDeleteClick(location, history)}>
									<IconButton
										color="inherit"
										aria-label="Delete"
										edge="start"
									>
										<DeleteIcon />
									</IconButton>
									<span>Delete</span>
								</MenuItem>
							)}
						/>

						<MenuItem
							onClick={handleClose}
							component={AdapterLink}
							to={{
								pathname: '/settings/',
								state: { modal: true },
							}}
						>
							<IconButton
								aria-label="setting"
								color="inherit"
								edge="start"
							>
								<SettingsIcon />
							</IconButton>
							<span>Settings</span>
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

					<Route
						render={({ history, location }) => (
							// If SettingsPage is open and the previousLocation is NotePage
							// Or if the page is NotePage
							(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
							|| location.pathname.startsWith('/note/')
						) && (
							<Tooltip title="Delete">
								<IconButton
									color="inherit"
									aria-label="Delete"
									onClick={() => handleNoteDelete(location.pathname.replace(/^(.*[/])/, ''), history)}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						)}
					/>

					<Route
						render={({ location }) => (
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
					/>

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
