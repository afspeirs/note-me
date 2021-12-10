import {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@mui/material';
import {
	Folder as FolderIcon,
} from '@mui/icons-material';

import { useAuth } from '@/hooks/Auth';
import { useGlobalState } from '@/hooks/GlobalState';
import styles from './SortNotesShowFolders.styled';

const SortNotesShowFolders = () => {
	const { isSignedIn } = useAuth();
	const [{ settings: { sortNotesShowFolders } }, dispatch] = useGlobalState();

	const handleToggle = () => dispatch({ type: 'settings-sortNotesShowFolders' });

	return (
		<ListItem
			button
			disabled={!isSignedIn}
			onClick={handleToggle}
		>
			<ListItemIcon>
				<FolderIcon />
			</ListItemIcon>
			<ListItemText
				id="change-sort-show-folders"
				primary="Show Folders"
			/>
			<ListItemSecondaryAction sx={styles.listItemSecondary}>
				<Switch
					color="primary"
					edge="end"
					checked={sortNotesShowFolders}
					inputProps={{ 'aria-labelledby': 'change-sort-show-folders' }}
					tabIndex={-1}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SortNotesShowFolders;
