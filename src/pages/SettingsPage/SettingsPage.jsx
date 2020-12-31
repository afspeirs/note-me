import {
	Divider,
	List,
} from '@material-ui/core';

import AppVersion from '../../components/AppVersion';
import ChangeTheme from '../../components/ChangeTheme';
import CheckForUpdate from '../../components/CheckForUpdate';
import NotesExport from '../../components/NotesExport';
import Modal from '../../components/Modal';
import SortNotes from '../../components/SortNotes';
import SortNotesFavourite from '../../components/SortNotesFavourite';
import UserInformation from '../../components/UserInformation';

const SettingsPage = () => (
	<Modal title="Settings">
		<List>
			<UserInformation />
			<AppVersion />
			<CheckForUpdate />

			<Divider />

			<ChangeTheme />

			<Divider />

			<SortNotesFavourite />
			<SortNotes />

			<Divider />

			<NotesExport />
		</List>
	</Modal>
);

export default SettingsPage;
