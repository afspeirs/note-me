import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Button,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';

import useStyles from './HomePage.styled';
import NotesSearch from '../../components/NotesSearch';
import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';

const HomePage = () => {
	const { signIn, user } = useAuth();
	const { loading, notes } = useNotes();
	const { label } = useParams();
	const classes = useStyles();
	const [filteredNotes, setFilteredNotes] = useState([]);

	useEffect(() => {
		setFilteredNotes(label ? notes.filter((note) => note?.labels?.includes(label)) : []);
	}, [label, notes]); // eslint-disable-line

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
				<NotesSearch notes={filteredNotes.length ? filteredNotes : notes} />
			)}
		</div>
	);
};

export default HomePage;
