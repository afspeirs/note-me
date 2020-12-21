import React from 'react';
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
			<List>
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
			</List>

			<LabelsList />

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
