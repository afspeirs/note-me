import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import {
	IconButton,
	MenuItem,
	Tooltip,
} from '@material-ui/core';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Home as HomeIcon,
	Save as SaveIcon,
	Settings as SettingsIcon,
	MoreVert as MoreIcon,
} from '@material-ui/icons';

import { MenuStyled } from './HeaderContent.styled';

const propTypes = {
	edit: PropTypes.bool.isRequired,
	mobile: PropTypes.bool.isRequired,
	setEdit: PropTypes.func.isRequired,
};

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const HeaderContent = ({ edit, mobile, setEdit }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<Route
				render={({ location }) => location.pathname.startsWith('/note/') && (
					<Tooltip title="Home">
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

			{mobile ? (
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

					<MenuStyled
						id="more-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem
							onClick={handleClose}
							component={AdapterLink}
							to="/note/"
						>
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
					</MenuStyled>
				</>
			) : (
				<>
					<Tooltip title="Create Note">
						<IconButton
							color="inherit"
							aria-label="Create Note"
							onClick={handleClose}
							component={AdapterLink}
							to="/note/"
						>
							<AddIcon />
						</IconButton>
					</Tooltip>

					<Route
						render={({ location }) => location.pathname !== '/' && (
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
