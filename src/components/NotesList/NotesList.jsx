import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	ListItem,
} from '@material-ui/core';

import { ListItemTextStyled } from './NotesList.styled';
import { getTitle } from '../../ultils';

const propTypes = {
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const NotesList = ({
	loading,
	notes,
}) => (
	<List>
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
			<ListItem
				button
				key={`note-${note.id}`}
				// id={index}
				// link={`/notes/?keyOfNote=${note.id}`}
			>
				<ListItemTextStyled primary={note.text ? getTitle(note.text) : 'Untitled'} />
			</ListItem>
		))}
	</List>
);

NotesList.propTypes = propTypes;

export default NotesList;
