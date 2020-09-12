import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const AdapterLink = forwardRef((props, ref) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<Link innerRef={ref} {...props} />
));

export default AdapterLink;
