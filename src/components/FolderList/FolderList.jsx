import React, {
	Fragment,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Popover,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from '@material-ui/core';
import {
	ArrowBack as ArrowBackIcon,
	Edit as EditIcon,
	Folder as FolderIcon,
} from '@material-ui/icons';

import useStyles from './FolderList.styled';
import NotesSearch from '../NotesSearch';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const FolderList = () => {
	const classes = useStyles();
	const [{ settings }] = useStateValue();
	const { sortFolders, sortFoldersDisable } = settings;
	const { folders, notes, renameFolder } = useNotes();
	const [contextAnchor, setContextAnchor] = useState(null);
	const [localFolders, setLocalFolders] = useState([]);
	const listEl = useRef(null);

	const sortFoldersFunction = {
		'name-asc': (a, b) => a.name.localeCompare(b.name),
		'name-dsc': (a, b) => b.name.localeCompare(a.name),
	}[sortFolders];

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

	const handleContextMenuClose = () => setContextAnchor(null);

	const handleFolderOpen = (index) => {
		const newLocalFolders = [...localFolders];
		newLocalFolders[index].open = !newLocalFolders[index].open;
		setLocalFolders(newLocalFolders);
	};

	const handleRenameFolderModalOpen = (index) => {
		handleContextMenuClose();
		const newLocalFolders = [...localFolders];
		newLocalFolders[index].renameModalOpen = !newLocalFolders[index].renameModalOpen;
		setLocalFolders(newLocalFolders);
	};

	const handleRenameFolderClick = (index) => {
		const {
			name: oldFolderName,
			renameModalValue: newFolderName,
		} = localFolders[index];

		handleRenameFolderModalOpen(index);
		renameFolder(oldFolderName, newFolderName);
	};

	const handleRenameModalValueChange = (index, value) => {
		const newLocalFolders = [...localFolders];
		newLocalFolders[index].renameModalValue = value;
		setLocalFolders(newLocalFolders);
	};

	useEffect(() => {
		setLocalFolders(folders.map((folder) => ({
			name: folder,
			notes: notes.filter((note) => note.folder === folder),
			open: false,
			renameModalOpen: false,
			renameModalValue: folder,
		})));
	}, [folders]); // eslint-disable-line

	useEffect(() => {
		const { current } = listEl;
		current.addEventListener('contextmenu', handleContextMenuOpen);

		return () => current.removeEventListener('contextmenu', handleContextMenuOpen);
	}, [listEl]);

	return (
		<List className={classes.root} ref={listEl}>
			{(localFolders.length >= 1 && !sortFoldersDisable) ? (
				<>
					{localFolders.sort(sortFoldersFunction).map((folder, index) => {
						const {
							name,
							notes: folderNotes,
							open,
						} = folder;
						const folderKey = `folder-${folder.name}`;
						// console.log(name);
						// console.log(folderNotes);

						return folderNotes.length && (
							<Fragment key={folderKey}>
								<ListItem
									button
									className="context-menu-select"
									data-id={folderKey}
									onClick={() => handleFolderOpen(index)}
								>
									<ListItemIcon>
										<FolderIcon />
									</ListItemIcon>
									<ListItemText primary={name} />
								</ListItem>

								<Popover
									open={contextAnchor?.id === folderKey}
									onClose={handleContextMenuClose}
									anchorReference="anchorPosition"
									anchorPosition={{
										top: contextAnchor?.top || 0,
										left: contextAnchor?.left || 0,
									}}
								>
									<List className={classes.list} dense>
										<ListItem
											button
											onClick={() => handleRenameFolderModalOpen(index)}
										>
											<ListItemIcon>
												<EditIcon color="primary" />
											</ListItemIcon>
											<ListItemText
												className={classes.listItemText}
												primary={`Rename "${name}"`}
											/>
										</ListItem>
									</List>
								</Popover>

								<Dialog
									open={folder.renameModalOpen}
									maxWidth="xs"
									aria-labelledby={`rename-${folderKey}-dialog-title`}
									onClose={() => handleRenameFolderModalOpen(index)}
								>
									<DialogTitle id={`rename-${folderKey}-dialog-title`}>{`Rename ${name}`}</DialogTitle>
									<DialogContent>
										<TextField
											autoFocus
											fullWidth
											id={`rename-${folderKey}`}
											margin="dense"
											onChange={(event) => handleRenameModalValueChange(index, event.target.value)}
											value={folder.renameModalValue}
										/>
									</DialogContent>
									<DialogActions>
										<Button onClick={() => handleRenameFolderModalOpen(index)}>Cancel</Button>
										<Button
											color="primary"
											onClick={() => handleRenameFolderClick(index)}
										>
											Rename
										</Button>
									</DialogActions>
								</Dialog>

								<Slide direction="left" in={open} mountOnEnter unmountOnExit>
									<Paper className={classes.paper} elevation={4}>
										<Toolbar>
											<IconButton
												aria-label="Show Folders"
												className={classes.menuButton}
												color="inherit"
												edge="start"
												onClick={() => handleFolderOpen(index)}
											>
												<ArrowBackIcon />
											</IconButton>
											<Typography variant="h6">{name || 'Unsorted Notes'}</Typography>
										</Toolbar>

										<NotesSearch notes={folderNotes} />
									</Paper>
								</Slide>
							</Fragment>
						);
					})}
				</>
			) : (
				<NotesSearch notes={notes} />
			)}
		</List>
	);
};

export default FolderList;
