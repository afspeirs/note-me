import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7React from 'framework7-react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(
	React.createElement(App),
	document.getElementById('app')
);

registerServiceWorker();
