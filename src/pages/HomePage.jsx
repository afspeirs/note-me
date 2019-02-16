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

import Navbar from '../components/Navbar';

export default class HomePage extends React.Component {
	state = {
		notes: [],
	};

	styles = {
		listOfNotes: {
			marginBottom: '80px',
		},
	}

	constructor() {
		super();

		const table = this.$f7.methods.getTable();
		table
			.orderBy('date')
			.reverse()
			.toArray()
			.then((notes) => { this.setState({ notes }); });
	}

	render() {
		const { notes } = this.state;

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
							onSwipeoutDeleted={() => this.$f7.methods.handleNoteDelete(note.id)}
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

				<Fab
					href="/notes/?newNote=true"
					position="right-bottom"
					slot="fixed"
				>
					<Icon material="add" />
				</Fab>
			</Page>
		);
	}
}
