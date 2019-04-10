import React from 'react';
import {
	ListItem,
	Toggle,
} from 'framework7-react';

import { ThemeContext } from '../ThemeContext';

// eslint-disable-next-line react/prefer-stateless-function
class ToggleTheme extends React.Component {
	render() {
		const { settings, toggleTheme } = this.context;

		return (
			<ListItem>
				<span>Dark Theme</span>
				<Toggle
					name="dark-theme"
					defaultChecked={settings.themeDark}
					onToggleChange={toggleTheme}
				/>
			</ListItem>
		);
	}
}

export default ToggleTheme;
ToggleTheme.contextType = ThemeContext;
