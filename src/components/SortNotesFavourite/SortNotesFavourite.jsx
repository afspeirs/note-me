import {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';
import {
	Star as StarIcon,
} from '@material-ui/icons';

import useStyles from './SortNotesFavourite.styled';
import { useAuth } from '../../hooks/Auth';
import { useGlobalState } from '../../hooks/GlobalState';

const SortNotesFavourite = () => {
	const { isSignedIn } = useAuth();
	const [{ settings: { sortNotesFavourite } }, dispatch] = useGlobalState();
	const classes = useStyles();

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
			<ListItemSecondaryAction className={classes.listItemSecondaryAction}>
				<Switch
					color="primary"
					edge="end"
					checked={sortNotesFavourite}
					inputProps={{ 'aria-labelledby': 'change-sort-favourite' }}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SortNotesFavourite;
