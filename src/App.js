import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Paper, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import NavBar from "./components/NavBar/NavBar";
import Note from "./components/Note/Note";

class App extends Component {
	constructor(props) {
		super(props);

		// Bind the this context to the handleEditToggle function
		this.handleEditToggle = this.handleEditToggle.bind(this);

		this.state = {
			edit: false,
			notes: [
				{
					text: '# Your markdown here\n<h1>This won\'t be translated into HTML</h1>',
					date: ''
				}, {
					text: '# Your markdown here 2\n<h1>This won\'t be translated into HTML</h1>',
					date: ''
				}
			]
		};
	};

	handleEditToggle = () => this.setState({ edit: !this.state.edit });

	handleNoteUpdate = (index, text) => {
		const notes = this.state.notes;
		notes[index].text = text;

		this.setState({ notes });
	};

	render() {
		const styles = {
			fab: {
				position: 'fixed',
				bottom: '16px',
				right: '16px'
			},
			page: {
				padding: 16
			},
			pageHome: {
				marginBottom: 64,
			},
			paper: {
				padding: 16,
				marginBottom: 8
			}
		}

		return (
			<Router>
				<div>
					<NavBar
						edit={this.state.edit}
						handleEditToggle={this.handleEditToggle}
					/>

					<Route exact path="/" render={() =>
						<div style={{ ...styles.page, ...styles.pageHome }}>
							{this.state.notes.map((note, index) => {
								return (
									<Link
										to={{
											pathname: '/note',
											state: {
												id: index,
												text: note.text,
												date: note.date,
											}
										}}
										style={{ textDecoration: 'none' }}
										key={`note-${index}`}
									>
										<Paper style={styles.paper} elevation={4}>
											<Typography component="p">
												{note.text ? note.text.split('\n')[0] : 'Untitled'}
											</Typography>
										</Paper>
									</Link>
								)
							})}

							<Link to={{
								pathname: '/note',
								state: {
									id: this.state.notes.length,
									text: ''
								}
							}}>
								<Button variant="fab" color="primary" aria-label="add" style={styles.fab}>
									<AddIcon />
								</Button>
							</Link>
						</div>
					} />
					<Route path="/note" render={(match) => {
						return (
							<div style={styles.page}>
								<Note
									edit={this.state.edit}
									currentNoteID={match.location.state.id}
									currentNoteText={this.state.notes[match.location.state.id].text}
									currentNoteDate={this.state.notes[match.location.state.id].date}
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
