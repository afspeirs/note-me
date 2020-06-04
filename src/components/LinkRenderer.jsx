import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	href: PropTypes.string.isRequired,
};

const LinkRenderer = ({ children, href }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

LinkRenderer.propTypes = propTypes;

export default LinkRenderer;
