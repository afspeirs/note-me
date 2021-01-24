import {
	Divider,
	List,
} from '@material-ui/core';

import AppVersion from '../../components/AppVersion';
import ChangeTheme from '../../components/ChangeTheme';
import CheckForUpdate from '../../components/CheckForUpdate';
import Modal from '../../components/Modal';
import NotesExport from '../../components/NotesExport';
import SortNotesFavourite from '../../components/SortNotesFavourite';
import SortNotesOrder from '../../components/SortNotesOrder';
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
			<SortNotesOrder />

			<Divider />

			<NotesExport />
		</List>
	</Modal>
);

export default SettingsPage;
