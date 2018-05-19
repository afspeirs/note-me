import React from "react";
import ReactDOM from "react-dom";
import { deepOrange } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const theme = createMuiTheme({
	palette: {
		primary: deepOrange,
	},
});

function Index() {
	return (
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	);
}

ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
