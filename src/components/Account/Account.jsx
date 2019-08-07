import React from 'react';
import PropTypes from 'prop-types';
import {
	IconButton,
	MenuItem,
} from '@material-ui/core';
import {
	AccountCircle,
} from '@material-ui/icons';

import { AvatarStyled, MenuStyled } from './Account.styled';

const defaultProps = {
	user: null,
};

const propTypes = {
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const Account = ({
	signIn,
	signOut,
	user,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleSignIn = () => {
		signIn();
		handleClose();
	};
	const handleSignOut = () => {
		signOut();
		handleClose();
	};

	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				{user
					? <AvatarStyled alt={user.displayName} src={user.photoURL} />
					: <AccountCircle />
				}
			</IconButton>
			<MenuStyled
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>{`v${process.env.REACT_APP_VERSION}`}</MenuItem>
				{user
					? <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
					: <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
				}
			</MenuStyled>
		</div>
	);
};

Account.propTypes = defaultProps;
Account.propTypes = propTypes;

export default Account;
