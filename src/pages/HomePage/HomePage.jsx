import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Button,
	Fab,
	Link,
	List,
	ListItem,
	ListItemText,
	Tooltip,
	Typography,
} from '@material-ui/core';
import {
	Add as AddIcon,
} from '@material-ui/icons';

import useStyles from './HomePage.styled';
import NotesList from '../../components/NotesList';
import { useAuth } from '../../hooks/Auth';
import { useGlobalState } from '../../hooks/GlobalState';
import { useNotes } from '../../hooks/Notes';

const HomePage = () => {
	const { signIn, user } = useAuth();
	const dispatch = [...useGlobalState()].pop(); // I don't need to access any of the reducer state
	const { createNote, loading, notes } = useNotes();
	const { label } = useParams();
	const classes = useStyles();
	const [filteredNotes, setFilteredNotes] = useState([]);

	useEffect(() => {
		if (user) {
			dispatch({
				type: 'app-containerTitle',
				value: label || 'All Notes',
			});
		}

		setFilteredNotes(label ? notes.filter((note) => note?.labels?.includes(label)) : []);
	}, [label, notes]); // eslint-disable-line

	return (
		<main className={classes.page}>
			{!user && !loading ? (
				<>
					<List>
						{/* eslint-disable max-len */}
						<ListItem>
							<ListItemText primary={`Hello and welcome to ${process.env.REACT_APP_TITLE}`} />
						</ListItem>
						<ListItem>
							<Typography component="span">
								Store and edit your notes as Markdown formatted text (using
								{' '}
								<Link
									href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
									target="_blank"
									rel="noopener noreferrer"
								>
									Github flavoured markdown
								</Link>
								{' '}
								to support more features)
							</Typography>
						</ListItem>
						<ListItem>
							<ListItemText primary="Once signed in you can access your notes from any device, and changes will be reflected across other devices seamlessly." />
						</ListItem>
						<ListItem>
							<ListItemText primary="Please sign in below to be able to store and edit your markdown notes from any device" />
						</ListItem>
						{/* eslint-enable max-len */}

						<ListItem>
							<Button variant="contained" color="primary" onClick={signIn}>
								Sign in with Google
							</Button>
						</ListItem>
					</List>
				</>
			) : (
				<>
					<NotesList notes={filteredNotes.length ? filteredNotes : notes} />

					<Tooltip title="Create Note">
						<Fab
							color="primary"
							aria-label="Create Note"
							className={classes.fab}
							onClick={() => createNote('')}
						>
							<AddIcon />
						</Fab>
					</Tooltip>
				</>
			)}
		</main>
	);
};

export default HomePage;
