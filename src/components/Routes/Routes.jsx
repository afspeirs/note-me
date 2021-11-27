import { useEffect } from 'react';
import {
	Redirect,
	Route,
	Switch,
	useLocation,
} from 'react-router-dom';

import { useAuth } from '@/hooks/Auth';
import CreateNote from '@/routes/CreateNote';
import Home from '@/routes/Home';
import Note from '@/routes/Note';
import Settings from '@/routes/Settings';

/**
 * Update this array with the routes that can be opened as modals
 */
export const arrayOfModals = [
	'/settings/',
];

const Routes = () => {
	const { user } = useAuth();
	const location = useLocation();
	const isModal = arrayOfModals.findIndex((path) => location.pathname.startsWith(path)) !== -1;

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
		if (!isModal) {
			window.previousLocation = location;
		}
	}, [location]);

	return (
		<>
			<Switch location={isModal ? window.previousLocation : location}>
				<Route path="/create-note/" component={CreateNote} />
				<Route path="/note/:id" component={Note} />
				<Route path="/" component={Home} />
			</Switch>

			{user === false && <Redirect to="/" />}

			<Route path="/settings/" component={Settings} />
		</>
	);
};

export default Routes;
