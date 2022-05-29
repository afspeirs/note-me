import { useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';
import GlobalStateContext from './GlobalStateContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialState: PropTypes.objectOf(PropTypes.any).isRequired,
};

function GlobalStateProvider({ children, initialState }) {
  return (
    <GlobalStateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </GlobalStateContext.Provider>
  );
}

GlobalStateProvider.propTypes = propTypes;

export default GlobalStateProvider;
