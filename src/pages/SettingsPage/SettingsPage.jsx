import React from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Tooltip,
} from '@material-ui/core';
import {
	ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import useStyles from './SettingsPage.styled';
import { useAuth } from '../../components/AuthContext';
import ChangeTheme from '../../components/ChangeTheme';
import CheckForUpdate from '../../components/CheckForUpdate';
import Modal from '../../components/Modal';
import SortNotes from '../../components/SortNotes';
import blankUserPhoto from '../../img/blank-user-photo.png';

const propTypes = {
	updateAvailable: PropTypes.bool.isRequired,
};

const SettingsPage = ({ updateAvailable }) => {
	const { signIn, signOut, user } = useAuth();
	const classes = useStyles();


	return (
		<Modal title="Settings">
			<List>
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
				<ListItem>
					<ListItemText primary="App version:" />
					<ListItemSecondaryAction>
						{`v${process.env.REACT_APP_VERSION}`}
					</ListItemSecondaryAction>
				</ListItem>
				<CheckForUpdate updateAvailable={updateAvailable} />
				<Divider />
				<ChangeTheme />
				<SortNotes />
			</List>
		</Modal>
	);
};

SettingsPage.propTypes = propTypes;

export default SettingsPage;
