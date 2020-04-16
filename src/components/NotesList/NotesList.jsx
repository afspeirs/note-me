import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Swipeout from 'rc-swipeout';
import {
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Popover,
	TextField,
} from '@material-ui/core';
import {
	Alarm as AlarmIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
	Folder as FolderIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import TimeAgo from '../TimeAgo';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	locationSelector: PropTypes.string.isRequired,
};

const NotesList = ({ notes, locationSelector }) => {
	const confirm = useConfirm();
	const {
		deleteNote,
		favouriteNote,
		folders,
		loading,
	} = useNotes();
	const classes = useStyles();
	const [{ settings }] = useStateValue();
	const { sort, sortFavourite } = settings;
	const [contextAnchor, setContextAnchor] = useState(null);
	const [renameModalOpen, setRenameModalOpen] = useState(false);
	const [openFolders, setOpenFolders] = useState(null);
	const sortNoteFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sort];
	const sortFavouriteFunction = (a, b) => {
		if (sortFavourite) {
			if (a.favourite === b.favourite) return 0;
			if (a.favourite) return -1;
			return 1;
		}
		return 0;
	};

	const sortArray = (array) => array
		.sort(sortNoteFunction)
		.sort(sortFavouriteFunction);

	const renderLink = React.useMemo(
		() => React.forwardRef((props, ref) => (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<NavLink {...props} innerRef={ref} />
		)),
		[],
	);

	const handleContextMenuClose = () => setContextAnchor(null);

	const handleContextMenuOpen = (event) => {
		const closestContextMenuOption = event.target.closest('.context-menu-select');
		const closestLocationSelector = event.target.closest(locationSelector);

		// Only render if the right click occurs within the locationSelector
		if (closestContextMenuOption && closestLocationSelector) {
			event.preventDefault();
			setContextAnchor({
				left: event.pageX,
				top: event.pageY,
				id: closestContextMenuOption.dataset.id,
			});
		}
	};

	const handleFavouriteNote = (note) => {
		handleContextMenuClose();
		favouriteNote(note);
	};

	const handleDeleteNote = (note) => {
		confirm({
			title: `Are you sure you want to delete "${note.title}"?`,
			confirmationText: 'Delete',
		})
			.then(() => deleteNote(note));
	};

	const handleFolderClick = (index) => {
		const newOpenFolders = [...openFolders];
		newOpenFolders[index] = !newOpenFolders[index];
		setOpenFolders(newOpenFolders);
	};

	const handleRenameFolderClick = (index) => {
		handleContextMenuClose();
		setRenameModalOpen(index);
	};

	const handleRenameFolder = (value, index) => {
		// TODO: handle the rename of folders
		// it will have to filter the notes that use that folder and update all notes ...
		// ... (but not change the date modified)

		const oldFolderName = folders[index];
		const newFolderName = value;

		console.log(oldFolderName, newFolderName);

		// TODO: create setFolders to be exported from NotesContext
		// setFolders(oldFolderName, newFolderName);
	};

	useEffect(() => {
		document.addEventListener('contextmenu', handleContextMenuOpen);

		return () => document.removeEventListener('contextmenu', handleContextMenuOpen);
	}, []); // eslint-disable-line

	useEffect(() => {
		setOpenFolders(folders.map(() => true));
	}, [folders]); // eslint-disable-line

	return (
		<List className={classes.list}>
			{notes.length === 0 && loading === false && (
				<ListItem>
					<ListItemText primary="No notes" />
				</ListItem>
			)}
			{loading && (
				<ListItem>
					<ListItemText primary="Loading, please wait while we gather your notes" />
				</ListItem>
			)}

			{openFolders && folders.map((folder, index) => {
				const folderName = folder || 'Unsorted';
				const folderNotes = notes.filter((note) => note.folder === folder);
				// console.log(folderName);
				// console.log(folderNotes);
				const folderKey = folderName;

				return (
					<React.Fragment key={folderKey}>
						<ListItem
							button
							className="context-menu-select"
							data-id={folderKey}
							onClick={() => handleFolderClick(index)}
						>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary={folderName} />
							{openFolders[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
								<ListItem button onClick={() => handleRenameFolderClick(index)}>
									<ListItemIcon>
										<EditIcon color="primary" />
									</ListItemIcon>
									<ListItemText
										className={classes.listItemText}
										primary={`Rename "${folderName}"`}
									/>
								</ListItem>
							</List>
						</Popover>

						<Dialog
							open={renameModalOpen === index}
							maxWidth="xs"
							aria-labelledby={`rename-${folderKey}-dialog-title`}
							onClose={() => setRenameModalOpen(-1)}
						>
							<DialogTitle id={`rename-${folderKey}-dialog-title`}>Rename Folder</DialogTitle>
							<DialogContent>
								<TextField
									autoFocus
									fullWidth
									id={`rename-${folderKey}`}
									margin="dense"
									onChange={(event) => handleRenameFolder(event.target.value, index)}
									value={folders[index]}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setRenameModalOpen(false)}>Close</Button>
							</DialogActions>
						</Dialog>

						<Collapse in={openFolders[index]} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{sortArray(folderNotes).map((note) => (
									<React.Fragment key={`note-${note.id}`}>
										<Swipeout
											className={classes.swipeout}
											left={[
												{
													text: <TimeAgo date={note.date / 1000} />,
													autoClose: true,
													style: {
														backgroundColor: '#9e9e9e',
														color: 'white',
													},
												},
												{
													text: note.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
													onPress: () => handleFavouriteNote(note),
													autoClose: true,
													style: {
														backgroundColor: '#ee6e00',
														color: 'white',
														width: 56,
													},
												},
												{
													text: <DeleteIcon />,
													onPress: () => handleDeleteNote(note),
													autoClose: true,
													style: {
														backgroundColor: 'red',
														color: 'white',
														width: 56,
													},
												},
											]}
										>
											<ListItem
												button
												to={`/note/${note.id}`}
												className={clsx(classes.listItem, 'context-menu-select')}
												component={renderLink}
												data-id={note.id}
											>
												<ListItemText className={classes.listItemText} primary={note.title} />
												{note.favourite && (
													<ListItemSecondaryAction className={classes.secondaryAction}>
														<StarIcon color="primary" edge="end" />
													</ListItemSecondaryAction>
												)}
											</ListItem>
										</Swipeout>

										<Popover
											open={contextAnchor?.id === note.id}
											onClose={handleContextMenuClose}
											anchorReference="anchorPosition"
											anchorPosition={{
												top: contextAnchor?.top || 0,
												left: contextAnchor?.left || 0,
											}}
										>
											<List className={classes.list} dense>
												<ListItem>
													<ListItemIcon>
														<AlarmIcon color="primary" />
													</ListItemIcon>
													<ListItemText
														className={classes.listItemText}
														primary={<TimeAgo date={note.date / 1000} />}
													/>
												</ListItem>
												<ListItem button onClick={() => handleFavouriteNote(note)}>
													<ListItemIcon>
														{note.favourite ? <StarIcon color="primary" /> : <StarBorderIcon />}
													</ListItemIcon>
													<ListItemText
														className={classes.listItemText}
														primary={`${note.favourite ? 'Unfavourite' : 'Favourite'} "${note.title}"`}
													/>
												</ListItem>
												<ListItem button onClick={() => handleDeleteNote(note)}>
													<ListItemIcon>
														<DeleteIcon color="error" />
													</ListItemIcon>
													<ListItemText
														className={classes.listItemText}
														primary={`Delete "${note.title}"`}
													/>
												</ListItem>
											</List>
										</Popover>
									</React.Fragment>
								))}
							</List>
						</Collapse>
					</React.Fragment>
				);
			})}


		</List>
	);
};

NotesList.propTypes = propTypes;

export default NotesList;
