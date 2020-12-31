import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserConfirmation from './components/UserConfirmation';
import { AuthProvider } from './hooks/Auth';
import { GlobalStateProvider } from './hooks/GlobalState';
import { initialState, reducer } from './reducer';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter getUserConfirmation={(message, callback) => UserConfirmation(message, callback)}>
			<GlobalStateProvider initialState={initialState} reducer={reducer}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</GlobalStateProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
