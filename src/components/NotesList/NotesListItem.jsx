import PropTypes from 'prop-types';
import {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
} from '@mui/material';
import {
	Folder as FolderIcon,
	KeyboardArrowRight as ArrowIcon,
	Star as StarIcon,
} from '@mui/icons-material';

import RouterNavLink from '@/components/shared/RouterNavLink';
import styles from './NotesList.styled';
import NotesListContextMenu from './NotesListContextMenu';

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

			<NotesListContextMenu
				parentEl={parentEl}
				note={note}
			/>
		</>
	);
};

NotesListItem.propTypes = propTypes;

export default NotesListItem;