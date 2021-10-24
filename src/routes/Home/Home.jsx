import {
	Button,
	Link,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';

import Page from '@/components/shared/Page';
import { useAuth } from '@/hooks/Auth';
import { useNotes } from '@/hooks/Notes';

const Home = () => {
	const { signIn, user } = useAuth();
	const { loading } = useNotes();

	return (
		<Page title="NoteMe">

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

				{!user && !loading ? (
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
		</Page>
	);
};

export default Home;
