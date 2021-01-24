import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

import useStyles from './RouterNavLink.styled';

const RouterNavLink = forwardRef((props, ref) => {
	const classes = useStyles();

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<NavLink innerRef={ref} classes={classes.navLink} {...props} />
	);
});

export default RouterNavLink;
