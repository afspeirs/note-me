import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

const RenderLink = forwardRef((props, ref) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<NavLink innerRef={ref} {...props} />
));

export default RenderLink;
