import React from 'react';
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
import { useGlobalState } from '../../hooks/GlobalState';

const NotesSearch = () => {
	const classes = useStyles();
	const [{ search }, dispatch] = useGlobalState();

	// TODO: Remove the duplicated function
	const updateSearchText = (text) => {
		dispatch({
			type: 'app-search',
			value: {
				...search,
				text,
			},
		});
	};

	const handleTextClear = () => updateSearchText('');

	const handleTextInput = (event) => updateSearchText(event.target.value);

	return search.show && (
		<List>
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
						value={search.text}
						endAdornment={search.text.length !== 0 ? (
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
		</List>
	);
};

export default NotesSearch;
