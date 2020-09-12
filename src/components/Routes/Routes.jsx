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

	useEffect(() => {
		if (!location.state || !location.state.modal) {
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

			{user === false && <Redirect from="/note/:id" to="/" />}

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
