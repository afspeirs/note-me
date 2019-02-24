import React, { Component } from 'react';
import {
	App,
	View,
	Statusbar,
} from 'framework7-react';

import f7Params from '../f7params';

export default class MainApp extends Component {
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
		return (
			<App params={f7Params} colorTheme="orange">
				<Statusbar />
				<View url="/" main className="ios-edges" />
			</App>
		);
	}
}
