import React from 'react';
import { Page, Navbar, NavRight, Link, List, ListItem, Fab, Icon, SwipeoutActions, SwipeoutButton } from 'framework7-react';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = { notes: [] };
	}

	styles = {
		listOfNotes: {
			marginBottom: '80px'
		}
	}

	componentWillMount() {
		const table = this.$f7.methods.getTable();
		table
			.orderBy('date')
			.reverse()
			.toArray()
			.then((notes) => { this.setState({ notes }); });
	}

	render() {
		const { notes } = this.state;
		// console.log(notes);

		return (
			<Page>
				<Navbar title="Note Me">
					<NavRight>
						<Link href="/settings/" iconMaterial="settings"></Link>
					</NavRight>
				</Navbar>

				<List style={this.styles.listOfNotes}>
					{notes.length === 0 ? <ListItem title="No notes"></ListItem> : null}
					{notes.map((note) => (
						<ListItem
							key={`note-${note.id}`}
							link={`/notes/?keyOfNote=${note.id}`}
							title={note.text ? note.text.split('\n')[0] : 'Untitled'}
							swipeout
							onSwipeoutDeleted={() => this.$f7.methods.handleNoteDelete(note.id)}
						>
							<SwipeoutActions right>
								<SwipeoutButton close>{note.date}</SwipeoutButton>
								<SwipeoutButton close delete confirmText="Are you sure you want to delete this note?"><Icon material="delete"></Icon></SwipeoutButton>
							</SwipeoutActions>
						</ListItem>
					))}
				</List>

				<Fab position="right-bottom" href={'/notes/?newNote=true'} slot="fixed">
					<Icon material="add"></Icon>
				</Fab>
			</Page>
		);
	}
}
