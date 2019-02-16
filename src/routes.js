import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default [
	{
		path: '/',
		component: HomePage,
	},
	{
		path: '/notes/',
		component: NotesPage,
	},
	{
		path: '/settings/',
		component: SettingsPage,
	},
	{
		path: '(.*)',
		component: NotFoundPage,
	},
];
