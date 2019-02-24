import React from 'react';
import {
	Page,
	List,
	ListItem,
	Fab,
	Icon,
	SwipeoutActions,
	SwipeoutButton,
} from 'framework7-react';

import { auth, db } from '../firebase';
import Navbar from '../components/Navbar';


export default class HomePage extends React.Component {
	state = {
		notes: [],
		user: null,
	};

	styles = {
		listOfNotes: {
			marginBottom: '80px',
		},
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
				db.collection(user.uid)
					.get()
					.then((collection) => {
						const notes = collection.docs.map(doc => doc.data());
						this.setState({ notes });
					});
			}
		});
	}

	handleNoteDelete = (id) => {
		const { user } = this.state;

		db.collection(user.uid)
			.doc(id)
			.delete();
	};

	render() {
		const { notes, user } = this.state;

		return (
			<Page>
				<Navbar title="NoteMe" settings />

				<List style={this.styles.listOfNotes}>
					{notes.length === 0 && <ListItem title="No notes" />}
					{notes.map(note => (
						<ListItem
							key={`note-${note.id}`}
							link={`/notes/?keyOfNote=${note.id}`}
							title={note.text ? note.text.split('\n')[0] : 'Untitled'}
							swipeout
							onSwipeoutDeleted={() => this.handleNoteDelete(note.id)}
						>
							<SwipeoutActions right>
								<SwipeoutButton close>{note.date}</SwipeoutButton>
								<SwipeoutButton close delete confirmText="Are you sure you want to delete this note?">
									<Icon material="delete" />
								</SwipeoutButton>
							</SwipeoutActions>
						</ListItem>
					))}
				</List>

				{user && (
					<Fab
						href="/notes/?newNote=true"
						position="right-bottom"
						slot="fixed"
					>
						<Icon material="add" />
					</Fab>
				)}
			</Page>
		);
	}
}
