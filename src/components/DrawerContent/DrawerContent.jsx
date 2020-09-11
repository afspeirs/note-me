import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Add as AddIcon,
	Create as NotesIcon,
} from '@material-ui/icons';

import useStyles from './DrawerContent.styled';
import LabelsList from '../LabelsList';
import { useAuth } from '../../hooks/Auth';
import { useNotes } from '../../hooks/Notes';

const DrawerContent = () => {
	const { isSignedIn } = useAuth();
	const { addNote } = useNotes();
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
			<List>
				<ListItem
					button
					exact
					to="/"
					className={classes.listItem}
					component={renderLink}
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

			{isSignedIn && (
				<>
					<Divider />

					<List disablePadding>
						<ListItem button onClick={() => addNote('')}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Create Note" />
						</ListItem>
					</List>
				</>
			)}
		</>
	);
};

export default DrawerContent;
