import PropTypes from 'prop-types';

import NotesContext from './NotesContext';
import useNotesValue from './useNotesValue';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const NotesProvider = ({ children }) => {
	const value = useNotesValue();
	return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

NotesProvider.propTypes = propTypes;

export default NotesProvider;
