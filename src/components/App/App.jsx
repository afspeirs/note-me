import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';

import Container from '../Container';
import SimpleSnackbar from '../SimpleSnackbar';
import theme from '../../theme';
import { StateProvider } from '../StateContext';

import { auth, db, provider } from '../../firebase';
import Routes from '../Routes';

export default class App extends Component {
	state = {
		edit: false,
		loading: true,
		notes: [],
		settings: {
			sort: localStorage.getItem('changeSort') || 'date-asc',
			performance: JSON.parse(localStorage.getItem('changePerformance')) || false,
			// themeDark: JSON.parse(localStorage.getItem('themeDark')) || false,
		},
		swSnackbar: {},
		user: null,
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });

				db.collection(user.uid)
					.onSnapshot((snapshot) => {
						const notes = snapshot.docs.map(doc => doc.data());
						this.setState({ loading: false, notes, user });
					});
			} else {
				this.setState({ loading: false, notes: [] });
			}
		});

		window.addEventListener('swNewContentAvailable', this.swNewContentAvailable);
		window.addEventListener('swContentCached', this.swContentCached);
	}

	componentWillUnmount() {
		window.removeEventListener('swNewContentAvailable', this.swNewContentAvailable);
		window.removeEventListener('swContentCached', this.swContentCached);
	}

	swNewContentAvailable = () => {
		const swSnackbar = {
			onClose: () => window.location.reload(true),
			secondaryText: 'Update',
			text: 'A new version is available',
		};
		this.setState({ swSnackbar });
	}

	swContentCached = () => {
		const swSnackbar = {
			onClose: () => {},
			secondaryText: null,
			text: 'Caching complete! Now available offline',
		};
		this.setState({ swSnackbar });
	};

	swSnackbarReset = () => {
		const swSnackbar = {
			onClose: () => {},
			secondaryText: null,
			text: null,
		};
		this.setState({ swSnackbar });
	};

	reducer = (state, action) => {
		localStorage.setItem(action.type, action.value);
		switch (action.type) {
			case 'changeSort':
				return {
					...state,
					sort: action.value,
				};
			case 'changePerformance':
				return {
					...state,
					performance: action.value,
				};
			default:
				return state;
		}
	};

	signOut = () => auth.signOut()
		.then(() => this.setState({ user: null }));

	signIn = () => auth.signInWithPopup(provider)
		.then(({ user }) => this.setState({ user }));

	setEdit = edit => this.setState({ edit });

	handleNoteAdd = (text, history) => {
		const { user, notes } = this.state;
		const newNote = db.collection(user.uid).doc();
		const value = {
			text,
			date: +new Date(),
			id: newNote.id,
			created: +new Date(),
		};

		notes.unshift(value);
		this.setState({ notes });

		newNote.set(value)
			.then(() => history.replace(`/note/${value.id}`));
	};

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

	handleNoteUpdate = (id, text) => {
		const { user, notes } = this.state;
		const index = notes.findIndex(note => note.id === id);
		const value = {
			...notes[index],
			text,
			date: +new Date(),
		};

		db.collection(user.uid)
			.doc(id)
			.set(value);

		notes[index] = value;
		this.setState({ notes });
	};

	render() {
		const {
			edit,
			loading,
			notes,
			settings,
			swSnackbar,
			user,
		} = this.state;

		return (
			<ThemeProvider theme={theme}>
				<StylesProvider injectFirst>
					<StateProvider initialState={settings} reducer={this.reducer}>
						<Container
							edit={edit}
							handleNoteDelete={this.handleNoteDelete}
							loading={loading}
							notes={notes}
							setEdit={this.setEdit}
						>
							<Route
								render={props => (
									<Routes
										{...props}
										edit={edit}
										handleNoteAdd={this.handleNoteAdd}
										handleNoteDelete={this.handleNoteDelete}
										handleNoteUpdate={this.handleNoteUpdate}
										loading={loading}
										notes={notes}
										setEdit={this.setEdit}
										signIn={this.signIn}
										signOut={this.signOut}
										user={user}
									/>
								)}
							/>
						</Container>

						{swSnackbar && (
							<SimpleSnackbar
								onClose={this.swSnackbarReset}
								onSecondaryClose={swSnackbar.onClose}
								secondaryText={swSnackbar.secondaryText}
								text={swSnackbar.text}
							/>
						)}
					</StateProvider>
				</StylesProvider>
			</ThemeProvider>
		);
	}
}
