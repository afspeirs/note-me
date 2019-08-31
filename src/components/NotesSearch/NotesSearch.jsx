import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
	ListStyled,
	Searchbar,
	SearchIconWrapper,
	SearchInput,
} from './NotesSearch.styled';
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
				<Searchbar>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<SearchInput
						placeholder="Search Notes"
						inputProps={{ 'aria-label': 'search' }}
						onChange={filterList}
					/>
				</Searchbar>
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
