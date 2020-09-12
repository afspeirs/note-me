import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import {
	Chip,
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
	Label as LabelIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import DialogAddLabel from '../DialogAddLabel';
import TimeAgo from '../TimeAgo';
import { useGlobalState } from '../../hooks/GlobalState';
import { useNotes } from '../../hooks/Notes';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	updateSearchText: PropTypes.func.isRequired,
};

const NotesList = ({ notes, updateSearchText }) => {
	const confirm = useConfirm();
	const { deleteNote, favouriteNote, loading } = useNotes();
	const classes = useStyles();
	const [{ settings: { sortNotes, sortNotesFavourite } }] = useGlobalState();
	const [contextAnchor, setContextAnchor] = useState(null);
	const [openAddLabel, setOpenAddLabel] = useState(null);
	const listEl = useRef(null);
	const sortNoteFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sortNotes];
	const sortNotesFavouriteFunction = (a, b) => {
		if (sortNotesFavourite) {
			if (a.favourite === b.favourite) return 0;
			if (a.favourite) return -1;
			return 1;
		}
		return 0;
	};

	const sortArray = (array) => array
		.sort(sortNoteFunction)
		.sort(sortNotesFavouriteFunction);

	// TODO: Refactor into its own file
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

		// Only render if the right click occurs within the locationSelector
		if (closestContextMenuOption) {
			event.preventDefault();
			setContextAnchor({
				left: event.pageX,
				top: event.pageY,
				id: closestContextMenuOption.dataset.id,
			});
		}
	};

	const handleFavouriteNote = (note) => {
		handleContextMenuClose();
		favouriteNote(note);
	};

	const handleAddLabelsClick = (note) => {
		handleContextMenuClose();
		setOpenAddLabel(note);
	};

	const handleDeleteNote = (note) => {
		handleContextMenuClose();
		confirm({
			title: `Are you sure you want to delete "${note.title}"?`,
			confirmationText: 'Delete',
		})
			.then(() => deleteNote(note));
	};

	const handleLabelClick = (label) => {
		handleContextMenuClose();
		updateSearchText(label);
	};

	useEffect(() => {
		const { current } = listEl;
		current.addEventListener('contextmenu', handleContextMenuOpen);

		return () => current.removeEventListener('contextmenu', handleContextMenuOpen);
	}, [listEl]);

	return (
		<>
			<List className={classes.list} ref={listEl}>
				{notes.length === 0 && loading === false && (
					<ListItem>
						<ListItemText primary="No notes found" />
					</ListItem>
				)}
				{loading && (
					<ListItem>
						<ListItemText primary="Loading, please wait while we gather your notes" />
					</ListItem>
				)}

				{sortArray(notes).map((note) => (
					<React.Fragment key={`note-${note.id}`}>
						<ListItem
							button
							to={{
								pathname: `/note/${note.id}`,
								state: { modal: true },
							}}
							className={clsx(classes.listItem, 'context-menu-select')}
							component={renderLink}
							data-id={note.id}
						>
							<ListItemText
								className={classes.listItemText}
								primary={note.title}
							/>
							{note.favourite && (
								<ListItemSecondaryAction className={classes.secondaryAction}>
									<StarIcon color="primary" edge="end" />
								</ListItemSecondaryAction>
							)}
						</ListItem>

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
										primary={<TimeAgo date={note.date} />}
									/>
								</ListItem>
								<ListItem button onClick={() => handleFavouriteNote(note)}>
									<ListItemIcon>
										{note.favourite ? <StarIcon color="primary" /> : <StarBorderIcon />}
									</ListItemIcon>
									<ListItemText
										className={classes.listItemText}
										primary={`${note.favourite ? 'Unfavourite' : 'Favourite'} "${note.title}"`}
									/>
								</ListItem>
								<ListItem button onClick={() => handleAddLabelsClick(note)}>
									<ListItemIcon>
										<LabelIcon color="primary" />
									</ListItemIcon>
									<ListItemText
										className={classes.listItemText}
										primary={`${note?.labels?.length !== 0 ? 'Change' : 'Add'} Labels`}
									/>
								</ListItem>
								<ListItem button onClick={() => handleDeleteNote(note)}>
									<ListItemIcon>
										<DeleteIcon color="error" />
									</ListItemIcon>
									<ListItemText
										className={classes.listItemText}
										primary={`Delete "${note.title}"`}
									/>
								</ListItem>
								{note.labels && (
									<ListItem>
										{note.labels.map((label) => (
											<Chip
												key={label}
												clickable
												className={classes.chip}
												label={label}
												onClick={() => handleLabelClick(label)}
											/>
										))}
									</ListItem>
								)}
							</List>
						</Popover>
					</React.Fragment>
				))}
			</List>

			<DialogAddLabel note={openAddLabel} setOpen={setOpenAddLabel} />
		</>
	);
};

NotesList.propTypes = propTypes;

export default NotesList;
