import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	TextField,
} from '@material-ui/core';

import { ListStyled } from './SearchBar.styled';
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
	const [items, setItems] = useState(notes);

	const filterList = event => setItems(
		notes.filter(item => item.text.toLowerCase().search(event.target.value.toLowerCase()) !== -1),
	);

	useEffect(() => setItems(notes), [notes]);

	return (
		<ListStyled>
			<ListItem>
				<TextField
					id="search-notes"
					variant="outlined"
					placeholder="Search Notes"
					onChange={filterList}
				/>
			</ListItem>

			<NotesList
				handleDrawerToggle={handleDrawerToggle}
				handleNoteDelete={handleNoteDelete}
				loading={loading}
				notes={items}
			/>
		</ListStyled>
	);
};

SearchBar.propTypes = propTypes;

export default SearchBar;
