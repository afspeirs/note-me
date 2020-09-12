import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useGlobalState } from '../../hooks/GlobalState';

const SortNotesFavourite = () => {
	const [{ settings: { sortNotesFavourite } }, dispatch] = useGlobalState();

	const handleToggle = () => dispatch({ type: 'settings-sortNotesFavourite' });

	return (
		<ListItem>
			<ListItemText
				id="change-sort-favourite"
				primary="Show Favourites at the top of the list"
			/>
			<ListItemSecondaryAction>
				<Switch
					color="primary"
					edge="end"
					onChange={handleToggle}
					checked={sortNotesFavourite}
					inputProps={{ 'aria-labelledby': 'change-sort-favourite' }}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SortNotesFavourite;
