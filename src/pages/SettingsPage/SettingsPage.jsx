import React from 'react';
import PropTypes from 'prop-types';
import {
	Divider,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import ChangeTheme from '../../components/ChangeTheme';
import CheckForUpdate from '../../components/CheckForUpdate';
import Modal from '../../components/Modal';
import SortNotes from '../../components/SortNotes';
import SortNotesFavourite from '../../components/SortNotesFavourite';
import UserInformation from '../../components/UserInformation';

const propTypes = {
	updateAvailable: PropTypes.bool.isRequired,
};

const SettingsPage = ({ updateAvailable }) => (
	<Modal title="Settings">
		<List>
			<UserInformation />
			<ListItem>
				<ListItemText primary="App version:" />
				<ListItemSecondaryAction>
					{`v${process.env.REACT_APP_VERSION}`}
				</ListItemSecondaryAction>
			</ListItem>
			<CheckForUpdate updateAvailable={updateAvailable} />
			<Divider />
			<ChangeTheme />
			<SortNotesFavourite />
			<SortNotes />
		</List>
	</Modal>
);

SettingsPage.propTypes = propTypes;

export default SettingsPage;
