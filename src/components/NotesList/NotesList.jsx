import React, { useEffect, useRef, useState } from 'react';
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
};

const NotesList = ({ notes }) => {
	const confirm = useConfirm();
	const {
		deleteNote,
		favouriteNote,
		folders,
		loading,
		renameFolder,
	} = useNotes();
	const classes = useStyles();
	const [{ settings }] = useStateValue();
	const { sort, sortFavourite } = settings;
	const [contextAnchor, setContextAnchor] = useState(null);
	const [localFolders, setLocalFolders] = useState([]);
  const listEl = useRef(null);
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

	const handleFavouriteNote = (note) => {
		handleContextMenuClose();
		favouriteNote(note);
	};

	const handleDeleteNote = (note) => {
		handleContextMenuClose();
		confirm({
			title: `Are you sure you want to delete "${note.title}"?`,
			confirmationText: 'Delete',
		})
			.then(() => deleteNote(note));
	};

	const handleFolderClick = (index) => {
		const newLocalFolders = [...localFolders];
		newLocalFolders[index].expand = !newLocalFolders[index].expand;
		setLocalFolders(newLocalFolders);
	};

	const handleRenameFolderModalOpen = (index) => {
		handleContextMenuClose();
		const newLocalFolders = [...localFolders];
		newLocalFolders[index].renameModalOpen = !newLocalFolders[index].renameModalOpen;
		setLocalFolders(newLocalFolders);
	};

	const handleRenameFolderClick = (index) => {
		const value = localFolders[index].renameModalValue;

		handleRenameFolderModalOpen(index);
		renameFolder(index, value);
	};

	const handleRenameModalValueChange = (index, value) => {
		const newLocalFolders = [...localFolders];
		newLocalFolders[index].renameModalValue = value;
		setLocalFolders(newLocalFolders);
	};

	useEffect(() => {
		const { current } = listEl;
		current.addEventListener('contextmenu', handleContextMenuOpen);

		return () => current.removeEventListener('contextmenu', handleContextMenuOpen);
	}, [listEl]);

	useEffect(() => {
		setLocalFolders(folders.map((folder) => ({
			...folder,
			expand: false,
			renameModalOpen: false,
			renameModalValue: folder.name,
		})));
	}, [folders]); // eslint-disable-line

	return (
		<List className={classes.list} ref={listEl}>
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

			{localFolders.map((folder, index) => {
				const folderName = folder.name;
				const folderNotes = notes.filter((note) => note.folder === folder.name);
				// console.log(folderName);
				// console.log(folderNotes);
				const folderKey = `folder-${folder.id}`;

				return folderNotes.length !== 0 && (
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
							{localFolders[index].expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
								<ListItem button onClick={() => handleRenameFolderModalOpen(index)}>
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
							open={folder.renameModalOpen}
							maxWidth="xs"
							aria-labelledby={`rename-${folderKey}-dialog-title`}
							onClose={() => handleRenameFolderModalOpen(index)}
						>
							<DialogTitle id={`rename-${folderKey}-dialog-title`}>{`Rename ${folderName}`}</DialogTitle>
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

						<Collapse in={localFolders[index].expand} timeout="auto" unmountOnExit>
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
												className={clsx(classes.listItem, classes.nested, 'context-menu-select')}
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

			{notes.filter((note) => !note.folder).map((note) => (
				<React.Fragment key={`note-${note.id}`}>
					{/* TODO: turn into component */}
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
	);
};

NotesList.propTypes = propTypes;

export default NotesList;
