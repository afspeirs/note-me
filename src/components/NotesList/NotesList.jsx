import {
	Fragment,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Popover,
} from '@mui/material';
import {
	Delete as DeleteIcon,
	InfoOutlined as InfoIcon,
	KeyboardArrowRight as ArrowIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import NotesSearch from '@/components/NotesSearch';
import RouterNavLink from '@/components/shared/RouterNavLink';
import useContextMenu from '@/hooks/ContextMenu/useContextMenu';
import { useGlobalState } from '@/hooks/GlobalState';
import { useNotes } from '@/hooks/Notes';
import { getDateCalendar, getDateRelative } from '@/utils';
import styles from './NotesList.styled';

const NotesList = () => {
	const [{ search, settings: { sortNotesFavourite, sortNotesOrder } }] = useGlobalState();
	const {
		deleteNote,
		favouriteNote,
		loading,
		notes,
	} = useNotes();
	const parentEl = useRef(null);
	const [filteredNotes, setFilteredNotes] = useState([]);
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

	const sortArray = (array) => array
		.sort(sortNoteFunction)
		.sort(sortNotesFavouriteFunction);

	const handleFavouriteNote = (note) => {
		contextMenuClose();
		favouriteNote(note);
	};

	const handleDeleteNote = (note) => {
		contextMenuClose();
		deleteNote(note);
	};

	/* eslint-disable max-len */
	useEffect(() => {
		if (notes) {
			const filtered = notes.filter((note) => note?.text?.toLowerCase().search(search?.text.toLowerCase()) !== -1);

			if ((filteredNotes !== filtered)) {
				setFilteredNotes(filtered);
			}
		}
	}, [search.text, notes]);
	/* eslint-enable max-len */

	return (
		<List sx={styles.list} ref={parentEl}>
			<ListItem>
				<NotesSearch />
			</ListItem>
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
						<ListItemSecondaryAction sx={styles.listItemSecondary}>
							{note.favourite && (
								<StarIcon color="primary" />
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
									<InfoIcon />
								</ListItemIcon>
								<ListItemText
									sx={styles.listItemTextDate}
									primary={`Last modified: ${getDateRelative(note.dateModified)}`}
									primaryTypographyProps={{
										noWrap: true,
									}}
									secondary={`Created: ${getDateCalendar(note.dateCreated)}`}
									secondaryTypographyProps={{
										noWrap: true,
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
						</List>
					</Popover>
				</Fragment>
			))}
		</List>
	);
};

export default NotesList;
