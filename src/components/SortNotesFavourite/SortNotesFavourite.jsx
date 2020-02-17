import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useStateValue } from '../../hooks/StateContext';

const SortNotesFavourite = () => {
	const [{ settings }, dispatch] = useStateValue();
	const { sortFavourite } = settings;

	const handleToggle = () => dispatch({ type: 'settings-sortFavourite' });

	return (
		<>
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
						checked={sortFavourite}
						inputProps={{ 'aria-labelledby': 'change-sort-favourite' }}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default SortNotesFavourite;
