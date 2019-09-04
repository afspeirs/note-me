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
	MenuItem,
	Slide,
	Toolbar,
	Tooltip,
	useMediaQuery,
} from '@material-ui/core';
import {
	ArrowBack as ArrowBackIcon,
	Close as CloseIcon,
	Settings as SettingsIcon,
	ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import {
	AccountIcon,
	AppBarStyled,
	DialogStyled,
	MenuButtonStyled,
	Title,
} from './Settings.styled';
import CheckForUpdate from '../CheckForUpdate';
import PerformanceMode from '../PerformanceMode';
import SortNotes from '../SortNotes';
import blankUserPhoto from '../../img/blank-user-photo.png';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const defaultProps = {
	user: null,
	handleMenuClose: () => {},
};

const propTypes = {
	handleMenuClose: PropTypes.func,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const Settings = ({
	handleMenuClose,
	signIn,
	signOut,
	user,
}) => {
	const [open, setOpen] = React.useState(false);
	const mobile = useMediaQuery('(max-width:600px)');

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
				fullScreen={mobile}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBarStyled>
					<Toolbar>
						{mobile && (
							<MenuButtonStyled
								aria-label="close"
								color="inherit"
								edge="start"
								onClick={handleClose}
							>
								<ArrowBackIcon />
							</MenuButtonStyled>
						)}
						<Title variant="h6">Settings</Title>
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
				</AppBarStyled>
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
									<AccountIcon src={blankUserPhoto} alt="not signed in" />
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
					<SortNotes />
					{/* TODO - add Update app button */}
				</List>
			</DialogStyled>
		</>
	);
};

Settings.defaultProps = defaultProps;
Settings.propTypes = propTypes;

export default Settings;
