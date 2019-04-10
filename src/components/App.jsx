/* eslint-disable react/no-unused-state */
// This has been added due the state is being accessed via Context

import React, { Component } from 'react';
import {
	App,
	View,
	Statusbar,
} from 'framework7-react';

import f7Params from '../f7params';
import { ThemeContext } from '../ThemeContext';

export default class MainApp extends Component {
	state = {
		settings: {
			themeDark: JSON.parse(localStorage.getItem('themeDark')) || false,
		},
		toggleTheme: () => {
			const { settings } = this.state;
			settings.themeDark = !settings.themeDark;

			this.setState({ settings });
			localStorage.setItem('themeDark', settings.themeDark);
		},
	};

	componentDidMount() {
		// ServiceWorker events
		window.addEventListener('swNewContentAvailable', () => {
			this.$f7.toast.create({
				text: 'A new version is available',
				closeButtonText: 'Refresh',
				on: {
					close() {
						window.location.reload(window.location.href);
					},
				},
			}).open();
		});
		window.addEventListener('swContentCached', () => {
			this.$f7.toast.create({
				text: 'Caching complete! Now available offline',
			}).open();
		});
	}

	render() {
		const { settings } = this.state;

		return (
			<ThemeContext.Provider value={this.state}>
				<App
					params={f7Params}
					themeDark={settings.themeDark}
					colorTheme="orange"
				>
					<Statusbar />
					<View url="/" main className="ios-edges" />
				</App>
			</ThemeContext.Provider>
		);
	}
}
