import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	List,
	ListItem,
	ListItemText,
	useMediaQuery,
} from '@material-ui/core';

import useStyles from './HomePage.styled';
import { useAuth } from '../../components/AuthContext';
import { useNotes } from '../../components/NotesContext';
import NotesSearch from '../../components/NotesSearch';

const propTypes = {
	drawerOpen: PropTypes.bool.isRequired,
};

const HomePage = ({ drawerOpen }) => {
	const { signIn, user } = useAuth();
	const { handleNoteDelete, loading, notes } = useNotes();
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
						<NotesSearch
							handleNoteDelete={handleNoteDelete}
							loading={loading}
							notes={notes}
						/>
					)}
				</>
			)}
		</div>
	);
};

HomePage.propTypes = propTypes;

export default HomePage;
