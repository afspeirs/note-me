import React from 'react';
import { Page, Navbar, List, ListItem, Fab, Icon } from 'framework7-react';

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
						></ListItem>
					))}
				</List>

				<Fab position="right-bottom" href={`/notes/?indexOfNote=${notes.length}`} slot="fixed" color="orange">
					<Icon ios="f7:add" md="material:add"></Icon>
				</Fab>
			</Page>
		);
	}
}


// const Home = (props) => {
// 	const { notes, styles } = props;

// 	if (notes.length) {
// 		return <HomeWithNotes notes={notes} styles={styles} />;
// 	}
// 	return <HomeNoNotes />;
// }


// const HomeWithNotes = (props) => {
// 	const { notes, styles } = props;
// 	return (
// 		notes.map((note, index) => (
// 			<Link
// 				key={`note-${index}`}
// 				style={styles.anchor}
// 				to={{ pathname: '/note', state: { index } }}
// 			>
// 				<NoteInfo note={note} />
// 			</Link>
// 		))
// 	);
// }
