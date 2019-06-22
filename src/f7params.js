import routes from './routes';

export default {
	name: 'NoteMe',
	theme: 'auto',
	routes,
	view: {
		pushState: true,
		iosSwipeBack: false,
	},
	panel: {
		swipe: 'left',
		swipeActiveArea: 32,
	},
	statusbar: {
		scrollTopOnClick: true,
	},
	dialog: {
		title: 'Warning',
		buttonOk: 'Yes',
		buttonCancel: 'No',
	},
	serviceWorker: {
		path: './service-worker.js',
		scope: '/',
	},
	toast: {
		closeButton: true,
		closeButtonColor: 'yellow',
		closeTimeout: 5000,
	},
	touch: {
		disableContextMenu: !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'),
	},
};
