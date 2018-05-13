import Markdown from "react-markdown";
import React, { Component } from "react";

import "./note.css";

export class Note extends Component {
	constructor(props) {
		super(props)

		// If edit is false and there is no current note text
		// Allow for editing
		if (!props.edit && !props.currentNoteText) {
			props.handleEditToggle();
		}
	}

	render() {
		return (
			<div>
				<textarea
					className={this.props.edit ? "edit" : "hide"}
					type="text"
					ref="someData"
					defaultValue={this.props.currentNoteText}
					onChange={e => this.props.handleNoteUpdate(this.props.currentNoteID, e.target.value)}
				/>
				<Markdown
					className="markdown"
					escapeHtml={true}
					source={this.props.currentNoteText}
				/>
			</div>
		);
	}
}

export default Note;
