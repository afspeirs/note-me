import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Route } from 'react-router-dom';
import clsx from 'clsx';
import {
	AppBar,
	Hidden,
	IconButton,
	SwipeableDrawer,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import {
	Menu as MenuIcon,
	ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';

import useStyles from './Container.styled';
import DrawerContent from '../DrawerContent';
import HeaderContent from '../HeaderContent';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const Container = ({ children }) => {
	const { currentNote } = useNotes();
	const [{ drawerOpen, settings }, dispatch] = useStateValue();
	const { disablePersistentDrawer } = settings;
	const classes = useStyles();
	const history = useHistory();
	const mobile = useMediaQuery('(max-width:600px)');
	const persistentDrawer = mobile || disablePersistentDrawer;

	// Close drawer only in mobile
	const handleDrawerClose = () => (persistentDrawer) && dispatch({
		type: 'app-drawerOpen',
		value: false,
	});

	// Toggle drawer only in mobile unless toggle is true
	const handleDrawerToggle = (toggle = false) => {
		if ((toggle === true) || persistentDrawer) {
			dispatch({ type: 'app-drawerOpen' });
		}
	};

	// Run handleDrawerClose if the history changes
	useEffect(() => {
		const unlisten = history.listen(handleDrawerClose);
		return unlisten;
	}, [history, persistentDrawer]); // eslint-disable-line

	return (
		<div className={classes.container}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={() => handleDrawerToggle(true)}
					>
						<MenuIcon />
					</IconButton>
					{persistentDrawer && (
						<Route
							render={({ location }) => (
								// If SettingsPage is open and the previousLocation is NotePage
								// Or if the page is NotePage
								(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
								|| location.pathname.startsWith('/note/')
							) && (
								<IconButton
									className={classes.menuButton}
									color="inherit"
									aria-label="Back"
									edge="start"
									onClick={history.goBack}
								>
									<ArrowBackIcon />
								</IconButton>
							)}
						/>
					)}
					<Typography className={classes.title} variant="h6" noWrap>
						{currentNote?.title || 'NoteMe'}
					</Typography>
					<HeaderContent mobile={mobile} />
				</Toolbar>
			</AppBar>
			<Hidden className={classes.placeholder} smUp={!persistentDrawer} implementation="css" />
			<SwipeableDrawer
				variant={persistentDrawer ? 'temporary' : 'persistent'}
				anchor="left"
				open={drawerOpen}
				className={clsx(classes.drawer, 'MuiDrawer')}
				classes={{
					paper: classes.drawerPaper,
				}}
				onOpen={handleDrawerToggle}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
			>
				<div className={classes.drawerHeader} />
				<DrawerContent />
			</SwipeableDrawer>
			<div
				className={clsx(classes.content, 'MuiPage', {
					[classes.contentShift]: drawerOpen && !disablePersistentDrawer,
				})}
			>
				<div className={classes.drawerHeader} />
				{children}
			</div>
		</div>
	);
};

Container.propTypes = propTypes;

export default Container;
