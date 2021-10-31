import {
	Divider,
	List,
} from '@mui/material';

import NotesExport from '@/components/NotesExport';
import SortNotesFavourite from '@/components/SortNotesFavourite';
import SortNotesOrder from '@/components/SortNotesOrder';
import AppVersion from '@/components/shared/AppVersion';
import ChangeTheme from '@/components/shared/ChangeTheme';
import CheckForInstallPrompt from '@/components/shared/CheckForInstallPrompt';
import CheckForUpdate from '@/components/shared/CheckForUpdate';
import KeyboardShortcuts from '@/components/shared/KeyboardShortcuts';
import Page from '@/components/shared/Page';
import UserInformation from '@/components/shared/UserInformation';

const Settings = () => (
	<Page title="Settings">
		<List>
			<CheckForInstallPrompt />

			<UserInformation />
			<AppVersion />
			<CheckForUpdate />
			<KeyboardShortcuts />

			<Divider />

			<ChangeTheme />

			<Divider />

			<SortNotesFavourite />
			<SortNotesOrder />

			<Divider />

			<NotesExport />
		</List>
	</Page>
);

export default Settings;
