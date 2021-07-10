import {
	Fragment,
	useEffect,
	useRef,
	useState,
} from 'react';
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

import LabelsAddDialog from '@/components/LabelsAddDialog';
import RouterNavLink from '@/components/shared/RouterNavLink';
import useContextMenu from '@/hooks/ContextMenu/useContextMenu';
import { useGlobalState } from '@/hooks/GlobalState';
import { useNotes } from '@/hooks/Notes';
import { getDateCalendar, getDateRelative } from '@/utils';
import useStyles from './NotesList.styled';

const defaultProps = {
	notes: undefined,
};

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object),
};

const NotesList = ({ notes }) => {
	const classes = useStyles();
	const [{ search, settings: { sortNotesFavourite, sortNotesOrder } }, dispatch] = useGlobalState();
	const { deleteNote, favouriteNote, loading } = useNotes();
	const parentEl = useRef(null);
	const [filteredNotes, setFilteredNotes] = useState([]);
	const [openAddLabel, setOpenAddLabel] = useState(null);
	const { contextMenu, contextMenuClose } = useContextMenu(parentEl);

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

	const handleFavouriteNote = (note) => {
		contextMenuClose();
		favouriteNote(note);
	};

	const handleAddLabelsClick = (note) => {
		contextMenuClose();
		setOpenAddLabel(note);
	};

	const handleDeleteNote = (note) => {
		contextMenuClose();
		deleteNote(note);
	};

	const handleLabelClick = (label) => {
		contextMenuClose();
		updateSearchText(label);
	};

	/* eslint-disable max-len */
	useEffect(() => {
		if (notes) {
			const filtered = notes.filter((note) => note?.text.toLowerCase().search(search?.text.toLowerCase()) !== -1
			|| note.labels?.find((label) => label?.toLowerCase().search(search?.text.toLowerCase()) !== -1));

			if ((filteredNotes !== filtered) && notes?.length) {
				setFilteredNotes(filtered);
			}
		}
	}, [search.text, notes]);
	/* eslint-enable max-len */

	return (
		<>
			<List className={classes.list} ref={parentEl}>
				{loading && (
					<ListItem>
						<ListItemText primary="Loading, please wait while we gather your notes" />
					</ListItem>
				)}
				{filteredNotes.length === 0 && !loading && (
					<ListItem>
						<ListItemText primary="No notes found" />
					</ListItem>
				)}
				{sortArray(filteredNotes).map((note) => (
					<Fragment key={`note-${note.id}`}>
						<ListItem
							button
							to={`/note/${note.id}`}
							className="context-menu-select"
							component={RouterNavLink}
							data-id={note.id}
						>
							<ListItemText
								primary={note.title}
								primaryTypographyProps={{
									noWrap: true,
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
							open={contextMenu?.id === note.id}
							onClose={contextMenuClose}
							anchorReference="anchorPosition"
							anchorPosition={contextMenu.position}
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
											noWrap: true,
										}}
										secondary={`Created: ${getDateCalendar(note.dateCreated)}`}
										secondaryTypographyProps={{
											noWrap: true,
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
											noWrap: true,
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
											noWrap: true,
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
											noWrap: true,
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

NotesList.defaultProps = defaultProps;
NotesList.propTypes = propTypes;

export default NotesList;
