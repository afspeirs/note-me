import React, { Component } from "react";
import Markdown from "react-markdown";

export class Note extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textData: `# Your markdown here\n<h1>This won't be translated into HTML</h1>`
    };
  }
  render() {
    const textAreaStyle = {
      width: "100%",
      resize: "none",
      border: "none",
      padding: "16px"
    };
    const markdownStyle = {
      padding: "16px"
    };
    return (
      <div>
        <textarea
          style={textAreaStyle}
          type="text"
          ref="someData"
          defaultValue={this.state.textData}
          onChange={e => this.setState({ textData: e.target.value })}
        />
        <div style={markdownStyle}>
          <Markdown escapeHtml={true} source={this.state.textData} />
        </div>
      </div>
    );
  }
}

export default Note;
