import { useMemo, useState } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import theme from './theme';
import Container from './components/Container';
import Routes from './components/Routes';
import FilesDragAndDrop from './components/FilesDragAndDrop';
import { NotesDepreciationNoticeModal } from './components/NotesDepreciationNotice';
import ServiceWorkerContent from './components/shared/ServiceWorkerContent';
import { useGlobalState } from './hooks/GlobalState';
import { NotesProvider } from './hooks/Notes';
import { SnackbarProvider } from './hooks/Snackbar';

function App() {
  const [open, setOpen] = useState(!window.localStorage.getItem('deprecation-notice-dismissed'));
  const [{ settings: { appTheme } }] = useGlobalState();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const muiTheme = useMemo(
    () => createTheme({
      components: {
        MuiBackdrop: {
          styleOverrides: {
            root: {
              WebkitAppRegion: 'no-drag',
              appRegion: 'no-drag',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              WebkitAppRegion: 'drag',
              appRegion: 'drag',
            },
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              WebkitAppRegion: 'no-drag',
              appRegion: 'no-drag',
            },
          },
        },
      },
      palette: {
        ...theme.palette,
        // eslint-disable-next-line no-nested-ternary
        mode: appTheme === 'default' ? (prefersDarkMode ? 'dark' : 'light') : appTheme,
      },
    }),
    [appTheme, prefersDarkMode],
  );

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={muiTheme}>
        <ConfirmProvider>
          <SnackbarProvider>
            <NotesProvider>
              <Container>
                <Routes />
              </Container>

              <NotesDepreciationNoticeModal
                open={open}
                onClose={() => setOpen(false)}
              />

              <FilesDragAndDrop />
              <ServiceWorkerContent />
            </NotesProvider>
          </SnackbarProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
