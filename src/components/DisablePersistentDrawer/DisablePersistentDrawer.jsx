import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useStateValue } from '../../hooks/StateContext';

const DisablePersistentDrawer = () => {
	const [{ settings }, dispatch] = useStateValue();
	const { disablePersistentDrawer } = settings;

	const handleToggle = () => dispatch({ type: 'settings-disablePersistentDrawer' });

	return (
		<>
			<ListItem>
				<ListItemText
					id="change-disable-persistent-drawer"
					primary="Disable Persistent Drawer"
				/>
				<ListItemSecondaryAction>
					<Switch
						color="primary"
						edge="end"
						onChange={handleToggle}
						checked={disablePersistentDrawer}
						inputProps={{ 'aria-labelledby': 'change-disable-persistent-drawer' }}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default DisablePersistentDrawer;
