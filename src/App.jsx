import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import theme from './theme';
import Container from './components/Container';
import Routes from './components/Routes';
import SimpleSnackbar from './components/SimpleSnackbar';
import { useStateValue } from './hooks/StateContext';

const App = () => {
	const [{ settings }, dispatch] = useStateValue();
	const defaultSnackbarContent = {
		onClose: () => {},
		secondaryText: null,
		text: null,
	};
	const [snackbarContent, setSnackbarContent] = useState(defaultSnackbarContent);

	const snackbarReset = () => setSnackbarContent(defaultSnackbarContent);

	const swNewContentAvailable = () => {
		setSnackbarContent({
			onClose: () => window.location.reload(true),
			secondaryText: 'Update',
			text: 'A new version is available',
		});
		dispatch({
			type: 'app-updateAvailable',
			value: true,
		});
	};

	const swContentCached = () => {
		setSnackbarContent({
			...defaultSnackbarContent,
			text: 'Caching complete! Now available offline',
		});
	};

	const handleKeyDown = (event) => {
		// If CTRL or CMD is pressed
		if (event.ctrlKey || event.metaKey) {
			// B = Toggle sidebar
			if (event.key === 'b') {
				event.preventDefault();
				dispatch({ type: 'app-drawerOpen' });
			}
			// E or S = Toggle edit
			if (event.key === 'e' || event.key === 's') {
				event.preventDefault();
				dispatch({ type: 'app-edit' });
			}
			// Disable some keyboard shortcuts
			if ((event.key === 'p')) {
				event.preventDefault();
			}
		}
	};

	const muiTheme = createMuiTheme({
		...theme,
		palette: {
			...theme.palette,
			type: settings.darkTheme === true ? 'dark' : 'light',
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
				<Container>
					<Routes />
				</Container>

				{snackbarContent && (
					<SimpleSnackbar
						onClose={snackbarReset}
						onSecondaryClose={snackbarContent.onClose}
						secondaryText={snackbarContent.secondaryText}
						text={snackbarContent.text}
					/>
				)}
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;