import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useAuth } from '../../hooks/Auth';
import { useGlobalState } from '../../hooks/GlobalState';

const SortNotesFavourite = () => {
	const { isSignedIn } = useAuth();
	const [{ settings: { sortNotesFavourite } }, dispatch] = useGlobalState();

	const handleToggle = () => dispatch({ type: 'settings-sortNotesFavourite' });

	return (
		<ListItem disabled={!isSignedIn}>
			<ListItemText
				id="change-sort-favourite"
				primary="Show Favourites at the top of the list"
			/>
			<ListItemSecondaryAction>
				<Switch
					color="primary"
					disabled={!isSignedIn}
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
