import { useMemo } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import theme from './theme';
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
		() => createTheme({
			palette: {
				...theme.palette,
				// eslint-disable-next-line no-nested-ternary
				mode: appTheme === 'default' ? (prefersDarkMode ? 'dark' : 'light') : appTheme,
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
						<Routes />

						<FilesDragAndDrop />
						<ServiceWorkerContent />
					</NotesProvider>
				</SnackbarProvider>
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;
