import { useReducer } from 'react';
import PropTypes from 'prop-types';

import GlobalStateContext from './GlobalStateContext';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	initialState: PropTypes.instanceOf(Object).isRequired,
	reducer: PropTypes.func.isRequired,
};

const GlobalStateProvider = ({ reducer, initialState, children }) => (
	<GlobalStateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</GlobalStateContext.Provider>
);

GlobalStateProvider.propTypes = propTypes;

export default GlobalStateProvider;
