import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Swipeout from 'rc-swipeout';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import withConfirm from 'material-ui-confirm';

import useStyles from './NotesList.styled';
import ContextMenu from '../ContextMenu';
import ListItemLink from '../ListItemLink';
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

	const sortFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => a.text.localeCompare(b.text),
		'title-dsc': (a, b) => b.text.localeCompare(a.text),
	}[sort];

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
						<ListItemLink
							to={`/note/${note.id}`}
							className="context-menu-select"
							id={note.id}
							primary={getTitle(note.text)}
						/>
					</Swipeout>
				))}
			</List>

			<ContextMenu
				arrayOfObjects={notes}
				closestElement=".context-menu-select"
				handleNoteDelete={handleNoteDelete}
				history={history}
			/>
		</>
	);
};

NotesList.propTypes = propTypes;

export default withConfirm(NotesList);
