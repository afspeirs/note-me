import {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@mui/material';
import {
	Star as StarIcon,
} from '@mui/icons-material';

import { useAuth } from '@/hooks/Auth';
import { useGlobalState } from '@/hooks/GlobalState';
import styles from './SortNotesFavourite.styled';

const SortNotesFavourite = () => {
	const { isSignedIn } = useAuth();
	const [{ settings: { sortNotesFavourite } }, dispatch] = useGlobalState();

	const handleToggle = () => dispatch({ type: 'settings-sortNotesFavourite' });

	return (
		<ListItem
			button
			disabled={!isSignedIn}
			onClick={handleToggle}
		>
			<ListItemIcon>
				<StarIcon />
			</ListItemIcon>
			<ListItemText
				id="change-sort-favourite"
				primary="Show Favourites first"
			/>
			<ListItemSecondaryAction sx={styles.listItemSecondary}>
				<Switch
					color="primary"
					edge="end"
					checked={sortNotesFavourite}
					inputProps={{ 'aria-labelledby': 'change-sort-favourite' }}
					tabIndex={-1}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SortNotesFavourite;
