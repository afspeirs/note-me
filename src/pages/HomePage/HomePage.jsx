import React from 'react';
import {
	Button,
	List,
	ListItem,
	ListItemText,
	useMediaQuery,
} from '@material-ui/core';

import useStyles from './HomePage.styled';
import NotesSearch from '../../components/NotesSearch';
import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';
import { useGlobalState } from '../../hooks/GlobalState';

const HomePage = () => {
	const { signIn, user } = useAuth();
	const { loading } = useNotes();
	const [{ drawerOpen, settings }] = useGlobalState();
	const { disablePersistentDrawer } = settings;
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)') || disablePersistentDrawer;

	return (
		<div className={classes.page}>
			{!user && !loading ? (
				<List>
					<ListItem>
						<ListItemText primary="Please sign in below with a Google account to use this app" />
					</ListItem>
					<ListItem>
						<Button variant="contained" color="primary" onClick={signIn}>Sign In</Button>
					</ListItem>
				</List>
			) : (
				<>
					{drawerOpen && !mobile ? (
						<span className={classes.centered}>Select a note from the list</span>
					) : (
						<NotesSearch />
					)}
				</>
			)}
		</div>
	);
};

export default HomePage;
