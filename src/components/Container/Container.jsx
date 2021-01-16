import { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
	AppBar,
	IconButton,
	SwipeableDrawer,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import {
	Add as AddIcon,
	Menu as MenuIcon,
	Search as SearchIcon,
} from '@material-ui/icons';

import useStyles from './Container.styled';
import DrawerContent from '../DrawerContent';
import HeaderContent from '../HeaderContent';
import NotesSearch from '../NotesSearch';
import { useAuth } from '../../hooks/Auth';
import { useGlobalState } from '../../hooks/GlobalState';
import { useHotkeys } from '../../hooks/Hotkeys';
import { useNotes } from '../../hooks/Notes';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const Container = ({ children }) => {
	const { isSignedIn } = useAuth();
	const [{ containerTitle, search }, dispatch] = useGlobalState();
	const history = useHistory();
	const mobile = useMediaQuery('(max-width:960px)');
	const { createNote, currentNote } = useNotes();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const classes = useStyles();

	const headerItems = useMemo(() => [
		{
			icon: <AddIcon />,
			onClick: () => createNote(''),
			text: 'Create Note',
			visible: isSignedIn,
		},
		{
			icon: <SearchIcon />,
			onClick: () => dispatch({
				type: 'app-search',
				value: {
					...search,
					show: true,
				},
			}),
			text: 'Search Notes',
			visible: isSignedIn,
		},
	].filter((item) => item.visible !== false), [currentNote, isSignedIn]); // eslint-disable-line

	// Close drawer only in mobile
	const handleDrawerClose = () => setDrawerOpen(false);

	// Toggle drawer only in mobile unless toggle is true
	const handleDrawerToggle = () => setDrawerOpen((prevState) => !prevState);

	useHotkeys([
		// B = Toggle sidebar
		{
			keys: ['b'],
			callback: (event) => {
				event.preventDefault();
				setDrawerOpen((prevState) => !prevState);
			},
			metaModifier: true,
		},
		// P or S = Disable Event
		{
			keys: ['p', 's'],
			callback: (event) => event.preventDefault(),
			metaModifier: true,
		},
	]);

	// Run handleDrawerClose if the history changes
	useEffect(() => {
		const unlisten = history.listen(handleDrawerClose);
		return unlisten;
	}, [history, mobile]); // eslint-disable-line

	return (
		<div className={classes.container}>
			<AppBar>
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} component="h1" variant="h6" noWrap>
						{containerTitle}
					</Typography>
					<HeaderContent headerItems={headerItems} forceLastIconEdge />
					<NotesSearch />
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				variant="temporary"
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
				<DrawerContent />
			</SwipeableDrawer>
			<div className={classes.content}>
				<div className={classes.drawerHeader} />
				{children}
			</div>
		</div>
	);
};

Container.propTypes = propTypes;

export default Container;
