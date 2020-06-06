import React, { useState, useEffect } from 'react';
import {
	IconButton,
	InputBase,
	List,
	ListItem,
} from '@material-ui/core';
import {
	Clear as ClearIcon,
	Search as SearchIcon,
} from '@material-ui/icons';

import useStyles from './NotesSearch.styled';
import NotesList from './NotesList';
import { useNotes } from '../hooks/NotesContext';

const NotesSearch = () => {
	const classes = useStyles();
	const { notes } = useNotes();
	const [text, setText] = useState('');
	const [items, setItems] = useState(notes);

	const handleTextClear = () => setText('');

	const handleTextInput = (event) => setText(event.target.value);

	const updateItems = () => setItems(
		notes.filter((note) => note.text.toLowerCase().search(text.toLowerCase()) !== -1
			|| note?.labels?.find((label) => label.toLowerCase().search(text.toLowerCase()) !== -1)),
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
						inputProps={{ 'aria-label': 'search' }}
						onChange={handleTextInput}
						placeholder="Search Notes"
						value={text}
						endAdornment={text.length !== 0 && (
							<IconButton
								aria-label="Clear Search"
								className={classes.searchClear}
								color="inherit"
								onClick={handleTextClear}
								size="small"
							>
								<ClearIcon fontSize="inherit" />
							</IconButton>
						)}
					/>
				</div>
			</ListItem>

			<NotesList notes={items} updateSearchText={setText} />
		</List>
	);
};

export default NotesSearch;
