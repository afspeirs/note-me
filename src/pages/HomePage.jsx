import React from 'react';
import {
	Button,
	List,
	ListItem,
	ListItemText,
	useMediaQuery,
} from '@material-ui/core';

import useStyles from './HomePage.styled';
import FolderList from '../components/FolderList';
import { useAuth } from '../hooks/AuthContext';
import { useNotes } from '../hooks/NotesContext';
import { useStateValue } from '../hooks/StateContext';

const HomePage = () => {
	const { signIn, user } = useAuth();
	const { loading } = useNotes();
	const [{ drawerOpen, settings }] = useStateValue();
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
						<FolderList />
					)}
				</>
			)}
		</div>
	);
};

export default HomePage;
