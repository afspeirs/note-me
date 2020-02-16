import React, { useEffect } from 'react';
import {
	Switch,
	Redirect,
	Route,
	useLocation,
} from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import { useNotes } from '../../hooks/NotesContext';
import HomePage from '../../pages/HomePage';
import NoPage from '../../pages/NoPage';
import NotePage from '../../pages/NotePage';
import SettingsPage from '../../pages/SettingsPage';

const Routes = () => {
	const { user } = useAuth();
	const location = useLocation();
	const { handleNoteUpdate, notes } = useNotes();
	const isModal = !!(location?.state?.modal && window.previousLocation !== location);

	useEffect(() => {
		window.previousLocation = location;
	}, []); // eslint-disable-line

	useEffect(() => {
		if (!location.state || !location.state.modal) {
			window.previousLocation = location;
		}
	}, [location]);

	return (
		<>
			<Switch location={isModal ? window.previousLocation : location}>
				<Route
					exact
					path="/"
					component={HomePage}
				/>

				<Route
					path="/note/:id"
					render={({ match }) => (
						<NotePage
							handleNoteUpdate={handleNoteUpdate}
							match={match}
							note={notes.find((note) => note.id === match.params.id)}
						/>
					)}
				/>

				<Redirect from="/settings/" to="/" />
				<Route component={NoPage} />
			</Switch>

			{user === false && <Redirect from="/note/" to="/" />}

			{isModal && (
				<Route
					path="/settings/"
					component={SettingsPage}
				/>
			)}
		</>
	);
};

export default Routes;
