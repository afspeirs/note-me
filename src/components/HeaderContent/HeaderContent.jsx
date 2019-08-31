import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import {
	IconButton,
	MenuItem,
} from '@material-ui/core';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Home as HomeIcon,
	Save as SaveIcon,
	MoreVert as MoreIcon,
} from '@material-ui/icons';

import { MenuStyled } from './HeaderContent.styled';
import Settings from '../Settings';

const defaultProps = {
	user: null,
	fullScreen: false,
};

const propTypes = {
	edit: PropTypes.bool.isRequired,
	fullScreen: PropTypes.bool,
	setEdit: PropTypes.func.isRequired,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const HeaderIcons = ({
	edit,
	fullScreen,
	setEdit,
	signIn,
	signOut,
	user,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<Route
				render={({ location }) => location.pathname !== '/' && (
					<>
						<IconButton
							color="inherit"
							aria-label={edit ? 'Save' : 'Edit'}
							onClick={() => setEdit(!edit)}
						>
							{edit ? <SaveIcon /> : <EditIcon />}
						</IconButton>
					</>
				)}
			/>

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

				<Settings
					fullScreen={fullScreen}
					handleMenuClose={handleClose}
					signIn={signIn}
					signOut={signOut}
					user={user}
				/>
			</MenuStyled>
		</>
	);
};
HeaderIcons.defaultProps = defaultProps;
HeaderIcons.propTypes = propTypes;

export default HeaderIcons;
