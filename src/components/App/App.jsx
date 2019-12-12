import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Container from '../Container';
import SimpleSnackbar from '../SimpleSnackbar';
import theme from '../../theme';
import { StateProvider } from '../StateContext';

import { auth, db, provider } from '../../firebase';
import Routes from '../Routes';

const App = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [settings, setSettings] = useState({
		sort: localStorage.getItem('changeSort') || 'date-asc',
		darkTheme: JSON.parse(localStorage.getItem('changeDarkTheme')) || false,
	});
	const [snackbarContent, setSnackbarConent] = useState({});
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [user, setUser] = useState(null);

	const swNewContentAvailable = () => {
		setSnackbarConent({
			onClose: () => window.location.reload(true),
			secondaryText: 'Update',
			text: 'A new version is available',
		});
		setUpdateAvailable(true);
	};

	const swContentCached = () => {
		setSnackbarConent({
			onClose: () => {},
			secondaryText: null,
			text: 'Caching complete! Now available offline',
		});
	};

	const swSnackbarReset = () => {
		setSnackbarConent({
			onClose: () => {},
			secondaryText: null,
			text: null,
		});
	};

	const reducer = (state, action) => {
		localStorage.setItem(action.type, action.value);
		switch (action.type) {
			case 'changeSort':
				return {
					...state,
					sort: action.value,
				};
			case 'changeDarkTheme':
				setSettings({
					...settings,
					darkTheme: action.value,
				});

				return {
					...state,
					darkTheme: action.value,
				};
			default:
				return state;
		}
	};

	const signOut = () => auth.signOut()
		.then(() => setUser(null));

	const signIn = () => auth.signInWithPopup(provider)
		.then(({ user: authUser }) => setUser(authUser));

	const handleKeyDown = (event) => {
		// CTRL + B = Toggle sidebar
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();
			setDrawerOpen(prevState => !prevState);
		}
		// CTRL + E = Toggle edit
		if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();
			setEdit(prevState => !prevState);
		}
		// Disable some keyboard shortcuts
		if (event.ctrlKey && (event.key === 's' || event.key === 'p')) {
			event.preventDefault();
		}
	};

	const handleNoteAdd = (history) => {
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
			newNote.set(value).then(() => history.push(`/note/${value.id}`));
		}
	};

	const handleNoteDelete = (id, history) => {
		const note = notes.find(item => item.id === id);

		db.collection(user.uid)
			.doc(id)
			.delete();

		if (note) {
			const indexOfNote = notes.indexOf(note);
			notes.splice(indexOfNote, 1);
			history.replace('/');
		}
	};

	const handleNoteUpdate = (id, text) => {
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
	};

	const muiTheme = createMuiTheme({
		...theme,
		...{
			palette: {
				...theme.palette,
				type: settings.darkTheme === true ? 'dark' : 'light',
			},
		},
	});

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);
				db.collection(authUser.uid)
					.onSnapshot((snapshot) => {
						const authNotes = snapshot.docs.map(doc => doc.data());
						setLoading(false);
						setNotes(authNotes);
					});
			} else {
				setLoading(false);
				setNotes([]);
				setUser(false);
			}
		});

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('swNewContentAvailable', swNewContentAvailable);
		window.addEventListener('swContentCached', swContentCached);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('swNewContentAvailable', swNewContentAvailable);
			window.removeEventListener('swContentCached', swContentCached);
		};
	}, []); // eslint-disable-line

	return (
		<BrowserRouter>
			<ThemeProvider theme={muiTheme}>
				<StateProvider initialState={settings} reducer={reducer}>
					<Container
						drawerOpen={drawerOpen}
						edit={edit}
						handleNoteAdd={handleNoteAdd}
						handleNoteDelete={handleNoteDelete}
						isSignedIn={user !== false}
						loading={loading}
						notes={notes}
						setDrawerOpen={setDrawerOpen}
						setEdit={setEdit}
					>
						<Routes
							drawerOpen={drawerOpen}
							edit={edit}
							handleNoteDelete={handleNoteDelete}
							handleNoteUpdate={handleNoteUpdate}
							loading={loading}
							notes={notes}
							setEdit={setEdit}
							signIn={signIn}
							signOut={signOut}
							updateAvailable={updateAvailable}
							user={user}
						/>
					</Container>

					{snackbarContent && (
						<SimpleSnackbar
							onClose={swSnackbarReset}
							onSecondaryClose={snackbarContent.onClose}
							secondaryText={snackbarContent.secondaryText}
							text={snackbarContent.text}
						/>
					)}
				</StateProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
