import { Helmet } from 'react-helmet';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

import HeaderContent from '@/components/shared/HeaderContent';
import { useGlobalState } from '@/hooks/GlobalState';
import styles, { Content } from './Page.styled';

const defaultProps = {
  disableHeaderItemsOverflowMenu: false,
  disableSwipes: false,
  headerItems: [],
  hideMenuButton: false,
  showPrompt: false,
  title: '',
  titleDocument: '',
};

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disableHeaderItemsOverflowMenu: PropTypes.bool,
  disableSwipes: PropTypes.bool,
  headerItems: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      text: PropTypes.string,
    }),
  ),
  hideMenuButton: PropTypes.bool,
  showPrompt: PropTypes.bool,
  title: PropTypes.string,
  titleDocument: PropTypes.string,
};

function Page({
  children,
  disableHeaderItemsOverflowMenu,
  disableSwipes,
  headerItems,
  hideMenuButton,
  showPrompt,
  title,
  titleDocument,
}) {
  const [{ drawerOpen }, dispatch] = useGlobalState();
  const mobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => dispatch({ type: 'app-drawerOpen' });
  const handleDrawerOpen = () => dispatch({ type: 'app-drawerOpen', value: true });

  const handlers = useSwipeable({
    onSwipedRight: () => !disableSwipes && handleDrawerOpen(),
    // trackMouse: true,
    trackTouch: true,
  });

  return (
    <>
      <Helmet>
        <title>{titleDocument || title ? `${titleDocument || title} | ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>

      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          {!hideMenuButton ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={styles.menuIcon}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" component="h1" noWrap sx={styles.title}>
            {title || import.meta.env.VITE_APP_TITLE}
          </Typography>
          <HeaderContent
            headerItems={headerItems}
            disableHeaderItems={mobile && drawerOpen}
            disableOverflowMenu={disableHeaderItemsOverflowMenu}
          />
        </Toolbar>
      </AppBar>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Content {...handlers}>
        {children}
      </Content>

      <Prompt when={showPrompt} message="Are you sure you want to leave without saving?" />
    </>
  );
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
