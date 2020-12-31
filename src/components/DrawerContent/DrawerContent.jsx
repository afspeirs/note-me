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
import RouterNavLink from '../RouterNavLink';
import RouterLink from '../RouterLink';

const DrawerContent = () => {
	const classes = useStyles();

	return (
		<>
			<List className={classes.list} disablePadding>
				<ListItem>
					<ListItemText
						primary="NoteMe"
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
					<ListItemText
						className={classes.listItemText}
						primary="All Notes"
					/>
				</ListItem>

				<LabelsList />
			</List>

			<Divider />

			<List disablePadding>
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
