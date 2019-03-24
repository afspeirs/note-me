import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import {
	Block,
	Link,
	Navbar,
	NavLeft,
	NavRight,
	NavTitle,
	Page,
} from 'framework7-react';

import { auth, db } from '../firebase';


export default class NotesPage extends React.Component {
	state = {
		currentNote: '',
		edit: false,
		user: null,
	};

	componentDidMount() {
		const { f7route } = this.props;
		const { keyOfNote } = f7route.query;

		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });

				if (keyOfNote) {
					db.collection(user.uid)
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
					this.setState({ edit: true });
				}
			}
		});

		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	handleNoteAdd = (text) => {
		const { user } = this.state;

		const that = this;
		const newNote = db.collection(user.uid).doc();

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
		const { user } = this.state;

		db.collection(user.uid)
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

	handleCurrentNoteUpdate = text => this.setState({ currentNote: text });

	handleKeyDown = (event) => {
		// CTRL + S = Toggle edit mode
		if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
			this.handleEditToggle();
		}
	}

	render() {
		const { edit, currentNote } = this.state;

		return (
			<Page>
				<Navbar>
					<NavLeft>
						<Link back force icon="icon-back" />
					</NavLeft>
					<NavTitle>Notes</NavTitle>
					<NavRight>
						<Link
							iconOnly
							onClick={this.handleEditToggle}
							tooltip={edit ? 'Save' : 'Edit'}
							iconMaterial={edit ? 'save' : 'edit'}
						/>
					</NavRight>
				</Navbar>

				{edit ? (
					<textarea
						type="text"
						className="textarea"
						value={currentNote}
						onChange={event => this.handleCurrentNoteUpdate(event.target.value)}
					/>
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
