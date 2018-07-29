import React from 'react';
import { App, View, Statusbar } from 'framework7-react';
import 'framework7/css/framework7.min.css';
import f7Settings from './data/f7Settings';

// import CreateNoteButton from "./components/CreateNoteButton/CreateNoteButton";
// import Home from "./components/Home/Home";
// import NavBar from "./components/NavBar/NavBar";
// import Note from "./components/Note/Note";

export default class MainApp extends React.Component {
	f7Params = {
		...f7Settings,
		methods: {
			handleNoteUpdate: (index, note) => {
				const notes = this.state.notes;

				if (!notes[index]) {
					notes.push({});
				}

				notes[index] = note;

				localStorage.setItem('notes', JSON.stringify(notes));
				this.setState({ notes });
			},
			handleNoteDelete: (index) => {
				const notes = this.state.notes;
				notes.splice(index, 1);
				localStorage.setItem('notes', JSON.stringify(notes));
				// this.setState({ notes });
			},
			getGlobalState: () => this.state,
		},
	}

	constructor(props) {
		super(props);

		// this.f7Params.methods.handleEditToggle = this.f7Params.methods.handleEditToggle.bind(this);
		// this.f7Params.methods.handleNoteUpdate = this.f7Params.methods.handleNoteUpdate.bind(this);

		this.state = {
			edit: false,
			notes: JSON.parse(localStorage.getItem('notes')) || []
		};
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
