import { useMemo } from 'react';
import {
	Button,
	Fab,
	Link,
	List,
	ListItem,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	Add as AddIcon,
	Search as SearchIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';

import NotesList from '@/components/NotesList';
import NotesSearch from '@/components/NotesSearch';
import Page from '@/components/shared/Page';
import RouterLink from '@/components/shared/RouterLink';
import { useAuth } from '@/hooks/Auth';
import { useGlobalState } from '@/hooks/GlobalState';
import { useNotes } from '@/hooks/Notes';
import styles from './Home.styled';

const Home = () => {
	const { signIn, isSignedIn } = useAuth();
	const [{ search }, dispatch] = useGlobalState();
	const { createNote, loading } = useNotes();

	const headerItems = useMemo(() => [
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
			extra: <NotesSearch />,
		},
		{
			icon: <SettingsIcon />,
			component: RouterLink,
			to: '/settings/',
			text: 'Settings',
		},
	].filter((item) => item.visible !== false), [isSignedIn]);

	return (
		<Page
			disableHeaderItemsOverflowMenu
			headerItems={headerItems}
			showBackButton={false}
			title="NoteMe"
		>
			{!isSignedIn && !loading ? (
				<List>
					{/* eslint-disable max-len */}
					<ListItem>
						<ListItemText primary={`Hello and welcome to ${import.meta.env.VITE_APP_TITLE}`} />
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

					{!isSignedIn && !loading ? (
						<>
							<ListItem>
								<ListItemText primary="Once signed in you can access your notes from any device, and changes will be reflected across other devices seamlessly." />
							</ListItem>
							{/* eslint-enable max-len */}

							<ListItem>
								<Button variant="contained" color="primary" onClick={signIn}>
									Sign in with Google
								</Button>
							</ListItem>
						</>
					) : (
						<ListItem>
							<ListItemText primary="Select a note from the left side to get started" />
						</ListItem>
					)}
				</List>
			) : (
				<>
					<NotesList />

					<Tooltip title="Create Note">
						<Fab
							color="primary"
							aria-label="Create Note"
							onClick={() => createNote()}
							sx={styles.fab}
						>
							<AddIcon />
						</Fab>
					</Tooltip>
				</>
			)}
		</Page>
	);
};

export default Home;
