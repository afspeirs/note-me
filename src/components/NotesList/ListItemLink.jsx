import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';

import { ListItemTextStyled, NavLinkStyled } from './NotesList.styled';

const propTypes = {
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

const ListItemLink = ({ primary, to }) => {
	const renderLink = React.useMemo(
		() => React.forwardRef((itemProps, ref) => (
			<NavLinkStyled to={to} {...itemProps} innerRef={ref} />
		)),
		[to],
	);

	return (
		<li>
			<ListItem button component={renderLink}>
				<ListItemTextStyled primary={primary} />
			</ListItem>
		</li>
	);
};

ListItemLink.propTypes = propTypes;

export default ListItemLink;
