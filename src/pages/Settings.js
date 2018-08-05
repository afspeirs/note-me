import React from 'react';
import { Page, Navbar, List, ListGroup, ListItem } from 'framework7-react';
import CheckForUpdate from './../components/CheckForUpdate';

export default class Settings extends React.Component {
	render() {
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
						<CheckForUpdate />
					</ListGroup>
				</List>
			</Page>
		);
	}
}
