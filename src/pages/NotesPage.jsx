import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import {
	Block,
	Icon,
	Link,
	Navbar,
	NavLeft,
	NavRight,
	NavTitle,
	Page,
} from 'framework7-react';

import { db } from '../firebase';


export default class NotesPage extends React.Component {
	state = {
		currentNote: '',
		edit: false,
	};

	componentWillMount() {
		const { f7route } = this.props;
		const { keyOfNote } = f7route.query;

		if (keyOfNote) {
			db.collection('notes')
				.doc(keyOfNote)
				.get()
				.then((doc) => {
					if (doc.exists) {
						this.setState({
							currentNote: doc.data().text,
							keyOfNote,
						});
					} else {
						console.log('No such document!');
					}
				});
		} else {
			this.setState({
				currentNote: '',
				edit: true,
			});
		}
	}

	handleNoteAdd = (text) => {
		const that = this;
		const newNote = db.collection('notes').doc();

		newNote
			.set({
				text,
				date: new Date().toLocaleString(),
				id: newNote.id,
			})
			.then(() => {
				that.$f7.views.main.router.navigate(`/notes/?keyOfNote=${newNote.id}`, {
					animate: false,
					reloadCurrent: true,
				});
			});
	};

	handleNoteUpdate = (id, text) => {
		db.collection('notes')
			.doc(id)
			.set({
				text,
				date: new Date().toLocaleString(),
				id,
			});
	};

	handleEditToggle = () => {
		const { edit, keyOfNote, currentNote } = this.state;

		if (edit && keyOfNote) {
			this.handleNoteUpdate(keyOfNote, currentNote);
		} else if (edit) {
			this.handleNoteAdd(currentNote);
		}

		this.setState({ edit: !edit });
	};

	handleCurrentNoteUpdate = (text) => {
		let { currentNote } = this.state;
		currentNote = text;
		this.setState({ currentNote });
	};

	render() {
		const { edit, currentNote } = this.state;

		return (
			<Page>
				<Navbar>
					<NavLeft>
						<Link back force>
							<Icon icon="icon-back" />
							<span className="ios-only">Back</span>
						</Link>
					</NavLeft>
					<NavTitle>Notes</NavTitle>
					<NavRight>
						<Link iconOnly onClick={this.handleEditToggle}>
							<Icon material={edit ? 'save' : 'edit'} />
						</Link>
					</NavRight>
				</Navbar>

				{edit ? (
					<Block className="textarea">
						<textarea
							type="text"
							value={currentNote}
							onChange={e => this.handleCurrentNoteUpdate(e.target.value)}
						/>
					</Block>
				) : (
					<Block className="markdown">
						<Markdown
							escapeHtml
							source={currentNote}
						/>
					</Block>
				)}
			</Page>
		);
	}
}

NotesPage.propTypes = {
	f7route: PropTypes.object,
};
