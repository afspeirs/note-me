const styles = {
  appBarPadding: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
  children: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
  },
  childrenPadding: {
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
    '& > *:last-child': {
      marginBottom: 'env(safe-area-inset-bottom)',
    },
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flex: 1,
    userSelect: 'none',
  },
  toolbar: {
    left: 'env(titlebar-area-x, 0)',
    top: 'env(titlebar-area-y, 0)',
    width: 'env(titlebar-area-width, 100%)',
  },
};

export default styles;
