import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
} from '@material-ui/core';

import ContextMenu from '../ContextMenu';
import ListItemLink from './ListItemLink';
import { ListStyled, ListItemTextStyled } from './NotesList.styled';
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
}) => (
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
			{notes.map(note => (
				<ListItemLink
					key={`note-${note.id}`}
					to={`/note/${note.id}`}
					className="context-menu-select"
					id={note.id}
					primary={note.text ? getTitle(note.text) : 'Untitled'}
				/>
			))}
		</ListStyled>


		<ContextMenu
			closestElement=".context-menu-select"
			arrayOfObjects={notes}
			handleRemoveClick={handleNoteDelete}
		/>
	</>
);

NotesList.propTypes = propTypes;

export default NotesList;
