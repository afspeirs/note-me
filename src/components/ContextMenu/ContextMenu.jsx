import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Alarm as AlarmIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

import styles from './ContextMenu.styled';
import { getTitle } from '../../ultils';
import TimeAgo from '../TimeAgo';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	closestElement: PropTypes.string.isRequired,
	arrayOfObjects: PropTypes.instanceOf(Array).isRequired,
	handleRemoveClick: PropTypes.func.isRequired,
};

class ContextMenu extends React.Component {
	state = {
		closestContextMenuOption: null,
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

	updateContextMenuOption = id => this.setState({ closestContextMenuOption: id });

	handleContextMenu = (event) => {
		const { closestElement } = this.props;
		const closestContextMenuOption = event.target.closest(closestElement);
		const closestContextMenuContainer = event.target.closest('#context-menu-container');

		if (closestContextMenuContainer) event.preventDefault();

		if (closestContextMenuOption) {
			event.preventDefault();

			this.updateContextMenuOption(closestContextMenuOption.id || null);

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
				this.root.style.left = `${clickX + 5}px`;
			}

			if (left) {
				// If the left position is less than 10 set it to 10 or use the calculated value
				this.root.style.left = `${clickX - rootW < 10 ? 10 : clickX - rootW}px`;
			}

			if (top) {
				this.root.style.top = `${clickY + 5}px`;
			}

			if (bottom) {
				this.root.style.top = `${clickY - rootH - 5}px`;
			}
		} else {
			this.updateContextMenuOption(null);
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

	render() {
		const {
			closestContextMenuOption,
			visible,
		} = this.state;
		const {
			classes,
			arrayOfObjects,
			handleRemoveClick,
		} = this.props;

		const currentItem = arrayOfObjects
			.find(item => item.id === closestContextMenuOption);

		return ReactDOM.createPortal(
			(visible && currentItem) && (
				<div
					className={clsx('context-menu', classes.contextMenu)}
					ref={(ref) => { this.root = ref; }}
				>
					<List className={classes.list}>
						<ListItem>
							<ListItemIcon>
								<AlarmIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								className={classes.listItemText}
								primary={<TimeAgo slot="title" date={currentItem.date / 1000} />}
							/>
						</ListItem>
						<ListItem
							button
							onClick={() => handleRemoveClick(currentItem)}
						>
							<ListItemIcon>
								<DeleteIcon color="error" />
							</ListItemIcon>
							<ListItemText
								className={classes.listItemText}
								primary={`Delete "${getTitle(currentItem.text)}"`}
							/>
						</ListItem>
					</List>
				</div>
			),
			document.getElementById('context-menu-container'),
		);
	}
}

ContextMenu.propTypes = propTypes;

export default withStyles(styles)(ContextMenu);
