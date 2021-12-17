import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Popover,
} from '@mui/material';
import {
	Delete as DeleteIcon,
	Folder as FolderIcon,
	InfoOutlined as InfoIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import NotesMoveNoteToFolder from '@/components/NotesMoveNoteToFolder';
import { useContextMenu } from '@/hooks/ContextMenu';
import { useGlobalState } from '@/hooks/GlobalState';
import { useNotes } from '@/hooks/Notes';
import { getDateCalendar, getDateRelative } from '@/utils';
import styles from './NotesList.styled';

const propTypes = {
	parentEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
	note: PropTypes.shape({
		dateCreated: PropTypes.number,
		dateModified: PropTypes.number,
		favourite: PropTypes.bool,
		id: PropTypes.string,
		inFolder: PropTypes.string,
		isFolder: PropTypes.bool,
		title: PropTypes.string,
	}).isRequired,
};

const NotesListContextMenu = ({
	note,
	parentEl,
}) => {
	const { contextMenu, contextMenuClose } = useContextMenu(parentEl);
	const [{ settings: { sortNotesShowFolders } }] = useGlobalState();
	const {
		deleteNote,
		favouriteNote,
	} = useNotes();
	const [openMoveNote, setOpenMoveNote] = useState(false);

	const handleFavouriteNote = () => {
		contextMenuClose();
		favouriteNote(note);
	};

	const handleDeleteNote = () => {
		contextMenuClose();
		deleteNote(note);
	};

	const handleMoveNote = () => {
		contextMenuClose();
		setOpenMoveNote(true);
	};

	return (
		<>
			<Popover
				open={contextMenu?.id === note.id}
				onClose={contextMenuClose}
				anchorReference="anchorPosition"
				anchorPosition={contextMenu?.position}
			>
				<List dense>
					{note.dateCreated && note.dateModified && (
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
					)}
					{!note.isFolder && sortNotesShowFolders && (
						<ListItem button onClick={handleMoveNote}>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText
								primary={`Move "${note.title}" to a Folder`}
								primaryTypographyProps={{
									noWrap: true,
								}}
							/>
						</ListItem>
					)}
					<ListItem button onClick={handleFavouriteNote}>
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
					<ListItem button onClick={handleDeleteNote} disabled={note.isFolder}>
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

			<NotesMoveNoteToFolder
				handleClose={() => setOpenMoveNote(false)}
				note={note}
				open={openMoveNote}
			/>
		</>
	);
};

NotesListContextMenu.propTypes = propTypes;

export default NotesListContextMenu;
