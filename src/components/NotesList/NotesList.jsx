import { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
import LabelsAddDialog from '../LabelsAddDialog';
import RouterNavLink from '../RouterNavLink';
import { useGlobalState } from '../../hooks/GlobalState';
import { useNotes } from '../../hooks/Notes';
import { getDateCalendar, getDateRelative } from '../../utils';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const NotesList = ({ notes }) => {
	const confirm = useConfirm();
	const { deleteNote, favouriteNote, loading } = useNotes();
	const classes = useStyles();
	const [{ search, settings: { sortNotesFavourite, sortNotesOrder } }, dispatch] = useGlobalState();
	const [contextAnchor, setContextAnchor] = useState(null);
	const [openAddLabel, setOpenAddLabel] = useState(null);
	const listEl = useRef(null);
	const [filteredNotes, setFilteredNotes] = useState([]);
	const sortNoteFunction = {
		'date-created-asc': (a, b) => b.dateCreated - a.dateCreated,
		'date-created-dsc': (a, b) => a.dateCreated - b.dateCreated,
		'date-modified-asc': (a, b) => b.dateModified - a.dateModified,
		'date-modified-dsc': (a, b) => a.dateModified - b.dateModified,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sortNotesOrder];
	const sortNotesFavouriteFunction = (a, b) => {
		if (sortNotesFavourite) {
			if (a.favourite === b.favourite) return 0;
			if (a.favourite) return -1;
			return 1;
		}
		return 0;
	};

	const updateSearchText = (text) => {
		dispatch({
			type: 'app-search',
			value: {
				show: true,
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
					<Fragment key={`note-${note.id}`}>
						<ListItem
							button
							to={{
								pathname: `/note/${note.id}`,
								state: { modal: true },
							}}
							className="context-menu-select"
							component={RouterNavLink}
							data-id={note.id}
						>
							<ListItemText
								primary={note.title}
								primaryTypographyProps={{
									className: classes.listItemTypography,
								}}
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
										className={classes.listItemTextDate}
										primary={`Last modified ${getDateRelative(note.dateModified)}`}
										primaryTypographyProps={{
											className: classes.listItemTypography,
										}}
										secondary={`Created: ${getDateCalendar(note.dateCreated)}`}
										secondaryTypographyProps={{
											className: classes.listItemTypography,
											variant: 'caption',
										}}
									/>
								</ListItem>
								<ListItem button onClick={() => handleFavouriteNote(note)}>
									<ListItemIcon>
										{note.favourite ? <StarIcon color="primary" /> : <StarBorderIcon />}
									</ListItemIcon>
									<ListItemText
										primary={`${note.favourite ? 'Unfavourite' : 'Favourite'} "${note.title}"`}
										primaryTypographyProps={{
											className: classes.listItemTypography,
										}}
									/>
								</ListItem>
								<ListItem button onClick={() => handleAddLabelsClick(note)}>
									<ListItemIcon>
										<LabelIcon color="primary" />
									</ListItemIcon>
									<ListItemText
										primary={`${note?.labels?.length !== 0 ? 'Change' : 'Add'} Labels`}
										primaryTypographyProps={{
											className: classes.listItemTypography,
										}}
									/>
								</ListItem>
								<ListItem button onClick={() => handleDeleteNote(note)}>
									<ListItemIcon>
										<DeleteIcon color="error" />
									</ListItemIcon>
									<ListItemText
										primary={`Delete "${note.title}"`}
										primaryTypographyProps={{
											className: classes.listItemTypography,
										}}
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
					</Fragment>
				))}
			</List>

			<LabelsAddDialog note={openAddLabel} setOpen={setOpenAddLabel} />
		</>
	);
};

NotesList.propTypes = propTypes;

export default NotesList;
