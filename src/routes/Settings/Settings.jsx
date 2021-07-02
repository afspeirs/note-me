import {
	List,
	Divider,
} from '@material-ui/core';

import NotesExport from '@/components/NotesExport';
import AppVersion from '@/components/shared/AppVersion';
import ChangeTheme from '@/components/shared/ChangeTheme';
import CheckForInstallPrompt from '@/components/shared/CheckForInstallPrompt';
import CheckForUpdate from '@/components/shared/CheckForUpdate';
import Modal from '@/components/shared/Modal';
import UserInformation from '@/components/shared/UserInformation';

const Settings = () => (
	<Modal title="Settings">
		<List>
			<CheckForInstallPrompt />

			<UserInformation />
			<AppVersion />
			<CheckForUpdate />

			<Divider />

			<ChangeTheme />

			<Divider />

			<NotesExport />
		</List>
	</Modal>
);

export default Settings;
