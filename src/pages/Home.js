import React from 'react';
import { Page, Navbar, List, ListItem, Fab, Icon, SwipeoutActions, SwipeoutButton } from 'framework7-react';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = { notes: [] };
	}

	componentWillMount() {
		const table = this.$f7.methods.getTable();
		table
			.toArray()
			.then((notes) => {
				this.setState({ notes });
			});
	}

	render() {
		const { notes } = this.state;
		// console.log(notes);

		return (
			<Page>
				<Navbar title="Note Me"></Navbar>

				<List>
					{notes.length === 0 ? <ListItem title="No notes"></ListItem> : null}
					{notes.map((note) => (
						<ListItem
							key={`note-${note.id}`}
							link={`/notes/?keyOfNote=${note.id}`}
							title={note.text ? note.text.split('\n')[0] : 'Untitled'}
							after={note.date ? note.date : 'No Date Provided'}
							swipeout
							onSwipeoutDeleted={() => this.$f7.methods.handleNoteDelete(note.id)}
						>
							<SwipeoutActions right>
								<SwipeoutButton delete>Delete</SwipeoutButton>
							</SwipeoutActions>
						</ListItem>
					))}
				</List>

				<Fab position="right-bottom" href={'/notes/?newNote=true'} slot="fixed">
					<Icon ios="f7:add" md="material:add"></Icon>
				</Fab>
			</Page>
		);
	}
}
