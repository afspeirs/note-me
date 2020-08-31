import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import theme from './theme';
import Container from './components/Container';
import Routes from './components/Routes';
import ServiceWorkerContent from './components/ServiceWorkerContent';
import { useGlobalState } from './hooks/GlobalState';
import { SnackbarProvider } from './hooks/Snackbar';

const App = () => {
	const [{ settings }, dispatch] = useGlobalState();

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

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []); // eslint-disable-line

	return (
		<ThemeProvider theme={muiTheme}>
			<ConfirmProvider>
				<SnackbarProvider>
					<Container>
						<Routes />
					</Container>

					<ServiceWorkerContent />
				</SnackbarProvider>
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;
