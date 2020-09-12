import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
	Add as AddIcon,
	Menu as MenuIcon,
	Settings as SettingsIcon,
} from '@material-ui/icons';

import useStyles from './Container.styled';
import AdapterLink from '../AdapterLink';
import DrawerContent from '../DrawerContent';
import HeaderContent from '../HeaderContent';
import { useAuth } from '../../hooks/Auth';
import { useGlobalState } from '../../hooks/GlobalState';
import { useNotes } from '../../hooks/Notes';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const Container = ({ children }) => {
	const { isSignedIn } = useAuth();
	const [{ drawerOpen, settings: { disablePersistentDrawer } }, dispatch] = useGlobalState();
	const history = useHistory();
	const { addNote, currentNote } = useNotes();
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const persistentDrawer = mobile || disablePersistentDrawer;

	const headerItems = useMemo(() => [
		{
			icon: <AddIcon />,
			onClick: () => addNote(''),
			text: 'Create Note',
			visible: isSignedIn,
		},
		{
			component: AdapterLink,
			icon: <SettingsIcon />,
			text: 'Settings',
			to: {
				pathname: '/settings/',
				state: { modal: true },
			},
		},
	].filter((item) => item.visible !== false), [currentNote, isSignedIn]); // eslint-disable-line

	// Close drawer only in mobile
	const handleDrawerClose = () => persistentDrawer && dispatch({
		type: 'app-drawerOpen',
		value: false,
	});

	// Toggle drawer only in mobile unless toggle is true
	const handleDrawerToggle = (toggle = false) => {
		if (toggle || persistentDrawer) {
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
			<AppBar position="fixed" className={classes.appBar}>
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
					<Typography className={classes.title} variant="h6" noWrap>
						NoteMe
					</Typography>
					<HeaderContent headerItems={headerItems} forceLastIconEdge />
				</Toolbar>
			</AppBar>
			<Hidden className={classes.placeholder} smUp={!persistentDrawer} implementation="css" />
			<SwipeableDrawer
				variant={persistentDrawer ? 'temporary' : 'persistent'}
				anchor="left"
				open={drawerOpen}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				onOpen={handleDrawerToggle}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
			>
				{!persistentDrawer && <div className={classes.drawerHeader} />}
				<DrawerContent />
			</SwipeableDrawer>
			<div
				className={clsx(classes.content, {
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
