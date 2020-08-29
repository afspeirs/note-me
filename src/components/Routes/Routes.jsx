import React, { useEffect } from 'react';
import {
	Switch,
	Redirect,
	Route,
	useLocation,
} from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import HomePage from '../../pages/HomePage';
import NoPage from '../../pages/NoPage';
import NewNotePage from '../../pages/NewNotePage';
import NotePage from '../../pages/NotePage';
import SettingsPage from '../../pages/SettingsPage';

const Routes = () => {
	const { user } = useAuth();
	const location = useLocation();
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
				<Route exact path="/" component={HomePage} />
				<Route exact path="/note/" component={NewNotePage} />
				<Route path="/note/:id" component={NotePage} />
				<Redirect from="/settings/" to="/" />
				<Route component={NoPage} />
			</Switch>

			{user === false && <Redirect from="/note/" to="/" />}

			{isModal && <Route path="/settings/" component={SettingsPage} />}
		</>
	);
};

export default Routes;
