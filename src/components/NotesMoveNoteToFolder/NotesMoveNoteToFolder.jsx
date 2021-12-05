import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {
	Folder as FolderIcon,
} from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';

import { useNotes } from '@/hooks/Notes';

const propTypes = {
	handleClose: PropTypes.func.isRequired,
	note: PropTypes.shape({
		dateCreated: PropTypes.number,
		dateModified: PropTypes.number,
		favourite: PropTypes.bool,
		id: PropTypes.string,
		inFolder: PropTypes.string,
		isFolder: PropTypes.bool,
		title: PropTypes.string,
	}).isRequired,
	open: PropTypes.bool.isRequired,
};

const NotesMoveNoteToFolder = ({
	note,
	handleClose,
	open,
}) => {
	const { notes, moveNote } = useNotes();
	const confirm = useConfirm();

	const handleMoveNoteToFolder = (folder) => {
		confirm({
			title: `Are you sure you want to move "${note.title}" into "${folder.title}"?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
		}).then(() => {
			handleClose();
			moveNote(note, folder);
		});
	};

	const handleRemoveNoteFromFolder = () => {
		confirm({
			title: `Are you sure you want to remove "${note.title}" from the current folder?`,
			cancellationText: 'No',
			confirmationText: 'Yes',
		}).then(() => {
			handleClose();
			moveNote(note);
		});
	};

	return (
		<Dialog
			aria-labelledby="change-theme-dialog"
			fullWidth
			maxWidth="xs"
			onClose={handleClose}
			open={open}
		>
			<DialogTitle id="change-theme-dialog">
				{`Move "${note.title}" to a folder`}
			</DialogTitle>
			<List>
				{notes.filter((folder) => folder.isFolder).map((folder) => (
					<ListItem
						key={folder.id}
						button
						onClick={() => handleMoveNoteToFolder(folder)}
						disabled={folder.notes.includes(note.id)}
					>
						<ListItemIcon>
							<FolderIcon />
						</ListItemIcon>
						<ListItemText
							primary={folder.title}
							primaryTypographyProps={{
								noWrap: true,
							}}
						/>
					</ListItem>
				))}
			</List>
			<DialogActions>
				<Button
					color="error"
					onClick={handleRemoveNoteFromFolder}
					disabled={!note.inFolder}
				>
					Remove Note from current Folder
				</Button>
			</DialogActions>
		</Dialog>
	);
};

NotesMoveNoteToFolder.propTypes = propTypes;

export default NotesMoveNoteToFolder;
