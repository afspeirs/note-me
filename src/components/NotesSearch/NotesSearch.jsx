import {
	IconButton,
	OutlinedInput,
	InputLabel,
	FormControl,
} from '@mui/material';
import {
	Clear as ClearIcon,
} from '@mui/icons-material';

import { useGlobalState } from '@/hooks/GlobalState';
import { useHotkeys } from '@/hooks/Hotkeys';

const NotesSearch = () => {
	const [{ search }, dispatch] = useGlobalState();

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
		<FormControl fullWidth>
			<InputLabel htmlFor="component-outlined">Search for a Note</InputLabel>
			<OutlinedInput
				id="component-outlined"
				value={search.text}
				onChange={handleTextInput}
				label="Search for a Note"
				placeholder="Type something to search for"
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
		</FormControl>
	);
};

export default NotesSearch;
