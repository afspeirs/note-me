import Markdown from "react-markdown";
import React, { Component } from "react";

import "./note.css";

export class Note extends Component {
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
