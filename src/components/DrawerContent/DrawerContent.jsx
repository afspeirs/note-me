import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Create as NotesIcon,
	Settings as SettingsIcon,
} from '@material-ui/icons';

import LabelsList from '@/components/LabelsList';
import SortNotesFavourite from '@/components/SortNotesFavourite';
import SortNotesOrder from '@/components/SortNotesOrder';
import RouterLink from '@/components/shared/RouterLink';
import RouterNavLink from '@/components/shared/RouterNavLink';
import useStyles from './DrawerContent.styled';

const DrawerContent = () => {
	const classes = useStyles();

	return (
		<>
			<List className={classes.list} disablePadding>
				<ListItem>
					<ListItemText
						primary={import.meta.env.VITE_APP_TITLE}
						primaryTypographyProps={{
							color: 'textSecondary',
							component: 'h1',
							variant: 'h5',
						}}
						secondary={import.meta.env.PACKAGE_VERSION}
						secondaryTypographyProps={{
							component: 'span',
						}}
					/>
				</ListItem>
				<ListItem
					button
					exact
					to="/"
					className={classes.listItem}
					component={RouterNavLink}
				>
					<ListItemIcon>
						<NotesIcon />
					</ListItemIcon>
					<ListItemText primary="All Notes" />
				</ListItem>

				<LabelsList />
			</List>

			<Divider />

			<List disablePadding>
				<SortNotesFavourite />
				<SortNotesOrder />

				<Divider />

				<ListItem
					button
					component={RouterLink}
					to="/settings/"
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItem>
			</List>
		</>
	);
};

export default DrawerContent;
