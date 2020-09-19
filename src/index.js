import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import UserConfirmation from './components/UserConfirmation';
import { AuthProvider } from './hooks/Auth';
import { GlobalStateProvider } from './hooks/GlobalState';
import { initialState, reducer } from './reducer';

ReactDOM.render((
	<GlobalStateProvider
		initialState={initialState}
		reducer={reducer}
	>
		<BrowserRouter
			getUserConfirmation={(message, callback) => UserConfirmation(message, callback)}
		>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</GlobalStateProvider>
), document.getElementById('root'));

serviceWorker.register();
