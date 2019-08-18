import React from 'react';
import PropTypes from 'prop-types';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/dist/rc-swipeout.css';
import { ListItem } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import ContextMenu from '../ContextMenu';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import ListItemLink from './ListItemLink';
import TimeAgo from '../TimeAgo';
import { ListStyled, ListItemTextStyled } from './NotesList.styled';
import { useStateValue } from '../StateContext';
import { getTitle } from '../../ultils';

const defaultProps = {
	handleDrawerToggle: () => {},
};

const propTypes = {
	handleDrawerToggle: PropTypes.func,
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const NotesList = ({
	handleDrawerToggle,
	handleNoteDelete,
	loading,
	notes,
}) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(null);
	const [{ sort }] = useStateValue();

	const sortFunction = {
		'date-asc': (a, b) => b.date - a.date,
		'date-dsc': (a, b) => a.date - b.date,
		'title-asc': (a, b) => b.text - a.text,
		'title-dsc': (a, b) => a.text - b.text,
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
			<ListStyled>
				{notes.length === 0 && loading === false && (
					<ListItem>
						<ListItemTextStyled primary="No notes" />
					</ListItem>
				)}
				{loading && (
					<ListItem>
						<ListItemTextStyled primary="Loading, please wait while we gather your notes" />
					</ListItem>
				)}
				{notes.sort(sortFunction).map(note => (
					<Swipeout
						key={`note-${note.id}`}
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
							onClick={handleDrawerToggle}
							primary={note.text ? getTitle(note.text) : 'Untitled'}
						/>
					</Swipeout>
				))}
			</ListStyled>

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

NotesList.defaultProps = defaultProps;
NotesList.propTypes = propTypes;

export default NotesList;
