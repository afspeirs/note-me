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
import { useAuth } from '../../hooks/AuthContext';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const HomePage = () => {
	const { signIn, user } = useAuth();
	const { loading } = useNotes();
	const [{ drawerOpen }] = useStateValue();
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');

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
						<NotesSearch locationSelector=".MuiPage" />
					)}
				</>
			)}
		</div>
	);
};

export default HomePage;
