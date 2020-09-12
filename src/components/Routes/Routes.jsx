import React, { useEffect } from 'react';
import {
	Switch,
	Redirect,
	Route,
	useLocation,
} from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import HomePage from '../../pages/HomePage';
import NewNotePage from '../../pages/NewNotePage';
import NoPage from '../../pages/NoPage';
import NotePage from '../../pages/NotePage';
import SettingsPage from '../../pages/SettingsPage';

const Routes = () => {
	const { user } = useAuth();
	const location = useLocation();
	const isModal = !!(location?.state?.modal && window.previousLocation !== location);

	// Save window.previousLocation to sessionStorage for later
	// If the page reloads with a modal open it renders the 404 page instead of the HomePage
	useEffect(() => {
		if (window.previousLocation) {
			sessionStorage.setItem('previousLocation', JSON.stringify(window.previousLocation));
		} else {
			window.previousLocation = JSON.parse(sessionStorage.getItem('previousLocation'));
		}
	}, []);

	useEffect(() => {
		if (!location?.state?.modal) {
			window.previousLocation = location;
		}
	}, [location]);

	return (
		<>
			<Switch location={isModal ? window.previousLocation : location}>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/:label" component={HomePage} />
				<Route exact path="/note/" component={NewNotePage} />
				<Route component={NoPage} />
			</Switch>

			{user === false && (
				<>
					<Redirect from="/note/" to="/" />
					<Redirect from="/note/:id" to="/" />
				</>
			)}

			{isModal && (
				<Switch>
					<Route path="/note/:id" component={NotePage} />
					<Route path="/settings/" component={SettingsPage} />
				</Switch>
			)}
		</>
	);
};

export default Routes;
