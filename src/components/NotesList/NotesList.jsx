import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink, useHistory } from 'react-router-dom';
import Swipeout from 'rc-swipeout';
import {
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
} from '@material-ui/core';
import {
	Alarm as AlarmIcon,
	Delete as DeleteIcon,
	MoreHoriz as MoreIcon,
} from '@material-ui/icons';
import withConfirm from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import TimeAgo from '../TimeAgo';
import { useStateValue } from '../StateContext';
import { getTitle } from '../../ultils';

const propTypes = {
	confirm: PropTypes.func.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const NotesList = ({
	confirm,
	handleNoteDelete,
	loading,
	notes,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [{ sort }] = useStateValue();
	const [anchorEl, setAnchorEl] = useState(null);
	const [currentNote, setCurrentNote] = useState(null);
	const handleClick = (event, note) => {
		setAnchorEl(event.currentTarget);
		setCurrentNote(note);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
									() => handleNoteDelete(note.id, history), {
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
							<ListItemSecondaryAction>
								<IconButton
									color="inherit"
									aria-label="Open menu"
									edge="end"
									onClick={event => handleClick(event, note.id)}
								>
									<MoreIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</Swipeout>

					<Menu
						id="more-menu"
						className={classes.menu}
						anchorEl={anchorEl}
						keepMounted
						open={currentNote === note.id}
						onClose={handleClose}
					>
						<MenuItem>
							<ListItemIcon>
								<AlarmIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={<TimeAgo slot="title" date={note.date / 1000} />} />
						</MenuItem>
						<MenuItem
							onClick={confirm(
								() => handleNoteDelete(note.id, history), {
									title: `Are you sure you want to delete "${getTitle(note.text)}"?`,
									confirmationText: 'Delete',
								},
							)}
						>
							<ListItemIcon>
								<DeleteIcon color="error" />
							</ListItemIcon>
							<ListItemText primary={`Delete "${getTitle(note.text)}"`} />
						</MenuItem>
					</Menu>
				</React.Fragment>
			))}
		</List>
	);
};

NotesList.propTypes = propTypes;

export default withConfirm(NotesList);
