import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	InputBase,
	List,
	ListItem,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './NotesSearch.styled';
import NotesList from '../NotesList';

const propTypes = {
	handleDrawerToggle: PropTypes.func.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const SearchBar = ({
	handleDrawerToggle,
	handleNoteDelete,
	loading,
	notes,
}) => {
	const classes = useStyles();
	const [items, setItems] = useState(notes);

	const filterList = event => setItems(
		notes.filter(item => item.text.toLowerCase().search(event.target.value.toLowerCase()) !== -1),
	);

	useEffect(() => setItems(notes), [notes]);

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
						onChange={filterList}
					/>
				</div>
			</ListItem>

			<NotesList
				handleDrawerToggle={handleDrawerToggle}
				handleNoteDelete={handleNoteDelete}
				loading={loading}
				notes={items}
			/>
		</List>
	);
};

SearchBar.propTypes = propTypes;

export default SearchBar;
