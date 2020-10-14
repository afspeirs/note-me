import React from 'react';
import {
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import { useGlobalState } from '../../hooks/GlobalState';

const AddToHomescreen = () => {
	const [{ beforeInstallPrompt }] = useGlobalState();

	const handleButtonClick = () => {
		beforeInstallPrompt.prompt();
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
