import routes from './routes';

let f7Settings = {
	name: 'Note Me',
	version: '0.1.2',
	routes,
	theme: 'auto',
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
	},
	toast: {
		closeButton: true,
		closeButtonColor: 'yellow',
		closeTimeout: 5000,
	},
	touch: {
		disableContextMenu: !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
	},
};

export default f7Settings;
