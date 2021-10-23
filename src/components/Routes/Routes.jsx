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
				<Route exact path="/" component={Home} />
				<Route path="/create-note/" component={CreateNote} />
				<Route path="/note/:id" component={Note} />
				<Route path="/settings/" component={Settings} />
				<Redirect to="/" />
			</Switch>

			{user === false && <Redirect to="/" />}
		</>
	);
};

export default Routes;
