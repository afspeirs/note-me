import Home from './../pages/Home';
import Notes from './../pages/Notes';
import Settings from './../pages/Settings';
// import NotFound from './../pages/404.jsx';

// Pages
export default [
	// Index page
	{
		name: 'home',
		path: '/',
		component: Home,
	},
	// Notes page
	{
		name: 'notes',
		path: '/notes/',
		component: Notes,
	},
	// Settings page
	{
		name: 'settings',
		path: '/settings/',
		component: Settings,
	},
];
