import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Swipeout from 'rc-swipeout';
import {
	Checkbox,
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
import { getTitle } from '../../ultils';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	uniqueString: PropTypes.string.isRequired,
};

const NotesList = ({ notes, uniqueString }) => {
	const confirm = useConfirm();
	const { handleNoteFavourite, handleNoteDelete, loading } = useNotes();
	const classes = useStyles();
	const [{ sort, sortFavourite }] = useStateValue();
	const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
	const [currentNote, setCurrentNote] = useState(null);
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

	const handleClose = () => {
		setAnchorPosition({ top: 0, left: 0 });
		setCurrentNote(null);
	};

	const handleNoteDeleteClick = ({ id, text }) => {
		confirm({
			title: `Are you sure you want to delete "${getTitle(text)}"?`,
			confirmationText: 'Delete',
		})
			.then(() => handleNoteDelete(id));
	};

	const handleContextMenu = (event) => {
		const closestContextMenuOption = event.target.closest(`.context-menu-select-${uniqueString}`);

		if (closestContextMenuOption) {
			event.preventDefault();
			setAnchorPosition({ left: event.pageX, top: event.pageY });
			setCurrentNote(closestContextMenuOption.id);
		}
	};

	useEffect(() => {
		document.addEventListener('contextmenu', handleContextMenu);

		return function cleanuop() {
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, []);

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
									backgroundColor: '#ee6e00',
									color: 'white',
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
							className={clsx(`.context-menu-select-${uniqueString}`, classes.listItem)}
							component={renderLink}
							id={note.id}
						>
							<ListItemText className={classes.listItemText} primary={getTitle(note.text)} />
							<ListItemSecondaryAction>
								<Checkbox
									color="primary"
									edge="end"
									checked={note.favourite}
									checkedIcon={<StarIcon />}
									icon={<StarBorderIcon />}
									inputProps={{ 'aria-labelledby': note.id }}
									onChange={(event) => handleNoteFavourite(event, note.id)}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					</Swipeout>

					<Popover
						open={currentNote === note.id}
						onClose={handleClose}
						anchorReference="anchorPosition"
						anchorPosition={{
							top: anchorPosition.top,
							left: anchorPosition.left,
						}}
					>
						<List className={classes.list}>
							<ListItem>
								<ListItemIcon>
									<AlarmIcon color="primary" />
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={<TimeAgo slot="title" date={note.date / 1000} />}
								/>
							</ListItem>
							<ListItem button onClick={() => handleNoteDeleteClick(note)}>
								<ListItemIcon>
									<DeleteIcon color="error" />
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={`Delete "${getTitle(note.text)}"`}
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
