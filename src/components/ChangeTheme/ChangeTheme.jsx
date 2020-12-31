import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useGlobalState } from '../../hooks/GlobalState';

const ChangeTheme = () => {
	const [{ settings: { darkTheme } }, dispatch] = useGlobalState();

	const handleToggle = () => dispatch({ type: 'settings-darkTheme' });

	return (
		<>
			<ListItem>
				<ListItemText
					id="change-dark-theme"
					primary="Dark Theme"
				/>
				<ListItemSecondaryAction>
					<Switch
						color="primary"
						edge="end"
						onChange={handleToggle}
						checked={darkTheme}
						inputProps={{ 'aria-labelledby': 'change-dark-theme' }}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default ChangeTheme;
