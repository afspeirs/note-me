import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	match: PropTypes.instanceOf(Object).isRequired,
};

const NotePage = ({ match }) => {
	const { id } = match.params;
	console.log(id);

	return (
		<div>
			{id}
		</div>
	);
};

NotePage.propTypes = propTypes;

export default NotePage;
