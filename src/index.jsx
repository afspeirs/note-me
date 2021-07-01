import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import UserConfirmation from './components/shared/UserConfirmation';
import { AuthProvider } from './hooks/Auth';
import { GlobalStateProvider } from './hooks/GlobalState';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter getUserConfirmation={(message, callback) => UserConfirmation(message, callback)}>
			<GlobalStateProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</GlobalStateProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);

registerServiceWorker();
