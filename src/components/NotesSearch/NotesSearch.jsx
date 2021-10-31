import {
	AppBar,
	Fade,
	IconButton,
	InputBase,
	Slide,
	Toolbar,
} from '@mui/material';
import {
	ArrowBack as ArrowBackIcon,
	Clear as ClearIcon,
} from '@mui/icons-material';

import { useGlobalState } from '@/hooks/GlobalState';
import { useHotkeys } from '@/hooks/Hotkeys';
import styles from './NotesSearch.styled';

const NotesSearch = () => {
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

	useHotkeys([
		// CTRL + F = Show Search bar
		{
			keys: ['f'],
			callback: (event) => {
				event.preventDefault();

				dispatch({
					type: 'app-search',
					value: {
						...search,
						show: true,
					},
				});
			},
			metaModifier: true,
		},
		// Escape = Hide search bar
		{
			keys: ['Escape'],
			callback: () => {
				dispatch({
					type: 'app-search',
					value: {
						show: false,
						text: '',
					},
				});
			},
		},
	]);

	return (
		<Fade in={search.show} timeout={512}>
			{/* This div makes the Transitions work */}
			<div>
				<Slide in={search.show} direction="left" timeout={256} mountOnEnter unmountOnExit>
					<AppBar position="fixed" elevation={0}>
						<Toolbar>
							<IconButton
								aria-label="Hide Search"
								color="inherit"
								edge="start"
								onClick={hideSearch}
								size="large"
								sx={styles.menuButton}
							>
								<ArrowBackIcon />
							</IconButton>
							<InputBase
								autoFocus
								sx={styles.search}
								inputProps={{ 'aria-label': 'search' }}
								onChange={handleTextInput}
								placeholder="Search Notes"
								value={search.text}
								endAdornment={search.text.length !== 0 && (
									<IconButton
										aria-label="Clear Search"
										color="inherit"
										edge="end"
										onClick={handleTextClear}
										size="large"
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
