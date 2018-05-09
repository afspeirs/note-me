import { orange500, orange700 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { Component } from "react";

import NavBar from "./components/NavBar/NavBar";
import Note from "./components/Note/Note";

class App extends Component {
	constructor(props) {
		super(props);

		// Bind the this context to the editToggle function
		this.editToggle = this.editToggle.bind(this);

		this.state = { edit: false };
	}

	editToggle() {
		this.setState({
			edit: !this.state.edit
		});
	}

	render() {
		const muiTheme = getMuiTheme({
			palette: {
				primary1Color: orange500,
				primary2Color: orange700
			}
		});

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<NavBar edit={this.state.edit} editToggle={this.editToggle} />
					<Note edit={this.state.edit} />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
