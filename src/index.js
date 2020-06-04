import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
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

serviceWorker.register();
