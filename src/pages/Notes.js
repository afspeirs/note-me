import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Page, Navbar, NavLeft, NavTitle, NavRight, Link, Icon, Button, Block } from 'framework7-react';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// Set to true if there is no text
			edit: false
		};
	}

	componentWillMount() {
		const { keyOfNote } = this.props.f7route.query;

		if (keyOfNote) {
			const that = this;
			const table = that.$f7.methods.getTable();
			table.get(parseInt(keyOfNote, 10), (note) => that.setState({ currentNote: note.text, keyOfNote: parseInt(keyOfNote, 10) }));
		} else {
			this.setState({ currentNote: '' });
		}
	}

	handleEditToggle = () => {
		// const { edit } = this.state;
		const { edit, keyOfNote, currentNote } = this.state;

		if (edit && keyOfNote) {
			this.$f7.methods.handleNoteUpdate(keyOfNote, currentNote);
		} else if (edit) {
			this.$f7.methods.handleNoteAdd(currentNote);
		}

		this.setState({ edit: !edit });
	};
	handleCurrentNoteUpdate = (text) => {
		let currentNote = this.state.currentNote;
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
							<Icon icon="icon-back"></Icon>
							<span className="ios-only">Back</span>
						</Link>
					</NavLeft>
					<NavTitle>Notes</NavTitle>
					<NavRight>
						<Button onClick={this.handleEditToggle}>
							{edit ? 'Save' : 'Edit'}
						</Button>
					</NavRight>
				</Navbar>

				<Block className={`textarea ${edit ? 'edit' : 'hide'}`}>
					<textarea
						type="text"
						value={currentNote}
						onChange={e => this.handleCurrentNoteUpdate(e.target.value)}
					/>
				</Block>
				<Block
					className={`markdown ${!edit ? 'edit' : 'hide'}`}
				>
					<Markdown
						escapeHtml={true}
						source={currentNote}
					/>
				</Block>
			</Page>
		);
	}
}

Notes.propTypes = {
	f7route: PropTypes.object,
};
