import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';

import useStyles from './ListItemLink.styled';

const defaultProps = {
	className: '',
	id: '',
};

const propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

const ListItemLink = ({
	className,
	id,
	onClick,
	primary,
	to,
}) => {
	const classes = useStyles();
	const renderLink = React.useMemo(
		() => React.forwardRef((props, ref) => (
			<NavLink className={classes.navLink} to={to} {...props} innerRef={ref} />
		)),
		[classes, to],
	);

	return (
		<li>
			<ListItem button component={renderLink} className={className} id={id} onClick={onClick}>
				<ListItemText className={classes.listItemText} primary={primary} />
			</ListItem>
		</li>
	);
};

ListItemLink.defaultProps = defaultProps;
ListItemLink.propTypes = propTypes;

export default ListItemLink;
