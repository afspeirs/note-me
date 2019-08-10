import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';

import { ListItemTextStyled, NavLinkStyled } from './NotesList.styled';

const defaultProps = {
	className: '',
	id: '',
};

const propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

const ListItemLink = ({
	className,
	id,
	primary,
	to,
}) => {
	const renderLink = React.useMemo(
		() => React.forwardRef((props, ref) => (
			<NavLinkStyled to={to} {...props} innerRef={ref} />
		)),
		[to],
	);

	return (
		<li>
			<ListItem button component={renderLink} className={className} id={id}>
				<ListItemTextStyled primary={primary} />
			</ListItem>
		</li>
	);
};

ListItemLink.defaultProps = defaultProps;
ListItemLink.propTypes = propTypes;

export default ListItemLink;
