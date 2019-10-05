import React from 'react';
import PropTypes from 'prop-types';
import Swipeout from 'rc-swipeout';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import useStyles from './NotesList.styled';
import ContextMenu from '../ContextMenu';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import ListItemLink from './ListItemLink';
import TimeAgo from '../TimeAgo';
import { useStateValue } from '../StateContext';
import { getTitle } from '../../ultils';

const propTypes = {
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const NotesList = ({
	handleNoteDelete,
	loading,
	notes,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(null);
	const [{ sort }] = useStateValue();

	const sortFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sort];

	const handleClose = (note = null) => {
		if (note && note.id) handleNoteDelete(note.id, note);
		setOpen(false);
		setValue(null);
	};

	const handleOpen = (note) => {
		setValue(note);
		setOpen(true);
	};

	return (
		<>
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
					<Swipeout
						key={`note-${note.id}`}
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
								onPress: () => handleOpen(note),
								autoClose: true,
								style: {
									backgroundColor: 'red',
									color: 'white',
									width: '56px',
								},
							},
						]}
					>
						<ListItemLink
							to={`/note/${note.id}`}
							className="context-menu-select"
							id={note.id}
							primary={note.text ? getTitle(note.text) : 'Untitled'}
						/>
					</Swipeout>
				))}
			</List>

			<ContextMenu
				closestElement=".context-menu-select"
				arrayOfObjects={notes}
				handleRemoveClick={handleOpen}
			/>
			<DeleteConfirmationDialog
				open={open}
				onClose={handleClose}
				value={value}
			/>
		</>
	);
};

NotesList.propTypes = propTypes;

export default NotesList;
