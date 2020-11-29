import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
	KeyboardArrowRight as ArrowIcon,
	Delete as DeleteIcon,
	Label as LabelIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import DialogAddLabel from '../DialogAddLabel';
import RenderLink from '../RenderLink';
import TimeAgo from '../TimeAgo';
import { useGlobalState } from '../../hooks/GlobalState';
import { useNotes } from '../../hooks/Notes';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const NotesList = ({ notes }) => {
	const confirm = useConfirm();
	const { deleteNote, favouriteNote, loading } = useNotes();
	const classes = useStyles();
	const [{ search, settings: { sortNotes, sortNotesFavourite } }, dispatch] = useGlobalState();
	const [contextAnchor, setContextAnchor] = useState(null);
	const [openAddLabel, setOpenAddLabel] = useState(null);
	const listEl = useRef(null);
	const [filteredNotes, setFilteredNotes] = useState([]);
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

	// TODO: Remove the duplicated function
	const updateSearchText = (text) => {
		dispatch({
			type: 'app-search',
			value: {
				...search,
				text,
			},
		});
	};

	const sortArray = (array) => array
		.sort(sortNoteFunction)
		.sort(sortNotesFavouriteFunction);

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

	useEffect(() => {
		setFilteredNotes(
			notes.filter((note) => note.text.toLowerCase().search(search.text.toLowerCase()) !== -1
		|| note?.labels?.find((label) => label.toLowerCase().search(search.text.toLowerCase()) !== -1)),
		);
	}, [search.text, notes]);

	return (
		<>
			<List className={classes.list} ref={listEl}>
				{filteredNotes.length === 0 && loading === false && (
					<ListItem>
						<ListItemText primary="No notes found" />
					</ListItem>
				)}
				{loading && (
					<ListItem>
						<ListItemText primary="Loading, please wait while we gather your notes" />
					</ListItem>
				)}

				{sortArray(filteredNotes).map((note) => (
					<React.Fragment key={`note-${note.id}`}>
						<ListItem
							button
							to={{
								pathname: `/note/${note.id}`,
								state: { modal: true },
							}}
							className={clsx(classes.listItem, 'context-menu-select')}
							component={RenderLink}
							data-id={note.id}
						>
							<ListItemText
								className={classes.listItemText}
								primary={note.title}
							/>
							<ListItemSecondaryAction className={classes.listItemSecondary}>
								{note.favourite && (
									<StarIcon color="primary" edge="end" />
								)}
								<ArrowIcon color="disabled" />
							</ListItemSecondaryAction>
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
							<List dense>
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
								{note.labels?.length ? (
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
								) : null}
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
