import React from 'react';
import PropTypes from 'prop-types';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/dist/rc-swipeout.css';
import { ListItem } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import ListItemLink from './ListItemLink';
import TimeAgo from '../TimeAgo';
import { ListStyled, ListItemTextStyled } from './NotesList.styled';
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
}) => (
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
		{notes.map(note => (
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
						onPress: () => handleNoteDelete(note.id, note),
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
);

NotesList.defaultProps = defaultProps;
NotesList.propTypes = propTypes;

export default NotesList;
