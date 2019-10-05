import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Route } from 'react-router-dom';
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
import { useStateValue } from '../StateContext';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	edit: PropTypes.bool.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	history: PropTypes.instanceOf(Object).isRequired,
	isSignedIn: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
	setEdit: PropTypes.func.isRequired,
};

const Container = ({
	children,
	edit,
	handleNoteDelete,
	history,
	isSignedIn,
	loading,
	notes,
	setEdit,
}) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = React.useState(false);
	const [{ performance }] = useStateValue();

	// Close drawer only in mobile
	const handleDrawerClose = () => (mobile) && setOpen(false);

	// Toggle drawer only in mobile unless toggle is true
	const handleDrawerToggle = (toggle = false) => ((toggle === true) || mobile) && setOpen(!open);

	// Run handleDrawerClose if the history changes
	useEffect(() => {
		const unlisten = history.listen(handleDrawerClose);
		return unlisten;
	}, [history, mobile]); // eslint-disable-line

	return (
		<div className={classes.container}>
			<AppBar position="fixed">
				<Toolbar>
					<Route
						render={({ location }) => (
							// If SettingsPage is open and the previousLocation is NotePage
							// Or if the page is NotePage
							(location.pathname === '/settings/' && window.previousLocation && window.previousLocation.pathname.startsWith('/note/'))
							|| location.pathname.startsWith('/note/')
						) && (
							<>
								{mobile ? (
									<IconButton
										className={classes.menuButton}
										color="inherit"
										aria-label="Back"
										edge="start"
										onClick={history.goBack}
									>
										<ArrowBackIcon />
									</IconButton>
								) : (
									<IconButton
										className={classes.menuButton}
										color="inherit"
										aria-label="Open drawer"
										edge="start"
										onClick={() => handleDrawerToggle(true)}
									>
										<MenuIcon />
									</IconButton>
								)}
							</>
						)}
					/>
					<Typography className={classes.title} variant="h6">NoteMe</Typography>
					<HeaderContent
						edit={edit}
						isSignedIn={isSignedIn}
						mobile={mobile}
						setEdit={setEdit}
					/>
				</Toolbar>
			</AppBar>
			<Hidden className={classes.placeholder} smUp implementation="css" />
			<SwipeableDrawer
				variant={mobile ? 'temporary' : 'persistent'}
				anchor="left"
				open={open}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				onOpen={handleDrawerToggle}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				disableBackdropTransition={performance}
			>
				<div className={classes.drawerHeader} />
				<DrawerContent
					handleDrawerToggle={handleDrawerToggle}
					handleNoteDelete={handleNoteDelete}
					loading={loading}
					notes={notes}
				/>
			</SwipeableDrawer>
			<div
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
				open={open}
			>
				<div className={classes.drawerHeader} />
				{children}
			</div>
		</div>
	);
};

Container.propTypes = propTypes;

export default Container;
