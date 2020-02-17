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
import { useStateValue } from '../../hooks/StateContext';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const Container = ({ children }) => {
	const [{ drawerOpen }, dispatch] = useStateValue();
	const classes = useStyles();
	const history = useHistory();
	const mobile = useMediaQuery('(max-width:600px)');

	// Close drawer only in mobile
	const handleDrawerClose = () => (mobile) && dispatch({
		type: 'app-drawerOpen',
		value: false,
	});

	// Toggle drawer only in mobile unless toggle is true
	const handleDrawerToggle = (toggle = false) => {
		if ((toggle === true) || mobile) {
			dispatch({ type: 'app-drawerOpen' });
		}
	};

	// Run handleDrawerClose if the history changes
	useEffect(() => {
		const unlisten = history.listen(handleDrawerClose);
		return unlisten;
	}, [history, mobile]); // eslint-disable-line

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
					{mobile && (
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
					<Typography className={classes.title} variant="h6">NoteMe</Typography>
					<HeaderContent mobile={mobile} />
				</Toolbar>
			</AppBar>
			<Hidden className={classes.placeholder} smUp implementation="css" />
			<SwipeableDrawer
				variant={mobile ? 'temporary' : 'persistent'}
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
					[classes.contentShift]: drawerOpen,
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
