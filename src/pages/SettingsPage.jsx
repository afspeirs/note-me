import React from 'react';
import {
	Page,
	List,
	ListGroup,
	ListItem,
} from 'framework7-react';

import AccountSignIn from '../components/AccountSignIn';
import CheckForUpdate from '../components/CheckForUpdate';
import Navbar from '../components/Navbar';
import ToggleTheme from '../components/ToggleTheme';

export default () => (
	<Page>
		<Navbar title="Settings" backLink="Back" />

		<AccountSignIn />

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
		<List>
			<ListGroup>
				<ToggleTheme />
			</ListGroup>
		</List>
	</Page>
);
