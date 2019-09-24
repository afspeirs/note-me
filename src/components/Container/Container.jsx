import React from 'react';
import PropTypes from 'prop-types';
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
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
	setEdit: PropTypes.func.isRequired,
};

const Container = ({
	children,
	edit,
	handleNoteDelete,
	loading,
	notes,
	setEdit,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
	const [{ performance }] = useStateValue();

	const handleDrawerToggle = (toggle = false) => {
		if ((toggle === true) || mobile) setOpen(!open);
	};

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
					<Typography className={classes.title} variant="h6">NoteMe</Typography>
					<HeaderContent
						edit={edit}
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
