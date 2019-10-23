import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';

import Container from '../Container';
import SimpleSnackbar from '../SimpleSnackbar';
import theme from '../../theme';
import { StateProvider } from '../StateContext';

import { auth, db, provider } from '../../firebase';
import Routes from '../Routes';

export default class App extends Component {
	state = {
		drawerOpen: false,
		edit: false,
		loading: true,
		notes: [],
		settings: {
			sort: localStorage.getItem('changeSort') || 'date-asc',
			darkTheme: JSON.parse(localStorage.getItem('changeDarkTheme')) || false,
		},
		swSnackbar: {},
		updateAvailable: false,
		user: null,
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection(user.uid)
					.onSnapshot((snapshot) => {
						const notes = snapshot.docs.map(doc => doc.data());
						this.setState({ loading: false, notes, user });
					});
			} else {
				this.setState({ loading: false, notes: [] });
			}
		});

		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('swNewContentAvailable', this.swNewContentAvailable);
		window.addEventListener('swContentCached', this.swContentCached);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('swNewContentAvailable', this.swNewContentAvailable);
		window.removeEventListener('swContentCached', this.swContentCached);
	}

	swNewContentAvailable = () => {
		const swSnackbar = {
			onClose: () => window.location.reload(true),
			secondaryText: 'Update',
			text: 'A new version is available',
		};
		this.setState({
			swSnackbar,
			updateAvailable: true,
		});
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
			case 'changeDarkTheme':
				this.setState({
					settings: {
						...state,
						darkTheme: action.value,
					},
				});

				return {
					...state,
					darkTheme: action.value,
				};
			default:
				return state;
		}
	};

	signOut = () => auth.signOut()
		.then(() => this.setState({ user: null }));

	signIn = () => auth.signInWithPopup(provider)
		.then(({ user }) => this.setState({ user }));

	setDrawerOpen = value => this.setState({ drawerOpen: value });

	setEdit = edit => this.setState({ edit });

	handleKeyDown = (event) => {
		// CTRL + B = Toggle sidebar
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();
			this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
		}
		// CTRL + E = Toggle edit
		if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();
			this.setState(prevState => ({ edit: !prevState.edit }));
		}
		// Disable some keyboard shortcuts
		if (event.ctrlKey && (event.key === 's' || event.key === 'p')) {
			event.preventDefault();
		}
	}

	handleNoteAdd = (history) => {
		const { user, notes } = this.state;
		const emptyNotes = notes.filter(el => el.text === '');

		if (emptyNotes.length !== 0) {
			history.push(`/note/${emptyNotes[0].id}`);
		} else {
			const newNote = db.collection(user.uid).doc();
			const value = {
				text: '',
				date: +new Date(),
				id: newNote.id,
				created: +new Date(),
			};

			notes.unshift(value);
			this.setState({ notes });

			newNote.set(value).then(() => history.push(`/note/${value.id}`));
		}
	};

	handleNoteDelete = (id, history) => {
		const { user, notes } = this.state;
		const note = notes.find(item => item.id === id);

		db.collection(user.uid)
			.doc(id)
			.delete();

		if (note) {
			const indexOfNote = notes.indexOf(note);
			notes.splice(indexOfNote, 1);
			this.setState({ notes });

			history.replace('/');
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
			drawerOpen,
			edit,
			loading,
			notes,
			settings,
			swSnackbar,
			updateAvailable,
			user,
		} = this.state;

		const muiTheme = createMuiTheme({
			...theme,
			...{
				palette: {
					...theme.palette,
					type: settings.darkTheme === true ? 'dark' : 'light',
				},
			},
		});

		return (
			<ThemeProvider theme={muiTheme}>
				<StylesProvider injectFirst>
					<StateProvider initialState={settings} reducer={this.reducer}>
						<Route
							render={props => (
								<Container
									{...props}
									drawerOpen={drawerOpen}
									edit={edit}
									handleNoteAdd={this.handleNoteAdd}
									handleNoteDelete={this.handleNoteDelete}
									isSignedIn={Boolean(user)}
									loading={loading}
									notes={notes}
									setDrawerOpen={this.setDrawerOpen}
									setEdit={this.setEdit}
								>
									<Routes
										{...props}
										drawerOpen={drawerOpen}
										edit={edit}
										handleNoteDelete={this.handleNoteDelete}
										handleNoteUpdate={this.handleNoteUpdate}
										loading={loading}
										notes={notes}
										setEdit={this.setEdit}
										signIn={this.signIn}
										signOut={this.signOut}
										updateAvailable={updateAvailable}
										user={user}
									/>
								</Container>
							)}
						/>

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
