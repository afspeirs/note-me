import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Redirect,
	Route,
	useHistory,
	useLocation,
} from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import { useNotes } from '../../hooks/NotesContext';
import HomePage from '../../pages/HomePage';
import NoPage from '../../pages/NoPage';
import NotePage from '../../pages/NotePage';
import SettingsPage from '../../pages/SettingsPage';

const propTypes = {
	drawerOpen: PropTypes.bool.isRequired,
	edit: PropTypes.bool.isRequired,
	setEdit: PropTypes.func.isRequired,
	updateAvailable: PropTypes.bool.isRequired,
};

const Routes = ({
	drawerOpen,
	edit,
	setEdit,
	updateAvailable,
}) => {
	const { user } = useAuth();
	const history = useHistory();
	const location = useLocation();
	const { handleNoteUpdate, notes } = useNotes();
	const isModal = !!(
		location
		&& location.state
		&& location.state.modal
		&& window.previousLocation !== location
	);

	useEffect(() => {
		window.previousLocation = location;
	}, []); // eslint-disable-line

	useEffect(() => {
		if (history.action !== 'POP' && (!location.state || !location.state.modal)) {
			window.previousLocation = location;
		}
	}, [history, location]);

	return (
		<>
			<Switch location={isModal ? window.previousLocation : location}>
				<Route
					exact
					path="/"
					render={() => <HomePage drawerOpen={drawerOpen} />}
				/>

				<Route
					path="/note/:id"
					render={props => (
						<NotePage
							{...props}
							edit={edit}
							handleNoteUpdate={handleNoteUpdate}
							// eslint-disable-next-line react/prop-types
							note={notes.find(note => note.id === props.match.params.id)}
							setEdit={setEdit}
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
					render={props => (
						<SettingsPage
							{...props}
							updateAvailable={updateAvailable}
						/>
					)}
				/>
			)}
		</>
	);
};

Routes.propTypes = propTypes;

export default Routes;
