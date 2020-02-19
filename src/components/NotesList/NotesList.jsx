import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Swipeout from 'rc-swipeout';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Popover,
} from '@material-ui/core';
import {
	Alarm as AlarmIcon,
	Delete as DeleteIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import TimeAgo from '../TimeAgo';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	locationSelector: PropTypes.string.isRequired,
};

const NotesList = ({ notes, locationSelector }) => {
	const confirm = useConfirm();
	const { handleNoteFavourite, handleNoteDelete, loading } = useNotes();
	const classes = useStyles();
	const [{ settings }] = useStateValue();
	const { sort, sortFavourite } = settings;
	const [contextAnchor, setContextAnchor] = useState(null);
	const sortNoteFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sort];
	const sortFavouriteFunction = (a, b) => {
		if (sortFavourite) {
			if (a.favourite === b.favourite) return 0;
			if (a.favourite) return -1;
		}
		return 1;
	};

	const sortedNotes = notes
		.sort(sortNoteFunction)
		.sort(sortFavouriteFunction);

	const renderLink = React.useMemo(
		() => React.forwardRef((props, ref) => (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<NavLink {...props} innerRef={ref} />
		)),
		[],
	);

	const handleContextMenuClose = () => setContextAnchor(null);

	const handleContextMenuOpen = (event) => {
		const closestContextMenuOption = event.target.closest('.context-menu-select');
		const closestLocationSelector = event.target.closest(locationSelector);

		// Only render if the right click occurs within the locationSelector
		if (closestContextMenuOption && closestLocationSelector) {
			event.preventDefault();
			setContextAnchor({
				left: event.pageX,
				top: event.pageY,
				id: closestContextMenuOption.dataset.id,
			});
		}
	};

	const handleNoteFavouriteClick = (id) => {
		handleContextMenuClose();
		handleNoteFavourite(id);
	};

	const handleNoteDeleteClick = ({ id, title }) => {
		confirm({
			title: `Are you sure you want to delete "${title}"?`,
			confirmationText: 'Delete',
		})
			.then(() => handleNoteDelete(id));
	};

	useEffect(() => {
		document.addEventListener('contextmenu', handleContextMenuOpen);

		return () => document.removeEventListener('contextmenu', handleContextMenuOpen);
	}, []); // eslint-disable-line

	return (
		<List className={classes.list}>
			{notes.length === 0 && loading === false && (
				<ListItem>
					<ListItemText primary="No notes" />
				</ListItem>
			)}
			{loading && (
				<ListItem>
					<ListItemText primary="Loading, please wait while we gather your notes" />
				</ListItem>
			)}
			{sortedNotes.map((note) => (
				<React.Fragment key={`note-${note.id}`}>
					<Swipeout
						className={classes.swipeout}
						left={[
							{
								text: <TimeAgo date={note.date / 1000} />,
								autoClose: true,
								style: {
									backgroundColor: '#9e9e9e',
									color: 'white',
								},
							},
							{
								text: note.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
								onPress: () => handleNoteFavouriteClick(note.id),
								autoClose: true,
								style: {
									backgroundColor: '#ee6e00',
									color: 'white',
									width: 56,
								},
							},
							{
								text: <DeleteIcon />,
								onPress: () => handleNoteDeleteClick(note),
								autoClose: true,
								style: {
									backgroundColor: 'red',
									color: 'white',
									width: 56,
								},
							},
						]}
					>
						<ListItem
							button
							to={`/note/${note.id}`}
							className={clsx(classes.listItem, 'context-menu-select')}
							component={renderLink}
							data-id={note.id}
						>
							<ListItemText className={classes.listItemText} primary={note.title} />
							{note.favourite && (
								<ListItemSecondaryAction className={classes.secondaryAction}>
									<StarIcon color="primary" edge="end" />
								</ListItemSecondaryAction>
							)}
						</ListItem>
					</Swipeout>

					<Popover
						open={contextAnchor?.id === note.id}
						onClose={handleContextMenuClose}
						anchorReference="anchorPosition"
						anchorPosition={{
							top: contextAnchor?.top || 0,
							left: contextAnchor?.left || 0,
						}}
					>
						<List className={classes.list} dense>
							<ListItem>
								<ListItemIcon>
									<AlarmIcon color="primary" />
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={<TimeAgo date={note.date / 1000} />}
								/>
							</ListItem>
							<ListItem button onClick={() => handleNoteFavouriteClick(note.id)}>
								<ListItemIcon>
									{note.favourite ? <StarIcon color="primary" /> : <StarBorderIcon />}
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={`${note.favourite ? 'Unfavourite' : 'Favourite'} "${note.title}"`}
								/>
							</ListItem>
							<ListItem button onClick={() => handleNoteDeleteClick(note)}>
								<ListItemIcon>
									<DeleteIcon color="error" />
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={`Delete "${note.title}"`}
								/>
							</ListItem>
						</List>
					</Popover>
				</React.Fragment>
			))}
		</List>
	);
};

NotesList.propTypes = propTypes;

export default NotesList;
