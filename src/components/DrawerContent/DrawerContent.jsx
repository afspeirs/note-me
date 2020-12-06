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
import AdapterLink from '../AdapterLink';
import LabelsList from '../LabelsList';
import RenderLink from '../RenderLink';

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
					component={RenderLink}
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
					component={AdapterLink}
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
