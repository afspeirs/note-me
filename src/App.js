import React from 'react';
import { App, View, Statusbar } from 'framework7-react';
import 'framework7/css/framework7.min.css';
import f7Settings from './data/f7Settings';
import db from './myDB';

export default class MainApp extends React.Component {
	f7Params = {
		...f7Settings,
		methods: {
			handleNoteAdd: (text) => {
				const note = {
					text,
					date: new Date().toLocaleString(),
				};
				const that = this;
				db.table('notes').add(note)
					.then((id) => {
						that.$f7.views.main.router.navigate(`/notes/?keyOfNote=${id}`, { animate: false, reloadCurrent: true });
					});
			},
			handleNoteUpdate: (key, text) => {
				const note = {
					text,
					date: new Date().toLocaleString(),
				};
				db.table('notes').update(key, note);
			},
			handleNoteDelete: (key) => {
				db.table('notes').delete(key);
			},
			getTable: () => {
				return db.notes;
			},
			getGlobalState: () => this.state,
		},
	}

	constructor(props) {
		super(props);

		this.state = { edit: false };
	}
	componentDidMount() {
		// ServiceWorker events
		window.addEventListener('swNewContentAvailable', () => {
			this.$f7.toast.create({
				text: 'A new version is available',
				closeButtonText: 'Refresh',
				on: {
					close: function () {
						window.location.reload(window.location.href);
					},
				}
			}).open();
		});
		window.addEventListener('swContentCached', () => {
			this.$f7.toast.create({
				text: 'Caching complete! Now available offline',
			}).open();
		});
	}

	render() {
		return (
			<App params={this.f7Params} colorTheme="orange">
				<Statusbar />
				<View url="/" main className="ios-edges" />
			</App >
		);
	}
}
