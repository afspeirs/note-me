import React from 'react';
import {
	Page,
	List,
	ListGroup,
	ListItem,
} from 'framework7-react';

import Navbar from '../components/Navbar';
import CheckForUpdate from '../components/CheckForUpdate';

export default () => (
	<Page>
		<Navbar title="Settings" backLink="Back" />

		<List>
			<ListGroup>
				<ListItem title="App Version">
					{`v${process.env.REACT_APP_VERSION}`}
				</ListItem>
			</ListGroup>
			<ListGroup>
				<CheckForUpdate />
			</ListGroup>
		</List>
	</Page>
);
