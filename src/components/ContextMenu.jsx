import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
	List,
	ListItem,
	Icon,
} from 'framework7-react';
import TimeAgo from './TimeAgo';

const propTypes = {
	getTitle: PropTypes.func,
	handleNoteDelete: PropTypes.func,
	updateSelectedNote: PropTypes.func.isRequired,
	selectedNote: PropTypes.shape({

	}),
};

export default class ContextMenu extends React.Component {
	state = {
		visible: false,
	};

	componentDidMount() {
		document.addEventListener('contextmenu', this.handleContextMenu);
		document.addEventListener('click', this.handleClick);
		document.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		document.removeEventListener('contextmenu', this.handleContextMenu);
		document.removeEventListener('click', this.handleClick);
		document.removeEventListener('scroll', this.handleScroll);
	}

	handleContextMenu = (event) => {
		const { updateSelectedNote } = this.props;
		const closestSwipeout = event.target.closest('.swipeout');
		const contextMenuContainer = event.target.closest('#context-menu-container');

		if (contextMenuContainer) {
			event.preventDefault();
		}

		if (closestSwipeout) {
			event.preventDefault();

			updateSelectedNote(closestSwipeout.id);

			this.setState({ visible: true });

			const clickX = event.clientX;
			const clickY = event.clientY;
			const screenW = window.innerWidth;
			const screenH = window.innerHeight;
			const rootW = this.root.offsetWidth;
			const rootH = this.root.offsetHeight;

			const right = (screenW - clickX) > rootW;
			const left = !right;
			const top = (screenH - clickY) > rootH;
			const bottom = !top;

			if (right) {
				this.root.style.left = `${clickX}px`;
			}

			if (left) {
				// if the left position is less than 10 set it to 10 or use the calculated value
				this.root.style.left = `${clickX - rootW < 10 ? 10 : clickX - rootW}px`;
			}

			if (top) {
				this.root.style.top = `${clickY}px`;
			}

			if (bottom) {
				this.root.style.top = `${clickY - rootH}px`;
			}
		}
	};

	handleClick = (event) => {
		const { visible } = this.state;
		const wasOutside = !(event.target.contains === this.root);

		if (wasOutside && visible) this.setState({ visible: false });
	};

	handleScroll = () => {
		const { visible } = this.state;

		if (visible) this.setState({ visible: false });
	};

	handleDeletePress = (id, title) => {
		const { handleNoteDelete, selectedNote } = this.props;

		this.$f7.dialog.confirm(
			`Are you sure you want to delete this note: <em>"${title}"</em>?`,
			() => handleNoteDelete(id, selectedNote),
		);
	}

	render() {
		const { visible } = this.state;
		const {
			getTitle,
			selectedNote,
		} = this.props;

		let title = null;

		if (selectedNote) {
			title = getTitle(selectedNote.text);
		}

		return ReactDOM.createPortal(
			(visible && selectedNote) && (
				<div ref={(ref) => { this.root = ref; }} className="context-menu">
					<List className="no-margin">
						<ListItem>
							<TimeAgo slot="title" date={selectedNote.date / 1000} />
							<Icon material="access_time" slot="media" textColor="orange" />
						</ListItem>
						<ListItem
							link
							noChevron
							className="delete"
							title={`Delete "${title}"`}
							onClick={() => this.handleDeletePress(selectedNote.id, title)}
						>
							<Icon material="delete" slot="media" textColor="red" />
						</ListItem>
					</List>
				</div>
			),
			document.getElementById('context-menu-container'),
		);
	}
}

ContextMenu.propTypes = propTypes;
