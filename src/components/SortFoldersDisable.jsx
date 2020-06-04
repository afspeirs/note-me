import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useStateValue } from '../hooks/StateContext';

const SortFoldersDisable = () => {
	const [{ settings }, dispatch] = useStateValue();
	const { sortFoldersDisable } = settings;

	const handleToggle = () => dispatch({ type: 'settings-sortFoldersDisable' });

	return (
		<ListItem>
			<ListItemText
				id="change-sort-folders-disable"
				primary="Disable folders"
			/>
			<ListItemSecondaryAction>
				<Switch
					color="primary"
					edge="end"
					onChange={handleToggle}
					checked={sortFoldersDisable}
					inputProps={{ 'aria-labelledby': 'change-sort-folders-disable' }}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SortFoldersDisable;
