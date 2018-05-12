import { orange500, orange700 } from "material-ui/styles/colors";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { FloatingActionButton } from 'material-ui';
import IconAdd from 'material-ui/svg-icons/content/add';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Note from "./components/Note/Note";

class App extends Component {
	constructor(props) {
		super(props);

		// Bind the this context to the toggleEdit function
		this.toggleEdit = this.toggleEdit.bind(this);

		this.state = { edit: false };
	}

	toggleEdit() {
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

		const fabStyle = {
			position: 'absolute',
			bottom: '16px',
			right: '16px'
		};

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router>
					<div>
						<NavBar edit={this.state.edit} toggleEdit={this.toggleEdit} />

						<Route exact path="/" render={() =>
							<div>
								<Link to="/note">
									<FloatingActionButton style={fabStyle}>
										<IconAdd />
									</FloatingActionButton>
								</Link>
							</div>
						} />
						<Route path="/note" render={() => <Note edit={this.state.edit} />} />
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}



export default App;
