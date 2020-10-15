import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import { useGlobalState } from '../../hooks/GlobalState';

const AddToHomescreen = () => {
	const [{ beforeInstallPrompt }, dispatch] = useGlobalState();

	const handleButtonClick = async () => {
		beforeInstallPrompt.prompt();

		const outcome = await beforeInstallPrompt.userChoice;
		if (outcome.outcome === 'accepted') {
			console.log('App Installed');
		} else {
			console.log('App not installed');
		}
		dispatch({
			type: 'app-beforeInstallPrompt',
			value: false,
		});
	};

	return Boolean(beforeInstallPrompt) && (
		<ListItem>
			<ListItemText primary="Add to Homescreen" />
			<ListItemSecondaryAction>
				<Button
					variant="contained"
					color="primary"
					onClick={handleButtonClick}
				>
					Install
				</Button>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default AddToHomescreen;
