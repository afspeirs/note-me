import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import Container from '../Container';
import Routes from '../Routes';
import SimpleSnackbar from '../SimpleSnackbar';
import theme from '../../theme';
import { StateProvider } from '../../hooks/StateContext';

const App = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [settings, setSettings] = useState({
		sort: localStorage.getItem('changeSort') || 'date-asc',
		sortFavourite: JSON.parse(localStorage.getItem('changeSortFavourite')) || false,
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
			case 'changeSortFavourite':
				return {
					...state,
					sortFavourite: action.value,
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
		// If CTRL or CMD is pressed
		if (event.ctrlKey || event.metaKey) {
			// B = Toggle sidebar
			if (event.key === 'b') {
				event.preventDefault();
				setDrawerOpen((prevState) => !prevState);
			}
			// E or S = Toggle edit
			if (event.key === 'e' || event.key === 's') {
				event.preventDefault();
				setEdit((prevState) => !prevState);
			}
			// Disable some keyboard shortcuts
			if ((event.key === 'p')) {
				event.preventDefault();
			}
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
			<ConfirmProvider>
				<StateProvider initialState={settings} reducer={reducer}>
					<Container
						drawerOpen={drawerOpen}
						setDrawerOpen={setDrawerOpen}
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
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;
