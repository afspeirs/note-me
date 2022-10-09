import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Backdrop,
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  useMediaQuery,
} from '@mui/material';

import DrawerContent from '@/components/DrawerContent';
import { useGlobalState } from '@/hooks/GlobalState';
import { useHotkeys } from '@/hooks/Hotkeys';
import styles, { DrawerDiv } from './Container.styled';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function Container({ children }) {
  const [{ drawerOpen }, dispatch] = useGlobalState();
  const history = useHistory();
  const mobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const { mode } = theme.palette;

  const handleDrawerClose = () => dispatch({ type: 'app-drawerOpen', value: false });
  const handleDrawerToggle = () => dispatch({ type: 'app-drawerOpen' });

  useHotkeys([
    // B = Toggle sidebar
    {
      keys: ['b'],
      callback: (event) => {
        event.preventDefault();
        handleDrawerToggle();
      },
      metaModifier: true,
    },
    // P or S = Disable Event
    {
      keys: ['p', 's'],
      callback: (event) => event.preventDefault(),
      metaModifier: true,
    },
  ]);

  // Run handleDrawerClose if the history changes
  useEffect(() => {
    const unlisten = history.listen(() => mobile && handleDrawerClose());
    return unlisten;
  }, [history, mobile]);

  return (
    <Box sx={styles.root}>
      <Helmet>
        <meta name="theme-color" content={mode === 'dark' ? '#272727' : '#ee6e00'} />
      </Helmet>

      <MuiDrawer
        anchor="left"
        onClose={handleDrawerClose}
        open={drawerOpen}
        sx={styles.drawer}
        variant="persistent"
      >
        <Toolbar />
        <DrawerContent />
      </MuiDrawer>

      <Backdrop
        invisible
        onClick={handleDrawerClose}
        open={mobile && drawerOpen}
        sx={styles.backdrop}
      />

      <AppBar
        position="relative"
        sx={styles.appBar}
        elevation={0}
      >
        <Toolbar />
      </AppBar>

      <Box sx={styles.content}>
        <DrawerDiv open={drawerOpen} />
        {children}
      </Box>
    </Box>
  );
}

Container.propTypes = propTypes;

export default Container;
