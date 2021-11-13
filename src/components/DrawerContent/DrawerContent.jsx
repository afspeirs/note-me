import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {
	Add as AddIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';

import NotesList from '@/components/NotesList';
import RouterNavLink from '@/components/shared/RouterNavLink';
import { useNotes } from '@/hooks/Notes';

const DrawerContent = () => {
	const { createNote } = useNotes();

	return (
		<>
			<NotesList />

			<Divider />

			<List disablePadding>
				<ListItem
					button
					onClick={() => createNote()}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary="Create Note" />
				</ListItem>
				<ListItem
					button
					component={RouterNavLink}
					to="/settings/"
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItem>
			</List>
		</>
	);
};

export default DrawerContent;
