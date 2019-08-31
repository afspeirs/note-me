import React from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from '@material-ui/core';

import { useStateValue } from '../StateContext';

const PerformanceMode = () => {
	const [{ performance }, dispatch] = useStateValue();
	const [checked, setChecked] = React.useState(performance);

	const handleToggle = () => {
		dispatch({
			type: 'changePerformance',
			value: !checked,
		});

		setChecked(!checked);
	};

	return (
		<>
			<ListItem>
				<ListItemText
					id="switch-performance-mode"
					primary="Performance Mode"
					secondary="Improve performance on low-end devices"
				/>
				<ListItemSecondaryAction>
					<Switch
						color="primary"
						edge="end"
						onChange={handleToggle}
						checked={checked}
						inputProps={{ 'aria-labelledby': 'switch-performance-mode' }}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default PerformanceMode;
