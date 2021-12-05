import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {
	Add as AddIcon,
	Clear as ClearIcon,
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
	const [folders, setFolders] = useState([]);
	const [newFolderNameText, setNewFolderNameText] = useState('');

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

	const handleNewFolder = (event) => {
		event.preventDefault();

		if (newFolderNameText.length !== 0) {
			setFolders((prevState) => [
				...prevState,
				{
					title: newFolderNameText,
				},
			]);
			setNewFolderNameText('');
		}
	};

	const handleNewFolderNameTextChange = (event) => setNewFolderNameText(event.target.value);

	useEffect(() => {
		if (notes) {
			setFolders(notes.filter((folder) => folder.isFolder));
		}
	}, [notes]);

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
				{folders?.map((folder) => (
					<ListItem
						key={folder.id || folder.title}
						button
						onClick={() => handleMoveNoteToFolder(folder)}
						disabled={folder?.notes?.includes(note?.id)}
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

				<ListItem>
					<ListItemIcon>
						<Button
							aria-label="add folder label"
							size="small"
							variant="contained"
							sx={{ minWidth: 0 }}
							disabled={newFolderNameText.length === 0}
							onClick={handleNewFolder}
						>
							<AddIcon />
						</Button>
					</ListItemIcon>
					<form
						autoComplete="off"
						noValidate
						onSubmit={handleNewFolder}
						style={{ width: '100%' }}
					>
						<Input
							fullWidth
							onChange={handleNewFolderNameTextChange}
							value={newFolderNameText}
							placeholder="New Folder Name"
							endAdornment={newFolderNameText.length !== 0 && (
								<InputAdornment position="end">
									<IconButton
										aria-label="Clear Search"
										edge="end"
										color="inherit"
										size="small"
										onClick={() => setNewFolderNameText('')}
									>
										<ClearIcon />
									</IconButton>
								</InputAdornment>
							)}
						/>
					</form>
				</ListItem>
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
