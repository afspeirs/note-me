import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Redirect,
	Route,
	useHistory,
	useLocation,
} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import NoPage from '../../pages/NoPage';
import NotePage from '../../pages/NotePage';
import SettingsPage from '../../pages/SettingsPage';

const defaultProps = {
	user: null,
};

const propTypes = {
	drawerOpen: PropTypes.bool.isRequired,
	edit: PropTypes.bool.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	handleNoteUpdate: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
	setEdit: PropTypes.func.isRequired,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	updateAvailable: PropTypes.bool.isRequired,
	user: PropTypes.instanceOf(Object),
};

const Routes = ({
	drawerOpen,
	edit,
	handleNoteDelete,
	handleNoteUpdate,
	loading,
	notes,
	setEdit,
	signIn,
	signOut,
	updateAvailable,
	user,
}) => {
	const history = useHistory();
	const location = useLocation();
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
					render={() => (
						<HomePage
							drawerOpen={drawerOpen}
							handleNoteDelete={handleNoteDelete}
							isSignedIn={Boolean(user)}
							loading={loading}
							notes={notes}
							signIn={signIn}
						/>
					)}
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

			{!user && <Redirect from="/note/" to="/" />}

			{isModal && (
				<Route
					path="/settings/"
					render={props => (
						<SettingsPage
							{...props}
							signIn={signIn}
							signOut={signOut}
							updateAvailable={updateAvailable}
							user={user}
						/>
					)}
				/>
			)}
		</>
	);
};

Routes.defaultProps = defaultProps;
Routes.propTypes = propTypes;

export default Routes;
