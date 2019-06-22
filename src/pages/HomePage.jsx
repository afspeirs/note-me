import React from 'react';
import {
	Fab,
	Icon,
	Link,
	List,
	ListItem,
	NavRight,
	Navbar,
	Page,
	Searchbar,
	SwipeoutActions,
	SwipeoutButton,
} from 'framework7-react';

import ContextMenu from '../components/ContextMenu';
import TimeAgo from '../components/TimeAgo';

import { auth, db } from '../firebase';

export default class HomePage extends React.Component {
	state = {
		notes: [],
		selectedNote: null,
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
				db.collection(user.uid)
					.get()
					.then((collection) => {
						const notes = collection.docs.map(doc => doc.data());
						notes.sort((a, b) => new Date(b.date) - new Date(a.date));
						this.setState({ notes, user });
					});
			}
		});
	}

	handleNoteDelete = (id, note = null) => {
		const { user, notes } = this.state;

		db.collection(user.uid)
			.doc(id)
			.delete();

		if (note) {
			const indexOfNote = notes.indexOf(note);
			notes.splice(indexOfNote, 1);
			this.setState({ notes });
		}
	};

	getTitle = text => text.split('\n')[0].replace(/#+ /g, '');

	updateSelectedNote = selectedNote => this.setState({ selectedNote });

	render() {
		const { notes, selectedNote, user } = this.state;

		return (
			<Page>
				<Navbar title="Note Me">
					<NavRight>
						<Link searchbarEnable=".searchbar-components" iconIos="f7:search_strong" iconMd="material:search" />
						<Link href="/settings/" iconMaterial="settings" />
					</NavRight>
					<Searchbar
						className="searchbar-components"
						searchContainer=".search-list"
						searchIn=".item-title"
						expandable
					/>
				</Navbar>

				<List className="searchbar-not-found">
					<ListItem title="Nothing found" />
				</List>

				<List
					style={this.styles.listOfNotes}
					className="search-list searchbar-found"
				>
					{notes.length === 0 && <ListItem title="No notes" />}
					{notes.map((note, index) => {
						const title = note.text ? this.getTitle(note.text) : 'Untitled';

						return (
							<ListItem
								key={`note-${note.id}`}
								id={index}
								link={`/notes/?keyOfNote=${note.id}`}
								title={title}
								swipeout
								onSwipeoutDeleted={() => this.handleNoteDelete(note.id)}
							>
								<SwipeoutActions right>
									<SwipeoutButton close>
										<TimeAgo date={note.date / 1000} />
									</SwipeoutButton>
									<SwipeoutButton close delete confirmText={`Are you sure you want to delete this note: <em>"${title}"</em>?`}>
										<Icon material="delete" />
									</SwipeoutButton>
								</SwipeoutActions>
							</ListItem>
						);
					})}
				</List>

				<ContextMenu
					getTitle={this.getTitle}
					handleNoteDelete={this.handleNoteDelete}
					selectedNote={notes[selectedNote]}
					updateSelectedNote={this.updateSelectedNote}
				/>

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
