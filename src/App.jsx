import { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';

import theme from './theme';
import Container from './components/Container';
import Routes from './components/Routes';
import FilesDragAndDrop from './components/FilesDragAndDrop';
import ServiceWorkerContent from './components/shared/ServiceWorkerContent';
import { useGlobalState } from './hooks/GlobalState';
import { NotesProvider } from './hooks/Notes';
import { SnackbarProvider } from './hooks/Snackbar';

const App = () => {
	const [{ settings: { appTheme } }] = useGlobalState();
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const muiTheme = useMemo(
		() => createMuiTheme({
			palette: {
				...theme.palette,
				// eslint-disable-next-line no-nested-ternary
				type: appTheme === 'default' ? (prefersDarkMode ? 'dark' : 'light') : appTheme,
			},
		}),
		[prefersDarkMode, appTheme],
	);

	return (
		<ThemeProvider theme={muiTheme}>
			<ConfirmProvider>
				<SnackbarProvider>
					<NotesProvider>
						<CssBaseline />
						<Container>
							<Routes />
						</Container>

						<FilesDragAndDrop />
						<ServiceWorkerContent />
					</NotesProvider>
				</SnackbarProvider>
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;
