import React from 'react';
import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Tooltip,
} from '@material-ui/core';
import {
	ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import useStyles from './UserInformation.styled';
import { useAuth } from '../../hooks/AuthContext';
import blankUserPhoto from '../../img/blank-user-photo.png';

const UserInformation = () => {
	const { signIn, signOut, user } = useAuth();
	const classes = useStyles();

	return (
		<>
			{user ? (
				<ListItem>
					<ListItemAvatar>
						<Avatar alt={user.displayName} src={user.photoURL} />
					</ListItemAvatar>
					<ListItemText primary={user.displayName} secondary={user.email} />
					<ListItemSecondaryAction>
						<Tooltip title="Sign Out" placement="left">
							<IconButton
								aria-label="sign out"
								color="inherit"
								edge="end"
								onClick={signOut}
							>
								<ExitToAppIcon />
							</IconButton>
						</Tooltip>
					</ListItemSecondaryAction>
				</ListItem>
			) : (
				<ListItem button onClick={signIn}>
					<ListItemAvatar>
						<Avatar>
							<img className={classes.accountIcon} src={blankUserPhoto} alt="not signed in" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Sign In" secondary="Using your Google Account" />
				</ListItem>
			)}
		</>
	);
};

export default UserInformation;
