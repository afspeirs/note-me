import React from 'react';
import { Page, Navbar, List, ListGroup, ListItem, Icon, Preloader } from 'framework7-react';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showUpdatePreloader: false
		};
	}

	updateServiceWorker = () => {
		this.setState({ showUpdatePreloader: true });

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then(registration => {
				registration.update();
			});
		} else {
			setTimeout(() => {
				window.location.reload(window.location.href);
			}, 1500);
		}

		setTimeout(() => {
			this.setState({ showUpdatePreloader: false });
		}, 1500);
	}

	render() {
		const { showUpdatePreloader } = this.state;
		// console.log(showUpdatePreloader);

		return (
			<Page>
				<Navbar title="Settings" backLink="Back"></Navbar>

				<List>
					<ListGroup>
						<ListItem title="App Version">
							{`v${this.$f7.version}`}
						</ListItem>
					</ListGroup>
					<ListGroup>
						<ListItem title="Check for update" onClick={this.updateServiceWorker}>
							<Icon material="refresh" style={{ display: !showUpdatePreloader ? 'block' : 'none' }}></Icon>
							<Preloader size={22} style={{ display: showUpdatePreloader ? 'block' : 'none' }}></Preloader>
						</ListItem>
					</ListGroup>
				</List>
			</Page>
		);
	}
}
