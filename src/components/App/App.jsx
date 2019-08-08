import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';

import { Container } from './App.styled';
import Header from '../Header';
import theme from '../../theme';

import { auth, db, provider } from '../../firebase';
import HomePage from '../../pages/HomePage';
import NotePage from '../../pages/NotePage';
import NoPage from '../../pages/NoPage';

export default class App extends Component {
	state = {
		// settings: {
		// 	themeDark: JSON.parse(localStorage.getItem('themeDark')) || false,
		// },
		loading: true,
		notes: [],
		user: null,
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });

				db.collection(user.uid)
					.get()
					.then((collection) => {
						const notes = collection.docs.map(doc => doc.data());
						notes.sort((a, b) => new Date(b.date) - new Date(a.date));
						this.setState({ loading: false, notes, user });
					});
			} else {
				this.setState({ loading: false });
			}
		});
	}

	signOut = () => auth.signOut()
		.then(() => this.setState({ user: null }));

	signIn = () => auth.signInWithPopup(provider)
		.then(({ user }) => this.setState({ user }));

	handleNoteDelete = (id, note = null) => {
		const { user, notes } = this.state;

		db.collection(user.uid)
			.doc(id)
			.delete();

		if (note) {
			const indexOfNote = notes.indexOf(note);
			notes.splice(indexOfNote, 1);
			this.setState({ notes });
		}
	};

	render() {
		const {
			loading,
			notes,
			user,
		} = this.state;

		return (
			<ThemeProvider theme={theme}>
				<StylesProvider injectFirst>
					<Container>
						<Header
							loading={loading}
							notes={notes}
							user={user}
							signIn={this.signIn}
							signOut={this.signOut}
						>
							<Switch>
								<Route
									exact
									path="/"
									render={() => <HomePage loading={loading} notes={notes} />}
								/>
								<Route
									path="/note/:id"
									render={props => <NotePage {...props} user={user} />}
								/>
								<Route component={NoPage} />
							</Switch>
						</Header>
					</Container>
				</StylesProvider>
			</ThemeProvider>
		);
	}
}
