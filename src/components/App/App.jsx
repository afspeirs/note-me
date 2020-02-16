import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import Container from '../Container';
import Routes from '../Routes';
import SimpleSnackbar from '../SimpleSnackbar';
import theme from '../../theme';
import { useStateValue } from '../../hooks/StateContext';

const App = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [settings] = useStateValue();
	const defaultSnackbarContent = {
		onClose: () => {},
		secondaryText: null,
		text: null,
	};
	const [snackbarContent, setSnackbarContent] = useState(defaultSnackbarContent);
	const [updateAvailable, setUpdateAvailable] = useState(false);

	const swNewContentAvailable = () => {
		setSnackbarContent({
			onClose: () => window.location.reload(true),
			secondaryText: 'Update',
			text: 'A new version is available',
		});
		setUpdateAvailable(true);
	};

	const swContentCached = () => {
		setSnackbarContent({
			...defaultSnackbarContent,
			text: 'Caching complete! Now available offline',
		});
	};

	const swSnackbarReset = () => setSnackbarContent(defaultSnackbarContent);

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
			</ConfirmProvider>
		</ThemeProvider>
	);
};

export default App;
