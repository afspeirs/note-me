import React from 'react';
import { NavLink } from 'react-router-dom';
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
import { useNotes } from '../../hooks/Notes';

const LabelsList = () => {
	const { labels, loading } = useNotes();
	const classes = useStyles();

	// TODO: Refactor into its own file
	const renderLink = React.useMemo(
		() => React.forwardRef((props, ref) => (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<NavLink {...props} innerRef={ref} />
		)),
		[],
	);

	return (
		<>
			<List
				className={classes.list}
				aria-labelledby="labels-list-subheader"
				subheader={(
					<ListSubheader component="div" id="labels-list-subheader">
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
						component={renderLink}
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
