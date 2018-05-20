import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import NavBar from "./components/NavBar/NavBar";
import Note from "./components/Note/Note";
import NoteInfo from "./components/NoteInfo/NoteInfo";

class App extends Component {
	constructor(props) {
		super(props);

		// Bind the this context to the handleEditToggle function
		this.handleEditToggle = this.handleEditToggle.bind(this);

		this.state = {
			edit: false,
			notes: JSON.parse(localStorage.getItem('notes')) || []
		};
	};

	handleEditToggle = () => this.setState({ edit: !this.state.edit });

	handleNoteUpdate = (index, text) => {
		const notes = this.state.notes;

		if (!notes[index]) {
			notes.push({});
		}

		notes[index].text = text;
		notes[index].date = new Date().toLocaleString();

		localStorage.setItem('notes', JSON.stringify(notes))
		this.setState({ notes });
	};

	render() {
		const styles = {
			anchor: {
				textDecoration: 'none'
			},
			fab: {
				position: 'fixed',
				bottom: '16px',
				right: '16px',
			},
			page: {
				padding: 16,
			},
			pageFab: {
				marginBottom: 64,
			},
		}

		return (
			<Router>
				<div>
					<NavBar
						edit={this.state.edit}
						handleEditToggle={this.handleEditToggle}
					/>

					<Route exact path="/" render={() =>
						<div style={{ ...styles.page, ...styles.pageFab }}>
							{this.state.notes.map((note, index) => (
								<Link
									key={`note-${index}`}
									style={styles.anchor}
									to={{ pathname: '/note', state: { index } }}
								>
									<NoteInfo note={note} />
								</Link>
							))}

							<Button
								component={Link}
								to={{ pathname: '/note', state: { index: this.state.notes.length } }}
								variant="fab"
								style={styles.fab}
								color="primary"
								aria-label="add"
							>
								<AddIcon />
							</Button>
						</div>
					} />
					<Route path="/note" render={(match) => {
						const { index } = match.location.state;
						return (
							<div style={styles.page}>
								<Note
									edit={this.state.edit}
									currentNoteIndex={index}
									currentNoteText={this.state.notes[index] ? this.state.notes[index].text : ''}
									handleEditToggle={this.handleEditToggle}
									handleNoteUpdate={this.handleNoteUpdate}
								/>
							</div>
						)
					}} />
				</div>
			</Router>
		);
	}
}

export default App;
