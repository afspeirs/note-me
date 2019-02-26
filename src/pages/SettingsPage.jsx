import React from 'react';
import {
	Page,
	List,
	ListButton,
	ListGroup,
	ListItem,
} from 'framework7-react';

import { auth, provider } from '../firebase';
import Navbar from '../components/Navbar';
import CheckForUpdate from '../components/CheckForUpdate';

import blankUserPhoto from '../img/blank-user-photo.png';

export default class HomePage extends React.Component {
	state = {
		user: null,
	};

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			}
		});
	}

	logout = () => {
		auth.signOut()
			.then(() => this.setState({ user: null }));

		this.$f7router.clearPreviousPages();
	}

	login = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				const { user } = result;
				this.setState({ user });
			});
	}

	render() {
		const { user } = this.state;
		// console.log(user);

		return (
			<Page>
				<Navbar title="Settings" backLink="Back" />

				<List>
					<ListGroup>
						<ListItem title={user ? user.email : 'Please log in'}>
							{user
								? <img slot="media" className="user-photo" src={user.photoURL} alt="user" />
								: <img slot="media" className="user-photo" src={blankUserPhoto} alt="user" />
							}
						</ListItem>
					</ListGroup>
					<ListGroup>
						{user
							? <ListButton onClick={this.logout} title="Log Out" color="red" />
							: <ListButton onClick={this.login} title="Log In" />
						}
					</ListGroup>
				</List>

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
	}
}
