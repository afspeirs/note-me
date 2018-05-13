import { orange500, orange700 } from "material-ui/styles/colors";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { FloatingActionButton, Paper } from 'material-ui';
import IconAdd from 'material-ui/svg-icons/content/add';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
				'# Your markdown here\n<h1>This won\'t be translated into HTML</h1>',
				'# Your markdown here 2\n<h1>This won\'t be translated into HTML</h1>'
			]
		};
	};

	handleEditToggle = () => this.setState({ edit: !this.state.edit });

	handleNoteUpdate = (index, text) => {
		const notes = this.state.notes;
		notes[index] = text;

		this.setState({ notes });
	};

	render() {
		const muiTheme = getMuiTheme({
			palette: {
				primary1Color: orange500,
				primary2Color: orange700
			}
		});

		const fabStyle = {
			position: 'absolute',
			bottom: '16px',
			right: '16px'
		};
		const paperStyle = {
			margin: 16,
			padding: 16
		};

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router>
					<div>
						<NavBar
							edit={this.state.edit}
							handleEditToggle={this.handleEditToggle}
						/>

						<Route exact path="/" render={() =>
							<div>
								{this.state.notes.map((noteText, index) => {
									return (
										<Link to={{
											pathname: '/note',
											state: {
												id: index,
												text: this.state.notes[index]
											}
										}} style={{ textDecoration: 'none' }}>
											<Paper key={`note-${index}`} style={paperStyle}>
												{noteText.split('\n')[0]}
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
									<FloatingActionButton style={fabStyle}>
										<IconAdd />
									</FloatingActionButton>
								</Link>
							</div>
						} />
						<Route path="/note" render={(match) => {
							return <Note
								edit={this.state.edit}
								currentNoteID={match.location.state.id}
								currentNoteText={this.state.notes[match.location.state.id]}
								handleEditToggle={this.handleEditToggle}
								handleNoteUpdate={this.handleNoteUpdate}
							/>
						}} />
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
