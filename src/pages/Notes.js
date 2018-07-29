import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Page, Navbar, NavRight, Button } from 'framework7-react';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);

		const { indexOfNote } = props.f7route.query;
		const globalState = this.$f7.methods.getGlobalState();
		const currentNote = globalState.notes[indexOfNote];

		this.state = {
			currentNote: (currentNote) ? currentNote : { text: '' },
			edit: false,
			indexOfNote,
		};
		// console.table(this.state);
	}

	handleEditToggle = () => {
		const { edit, indexOfNote, currentNote } = this.state;

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

				<textarea
					className={edit ? 'edit' : 'hide'}
					type="text"
					defaultValue={currentNote ? currentNote.text : ''}
					onChange={e => this.handleCurrentNoteUpdate(e.target.value)}
				/>
				<Markdown
					className="markdown"
					escapeHtml={true}
					source={currentNote.text}
				/>
			</Page>
		);
	}
}

Notes.propTypes = {
	f7route: PropTypes.object,
};
