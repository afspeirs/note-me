import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import UserConfirmation from './components/UserConfirmation';
import { AuthProvider } from './hooks/AuthContext';
import { NotesProvider } from './hooks/NotesContext';
import { StateProvider } from './hooks/StateContext';
import { initialState, reducer } from './reducer';


ReactDOM.render((
	<StateProvider initialState={initialState} reducer={reducer}>
		<BrowserRouter getUserConfirmation={(message, callback) => UserConfirmation(message, callback)}>
			<AuthProvider>
				<NotesProvider>
					<App />
				</NotesProvider>
			</AuthProvider>
		</BrowserRouter>
	</StateProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
