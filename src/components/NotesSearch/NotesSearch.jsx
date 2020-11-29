import React from 'react';
import {
	AppBar,
	Fade,
	IconButton,
	InputBase,
	Slide,
	Toolbar,
} from '@material-ui/core';
import {
	ArrowBack as ArrowBackIcon,
	Clear as ClearIcon,
} from '@material-ui/icons';

import useStyles from './NotesSearch.styled';
import { useGlobalState } from '../../hooks/GlobalState';

const NotesSearch = () => {
	const classes = useStyles();
	const [{ search }, dispatch] = useGlobalState();

	const hideSearch = () => {
		dispatch({
			type: 'app-search',
			value: {
				show: false,
				text: '',
			},
		});
	};

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

	return (
		<Fade in={search.show} timeout={512}>
			{/* This div makes the Transitions work */}
			<div>
				<Slide in={search.show} direction="left" timeout={256} mountOnEnter unmountOnExit>
					<AppBar position="fixed">
						<Toolbar>
							<IconButton
								className={classes.menuButton}
								color="inherit"
								aria-label="Hide Search"
								edge="start"
								onClick={hideSearch}
							>
								<ArrowBackIcon />
							</IconButton>
							<div className={classes.search}>
								<InputBase
									autoFocus
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
									onChange={handleTextInput}
									placeholder="Search Notes"
									value={search.text}
									endAdornment={search.text.length !== 0 && (
										<IconButton
											aria-label="Clear Search"
											className={classes.searchClear}
											color="inherit"
											onClick={handleTextClear}
											size="small"
										>
											<ClearIcon />
										</IconButton>
									)}
								/>
							</div>
						</Toolbar>
					</AppBar>
				</Slide>
			</div>
		</Fade>
	);
};

export default NotesSearch;
