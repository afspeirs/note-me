import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import { useGlobalState } from '../../hooks/GlobalState';
import { useSnackbar } from '../../hooks/Snackbar';

const AddToHomescreen = () => {
	const [{ beforeInstallPrompt }, dispatch] = useGlobalState();
	const snackbar = useSnackbar();

	const handleButtonClick = async () => {
		beforeInstallPrompt.prompt();

		const outcome = await beforeInstallPrompt.userChoice;
		if (outcome.outcome === 'accepted') {
			dispatch({
				type: 'app-beforeInstallPrompt',
				value: false,
			});
		}

		snackbar.showMessage({
			message: 'Hide "Add to Homescreen" in Settings',
			actionText: 'Hide',
			actionFunction() {
				dispatch({
					type: 'app-beforeInstallPrompt',
					value: false,
				});
			},
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
					Add
				</Button>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default AddToHomescreen;
