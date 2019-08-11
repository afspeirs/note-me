import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
} from '@material-ui/core';

import ListItemLink from './ListItemLink';
import { ListStyled, ListItemTextStyled } from './NotesList.styled';
import { getTitle } from '../../ultils';

const defaultProps = {
	handleDrawerToggle: () => {},
};

const propTypes = {
	handleDrawerToggle: PropTypes.func,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const NotesList = ({
	handleDrawerToggle,
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
					onClick={handleDrawerToggle}
					primary={note.text ? getTitle(note.text) : 'Untitled'}
				/>
			))}
		</ListStyled>
	</>
);

NotesList.defaultProps = defaultProps;
NotesList.propTypes = propTypes;

export default NotesList;
