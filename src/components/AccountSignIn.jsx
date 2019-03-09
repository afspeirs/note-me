import React from 'react';
import {
	List,
	ListButton,
	ListGroup,
	ListItem,
} from 'framework7-react';

import { auth, provider } from '../firebase';
import blankUserPhoto from '../img/blank-user-photo.png';

export default class AccountSignIn extends React.Component {
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

	signOut = () => {
		auth.signOut()
			.then(() => this.setState({ user: null }));
	}

	signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				const { user } = result;
				this.setState({ user });
			});
	}

	render() {
		const { user } = this.state;
		// console.sign(user);

		return (
			<List>
				<ListGroup>
					<ListItem title={user ? user.email : 'Sign in below with Google'}>
						{user
							? <img slot="media" className="user-photo" src={user.photoURL} alt="user" />
							: <img slot="media" className="user-photo" src={blankUserPhoto} alt="user" />
						}
					</ListItem>
				</ListGroup>
				<ListGroup>
					{user
						? <ListButton onClick={this.signOut} title="Sign Out" color="red" />
						: <ListButton onClick={this.signIn} title="Sign In" color="orange" />
					}
				</ListGroup>
			</List>
		);
	}
}
