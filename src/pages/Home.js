import React from 'react';
import { Page, Navbar, List, ListItem, Fab, Icon, SwipeoutActions, SwipeoutButton } from 'framework7-react';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = this.$f7.methods.getGlobalState();
		// console.log(this.state);
	}

	render() {
		const { notes } = this.state;

		return (
			<Page>
				<Navbar title="Note Me"></Navbar>

				<List>
					{notes.length === 0 ? <ListItem title="No notes"></ListItem> : null}
					{notes.map((note, index) => (
						<ListItem
							key={`note-${index}`}
							link={`/notes/?indexOfNote=${index}`}
							title={note.text ? note.text.split('\n')[0] : 'Untitled'}
							after={note.date ? note.date : 'No Date Provided'}
							swipeout
							onSwipeoutDeleted={() => this.$f7.methods.handleNoteDelete(index)}
						>
							<SwipeoutActions right>
								<SwipeoutButton delete>Delete</SwipeoutButton>
							</SwipeoutActions>
						</ListItem>
					))}
				</List>

				<Fab position="right-bottom" href={`/notes/?indexOfNote=${notes.length}`} slot="fixed">
					<Icon ios="f7:add" md="material:add"></Icon>
				</Fab>
			</Page>
		);
	}
}
