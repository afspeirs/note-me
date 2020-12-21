import React from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListSubheader,
	ListItemText,
} from '@material-ui/core';
import {
	Label as LabelIcon,
} from '@material-ui/icons';

import useStyles from './LabelsList.styled';
import RouterNavLink from '../RouterNavLink';
import { useNotes } from '../../hooks/Notes';

const LabelsList = () => {
	const { labels, loading } = useNotes();
	const classes = useStyles();

	return (
		<>
			<ListSubheader component="div" className={classes.subheader} id="labels-list-subheader">
				Labels
			</ListSubheader>
			<List
				className={classes.list}
				aria-labelledby="labels-list-subheader"
			>
				{labels.length === 0 && loading === false && (
					<ListItem>
						<ListItemText primary="No labels found" />
					</ListItem>
				)}
				{labels.map((label) => (
					<ListItem
						key={`note-${label}`}
						button
						to={`/${label}`}
						className={classes.listItem}
						component={RouterNavLink}
					>
						<ListItemIcon>
							<LabelIcon />
						</ListItemIcon>
						<ListItemText
							className={classes.listItemText}
							primary={label}
						/>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default LabelsList;
