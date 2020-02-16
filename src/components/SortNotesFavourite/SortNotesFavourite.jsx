import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useStateValue } from '../../hooks/StateContext';

const SortNotesFavourite = () => {
	const [{ sortFavourite }, dispatch] = useStateValue();
	const [checked, setChecked] = React.useState(sortFavourite);

	const handleToggle = () => {
		dispatch({
			type: 'changeSortFavourite',
			value: !checked,
		});

		setChecked(!checked);
	};

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
						checked={checked}
						inputProps={{ 'aria-labelledby': 'change-sort-favourite' }}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default SortNotesFavourite;