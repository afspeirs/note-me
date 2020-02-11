import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	InputBase,
	List,
	ListItem,
} from '@material-ui/core';
import {
	Search as SearchIcon,
} from '@material-ui/icons';

import useStyles from './NotesSearch.styled';
import NotesList from '../NotesList';
import { useNotes } from '../../hooks/NotesContext';

const propTypes = {
	uniqueString: PropTypes.string.isRequired,
};

const NotesSearch = ({ uniqueString }) => {
	const { notes } = useNotes();
	const classes = useStyles();
	const [text, setText] = useState('');
	const [items, setItems] = useState(notes);

	const handleTextInput = (event) => setText(event.target.value);

	const updateItems = () => setItems(
		notes.filter((item) => item.text.toLowerCase().search(text.toLowerCase()) !== -1),
	);

	// updateItems based on the search field input
	useEffect(updateItems, [notes, text]);

	return (
		<List className={classes.list}>
			<ListItem>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						placeholder="Search Notes"
						inputProps={{ 'aria-label': 'search' }}
						onChange={handleTextInput}
					/>
				</div>
			</ListItem>

			<NotesList
				notes={items}
				uniqueString={uniqueString}
			/>
		</List>
	);
};

NotesSearch.propTypes = propTypes;

export default NotesSearch;
