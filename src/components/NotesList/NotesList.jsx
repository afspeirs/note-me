import {
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	Box,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';

import NotesSearch from '@/components/NotesSearch';
import { useGlobalState } from '@/hooks/GlobalState';
import { useNotes } from '@/hooks/Notes';
import styles from './NotesList.styled';
import NotesListItem from './NotesListItem';
// import NotesListFolderView from './NotesListFolderView';

const NotesList = () => {
	const [{
		search,
		settings: {
			sortNotesFavourite,
			sortNotesOrder,
		},
	}] = useGlobalState();
	const { loading, notes } = useNotes();
	const parentEl = useRef(null);
	const [filteredNotes, setFilteredNotes] = useState([]);
	// const [selectedFolder, setSelectedFolder] = useState(null);

	const sortNoteFunction = {
		'date-created-asc': (a, b) => b.dateCreated - a.dateCreated,
		'date-created-dsc': (a, b) => a.dateCreated - b.dateCreated,
		'date-modified-asc': (a, b) => b.dateModified - a.dateModified,
		'date-modified-dsc': (a, b) => a.dateModified - b.dateModified,
		'title-asc': (a, b) => a.title.localeCompare(b.title),
		'title-dsc': (a, b) => b.title.localeCompare(a.title),
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

	useEffect(() => {
		if (notes) {
			const filtered = notes
				.filter((note) => note?.text.toLowerCase().search(search?.text.toLowerCase()) !== -1
				|| note.labels?.find((label) => label?.toLowerCase().search(search?.text.toLowerCase()) !== -1)); // eslint-disable-line max-len

			if ((filteredNotes !== filtered)) {
				setFilteredNotes(filtered);
			}
		}
	}, [notes, search.text]);

	return (
		<Box sx={styles.root}>
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
					<NotesListItem
						key={`note-${note.id}`}
						note={note}
						parentEl={parentEl}
					/>
				))}
			</List>

			{/* TODO: Show labels in this view when selecting one from the context menu */}
			{/* <NotesListFolderView
				notes={notes?.filter((note) => note.inFolder === selectedFolder?.id)}
				selectedFolder={selectedFolder}
				setSelectedFolder={setSelectedFolder}
				sortArray={sortArray}
			/> */}
		</Box>
	);
};

export default NotesList;
