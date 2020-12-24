import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import theme from './theme';
import Container from './components/Container';
import Routes from './components/Routes';
import ServiceWorkerContent from './components/ServiceWorkerContent';
import { useGlobalState } from './hooks/GlobalState';
import { NotesProvider } from './hooks/Notes';
import { SnackbarProvider } from './hooks/Snackbar';

const App = () => {
	const [{ settings: { darkTheme } }] = useGlobalState();

	const muiTheme = createMuiTheme({
		...theme,
		palette: {
			...theme.palette,
			type: darkTheme === true ? 'dark' : 'light',
		},
	});

	return (
		<ThemeProvider theme={muiTheme}>
			<ConfirmProvider>
				<SnackbarProvider>
					<NotesProvider>
						<Container>
							<Routes />
						</Container>

						<ServiceWorkerContent />
					</NotesProvider>
				</SnackbarProvider>
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;
