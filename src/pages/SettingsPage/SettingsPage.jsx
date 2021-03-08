import {
	Divider,
	List,
} from '@material-ui/core';

import AppVersion from '../../components/shared/AppVersion';
import ChangeTheme from '../../components/shared/ChangeTheme';
import CheckForInstallPrompt from '../../components/shared/CheckForInstallPrompt';
import CheckForUpdate from '../../components/shared/CheckForUpdate';
import Modal from '../../components/shared/Modal';
import NotesExport from '../../components/NotesExport';
import SortNotesFavourite from '../../components/SortNotesFavourite';
import SortNotesOrder from '../../components/SortNotesOrder';
import UserInformation from '../../components/shared/UserInformation';

const SettingsPage = () => (
	<Modal title="Settings">
		<List>
			<CheckForInstallPrompt />

			<UserInformation />
			<AppVersion />
			<CheckForUpdate />

			<Divider />

			<ChangeTheme />

			<Divider />

			<SortNotesFavourite />
			<SortNotesOrder />

			<Divider />

			<NotesExport />
		</List>
	</Modal>
);

export default SettingsPage;
