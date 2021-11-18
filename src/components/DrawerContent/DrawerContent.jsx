import {
	Divider,
	List,
} from '@mui/material';
import {
	Add as AddIcon,
	Home as HomeIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';

import NotesList from '@/components/NotesList';
import CheckForInstallPrompt from '@/components/shared/CheckForInstallPrompt';
import ListButton from '@/components/shared/ListButton';
import { useNotes } from '@/hooks/Notes';

const DrawerContent = () => {
	const { createNote } = useNotes();

	return (
		<>
			<NotesList />

			<Divider />

			<List disablePadding>
				<CheckForInstallPrompt />

				<ListButton
					Icon={AddIcon}
					onClick={() => createNote()}
					primary="Create Note"
				/>

				<ListButton
					Icon={HomeIcon}
					primary="Home"
					to="/"
				/>

				<ListButton
					Icon={SettingsIcon}
					primary="Settings"
					to="/settings/"
				/>
			</List>
		</>
	);
};

export default DrawerContent;
