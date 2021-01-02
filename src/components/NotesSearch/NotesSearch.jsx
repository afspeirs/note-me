import { useEffect } from 'react';
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

	const handleKeyDown = (event) => {
		// If CTRL or CMD is pressed
		if (event.ctrlKey || event.metaKey) {
			// F = Show Search bar
			if (event.key === 'f') {
				event.preventDefault();

				if (window?.currentLocation?.pathname === '/') {
					dispatch({
						type: 'app-search',
						value: {
							...search,
							show: true,
						},
					});
				}
			}
			// ESC = Hide search bar
			if (event.key === 'esc' && window?.currentLocation?.pathname === '/') {
				dispatch({
					type: 'app-search',
					value: {
						show: false,
						text: '',
					},
				});
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []); // eslint-disable-line

	return (
		<Fade in={search.show} timeout={512}>
			{/* This div makes the Transitions work */}
			<div>
				<Slide in={search.show} direction="left" timeout={256} mountOnEnter unmountOnExit>
					<AppBar position="absolute" elevation={0}>
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
							<InputBase
								autoFocus
								className={classes.search}
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
										edge="end"
										color="inherit"
										onClick={handleTextClear}
									>
										<ClearIcon />
									</IconButton>
								)}
							/>
						</Toolbar>
					</AppBar>
				</Slide>
			</div>
		</Fade>
	);
};

export default NotesSearch;
