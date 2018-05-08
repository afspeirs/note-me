import React, { Component } from "react";
import Markdown from "react-markdown";
import "./note.css";

export class Note extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textData: `# Your markdown here\n<h1>This won't be translated into HTML</h1>`
    };
  }
  render() {
    return (
      <div className="note">
        <textarea
          className={this.props.edit ? "edit" : "hide"}
          type="text"
          ref="someData"
          defaultValue={this.state.textData}
          onChange={e => this.setState({ textData: e.target.value })}
        />
        <Markdown
          className="markdown"
          escapeHtml={true}
          source={this.state.textData}
        />
      </div>
    );
  }
}

export default Note;
