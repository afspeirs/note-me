import PropTypes from 'prop-types';
import {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@mui/material';

import { useGlobalState } from '@/hooks/GlobalState';
import styles from './ToggleGlobalState.styled';

const defaultProps = {
	disabled: false,
	icon: null,
};

const propTypes = {
	disabled: PropTypes.bool,
	icon: PropTypes.objectOf(PropTypes.any), // eslint-disable-line react/forbid-prop-types
	label: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
};

const ToggleGlobalState = ({
	disabled,
	icon: Icon,
	label,
	state,
}) => {
	const [global, dispatch] = useGlobalState();
	const [scope, name] = state.split('-');
	const setting = global[scope][name];

	const handleToggle = () => dispatch({
		type: state,
	});

	return (
		<ListItem
			button
			disabled={disabled}
			onClick={handleToggle}
		>
			{Icon && (
				<ListItemIcon>
					<Icon />
				</ListItemIcon>
			)}
			<ListItemText
				id={`toggle-${state}`}
				primary={label}
			/>
			<ListItemSecondaryAction sx={styles.listItemSecondaryAction}>
				<Switch
					color="primary"
					disabled={disabled}
					edge="end"
					checked={setting}
					inputProps={{ 'aria-labelledby': `toggle-${state}` }}
					tabIndex={-1}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

ToggleGlobalState.propTypes = propTypes;
ToggleGlobalState.defaultProps = defaultProps;

export default ToggleGlobalState;
