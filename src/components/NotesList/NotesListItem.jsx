import PropTypes from 'prop-types';
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
	Folder as FolderIcon,
	InfoOutlined as InfoIcon,
	KeyboardArrowRight as ArrowIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import RouterNavLink from '@/components/shared/RouterNavLink';
import { useNotes } from '@/hooks/Notes';
import { useContextMenu } from '@/hooks/ContextMenu';
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
	setSelectedFolder: PropTypes.func.isRequired,
};

const NotesListItem = ({
	parentEl,
	note,
	setSelectedFolder,
}) => {
	const { contextMenu, contextMenuClose } = useContextMenu(parentEl);
	const {
		deleteNote,
		favouriteNote,
	} = useNotes();

	const handleFavouriteNote = () => {
		contextMenuClose();
		favouriteNote(note);
	};

	const s = () => {
		contextMenuClose();
		deleteNote(note);
	};

	const handleFolderClick = () => {
		setSelectedFolder(note);
	};

	return (
		<>
			{note.isFolder ? (
				<ListItem
					button
					onClick={handleFolderClick}
					className="context-menu-select"
					data-id={note.id}
				>
					<ListItemIcon>
						<FolderIcon />
					</ListItemIcon>
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
			) : (
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
			)}

			<Popover
				open={contextMenu?.id === note.id}
				onClose={contextMenuClose}
				anchorReference="anchorPosition"
				anchorPosition={contextMenu?.position}
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
					<ListItem button onClick={s} disabled={note.isFolder}>
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
		</>
	);
};

NotesListItem.propTypes = propTypes;

export default NotesListItem;
