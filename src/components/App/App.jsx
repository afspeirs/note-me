import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Container from '../Container';
import SimpleSnackbar from '../SimpleSnackbar';
import theme from '../../theme';
import { StateProvider } from '../StateContext';
import Routes from '../Routes';

const App = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [settings, setSettings] = useState({
		sort: localStorage.getItem('changeSort') || 'date-asc',
		darkTheme: JSON.parse(localStorage.getItem('changeDarkTheme')) || false,
	});
	const [snackbarContent, setSnackbarConent] = useState({});
	const [updateAvailable, setUpdateAvailable] = useState(false);

	const swNewContentAvailable = () => {
		setSnackbarConent({
			onClose: () => window.location.reload(true),
			secondaryText: 'Update',
			text: 'A new version is available',
		});
		setUpdateAvailable(true);
	};

	const swContentCached = () => {
		setSnackbarConent({
			onClose: () => {},
			secondaryText: null,
			text: 'Caching complete! Now available offline',
		});
	};

	const swSnackbarReset = () => {
		setSnackbarConent({
			onClose: () => {},
			secondaryText: null,
			text: null,
		});
	};

	const reducer = (state, action) => {
		localStorage.setItem(action.type, action.value);
		switch (action.type) {
			case 'changeSort':
				return {
					...state,
					sort: action.value,
				};
			case 'changeDarkTheme':
				setSettings({
					...settings,
					darkTheme: action.value,
				});

				return {
					...state,
					darkTheme: action.value,
				};
			default:
				return state;
		}
	};

	const handleKeyDown = (event) => {
		// CTRL + B = Toggle sidebar
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();
			setDrawerOpen(prevState => !prevState);
		}
		// CTRL + E = Toggle edit
		if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();
			setEdit(prevState => !prevState);
		}
		// Disable some keyboard shortcuts
		if (event.ctrlKey && (event.key === 's' || event.key === 'p')) {
			event.preventDefault();
		}
	};

	const muiTheme = createMuiTheme({
		...theme,
		...{
			palette: {
				...theme.palette,
				type: settings.darkTheme === true ? 'dark' : 'light',
			},
		},
	});

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('swNewContentAvailable', swNewContentAvailable);
		window.addEventListener('swContentCached', swContentCached);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('swNewContentAvailable', swNewContentAvailable);
			window.removeEventListener('swContentCached', swContentCached);
		};
	}, []); // eslint-disable-line

	return (
		<ThemeProvider theme={muiTheme}>
			<StateProvider initialState={settings} reducer={reducer}>
				<Container
					drawerOpen={drawerOpen}
					edit={edit}
					setDrawerOpen={setDrawerOpen}
					setEdit={setEdit}
				>
					<Routes
						drawerOpen={drawerOpen}
						edit={edit}
						setEdit={setEdit}
						updateAvailable={updateAvailable}
					/>
				</Container>

				{snackbarContent && (
					<SimpleSnackbar
						onClose={swSnackbarReset}
						onSecondaryClose={snackbarContent.onClose}
						secondaryText={snackbarContent.secondaryText}
						text={snackbarContent.text}
					/>
				)}
			</StateProvider>
		</ThemeProvider>
	);
};

export default App;
