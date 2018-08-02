import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Page, Navbar, NavRight, Button, Block } from 'framework7-react';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);

		const { indexOfNote } = props.f7route.query;
		const globalState = this.$f7.methods.getGlobalState();
		const currentNote = globalState.notes[indexOfNote];

		this.state = {
			// Add currentNote to state, or add empty text
			currentNote: (currentNote) ? currentNote : { text: '' },
			// Set to true if there is no text
			edit: (currentNote && currentNote.text.length > 0) ? false : true,
			// Store the index of the current note
			indexOfNote,
		};
		// console.table(this.state);
	}

	handleEditToggle = () => {
		const { edit, indexOfNote, currentNote } = this.state;

		this.$f7.methods.handleAddNote(currentNote.text);
		this.$f7.methods.handleNoteUpdate(indexOfNote, currentNote);

		this.setState({ edit: !edit });
	};
	handleCurrentNoteUpdate = (text) => {
		const currentNote = this.state.currentNote;

		currentNote.text = text;
		currentNote.date = new Date().toLocaleString();

		this.setState({ currentNote });
	};

	render() {
		const { edit, currentNote } = this.state;
		// console.log(indexOfNote);

		return (
			<Page>
				<Navbar title="Notes" backLink="Back">
					<NavRight>
						<Button onClick={this.handleEditToggle}>
							{edit ? 'done' : 'edit'}
						</Button>
					</NavRight>
				</Navbar>

				<Block className={`textarea ${edit ? 'edit' : 'hide'}`}>
					<textarea
						type="text"
						defaultValue={currentNote.text}
						onChange={e => this.handleCurrentNoteUpdate(e.target.value)}
					/>
				</Block>
				<Block
					className={`markdown ${!edit ? 'edit' : 'hide'}`}
				>
					<Markdown
						escapeHtml={true}
						source={currentNote.text}
					/>
				</Block>
			</Page>
		);
	}
}

Notes.propTypes = {
	f7route: PropTypes.object,
};
