import {
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import { useAuth } from '@/hooks/Auth';
import CreateNote from '@/routes/CreateNote';
import Home from '@/routes/Home';
import Note from '@/routes/Note';
import Settings from '@/routes/Settings';

const Routes = () => {
	const { user } = useAuth();

	return (
		<>
			<Switch>
				<Route path="/create-note/" component={CreateNote} />
				<Route path="/:label" component={Home} />
				<Route path="/" component={Home} />
			</Switch>

			{user === false && <Redirect to="/" />}

			<Switch>
				<Route path="/note/:id" component={Note} />
				<Route path="/settings/" component={Settings} />
			</Switch>
		</>
	);
};

/**
 * Update this array with the routes that can be opened as modals
 */
const arrayOfPaths = [
	'/note/',
	'/settings/',
];

export const isModal = (pathname) => arrayOfPaths
	.findIndex((path) => pathname.startsWith(path)) !== -1;

export default Routes;
