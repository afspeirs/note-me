import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import RouterNavLink from '@/components/shared/RouterNavLink';

const defaultProps = {
  disabled: false,
  exact: null,
  icon: null,
  onClick: null,
  secondary: '',
  to: null,
};

const propTypes = {
  disabled: PropTypes.bool,
  exact: PropTypes.bool,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  to: PropTypes.string,
};

function ListButton({
  disabled,
  exact,
  icon: Icon,
  onClick,
  primary,
  secondary,
  to,
}) {
  return (
    <ListItem
      button
      component={to ? RouterNavLink : null}
      disabled={disabled}
      exact={exact}
      onClick={onClick}
      to={to}
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
