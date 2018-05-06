import React, { Component } from "react";

import { orange500, orange700 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import NavBar from "./components/NavBar/NavBar";
import Note from "./components/Note/Note";

class App extends Component {
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
          <NavBar />
          <Note />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
