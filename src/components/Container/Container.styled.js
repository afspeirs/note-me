import { styled } from '@mui/material/styles';

export const drawerWidth = 320;

export const DrawerDiv = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  minWidth: 0,
  height: '100%',
  transition: theme.transitions.create('min-width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('min-width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    minWidth: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    minWidth: drawerWidth,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.paper',
    color: 'text.primary',
  },
  appBar: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
  backdrop: {
    zIndex: (theme) => theme.zIndex.drawer - 1,
  },
  content: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    overflowX: 'hidden',
    paddingTop: 'env(safe-area-inset-top)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  },
};

export default styles;
