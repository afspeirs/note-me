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

export default class Notes extends React.Component {
	state = {
		currentNote: '',
		edit: false,
	};

	componentWillMount() {
		const { f7route } = this.props;
		const { keyOfNote } = f7route.query;

		if (keyOfNote) {
			const that = this;
			const table = that.$f7.methods.getTable();
			table.get(parseInt(keyOfNote, 10), note => that.setState({
				currentNote: note.text,
				keyOfNote: parseInt(keyOfNote, 10),
			}));
		} else {
			this.setState({
				currentNote: '',
				edit: true,
			});
		}
	}

	handleEditToggle = () => {
		const { edit, keyOfNote, currentNote } = this.state;

		if (edit && keyOfNote) {
			this.$f7.methods.handleNoteUpdate(keyOfNote, currentNote);
		} else if (edit) {
			this.$f7.methods.handleNoteAdd(currentNote);
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

Notes.propTypes = {
	f7route: PropTypes.object,
};
