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

import useStyles from './DrawerContent.styled';
import LabelsList from '../LabelsList';
import SortNotesFavourite from '../SortNotesFavourite';
import SortNotesOrder from '../SortNotesOrder';
import RouterLink from '../shared/RouterLink';
import RouterNavLink from '../shared/RouterNavLink';

const DrawerContent = () => {
	const classes = useStyles();

	return (
		<>
			<List className={classes.list} disablePadding>
				<ListItem>
					<ListItemText
						primary={process.env.REACT_APP_TITLE}
						primaryTypographyProps={{
							color: 'textSecondary',
							component: 'h1',
							variant: 'h5',
						}}
						secondary={process.env.REACT_APP_VERSION}
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
					to={{
						pathname: '/settings/',
						state: { modal: true },
					}}
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
