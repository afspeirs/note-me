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
import { useConfirm } from 'material-ui-confirm';

import useStyles from './UserInformation.styled';
import { useAuth } from '../../../hooks/Auth';
import blankUserPhoto from '../../../img/blank-user-photo.png';

const UserInformation = () => {
	const { signIn, signOut, user } = useAuth();
	const confirm = useConfirm();
	const classes = useStyles();

	const handleSignOutClick = () => confirm({
		title: 'Are you sure you want to sign out?',
		cancellationText: 'Cancel',
		confirmationText: 'Sign Out',
	})
		.then(signOut);

	return (
		<>
			{user ? (
				<ListItem>
					<ListItemAvatar>
						<Avatar alt={user.displayName} src={user.photoURL} />
					</ListItemAvatar>
					<ListItemText
						primary={user.displayName}
						secondary={user.email.replace(/(?!^).(?=[^@]+@)/g, '*')}
					/>
					<ListItemSecondaryAction>
						<Tooltip title="Sign Out" placement="left">
							<IconButton
								aria-label="sign out"
								color="inherit"
								edge="end"
								onClick={handleSignOutClick}
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
