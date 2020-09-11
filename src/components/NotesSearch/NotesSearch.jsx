import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import NotesList from '../NotesList';

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const NotesSearch = ({ notes }) => {
	const classes = useStyles();
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
					<InputBase
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
						onChange={handleTextInput}
						placeholder="Search Notes"
						value={text}
						endAdornment={text.length !== 0 ? (
							<IconButton
								aria-label="Clear Search"
								className={classes.searchClear}
								color="inherit"
								onClick={handleTextClear}
								size="small"
							>
								<ClearIcon />
							</IconButton>
						) : (
							<IconButton
								aria-label="Clear Search"
								className={classes.searchIcon}
								color="inherit"
								size="small"
							>
								<SearchIcon />
							</IconButton>
						)}
					/>
				</div>
			</ListItem>

			<NotesList notes={items} />
		</List>
	);
};

NotesSearch.propTypes = propTypes;

export default NotesSearch;
