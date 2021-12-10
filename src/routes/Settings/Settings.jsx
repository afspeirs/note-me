import {
	Divider,
	List,
} from '@mui/material';

import NotesExport from '@/components/NotesExport';
import SortNotesFavourite from '@/components/SortNotesFavourite';
import SortNotesOrder from '@/components/SortNotesOrder';
import SortNotesShowFolders from '@/components/SortNotesShowFolders';
import AppVersion from '@/components/shared/AppVersion';
import ChangeTheme from '@/components/shared/ChangeTheme';
import CheckForUpdate from '@/components/shared/CheckForUpdate';
import KeyboardShortcuts from '@/components/shared/KeyboardShortcuts';
import Modal from '@/components/shared/Modal';
import UserInformation from '@/components/shared/UserInformation';

const Settings = () => (
	<Modal title="Settings">
		<List>
			<UserInformation />
			<AppVersion />
			<CheckForUpdate />
			<KeyboardShortcuts />

			<Divider />

			<ChangeTheme />

			<Divider />

			<SortNotesShowFolders />
			<SortNotesFavourite />
			<SortNotesOrder />

			<Divider />

			<NotesExport />
		</List>
	</Modal>
);

export default Settings;
