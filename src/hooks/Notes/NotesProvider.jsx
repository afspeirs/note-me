import PropTypes from 'prop-types';

import NotesContext from './NotesContext';
import NotesValue from './NotesValue';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function NotesProvider({ children }) {
  const value = NotesValue();
  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

NotesProvider.propTypes = propTypes;

export default NotesProvider;
