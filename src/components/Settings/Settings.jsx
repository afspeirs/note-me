import React from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Avatar,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	MenuItem,
	Slide,
	Toolbar,
	Typography,
} from '@material-ui/core';
import {
	Close as CloseIcon,
	Settings as SettingsIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import SortNotes from '../SortNotes';
import blankUserPhoto from '../../img/blank-user-photo.png';
import { AccountIcon, DialogStyled } from './Settings.styled';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const defaultProps = {
	user: null,
	handleMenuClose: () => {},
	fullScreen: false,
};

const propTypes = {
	fullScreen: PropTypes.bool,
	handleMenuClose: PropTypes.func,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const useStyles = makeStyles(() => ({
	appBar: {
		position: 'relative',
	},
	title: {
		flex: 1,
	},
}));

const Settings = ({
	fullScreen,
	handleMenuClose,
	signIn,
	signOut,
	user,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		handleMenuClose();
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	return (
		<>
			<MenuItem onClick={handleOpen}>
				<IconButton
					aria-label="setting"
					color="inherit"
					edge="start"
				>
					<SettingsIcon />
				</IconButton>
				<span>Settings</span>
			</MenuItem>

			<DialogStyled
				fullWidth
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>Settings</Typography>
						<IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List>
					{user ? (
						<ListItem>
							<ListItemAvatar>
								<Avatar alt={user.displayName} src={user.photoURL} />
							</ListItemAvatar>
							<ListItemText primary={user.displayName} secondary={user.email} />
						</ListItem>
					) : (
						<ListItem button onClick={signIn}>
							<ListItemAvatar>
								<Avatar>
									<AccountIcon src={blankUserPhoto} alt="not signed in" />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Sign In" secondary="Using your Google Account" />
						</ListItem>
					)}
					{user && (
						<ListItem button onClick={signOut}>
							<ListItemText primary="Sign Out" />
						</ListItem>
					)}
					<Divider />
					<ListItem>
						<ListItemText primary="App version:" />
						<ListItemSecondaryAction>
							{`v${process.env.REACT_APP_VERSION}`}
						</ListItemSecondaryAction>
					</ListItem>
					{/* TODO - add Update app button */}
					<SortNotes />
				</List>
			</DialogStyled>
		</>
	);
};

Settings.defaultProps = defaultProps;
Settings.propTypes = propTypes;

export default Settings;
