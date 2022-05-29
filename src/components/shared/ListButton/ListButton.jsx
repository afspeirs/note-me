import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import RouterNavLink from '@/components/shared/RouterNavLink';

const defaultProps = {
  Icon: null,
  exact: null,
  secondary: '',
  to: null,
  onClick: null,
};

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Icon: PropTypes.objectOf(PropTypes.any),
  primary: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  secondary: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

function ListButton({
  Icon,
  primary,
  exact,
  secondary,
  to,
  onClick,
}) {
  return (
    <ListItem
      button
      component={to ? RouterNavLink : null}
      exact={exact}
      to={to}
      onClick={onClick}
    >
      {Icon && (
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      )}
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </ListItem>
  );
}

ListButton.defaultProps = defaultProps;
ListButton.propTypes = propTypes;

export default ListButton;
