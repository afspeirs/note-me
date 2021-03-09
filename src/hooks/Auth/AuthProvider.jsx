import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import AuthValue from './AuthValue';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const AuthProvider = ({ children }) => {
	const value = AuthValue();
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = propTypes;

export default AuthProvider;
