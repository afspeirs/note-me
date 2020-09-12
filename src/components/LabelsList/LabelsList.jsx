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
import RenderLink from '../RenderLink';
import { useNotes } from '../../hooks/Notes';

const LabelsList = () => {
	const { labels, loading } = useNotes();
	const classes = useStyles();

	return (
		<>
			<List
				className={classes.list}
				aria-labelledby="labels-list-subheader"
				subheader={(
					<ListSubheader component="div" className={classes.subheader} id="labels-list-subheader">
						Labels
					</ListSubheader>
				)}
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
						component={RenderLink}
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
