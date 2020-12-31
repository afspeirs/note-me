import { useHotkeys } from 'react-hotkeys-hook';
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

	// F = Show Search bar
	useHotkeys('ctrl+f, command+f', (event) => {
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
	});
	// ESC = Hide search bar
	useHotkeys('esc', () => {
		if (window?.currentLocation?.pathname === '/') {
			dispatch({
				type: 'app-search',
				value: {
					show: false,
					text: '',
				},
			});
		}
	});

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
