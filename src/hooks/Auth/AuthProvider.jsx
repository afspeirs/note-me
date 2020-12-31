import React from 'react';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import useAuthValue from './useAuthValue';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const AuthProvider = ({ children }) => {
	const value = useAuthValue();
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = propTypes;

export default AuthProvider;
