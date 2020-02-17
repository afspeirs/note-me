import React from 'react';
import {
	Divider,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import ChangeTheme from '../../components/ChangeTheme';
import CheckForUpdate from '../../components/CheckForUpdate';
import ImportExport from '../../components/ImportExport';
import Modal from '../../components/Modal';
import SortNotes from '../../components/SortNotes';
import SortNotesFavourite from '../../components/SortNotesFavourite';
import UserInformation from '../../components/UserInformation';

const SettingsPage = () => (
	<Modal title="Settings">
		<List>
			<UserInformation />
			<ListItem>
				<ListItemText primary="App version:" />
				<ListItemSecondaryAction>
					{`v${process.env.REACT_APP_VERSION}`}
				</ListItemSecondaryAction>
			</ListItem>
			<CheckForUpdate />

			<Divider />

			<ChangeTheme />
			<SortNotesFavourite />
			<SortNotes />

			<Divider />

			<ImportExport />
		</List>
	</Modal>
);

export default SettingsPage;
