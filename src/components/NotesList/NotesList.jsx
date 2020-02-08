import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Swipeout from 'rc-swipeout';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Popover,
} from '@material-ui/core';
import {
	Alarm as AlarmIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons';
import withConfirm from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import TimeAgo from '../TimeAgo';
import { useStateValue } from '../StateContext';
import { getTitle } from '../../ultils';
import { useNotes } from '../../hooks/NotesContext';

const propTypes = {
	confirm: PropTypes.func.isRequired,
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const NotesList = ({ confirm, notes }) => {
	const { handleNoteDelete, loading } = useNotes();
	const classes = useStyles();
	const [{ sort }] = useStateValue();
	const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
	const [currentNote, setCurrentNote] = useState(null);
	const handleClose = () => {
		setAnchorPosition({ top: 0, left: 0 });
		setCurrentNote(null);
	};

	const sortFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sort];

	const renderLink = React.useMemo(
		() => React.forwardRef((props, ref) => (
			<NavLink {...props} innerRef={ref} />
		)),
		[],
	);

	const handleContextMenu = (event) => {
		const closestContextMenuOption = event.target.closest('.context-menu-select');

		if (closestContextMenuOption) {
			event.preventDefault();
			setAnchorPosition({ left: event.pageX, top: event.pageY });
			setCurrentNote(closestContextMenuOption.id);
		}
	};

	useEffect(() => {
		document.addEventListener('contextmenu', handleContextMenu);

		return function cleanuop() {
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, []);

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
			{notes.sort(sortFunction).map(note => (
				<React.Fragment key={`note-${note.id}`}>
					<Swipeout
						className={classes.swipeout}
						left={[
							{
								text: <TimeAgo date={note.date / 1000} />,
								autoClose: true,
								style: {
									backgroundColor: '#ee6e00',
									color: 'white',
								},
							},
							{
								text: <DeleteIcon />,
								onPress: confirm(
									() => handleNoteDelete(note.id), {
										title: `Are you sure you want to delete "${getTitle(note.text)}"?`,
										confirmationText: 'Delete',
									},
								),
								autoClose: true,
								style: {
									backgroundColor: 'red',
									color: 'white',
									width: '56px',
								},
							},
						]}
					>
						<ListItem
							button
							to={`/note/${note.id}`}
							className={clsx('context-menu-select', classes.listItem)}
							component={renderLink}
							id={note.id}
						>
							<ListItemText className={classes.listItemText} primary={getTitle(note.text)} />
						</ListItem>
					</Swipeout>

					<Popover
						open={currentNote === note.id}
						onClose={handleClose}
						anchorReference="anchorPosition"
						anchorPosition={{
							top: anchorPosition.top,
							left: anchorPosition.left,
						}}
					>
						<List className={classes.list}>
							<ListItem>
								<ListItemIcon>
									<AlarmIcon color="primary" />
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={<TimeAgo slot="title" date={note.date / 1000} />}
								/>
							</ListItem>
							<ListItem
								button
								onClick={confirm(
									() => handleNoteDelete(note.id), {
										title: `Are you sure you want to delete "${getTitle(note.text)}"?`,
										confirmationText: 'Delete',
									},
								)}
							>
								<ListItemIcon>
									<DeleteIcon color="error" />
								</ListItemIcon>
								<ListItemText
									className={classes.listItemText}
									primary={`Delete "${getTitle(note.text)}"`}
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

export default withConfirm(NotesList);
