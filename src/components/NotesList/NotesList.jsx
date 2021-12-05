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
import NotesListFolderView from './NotesListFolderView';

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
	const [selectedFolder, setSelectedFolder] = useState(null);

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
	const sortNotesFolderFunction = (a) => {
		if (a.isFolder) return -1;
		return 0;
	};

	const sortArray = (array) => array
		.sort(sortNoteFunction)
		.sort(sortNotesFavouriteFunction)
		.sort(sortNotesFolderFunction);

	/* eslint-disable max-len */
	useEffect(() => {
		if (notes) {
			const filtered = notes
				.filter((note) => note?.text?.toLowerCase().search(search?.text.toLowerCase()) !== -1)
				// Show notes within folders on when searching, and hide folders when searching
				.filter((note) => ((search?.text.length === 0) ? !note.inFolder : !note.isFolder));

			if ((filteredNotes !== filtered)) {
				setFilteredNotes(filtered);
			}
		}
	}, [search.text, notes]);
	/* eslint-enable max-len */

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
						setSelectedFolder={setSelectedFolder}
					/>
				))}
			</List>

			<NotesListFolderView
				notes={notes?.filter((note) => note.inFolder === selectedFolder?.id)}
				selectedFolder={selectedFolder}
				setSelectedFolder={setSelectedFolder}
			/>
		</Box>
	);
};

export default NotesList;
