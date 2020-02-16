import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useStateValue } from '../../hooks/StateContext';

const ChangeTheme = () => {
	const [{ settings }, dispatch] = useStateValue();
	const { darkTheme } = settings;
	const [checked, setChecked] = React.useState(darkTheme);

	const handleToggle = () => {
		dispatch({
			type: 'settingsDarkTheme',
			value: !checked,
		});

		setChecked(!checked);
	};

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
						checked={checked}
						inputProps={{ 'aria-labelledby': 'change-dark-theme' }}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default ChangeTheme;
