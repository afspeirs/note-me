import React from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Avatar,
	Dialog,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Slide,
	Toolbar,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import {
	ArrowBack as ArrowBackIcon,
	Close as CloseIcon,
	ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import useStyles from './SettingsPage.styled';
import ChangeTheme from '../../components/ChangeTheme';
import CheckForUpdate from '../../components/CheckForUpdate';
import PerformanceMode from '../../components/PerformanceMode';
import SortNotes from '../../components/SortNotes';
import blankUserPhoto from '../../img/blank-user-photo.png';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const defaultProps = {
	user: null,
};

const propTypes = {
	history: PropTypes.instanceOf(Object).isRequired,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const Settings = ({
	history,
	signIn,
	signOut,
	user,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const mobile = useMediaQuery('(max-width:600px)');

	const handleClose = (event) => {
		event.stopPropagation();
		setOpen(false);
		setTimeout(() => history.goBack(), 250);
	};

	return (
		<Dialog
			className={classes.dialog}
			fullWidth
			fullScreen={mobile}
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appbar}>
				<Toolbar>
					{mobile && (
						<IconButton
							className={classes.menuButton}
							aria-label="close"
							color="inherit"
							edge="start"
							onClick={handleClose}
						>
							<ArrowBackIcon />
						</IconButton>
					)}
					<Typography className={classes.title} variant="h6">Settings</Typography>
					{!mobile && (
						<IconButton
							aria-label="close"
							color="inherit"
							edge="end"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
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
				<CheckForUpdate />
				<Divider />
				<PerformanceMode />
				<ChangeTheme />
				<SortNotes />
				{/* TODO - add Update app button */}
			</List>
		</Dialog>
	);
};

Settings.defaultProps = defaultProps;
Settings.propTypes = propTypes;

export default Settings;
